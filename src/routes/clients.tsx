import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  clients as initialClients,
  orders as allOrders,
  type Client,
} from "@/lib/mock-data";
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
  Users,
  Eye,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingCart,
  Package,
  Hash,
  DollarSign,
} from "lucide-react";

export const Route = createFileRoute("/clients")({
  component: ClientsPage,
});

function formatCurrency(n: number) {
  return `$${n.toFixed(2)}`;
}

function ClientsPage() {
  const [clients] = useState<Client[]>(initialClients);
  const [selected, setSelected] = useState<Client | null>(null);
  const {
    sortedData: sortedClients,
    sortConfig,
    toggleSort,
  } = useSort(clients, "name");

  const clientOrders = (clientId: string) =>
    allOrders.filter((o) => o.clientId === clientId);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Clientes</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="size-4" /> Clientes
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <button
                    className="inline-flex items-center gap-1 font-medium"
                    onClick={() => toggleSort("name")}
                  >
                    Cliente
                    {sortConfig.key === "name" ? (
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
                    onClick={() => toggleSort("email")}
                  >
                    <Mail className="size-3" /> Email
                    {sortConfig.key === "email" ? (
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
                  <span className="inline-flex items-center gap-1">
                    <Phone className="size-3" /> Teléfono
                  </span>
                </TableHead>
                <TableHead className="text-center">Órdenes</TableHead>
                <TableHead>
                  <button
                    className="inline-flex items-center gap-1 font-medium"
                    onClick={() => toggleSort("createdAt")}
                  >
                    <Calendar className="size-3" /> Cliente desde
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
                <TableHead>Estado</TableHead>
                <TableHead className="w-16" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedClients.map((c) => {
                const orders = clientOrders(c.id);
                return (
                  <TableRow key={c.id}>
                    <TableCell className="flex items-center gap-2">
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="size-8 rounded-full"
                      />
                      <span className="font-medium">{c.name}</span>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">
                      {c.email}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">
                      {c.phone}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center justify-center size-7 rounded-full bg-muted text-xs font-medium">
                        {orders.length}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">
                      {c.createdAt}
                    </TableCell>
                    <TableCell>
                      <StickerDot
                        color={statusDot[c.status]}
                        label={statusLabel[c.status]}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelected(c)}
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
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="size-4" />
              {selected?.name}
            </DialogTitle>
          </DialogHeader>
          {selected && (() => {
            const orders = clientOrders(selected.id);
            return (
              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-lg border p-3">
                  <img
                    src={selected.avatar}
                    alt={selected.name}
                    className="size-14 rounded-full"
                  />
                  <div className="space-y-0.5">
                    <p className="font-medium text-base">{selected.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {selected.email}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {selected.phone}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1 rounded-lg border p-3">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="size-3" /> Cliente desde
                    </span>
                    <p className="text-sm font-medium">{selected.createdAt}</p>
                  </div>
                  <div className="space-y-1 rounded-lg border p-3">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <ShoppingCart className="size-3" /> Total de órdenes
                    </span>
                    <p className="text-sm font-medium">{orders.length}</p>
                  </div>
                  <div className="space-y-1 rounded-lg border p-3">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <DollarSign className="size-3" /> Total gastado
                    </span>
                    <p className="text-sm font-medium">
                      {formatCurrency(
                        orders.reduce((sum, o) => sum + o.total, 0),
                      )}
                    </p>
                  </div>
                  <div className="space-y-1 rounded-lg border p-3">
                    <span className="text-xs text-muted-foreground">Estado</span>
                    <p className="text-sm font-medium">
                      <StickerDot
                        color={statusDot[selected.status]}
                        label={statusLabel[selected.status]}
                      />
                    </p>
                  </div>
                  <div className="space-y-1 rounded-lg border p-3 col-span-2">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3" /> Dirección
                    </span>
                    <p className="text-sm">{selected.address}</p>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-medium flex items-center gap-1">
                    <Package className="size-4" /> Historial de Órdenes ({orders.length})
                  </h4>
                  {orders.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Este cliente no tiene órdenes registradas.
                    </p>
                  ) : (
                    <div className="rounded-lg border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>
                              <Hash className="size-3" /> Orden
                            </TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead>Pago</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orders.map((o) => (
                            <TableRow key={o.id}>
                              <TableCell className="font-mono text-xs font-medium">
                                {o.orderNumber}
                              </TableCell>
                              <TableCell className="text-muted-foreground text-xs">
                                {o.createdAt}
                              </TableCell>
                              <TableCell className="text-right font-medium text-xs">
                                {formatCurrency(o.total)}
                              </TableCell>
                              <TableCell>
                                <StickerDot
                                  color={statusDot[o.paymentStatus]}
                                  label={statusLabel[o.paymentStatus]}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
