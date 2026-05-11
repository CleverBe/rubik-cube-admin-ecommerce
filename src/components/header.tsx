import { Link, useLocation } from '@tanstack/react-router'
import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import { Sun, Moon, Bell, User, Package, Grid3X3, ShoppingCart, Users, RotateCcw } from 'lucide-react'

const links = [
  { to: '/categories', label: 'Categorías', icon: Grid3X3 },
  { to: '/products', label: 'Productos', icon: Package },
  { to: '/orders', label: 'Órdenes', icon: ShoppingCart },
  { to: '/clients', label: 'Clientes', icon: Users },
  { to: '/returns', label: 'Devoluciones', icon: RotateCcw },
]

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-14 items-center gap-2 px-4 max-w-screen-2xl mx-auto">
        <Link to="/" className="font-heading text-lg font-bold mr-4 shrink-0">
          CubeShop
        </Link>

        <nav className="flex items-center gap-1">
          {links.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md text-sm font-medium transition-colors
                ${location.pathname === to || location.pathname.startsWith(to + '/')
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
            >
              <Icon className="size-4" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Cambiar tema">
            {theme === 'light' ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </Button>
          <Button variant="ghost" size="icon" aria-label="Notificaciones">
            <Bell className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Usuario">
            <User className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
