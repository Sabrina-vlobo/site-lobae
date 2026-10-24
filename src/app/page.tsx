import { Logo } from "@/components/Logo";
import { PixelGrid } from "@/components/PixelGrid";
import { BeforeAfter } from "@/components/BeforeAfter";
import { StickyWhatsApp } from "@/components/StickyWhatsApp";
import { Reveal } from "@/components/Reveal";
import { CaseVideo } from "@/components/CaseVideo";
import { ConceptPreview } from "@/components/ConceptPreview";
import { EMAIL, INSTAGRAM_URL, MSG, SITE_DESCRIPTION, SITE_NAME, SITE_URL, WHATSAPP_NUMBER, whatsappLink } from "@/lib/site";

const DORES = [
  {
    n: "01",
    t: "“Quanto custa?” pela 30ª vez",
    b: "Preço, endereço, horário e serviços. Tudo o que você repete no direct pode morar num lugar só.",
  },
  {
    n: "02",
    t: "No Google, aparece o concorrente",
    b: "Quem procura seu serviço às 23h escolhe quem tem site. Às vezes nem chega a ver o seu Instagram.",
  },
  {
    n: "03",
    t: "Link na bio não é vitrine",
    b: "Linktree e destaques ajudam, mas não passam a confiança de uma marca. Um site passa.",
  },
];

const PROJETOS = [
  { nome: "Volta", tipo: "Site · bike elétrica", destaque: true, href: "https://volta-liart.vercel.app/", status: "Ver no ar ↗" },
  { nome: "Traço Arquitetura", tipo: "Projeto-conceito · arquitetura", destaque: false, href: undefined, status: "Em produção" },
  { nome: "Clínica Âmbar", tipo: "Projeto-conceito · odontologia", destaque: false, href: undefined, status: "Em produção" },
];

// [número, título, texto completo (desktop), texto curto (celular)]
const RECURSOS = [
  ["01", "WhatsApp a um toque", "Botão fixo na tela, com mensagem pronta. O cliente chama sem precisar procurar.", "Botão fixo, com mensagem pronta."],
  ["02", "Abre rápido no celular", "Quem espera carregar desiste. Código leve, sem construtor pesando a página.", "Código leve, sem construtor pesando."],
  ["03", "Encontrado no Google", "SEO básico: título, descrição e uma estrutura que o Google entende.", "SEO básico que o Google entende."],
  ["04", "Um caminho só", "Cada seção leva a uma ação: chamar, agendar ou reservar. Nada de distração.", "Cada seção leva a uma ação."],
  ["05", "Prova que convence", "Avaliações, fotos reais e depoimentos no ponto em que o cliente decide.", "Avaliações e fotos reais na hora certa."],
  ["06", "Cliques medidos", "Você sabe quantas pessoas visitaram e quantas chamaram no WhatsApp.", "Visitas e cliques no WhatsApp."],
];

const PLANOS = [
  {
    tag: "Landing page",
    nome: "Vitrine",
    de: "R$ 1.200",
    por: "R$ 390",
    valor: 390,
    off: "−67%",
    prazo: "No ar em 7 dias",
    itens: ["1 página, até 6 seções", "Botão de WhatsApp", "Versão celular + SEO básico", "2 rodadas de ajuste"],
    cta: "Quero a Vitrine →",
    msg: MSG.vitrine,
    destaque: true,
  },
  {
    tag: "Site institucional",
    nome: "Vitrine+",
    de: "R$ 2.200",
    por: "R$ 490",
    valor: 490,
    off: "−77%",
    prazo: "No ar em 14 dias",
    itens: ["Até 4 páginas", "Início, serviços, sobre e contato", "Tudo o que tem na Vitrine"],
    cta: "Quero a Vitrine+",
    msg: MSG.vitrinePlus,
    destaque: false,
  },
  {
    tag: "Porta de entrada",
    nome: "Raio-x",
    de: null,
    por: "Grátis",
    valor: 0,
    off: null,
    prazo: "Entrega em 48h",
    itens: ["Vídeo de 2 a 3 minutos", "3 problemas do seu site, Google ou Instagram", "Sem compromisso"],
    cta: "Pedir meu raio-x",
    msg: MSG.raiox,
    destaque: false,
  },
];

const FAQ = [
  ["O domínio fica no nome de quem?", "No seu. O .com.br custa cerca de R$ 40/ano no Registro.br e não entra no valor do site."],
  ["Tem mensalidade?", "Não. A hospedagem é grátis. O Plano Zelador é opcional."],
  ["Quando o prazo começa a contar?", "No design, depois que a gente alinha briefing, material e textos."],
  ["Como funciona o pagamento?", "Pix: 50% para começar e 50% na entrega."],
];

// Dados estruturados (schema.org): explicam ao Google e às IAs quem é a LOBAE,
// o que vende, por quanto e como falar com ela. Sai dos mesmos dados da página.
const ORG_ID = `${SITE_URL}/#organizacao`;
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE_NAME,
      alternateName: "LOBAE",
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/icon-512.png`,
      image: `${SITE_URL}/og.png`,
      description: SITE_DESCRIPTION,
      email: EMAIL,
      sameAs: [INSTAGRAM_URL],
      areaServed: { "@type": "Country", name: "Brasil" },
      knowsAbout: ["Criação de sites", "Landing pages", "Web design", "SEO", "Desenvolvimento web"],
      founder: { "@id": `${SITE_URL}/#sabrina` },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: `+${WHATSAPP_NUMBER}`,
        email: EMAIL,
        url: whatsappLink(MSG.geral),
        availableLanguage: "Portuguese",
        areaServed: "BR",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Sites e landing pages",
        itemListElement: PLANOS.map((p) => ({
          "@type": "Offer",
          name: `${p.nome} (${p.tag})`,
          description: [p.prazo, ...p.itens].join(". "),
          price: p.valor,
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/#precos`,
          itemOffered: { "@type": "Service", name: `${p.tag} ${p.nome}`, serviceType: p.tag, provider: { "@id": ORG_ID } },
        })),
      },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#sabrina`,
      name: "Sabrina",
      jobTitle: "Designer e desenvolvedora de sites",
      image: `${SITE_URL}/sabrina.jpg`,
      worksFor: { "@id": ORG_ID },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#site`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      inLanguage: "pt-BR",
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#pagina`,
      url: `${SITE_URL}/`,
      name: "Criação de sites e landing pages para pequenos negócios",
      description: SITE_DESCRIPTION,
      inLanguage: "pt-BR",
      isPartOf: { "@id": `${SITE_URL}/#site` },
      about: { "@id": ORG_ID },
      primaryImageOfPage: `${SITE_URL}/og.png`,
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
  ],
};

function WA({ msg, className, children }: { msg: string; className: string; children: React.ReactNode }) {
  return (
    <a className={className} href={whatsappLink(msg)} target="_blank" rel="noopener">
      {children}
      <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
    </a>
  );
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c") }} />
      <a className="skip-link" href="#inicio">
        Pular para o conteúdo
      </a>
      <div className="nav-shell">
        <nav className="nav glass" aria-label="Principal">
          <a href="#inicio" aria-label="LOBAE, início">
            <Logo height={26} tone="auto" />
          </a>
          <div className="nav-links">
            <a href="#trabalhos">Trabalhos</a>
            <a href="#como-funciona">Como funciona</a>
            <a href="#precos">Preços</a>
          </div>
          <WA msg={MSG.geral} className="btn btn--glass btn--sm nav-cta">
            Entrar em contato
          </WA>
          <details className="menu">
            <summary aria-label="Abrir menu">
              <span className="menu-icon" />
            </summary>
            <div className="menu-panel">
              <a href="#trabalhos">Trabalhos</a>
              <a href="#como-funciona">Como funciona</a>
              <a href="#precos">Preços</a>
              <WA msg={MSG.geral} className="menu-wa">
                Chamar no WhatsApp
              </WA>
            </div>
          </details>
        </nav>
      </div>

      {/* 01 HERO */}
      <header className="hero" id="inicio" tabIndex={-1} data-stack>
        <PixelGrid />
        <div className="wrap hero-inner">
          <div className="nav-slot" aria-hidden="true" />

          <div className="hero-content">
            <span className="tag">
              <span className="only-desk">Design e desenvolvimento de sites</span>
              <span className="only-mob">Criação de sites</span>
            </span>
            <h1 className="hero-title">
              Sites e landing pages <span className="soft">que vendem por você.</span>
            </h1>
            <div className="hero-bottom">
              <div className="hero-copy">
                <p className="hero-sub">
                  Sob medida para pequenos negócios: com a cara da sua marca, feitos em código e no ar em 7 dias.
                </p>
                <div className="hero-ctas">
                  <WA msg={MSG.geral} className="btn btn--primary">
                    Quero meu site →
                  </WA>
                  <WA msg={MSG.raiox} className="btn btn--glass">
                    Pedir raio-x grátis
                  </WA>
                </div>
              </div>

              <div className="browser glass" aria-hidden="true">
                <div className="browser-bar">
                  <i />
                  <i />
                  <i />
                  <span className="pixel">seunegocio.com.br</span>
                </div>
                <div className="browser-page">
                  <div className="browser-nav">
                    <strong>Seu Negócio</strong>
                    <span>Serviços · Sobre · Contato</span>
                  </div>
                  <span className="tag tag--cobalto">Seu serviço aqui</span>
                  <p className="browser-title">A sua marca, do seu jeito.</p>
                  <p className="browser-text">Tudo o que o cliente precisa saber, num link só.</p>
                  <span className="browser-btn">Chamar no WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* 02 A DOR */}
        <section className="section section--ink section--screen" data-stack aria-labelledby="dor-title">
          <div className="orb orb--cobalt" aria-hidden="true" />
          <div className="wrap">
            <span className="tag">O problema</span>
            <h2 id="dor-title" className="h-statement" data-reveal>
              Você explica o que faz toda semana no direct. <span className="accent">Um site explicaria sozinho.</span>
            </h2>
            <div className="grid-3">
              {DORES.map((d) => (
                <article key={d.n} className="card-glass" data-reveal>
                  <span className="pixel num">{d.n}</span>
                  <h3>{d.t}</h3>
                  <p>{d.b}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 03 TRABALHOS */}
        <section className="section section--light section--screen" id="trabalhos" data-stack aria-labelledby="trab-title">
          <div className="wrap">
            <span className="tag tag--cobalto">Portfólio</span>
            <div className="split-head">
              <h2 id="trab-title" className="h-display">
                Sites <span className="accent-cobalt">no ar.</span>
              </h2>
            </div>
            <div className="cases" role="list">
              {PROJETOS.map((p) => (
                <article key={p.nome} role="listitem" className={`case${p.destaque ? " case--big" : ""}`} data-reveal>
                  <div className={`case-media${p.destaque ? " case-media--dark" : ""}`}>
                    {p.destaque ? (
                      <CaseVideo src="/cases/volta" poster="/cases/volta-poster.jpg" label="Navegação pelo site da Volta, e-bike urbana" />
                    ) : (
                      <ConceptPreview variant={p.nome === "Traço Arquitetura" ? "traco" : "ambar"} />
                    )}
                  </div>
                  <div className="case-meta">
                    <div>
                      <span className="pixel case-type">{p.tipo}</span>
                      <h3>{p.nome}</h3>
                    </div>
                    {p.href ? (
                      <a className="case-link" href={p.href} target="_blank" rel="noopener">
                        {p.status}
                        <span className="sr-only"> (site da {p.nome}, abre em nova aba)</span>
                      </a>
                    ) : (
                      <span className="case-soon">{p.status}</span>
                    )}
                  </div>
                </article>
              ))}
            </div>
            <p className="pixel swipe-hint" aria-hidden="true">Arraste para o lado →</p>
          </div>
        </section>

        {/* 04 ANTES E DEPOIS */}
        <section className="section section--cobalt center section--screen section--fill" data-stack aria-labelledby="ad-title">
          <div className="orb orb--orange" aria-hidden="true" />
          <div className="wrap">
            <span className="tag">Antes e depois</span>
            <h2 id="ad-title" className="h-display h-display--md">
              Do link na bio <span className="soft">para um site de verdade.</span>
            </h2>
            <p className="lead lead--mist">Mesmo negócio, mesmas informações. Arraste e veja a diferença.</p>
            <BeforeAfter />
            <p className="pixel caption">Clínica Âmbar é um projeto-conceito</p>
          </div>
        </section>

        {/* 05 FEITO PRA VENDER */}
        <section className="section section--light section--screen" data-stack aria-labelledby="fv-title">
          <div className="wrap">
            <span className="tag tag--cobalto">Feito pra vender</span>
            <div className="split-head">
              <h2 id="fv-title" className="h-display h-display--md">
                Bonito é o mínimo. <span className="accent-cobalt">Seu site tem que vender.</span>
              </h2>

            </div>
            <div className="features">
              {RECURSOS.map(([n, t, b, curto]) => (
                <article key={n} className="feature" data-reveal>
                  <span className="pixel num">{n}</span>
                  <h3>{t}</h3>
                  <p>
                    <span className="only-desk">{b}</span>
                    <span className="only-mob">{curto}</span>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 06 PREÇOS */}
        <section className="section section--ink section--screen" id="precos" data-stack aria-labelledby="precos-title">
          <div className="orb orb--cobalt orb--low" aria-hidden="true" />
          <div className="wrap">
            <div className="split-head">
              <div className="head-stack">
                <span className="tag">Preços</span>
                <h2 id="precos-title" className="h-display h-display--md">
                  Quanto custa? <span className="accent">Tá aqui.</span>
                </h2>
              </div>
            </div>

            <div className="plans" role="list">
              {PLANOS.map((p) => (
                <article key={p.nome} role="listitem" className={`plan${p.destaque ? " plan--hl" : " glass"}`} data-reveal>
                  <div className="plan-body">
                    <div className="plan-head">
                      <h3>{p.nome}</h3>
                      <span className="tag">{p.tag}</span>
                    </div>
                    <div className="price">
                      {p.de && (
                        <div className="price-de">
                          de <s>{p.de}</s>
                          <span className="price-off pixel">
                            {p.off}
                            <span className="only-desk"> no lançamento</span>
                          </span>
                        </div>
                      )}
                      <div className="price-por">
                        {p.de && <span>por</span>}
                        <strong>{p.por}</strong>
                      </div>
                      {p.de && <p className="price-note">Preço total do site, nas 3 primeiras vagas.</p>}
                    </div>
                    <span className="pixel plan-prazo">{p.prazo}</span>
                    <ul>
                      {p.itens.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  </div>
                  <WA msg={p.msg} className={`btn ${p.destaque ? "btn--primary" : "btn--glass"} btn--block`}>
                    {p.cta}
                  </WA>
                </article>
              ))}
            </div>
            <p className="pixel swipe-hint" aria-hidden="true">Arraste para ver os outros planos →</p>

            <div className="zelador glass">
              <span className="tag">Plano Zelador · opcional</span>
              <p>
                <strong><span className="only-mob">Plano Zelador (opcional): </span>R$ 59/mês e eu cuido do seu site no ar:</strong> domínio, SSL e ajustes mensais. Sem plano, o
                site é todo seu.
              </p>
            </div>
          </div>
        </section>

        {/* 07 QUEM FAZ + COMO FUNCIONA */}
        <section className="section section--light" id="como-funciona" aria-labelledby="quem-title">
          <div className="wrap about">
            <picture className="about-photo">
              <source srcSet="/sabrina.webp" type="image/webp" />
              <img src="/sabrina.jpg" alt="Sabrina, criadora da LOBAE" width={600} height={720} loading="lazy" />
            </picture>
            <div className="about-text">
              <span className="tag tag--cobalto">Quem faz</span>
              <h2 id="quem-title" className="h-display h-display--sm">
                Uma pessoa, não uma agência.
              </h2>
              <p className="lead">
                Sou a Sabrina. Você fala direto comigo do briefing à entrega: sem atendente, sem ticket, sem enrolação.
              </p>
              <ol className="steps">
                <li>
                  <span className="pixel">01</span>Você me conta do negócio
                </li>
                <li>
                  <span className="pixel">02</span>Eu desenho e codo o site
                </li>
                <li>
                  <span className="pixel">03</span>Seu site no ar, no prazo
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* 08 FAQ */}
        <section className="section section--light section--tight" data-stack aria-labelledby="faq-title">
          <div className="wrap">
            <h2 id="faq-title" className="h-faq">
              Perguntas rápidas
            </h2>
            <div className="faq">
              {FAQ.map(([q, a]) => (
                <div key={q} className="faq-item">
                  <h3>{q}</h3>
                  <p>{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 09 CTA FINAL */}
        <section className="section section--cobalt center final section--screen" id="contato" aria-labelledby="final-title">
          <div className="orb orb--orange orb--top" aria-hidden="true" />
          <div className="wrap">
            <span className="tag">Vamos conversar</span>
            <h2 id="final-title" className="h-display">
              Vamos colocar seu <span className="soft">negócio no ar?</span>
            </h2>
            <p className="lead lead--mist">Me conta do seu negócio pelo WhatsApp e eu te mostro o caminho.</p>
            <WA msg={MSG.geral} className="btn btn--primary btn--lg">
              Entrar em contato →
            </WA>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <div className="footer-inner glass">
            <Logo height={22} />
            <ul className="footer-contacts">
              <li>
                <span className="pixel">Instagram</span>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener">
                  @lobae.creative
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
              <li>
                <span className="pixel">E-mail</span>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
            </ul>
            <span className="pixel footer-copy">© 2026 LOBAE°</span>
          </div>
        </div>
      </footer>

      <StickyWhatsApp />
      <Reveal />
    </>
  );
}
