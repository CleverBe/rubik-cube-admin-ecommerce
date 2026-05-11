import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package,
  Grid3X3,
  ShoppingCart,
  Users,
  TrendingUp,
  PieChart,
  BarChart3,
} from "lucide-react";
import { monthlySales, orderStatusStats } from "@/lib/mock-data";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

export const Route = createFileRoute("/")({
  component: Home,
});

const stats = [
  { label: "Productos", value: "128", icon: Package, accent: "border-l-cube-blue" },
  { label: "Categorías", value: "8", icon: Grid3X3, accent: "border-l-cube-green" },
  {
    label: "Órdenes",
    value: "1,342",
    icon: ShoppingCart,
    accent: "border-l-cube-orange",
  },
  { label: "Clientes", value: "892", icon: Users, accent: "border-l-cube-yellow" },
];

const salesConfig = {
  sales: { label: "Ventas", color: "var(--color-chart-1)" },
} satisfies ChartConfig;

const ordersConfig = {
  orders: { label: "Órdenes", color: "var(--color-chart-2)" },
} satisfies ChartConfig;

function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Panel de Administración</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className={`border-l-4 ${stat.accent}`}>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>{stat.label}</CardTitle>
              <stat.icon className="size-5 text-muted-foreground/60" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="size-4" /> Ventas Mensuales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={salesConfig} className="aspect-auto h-72 [&_.recharts-text]:fill-foreground">
              <LineChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="var(--color-sales)"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "var(--color-sales)" }}
                  activeDot={{ r: 6, fill: "var(--color-sales)" }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="size-4" /> Estado de Órdenes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={orderStatusStats}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                    label={({ name, percent, cx, x, y }) => (
                      <text
                        x={x}
                        y={y}
                        fill="var(--color-foreground)"
                        textAnchor={x > (cx as number) ? "start" : "end"}
                        fontSize={12}
                      >
                        {name} {((percent ?? 0) * 100).toFixed(0)}%
                      </text>
                    )}
                    labelLine
                  >
                    {orderStatusStats.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid var(--color-border)",
                      background: "var(--color-popover)",
                      color: "var(--color-foreground)",
                    }}
                    labelStyle={{ color: "var(--color-muted-foreground)" }}
                  />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="size-4" /> Órdenes por Mes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={ordersConfig} className="aspect-auto h-80">
              <BarChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="orders" fill="var(--color-orders)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {(() => {
                const total = monthlySales.reduce((s, m) => s + m.orders, 0);
                const avg = Math.round(total / monthlySales.length);
                const best = [...monthlySales].sort((a, b) => b.orders - a.orders)[0];
                return (
                  <>
                    <div className="rounded-lg border p-3 text-center">
                      <p className="text-xs text-muted-foreground">Total</p>
                      <p className="text-xl font-bold">{total}</p>
                    </div>
                    <div className="rounded-lg border p-3 text-center">
                      <p className="text-xs text-muted-foreground">Promedio</p>
                      <p className="text-xl font-bold">{avg}</p>
                    </div>
                    <div className="rounded-lg border p-3 text-center">
                      <p className="text-xs text-muted-foreground">Mejor Mes</p>
                      <p className="text-xl font-bold">{best.month} ({best.orders})</p>
                    </div>
                  </>
                );
              })()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
