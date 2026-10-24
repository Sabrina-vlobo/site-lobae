// Prévia dos cases fictícios no card do portfólio, montada em código
// a partir dos heros desenhados no Figma. Fotos: Unsplash (uso livre).
export function ConceptPreview({ variant }: { variant: "traco" | "ambar" }) {
  if (variant === "traco") {
    return (
      <div className="cp cp--traco" aria-hidden="true">
        <picture>
          <source srcSet="/cases/traco.webp" type="image/webp" />
          <img src="/cases/traco.jpg" alt="" loading="lazy" decoding="async" />
        </picture>
        <div className="cp-top">
          <span className="cp-mark">T</span>
          <span className="cp-nav">
            <i>Sobre</i>
            <i>Projetos</i>
            <i>Contato</i>
          </span>
        </div>
        <p className="cp-title">Uma abordagem diferente para a arquitetura tradicional</p>
      </div>
    );
  }
  return (
    <div className="cp cp--ambar" aria-hidden="true">
      <span className="cp-pill">
        <b>
          <i />
          Clínica Âmbar
        </b>
        <em>Agendar</em>
      </span>
      <p className="cp-title">
        Onde <span>o seu sorriso</span>
        <br />
        ganha cuidado e confiança
      </p>
      <picture className="cp-photo">
        <source srcSet="/cases/ambar.webp" type="image/webp" />
        <img src="/cases/ambar.jpg" alt="" loading="lazy" decoding="async" />
      </picture>
    </div>
  );
}
