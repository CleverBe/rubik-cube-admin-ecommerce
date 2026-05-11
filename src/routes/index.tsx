import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Grid3X3, ShoppingCart, Users } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

const stats = [
  { label: "Productos", value: "128", icon: Package, color: "text-blue-600" },
  { label: "Categorías", value: "8", icon: Grid3X3, color: "text-emerald-600" },
  {
    label: "Órdenes",
    value: "1,342",
    icon: ShoppingCart,
    color: "text-orange-600",
  },
  { label: "Clientes", value: "892", icon: Users, color: "text-purple-600" },
];

function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Panel de Administración</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>{stat.label}</CardTitle>
              <stat.icon className={`size-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
