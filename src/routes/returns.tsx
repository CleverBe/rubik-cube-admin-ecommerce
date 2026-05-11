import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCcw } from "lucide-react";

export const Route = createFileRoute("/returns")({
  component: () => (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Devoluciones</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RotateCcw className="size-4" /> Devoluciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Gestión de devoluciones próximamente.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
});
