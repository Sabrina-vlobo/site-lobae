# LOBAE° — site-portfólio

Site da LOBAE (lobae.com.br): Next.js exportado como site estático, publicado no Cloudflare Pages.

## Rodar localmente

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # gera a pasta /out (o site pronto)
```

## Publicar no Cloudflare Pages

1. Cloudflare → Workers & Pages → Create → Pages → **Connect to Git** → escolha `lobae-site`.
2. Configurações de build:
   - Framework preset: **Next.js (Static HTML Export)**
   - Build command: `npm run build`
   - Build output directory: `out`
   - Variável de ambiente: `NODE_VERSION` = `22`
3. Depois do primeiro deploy: **Custom domains** → `lobae.com.br` (e `www.lobae.com.br`).

Cada push na branch `main` publica o site automaticamente.

## O que editar com frequência

Tudo fica em `src/lib/site.ts`:

- `WHATSAPP_NUMBER` — número do WhatsApp (só dígitos, com 55 e DDD)
- `VAGAS_RESTANTES` — contador "Restam X de 3 vagas"
- `MSG` — mensagens prontas de cada botão

## SEO e robôs

- Título e descrição do Google: `SITE_TITLE` e `SITE_DESCRIPTION` em `src/lib/site.ts`
- Dados estruturados (schema.org: empresa, preços, FAQ): `JSON_LD` em `src/app/page.tsx`, gerado a partir de `PLANOS` e `FAQ`
- `robots.txt` (`src/app/robots.ts`): libera Google e robôs de IA (ChatGPT, Claude, Perplexity, Gemini)
- `sitemap.xml` (`src/app/sitemap.ts`): adicione aqui cada página nova
- `llms.txt` (`public/llms.txt`): resumo da LOBAE para IAs. Atualize quando mudar preço ou serviço
- Imagem de prévia dos links: `src/app/og.png/route.tsx` (gerada no build)
- `public/_headers`: cabeçalhos de segurança e cache do Cloudflare Pages

Depois do deploy: cadastre o domínio no [Google Search Console](https://search.google.com/search-console) (verificação por DNS, direto no Cloudflare) e envie `https://lobae.com.br/sitemap.xml`.

## Pendências de conteúdo

- Vídeo/print do Volta e link do site no ar (`src/app/page.tsx`, seção Trabalhos)
- Prints dos projetos-conceito Casa Fogo e Clínica Âmbar
- Foto da Sabrina na seção "Quem faz"

## Estrutura

- `src/app/page.tsx` — todas as seções da página
- `src/app/globals.css` — tokens da marca (iguais às variáveis do Figma) e estilos
- `src/components/PixelGrid.tsx` — fundo do hero (cursor no desktop, abertura L° no celular)
- `src/components/BeforeAfter.tsx` — slider antes/depois
- `src/components/StickyWhatsApp.tsx` — botão fixo de WhatsApp
