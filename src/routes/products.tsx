import { useState, useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { products as initialProducts, categories, type Product } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  Card, CardContent, CardHeader, CardTitle,
} from '@/components/ui/card'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import RichTextEditor from '@/components/rich-text-editor'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'
import { Pencil, Trash2, Plus, X, Upload } from 'lucide-react'

const NOT_FOUND_IMG = '/images/not_found_image.jpg'

export const Route = createFileRoute('/products')({
  component: ProductsPage,
})

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_FILE_SIZE = 2 * 1024 * 1024

const productSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  description: z.string().min(1, 'La descripción es requerida'),
  price: z.string().min(1, 'El precio es requerido').refine(v => !isNaN(Number(v)) && Number(v) > 0, 'Debe ser un número positivo'),
  comparePrice: z.string().optional(),
  stock: z.string().min(1, 'El stock es requerido').refine(v => !isNaN(Number(v)) && Number(v) >= 0 && Number.isInteger(Number(v)), 'Debe ser un número entero no negativo'),
  sku: z.string().min(2, 'El SKU debe tener al menos 2 caracteres'),
  categoryId: z.string().min(1, 'Selecciona una categoría'),
  images: z.array(z.string()).min(1, 'Debes agregar al menos una imagen'),
  imageFiles: z.any().optional(),
}).superRefine((data, ctx) => {
  if (data.comparePrice) {
    const price = Number(data.price)
    const compare = Number(data.comparePrice)
    if (!isNaN(price) && !isNaN(compare) && compare < price) {
      ctx.addIssue({
        code: 'custom',
        path: ['comparePrice'],
        message: 'El precio comparativo debe ser mayor o igual al precio',
      })
    }
  }
  if (data.imageFiles instanceof FileList) {
    const files = Array.from(data.imageFiles)
    if (files.length > 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['imageFiles'],
        message: 'Máximo 3 imágenes',
      })
    }
    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['imageFiles'],
          message: `La imagen ${file.name} supera los 2MB`,
        })
      }
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['imageFiles'],
          message: `${file.name} debe ser .jpg, .jpeg, .png o .webp`,
        })
      }
    }
  }
})

type ProductForm = z.infer<typeof productSchema>

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { register, handleSubmit, control, reset, setValue, formState: { errors } } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: { name: '', description: '', price: '', comparePrice: '', stock: '', sku: '', categoryId: '', images: [], imageFiles: undefined },
  })

  const openCreate = () => {
    setEditing(null)
    setImagePreviews([])
    setValue('images', [])
    reset({ name: '', description: '', price: '', comparePrice: '', stock: '', sku: '', categoryId: '', images: [], imageFiles: undefined })
    setOpen(true)
  }

  const openEdit = (p: Product) => {
    setEditing(p)
    setImagePreviews([...p.images])
    setValue('images', [...p.images])
    reset({
      name: p.name,
      description: p.description,
      price: String(p.price),
      comparePrice: p.comparePrice ? String(p.comparePrice) : '',
      stock: String(p.stock),
      sku: p.sku,
      categoryId: p.categoryId,
      images: [...p.images],
      imageFiles: undefined,
    })
    setOpen(true)
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files
    const files = Array.from(fileList || [])
    const newPreviews = files.map(f => URL.createObjectURL(f))
    const updated = [...imagePreviews, ...newPreviews]
    setImagePreviews(updated)
    setValue('images', updated, { shouldValidate: true })
    setValue('imageFiles', fileList, { shouldValidate: true })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const removeImage = (index: number) => {
    const url = imagePreviews[index]
    if (url.startsWith('blob:')) URL.revokeObjectURL(url)
    const updated = imagePreviews.filter((_, i) => i !== index)
    setImagePreviews(updated)
    setValue('images', updated, { shouldValidate: true })
  }

  const onSubmit = (data: ProductForm) => {
    const productData = {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      comparePrice: data.comparePrice ? Number(data.comparePrice) : null,
      stock: Number(data.stock),
      sku: data.sku,
      categoryId: data.categoryId,
    }

    if (editing) {
      setProducts(prev =>
        prev.map(p => p.id === editing.id ? { ...p, ...productData, images: data.images, updatedAt: new Date().toISOString().slice(0, 10) } : p)
      )
      toast.success('Producto actualizado')
    } else {
      const newProduct: Product = {
        ...productData,
        id: uuidv4(),
        slug: data.name.toLowerCase().replace(/\s+/g, '-'),
        images: data.images,
        createdAt: new Date().toISOString().slice(0, 10),
        updatedAt: new Date().toISOString().slice(0, 10),
      }
      setProducts(prev => [...prev, newProduct])
      toast.success('Producto creado')
    }
    setOpen(false)
  }

  const handleDelete = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  const getCategoryName = (id: string) => categories.find(c => c.id === id)?.name ?? '-'

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Productos</h1>
        <Button onClick={openCreate}>
          <Plus className="size-4" /> Nuevo Producto
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todos los productos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Imagen</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Actualizado</TableHead>
                <TableHead className="w-20" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map(p => (
                <TableRow key={p.id}>
                  <TableCell>
                    <img src={p.images[0] || NOT_FOUND_IMG} alt={p.name} className="size-10 rounded object-cover" />
                  </TableCell>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell className="text-muted-foreground">{p.sku}</TableCell>
                  <TableCell>{getCategoryName(p.categoryId)}</TableCell>
                  <TableCell>
                    {p.comparePrice ? (
                      <span className="text-muted-foreground line-through mr-1">${p.comparePrice.toFixed(2)}</span>
                    ) : null}
                    <span>${p.price.toFixed(2)}</span>
                  </TableCell>
                  <TableCell>{p.stock}</TableCell>
                  <TableCell className="text-muted-foreground">{p.updatedAt}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(p)}>
                        <Pencil className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)}>
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{editing ? 'Editar Producto' : 'Nuevo Producto'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Imágenes</Label>
                <div className="flex flex-wrap gap-2">
                  {imagePreviews.map((url, i) => (
                    <div key={i} className="relative group size-20 rounded-lg overflow-hidden border">
                      <img src={url || NOT_FOUND_IMG} alt={`Imagen ${i + 1}`} className="size-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-0.5 right-0.5 flex size-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  ))}
                  {imagePreviews.length < 3 && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex size-20 items-center justify-center rounded-lg border-2 border-dashed text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                    >
                      <Upload className="size-5" />
                    </button>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  className="hidden"
                  onChange={handleImageSelect}
                />
                {errors.images?.message && <p className="text-xs text-destructive">{String(errors.images.message)}</p>}
                {errors.imageFiles?.message && <p className="text-xs text-destructive">{String(errors.imageFiles.message)}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" {...register('name')} />
                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>Descripción</Label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <RichTextEditor value={field.value} onChange={field.onChange} placeholder="Descripción del producto..." />
                  )}
                />
                {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Precio</Label>
                  <Input id="price" type="number" step="0.01" {...register('price')} />
                  {errors.price && <p className="text-xs text-destructive">{errors.price.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="compare">Precio Comparativo</Label>
                  <Input id="compare" type="number" step="0.01" {...register('comparePrice')} />
                  {errors.comparePrice && <p className="text-xs text-destructive">{errors.comparePrice.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input id="stock" type="number" {...register('stock')} />
                  {errors.stock && <p className="text-xs text-destructive">{errors.stock.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" {...register('sku')} />
                  {errors.sku && <p className="text-xs text-destructive">{errors.sku.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Controller
                  name="categoryId"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(c => (
                          <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.categoryId && <p className="text-xs text-destructive">{errors.categoryId.message}</p>}
              </div>
            </div>
            <DialogFooter showCloseButton className="mt-4">
              <Button type="submit">{editing ? 'Guardar' : 'Crear'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
