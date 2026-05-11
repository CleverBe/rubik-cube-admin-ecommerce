import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { returns as initialReturns, type Return } from "@/lib/mock-data";
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
  RotateCcw,
  Eye,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Calendar,
  Hash,

  MessageSquare,
} from "lucide-react";

export const Route = createFileRoute("/returns")({
  component: ReturnsPage,
});

function ReturnsPage() {
  const [returns] = useState<Return[]>(initialReturns);
  const [selected, setSelected] = useState<Return | null>(null);
  const {
    sortedData: sortedReturns,
    sortConfig,
    toggleSort,
  } = useSort(returns, "createdAt");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Devoluciones</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RotateCcw className="size-4" /> Devoluciones
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <button
                    className="inline-flex items-center gap-1 font-medium"
                    onClick={() => toggleSort("returnNumber")}
                  >
                    <Hash className="size-3" /> Devolución
                    {sortConfig.key === "returnNumber" ? (
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
                <TableHead>Orden</TableHead>
                <TableHead>Producto</TableHead>
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
                <TableHead>Estado</TableHead>
                <TableHead className="w-16" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedReturns.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-mono text-xs font-medium">
                    {r.returnNumber}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {r.orderNumber}
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <img
                      src={r.productImage}
                      alt={r.productName}
                      className="size-9 rounded object-cover border"
                    />
                    <span className="text-sm">{r.productName}</span>
                  </TableCell>
                  <TableCell>{r.clientName}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {r.createdAt}
                  </TableCell>
                  <TableCell>
                    <StickerDot
                      color={statusDot[r.status]}
                      label={statusLabel[r.status]}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelected(r)}
                    >
                      <Eye className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={(v) => !v && setSelected(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RotateCcw className="size-4" />
              Devolución {selected?.returnNumber}
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <img
                  src={selected.productImage}
                  alt={selected.productName}
                  className="size-14 rounded-lg object-cover border"
                />
                <div className="space-y-0.5">
                  <p className="font-medium text-sm">{selected.productName}</p>
                  <p className="text-xs text-muted-foreground">
                    Cantidad: {selected.quantity}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Orden: {selected.orderNumber}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1 rounded-lg border p-3">
                  <span className="text-xs text-muted-foreground">Cliente</span>
                  <p className="text-sm font-medium">{selected.clientName}</p>
                </div>
                <div className="flex flex-col gap-1 rounded-lg border p-3">
                  <span className="text-xs text-muted-foreground">Estado</span>
                  <StickerDot
                    color={statusDot[selected.status]}
                    label={statusLabel[selected.status]}
                    className="self-start"
                  />
                </div>
                <div className="space-y-1 rounded-lg border p-3">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="size-3" /> Solicitada
                  </span>
                  <p className="text-sm font-medium">{selected.createdAt}</p>
                </div>
                <div className="space-y-1 rounded-lg border p-3">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="size-3" /> Resuelta
                  </span>
                  <p className="text-sm font-medium">
                    {selected.resolvedAt ?? "—"}
                  </p>
                </div>
              </div>

              <div className="space-y-1 rounded-lg border p-3">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MessageSquare className="size-3" /> Motivo
                </span>
                <p className="text-sm">{selected.reason}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
