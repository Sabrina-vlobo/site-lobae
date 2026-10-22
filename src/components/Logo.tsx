// Logo horizontal LOBAE em pixel (grade 42 x 10). Escalar sempre em múltiplos inteiros.
type Props = { height?: number; tone?: "claro" | "cobalto" | "auto"; className?: string };

export function Logo({ height = 24, tone = "claro", className }: Props) {
  // "auto" herda a cor do texto (usado no menu, que muda de cor ao rolar)
  const base = tone === "auto" ? "currentColor" : tone === "claro" ? "#F1F2F6" : "#2433FF";
  return (
    <svg
      className={className}
      height={height}
      width={(height * 42) / 10}
      viewBox="0 0 42 10"
      shapeRendering="crispEdges"
      role="img"
      aria-label="LOBAE"
    >
      <path fill={base} d="M0 0h3v7h7v3H0z" />
      <path fill="#FF5A1F" fillRule="evenodd" d="M4 0h6v6H4zM6 2h2v2H6z" />
      <path
        fill={base}
        d="M13 3h1v6h4v1h-5zM20 3h3v1h-3zM19 4h1v5h-1zM23 4h1v5h-1zM20 9h3v1h-3zM25 3h4v1h-4zM25 4h1v6h-1zM29 4h1v2h-1zM26 6h3v1h-3zM29 7h1v2h-1zM26 9h3v1h-3zM32 3h3v1h-3zM31 4h1v6h-1zM35 4h1v6h-1zM32 6h3v1h-3zM37 3h5v1h-5zM37 4h1v6h-1zM38 6h3v1h-3zM38 9h4v1h-4z"
      />
    </svg>
  );
}
