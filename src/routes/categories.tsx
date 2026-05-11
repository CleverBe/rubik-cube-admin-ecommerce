import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { categories as initialCategories, type Category } from '@/lib/mock-data'
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
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'
import { Pencil, Trash2, Plus } from 'lucide-react'

export const Route = createFileRoute('/categories')({
  component: CategoriesPage,
})

const categorySchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  description: z.string(),
  parentId: z.string().optional(),
})

type CategoryForm = z.infer<typeof categorySchema>

function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<CategoryForm>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: '', description: '', parentId: '' },
  })

  const openCreate = () => {
    setEditing(null)
    reset({ name: '', description: '', parentId: '' })
    setOpen(true)
  }

  const openEdit = (cat: Category) => {
    setEditing(cat)
    reset({ name: cat.name, description: cat.description, parentId: cat.parentId ?? '' })
    setOpen(true)
  }

  const onSubmit = (data: CategoryForm) => {
    if (editing) {
      setCategories(prev =>
        prev.map(c => c.id === editing.id ? { ...c, ...data, parentId: data.parentId || null, updatedAt: new Date().toISOString().slice(0, 10) } : c)
      )
      toast.success('Categoría actualizada')
    } else {
      const newCat: Category = {
        ...data,
        parentId: data.parentId || null,
        id: uuidv4(),
        slug: data.name.toLowerCase().replace(/\s+/g, '-'),
        image: '/placeholder.svg',
        createdAt: new Date().toISOString().slice(0, 10),
        updatedAt: new Date().toISOString().slice(0, 10),
      }
      setCategories(prev => [...prev, newCat])
      toast.success('Categoría creada')
    }
    setOpen(false)
  }

  const handleDelete = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id))
  }

  const parentCategories = categories.filter(c => !c.parentId)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categorías</h1>
        <Button onClick={openCreate}>
          <Plus className="size-4" /> Nueva Categoría
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todas las categorías</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Categoría Padre</TableHead>
                <TableHead>Actualizado</TableHead>
                <TableHead className="w-20" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map(cat => (
                <TableRow key={cat.id}>
                  <TableCell className="font-medium">{cat.name}</TableCell>
                  <TableCell className="text-muted-foreground">{cat.slug}</TableCell>
                  <TableCell className="text-muted-foreground max-w-[200px] truncate">{cat.description}</TableCell>
                  <TableCell>{cat.parentId ? categories.find(c => c.id === cat.parentId)?.name ?? '-' : '-'}</TableCell>
                  <TableCell className="text-muted-foreground">{cat.updatedAt}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(cat)}>
                        <Pencil className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(cat.id)}>
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? 'Editar Categoría' : 'Nueva Categoría'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" {...register('name')} />
                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Descripción</Label>
                <Input id="desc" {...register('description')} />
              </div>
              <div className="space-y-2">
                <Label>Padre</Label>
                <Controller
                  name="parentId"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Ninguna" />
                      </SelectTrigger>
                      <SelectContent>
                        {parentCategories.map(c => (
                          <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
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
