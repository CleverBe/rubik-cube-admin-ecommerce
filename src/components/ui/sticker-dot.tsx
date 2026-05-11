import { cn } from "@/lib/utils";

const dotColors = {
  green: "bg-cube-green",
  blue: "bg-cube-blue",
  red: "bg-cube-red",
  yellow: "bg-cube-yellow",
  orange: "bg-cube-orange",
  gray: "bg-muted-foreground/40",
} as const;

type DotColor = keyof typeof dotColors;

interface StickerDotProps {
  color: DotColor;
  label?: string;
  size?: "sm" | "md";
  className?: string;
}

function StickerDot({ color, label, size = "md", className }: StickerDotProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span
        className={cn(
          "inline-block shrink-0 rounded-full",
          dotColors[color],
          size === "sm" ? "size-1.5" : "size-2",
        )}
        aria-hidden
      />
      {label && <span className="text-sm">{label}</span>}
    </span>
  );
}

const statusDot = {
  paid: "green",
  pending: "yellow",
  failed: "red",
  refunded: "blue",
  active: "green",
  inactive: "gray",
  approved: "blue",
  rejected: "red",
} as const satisfies Record<string, DotColor>;

const statusLabel = {
  paid: "Pagado",
  pending: "Pendiente",
  failed: "Fallido",
  refunded: "Reembolsado",
  active: "Activo",
  inactive: "Inactivo",
  approved: "Aprobada",
  rejected: "Rechazada",
} as const;

export { StickerDot, statusDot, statusLabel };
export type { DotColor };
