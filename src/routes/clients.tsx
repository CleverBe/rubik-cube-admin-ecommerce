import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export const Route = createFileRoute("/clients")({
  component: () => (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Clientes</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="size-4" /> Clientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Gestión de clientes próximamente.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
});
