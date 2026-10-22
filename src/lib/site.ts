// Configurações do site. Troque aqui e o site inteiro se atualiza.

// Número do WhatsApp (DDI + DDD + número, só dígitos).
export const WHATSAPP_NUMBER = "5511973006991";

export const INSTAGRAM_URL = "https://www.instagram.com/lobae.creative/";
// E-mail de contato (precisa existir no domínio lobae.com.br)
export const EMAIL = "contato@lobae.com.br";
export const SITE_URL = "https://lobae.com.br";

// SEO: título e descrição que aparecem no Google e nas prévias de link.
export const SITE_NAME = "LOBAE°";
export const SITE_TITLE = "Criação de sites e landing pages para pequenos negócios | LOBAE°";
export const SITE_DESCRIPTION =
  "Sites e landing pages sob medida para pequenos negócios: com a cara da sua marca, feitos em código e no ar em 7 dias. Landing page a partir de R$ 390. Atendimento direto pelo WhatsApp.";

// Vagas de lançamento: atualize a cada cliente fechado.
export const VAGAS_TOTAL = 3;
export const VAGAS_RESTANTES = 3;

export function whatsappLink(mensagem: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
}

export const MSG = {
  geral: "Oi, Sabrina! Vi o site da LOBAE e quero conversar sobre um site para o meu negócio.",
  vitrine: "Oi, Sabrina! Quero a Vitrine (landing page) no preço de lançamento.",
  vitrinePlus: "Oi, Sabrina! Quero a Vitrine+ (site institucional) no preço de lançamento.",
  raiox: "Oi, Sabrina! Quero o raio-x grátis. O @ / site do meu negócio é: ",
};
