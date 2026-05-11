import { Link, useLocation } from "@tanstack/react-router";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Sun,
  Moon,
  Bell,
  User,
  Package,
  Grid3X3,
  ShoppingCart,
  Users,
  RotateCcw,
  Settings,
  Activity,
  LogOut,
  AlertTriangle,
  CreditCard,
  Clock,
} from "lucide-react";

const links = [
  { to: "/categories", label: "Categorías", icon: Grid3X3 },
  { to: "/products", label: "Productos", icon: Package },
  { to: "/orders", label: "Órdenes", icon: ShoppingCart },
  { to: "/clients", label: "Clientes", icon: Users },
  { to: "/returns", label: "Devoluciones", icon: RotateCcw },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-14 items-center gap-2 px-4 max-w-screen-2xl mx-auto">
        <Link to="/" className="flex items-center gap-2 mr-4 shrink-0">
          <img src="/logo.png" alt="CubeShop" className="h-8 w-auto" />
          <span className="font-heading text-lg font-bold">CubeShop</span>
        </Link>

        <nav className="flex items-center gap-1">
          {links.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md text-sm font-medium transition-colors
                ${
                  location.pathname === to ||
                  location.pathname.startsWith(to + "/")
                    ? "bg-cube-orange/10 text-cube-orange font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
            >
              <Icon className="size-4" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Cambiar tema"
          >
            {theme === "light" ? (
              <Moon className="size-4" />
            ) : (
              <Sun className="size-4" />
            )}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Notificaciones" className="relative">
                <Bell className="size-4" />
                <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
                  4
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notificaciones</span>
                <span className="text-xs font-normal text-muted-foreground">4 nuevas</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {[
                { icon: RotateCcw, text: "Nueva solicitud de devolución de Roberto López", time: "Hace 10 min", color: "text-blue-500" },
                { icon: AlertTriangle, text: "Stock bajo: CubeSpeed Pro X3 (quedan 2)", time: "Hace 1 hora", color: "text-amber-500" },
                { icon: ShoppingCart, text: "Nueva orden OC-2026-013 de Ana Martínez", time: "Hace 2 horas", color: "text-emerald-500" },
                { icon: CreditCard, text: "Pago fallido en orden OC-2026-011", time: "Hace 3 horas", color: "text-red-500" },
              ].map((n, i) => (
                <DropdownMenuItem key={i} className="flex items-start gap-3 py-2 cursor-pointer">
                  <div className={`mt-0.5 ${n.color}`}>
                    <n.icon className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-sm">{n.text}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" /> {n.time}
                    </span>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-xs text-muted-foreground cursor-pointer">
                Ver todas
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Usuario"
                className="rounded-full overflow-hidden p-0"
              >
                <img
                  src="/images/user_avatar.jpg"
                  alt="Avatar"
                  className="h-full w-full object-cover"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel className="flex items-center gap-3 pb-2">
                <img
                  src="/images/user_avatar.jpg"
                  alt="Avatar"
                  className="size-11 rounded-full object-cover"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium text-sm">Admin CubeShop</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    admin@cubeshop.com
                  </span>
                  <span className="text-[11px] text-muted-foreground/60">
                    Administrador
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="size-4" /> Perfil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Activity className="size-4" /> Actividad
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="size-4" /> Configuración
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="size-4" /> Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
