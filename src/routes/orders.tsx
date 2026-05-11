import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingCart } from 'lucide-react'

export const Route = createFileRoute('/orders')({
  component: () => (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Órdenes</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ShoppingCart className="size-4" /> Órdenes de Compra</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Gestión de órdenes próximamente.</p>
        </CardContent>
      </Card>
    </div>
  ),
})
