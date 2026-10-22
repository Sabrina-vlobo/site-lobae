// Prévia dos cases fictícios no card do portfólio, montada em código
// a partir do hero desenhado no Figma (sem fotos por enquanto).
export function ConceptPreview({ variant }: { variant: "veio" | "ambar" }) {
  if (variant === "veio") {
    return (
      <div className="cp cp--veio" aria-hidden="true">
        <div className="cp-text">
          <span className="cp-brand">veio</span>
          <p className="cp-title">Cada centímetro desenhado para a sua casa.</p>
          <span className="cp-btn">Agendar visita técnica</span>
        </div>
        <div className="cp-visual">
          <span className="cp-cota">3,40 m</span>
          <div className="cp-wood" />
          <div className="cp-swatches">
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="cp cp--ambar" aria-hidden="true">
      <div className="cp-text">
        <span className="cp-brand">
          <i />
          âmbar
        </span>
        <p className="cp-title">Seu sorriso, sem aquele frio na barriga.</p>
        <span className="cp-btn">Agendar avaliação</span>
      </div>
      <div className="cp-visual">
        <div className="cp-arch" />
      </div>
    </div>
  );
}
