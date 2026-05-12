import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { orders as initialOrders, type Order } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StickerDot, statusDot, statusLabel } from "@/components/ui/sticker-dot";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSort } from "@/lib/use-sort";
import {
  ShoppingCart,
  Eye,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Package,
  Truck,
  Store,
  MapPin,
  Calendar,
  Hash,
  DollarSign,
} from "lucide-react";

export const Route = createFileRoute("/orders")({
  component: OrdersPage,
});

const deliveryLabels: Record<string, string> = {
  standard: "Estándar",
  express: "Express",
  pickup: "Recoger en tienda",
};

const deliveryIcons: Record<string, typeof Truck> = {
  standard: Package,
  express: Truck,
  pickup: Store,
};

function formatCurrency(n: number) {
  return `$${n.toFixed(2)}`;
}

function OrdersPage() {
  const [orders] = useState<Order[]>(initialOrders);
  const [selected, setSelected] = useState<Order | null>(null);
  const {
    sortedData: sortedOrders,
    sortConfig,
    toggleSort,
  } = useSort(orders, "createdAt");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Órdenes</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="size-4" /> Órdenes de Compra
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <button
                    className="inline-flex items-center gap-1 font-medium"
                    onClick={() => toggleSort("orderNumber")}
                  >
                    <Hash className="size-3" /> Orden
                    {sortConfig.key === "orderNumber" ? (
                      sortConfig.direction === "asc" ? (
                        <ArrowUp className="size-4" />
                      ) : (
                        <ArrowDown className="size-4" />
                      )
                    ) : (
                      <ArrowUpDown className="size-4" />
                    )}
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    className="inline-flex items-center gap-1 font-medium"
                    onClick={() => toggleSort("clientName")}
                  >
                    Cliente
                    {sortConfig.key === "clientName" ? (
                      sortConfig.direction === "asc" ? (
                        <ArrowUp className="size-4" />
                      ) : (
                        <ArrowDown className="size-4" />
                      )
                    ) : (
                      <ArrowUpDown className="size-4" />
                    )}
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    className="inline-flex items-center gap-1 font-medium"
                    onClick={() => toggleSort("createdAt")}
                  >
                    <Calendar className="size-3" /> Fecha
                    {sortConfig.key === "createdAt" ? (
                      sortConfig.direction === "asc" ? (
                        <ArrowUp className="size-4" />
                      ) : (
                        <ArrowDown className="size-4" />
                      )
                    ) : (
                      <ArrowUpDown className="size-4" />
                    )}
                  </button>
                </TableHead>
                <TableHead>Entrega</TableHead>
                <TableHead>
                  <button
                    className="inline-flex items-center gap-1 font-medium"
                    onClick={() => toggleSort("total")}
                  >
                    <DollarSign className="size-3" /> Total
                    {sortConfig.key === "total" ? (
                      sortConfig.direction === "asc" ? (
                        <ArrowUp className="size-4" />
                      ) : (
                        <ArrowDown className="size-4" />
                      )
                    ) : (
                      <ArrowUpDown className="size-4" />
                    )}
                  </button>
                </TableHead>
                <TableHead>Pago</TableHead>
                <TableHead className="w-16" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedOrders.map((o) => {
                const DeliveryIcon = deliveryIcons[o.deliveryType];
                return (
                  <TableRow key={o.id}>
                    <TableCell className="font-medium font-mono text-xs">
                      {o.orderNumber}
                    </TableCell>
                    <TableCell>{o.clientName}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {o.createdAt}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 text-xs">
                        <DeliveryIcon className="size-3 text-muted-foreground" />
                        {deliveryLabels[o.deliveryType]}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(o.total)}
                    </TableCell>
                    <TableCell>
                      <StickerDot
                        color={statusDot[o.paymentStatus]}
                        label={statusLabel[o.paymentStatus]}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelected(o)}
                      >
                        <Eye className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={(v) => !v && setSelected(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="size-4" />
              Orden {selected?.orderNumber}
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 max-h-[75dvh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1 rounded-lg border p-3">
                  <span className="text-xs text-muted-foreground">Cliente</span>
                  <p className="text-sm font-medium">{selected.clientName}</p>
                </div>
                <div className="space-y-1 rounded-lg border p-3">
                  <span className="text-xs text-muted-foreground">Fecha</span>
                  <p className="text-sm font-medium">{selected.createdAt}</p>
                </div>
                <div className="space-y-1 rounded-lg border p-3">
                  <span className="text-xs text-muted-foreground">Total</span>
                  <p className="text-sm font-medium">
                    {formatCurrency(selected.total)}
                  </p>
                </div>
                <div className="flex flex-col gap-1 rounded-lg border p-3">
                  <span className="text-xs text-muted-foreground">Pago</span>
                  <StickerDot
                    color={statusDot[selected.paymentStatus]}
                    label={statusLabel[selected.paymentStatus]}
                    className="self-start"
                  />
                </div>
                <div className="space-y-1 rounded-lg border p-3">
                  <span className="text-xs text-muted-foreground">Entrega</span>
                  <p className="text-sm font-medium">
                    {deliveryLabels[selected.deliveryType]}
                  </p>
                </div>
                <div className="space-y-1 rounded-lg border p-3 sm:col-span-2">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3" /> Dirección de envío
                  </span>
                  <p className="text-sm wrap-break-word">{selected.shippingAddress}</p>
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-medium flex items-center gap-1">
                  <Package className="size-4" /> Productos (
                  {selected.items.length})
                </h4>
                <div className="rounded-lg border">
                  <Table className="min-w-150">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Producto</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead className="text-center">Cant.</TableHead>
                        <TableHead className="text-right">P. Unit.</TableHead>
                        <TableHead className="text-right">Subtotal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selected.items.map((item, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <img
                                src={item.productImage}
                                alt={item.productName}
                                className="size-9 shrink-0 rounded object-cover border"
                              />
                              <span className="font-medium text-sm">
                                {item.productName}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-xs text-muted-foreground">
                            {item.sku}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.quantity}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(item.unitPrice)}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {formatCurrency(item.unitPrice * item.quantity)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex justify-end pt-2 text-sm font-bold">
                  Total: {formatCurrency(selected.total)}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
