# CubeShop Admin — System Design

## Direction
"Precisión industrial cálida" — un admin panel que se siente como sostener un speedcube magnético de alta gama. Mate, preciso, con colores que significan algo.

## Feel
Warm, precise, industrial. No es un juguete — es una herramienta profesional para gestionar inventario de cubos Rubik.

## Palette

### Primitives
- `--color-cube-orange`: `oklch(0.65 0.2 40)` — primary, energía, acción
- `--color-cube-blue`: `oklch(0.45 0.15 260)` — info, refunds
- `--color-cube-green`: `oklch(0.6 0.18 160)` — success, paid, active
- `--color-cube-red`: `oklch(0.45 0.22 25)` — destructive, failed, rejected
- `--color-cube-yellow`: `oklch(0.85 0.15 90)` — warning, pending

### Base temperature
Hue 45 en todos los grises. A chroma casi cero, pero consistente para dar calidez sin ser visible.

### Light mode
- Background: `oklch(0.985 0.003 45)` — blanco cálido
- Foreground: `oklch(0.12 0.01 40)` — carbón profundo
- Primary: `oklch(0.6 0.2 40)` — naranja cubo
- Border: `oklch(0.88 0.008 45)` — gris cálido

### Dark mode
- Background: `oklch(0.13 0.005 45)` — negro cálido
- Primary: `oklch(0.7 0.2 40)` — naranja más brillante
- Border: `oklch(1 0 0 / 10%)` — sutil

## Depth strategy
Borders-only con color shifts. Sin sombras. La jerarquía se construye con cambios sutiles de luminosidad en el fondo.

## Radius
`0.5rem` base. Preciso, no demasiado redondeado. Escala: sm (0.6x), md (0.8x), lg (1x), xl (1.4x), 2xl (1.8x), 3xl (2.2x), 4xl (2.6x).

## Spacing base
`4px` (Tailwind default). Consistente en todas las surfaces.

## Signature: StickerDot
Colored dots (size-2) que imitan los stickers de un cubo Rubik. Se usa con label al lado para indicar estados:

| Status | Color | Label |
|--------|-------|-------|
| paid | green | Pagado |
| pending | yellow | Pendiente |
| failed | red | Fallido |
| refunded | blue | Reembolsado |
| active | green | Activo |
| inactive | gray | Inactivo |
| approved | blue | Aprobada |
| rejected | red | Rechazada |

## Key patterns
- **Metric cards**: `border-l-4` con color de cubo (blue, green, orange, yellow)
- **Active nav**: `bg-cube-orange/10 text-cube-orange font-semibold`
- **Charts**: chart-1=orange, chart-2=blue, chart-3=green, chart-4=yellow, chart-5=red
- **Badge status**: reemplazar por StickerDot + label en tablas

## Typography
Geist Variable. Sin cambios respecto a shadcn default.

## Iconography
Lucide React. Íconos muteados (text-muted-foreground/60) en metric cards para no competir con borders de color.
