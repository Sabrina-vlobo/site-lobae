import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Imagem de prévia (WhatsApp, Instagram, LinkedIn, Google Discover...).
// Gerada no build como /og.png, com as fontes da marca.
export const dynamic = "force-static";
const size = { width: 1200, height: 630 };

const font = (pkg: string, file: string) => readFile(join(process.cwd(), "node_modules/@fontsource", pkg, "files", file));

export async function GET() {
  const [grotesk, pixel] = await Promise.all([
    font("host-grotesk", "host-grotesk-latin-800-normal.woff"),
    font("silkscreen", "silkscreen-latin-400-normal.woff"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#2433FF",
          color: "#F1F2F6",
          fontFamily: "Host Grotesk",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* Símbolo L° em pixel */}
          <div style={{ display: "flex", position: "relative", width: 80, height: 80 }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 24, height: 80, background: "#F1F2F6" }} />
            <div style={{ position: "absolute", left: 0, top: 56, width: 80, height: 24, background: "#F1F2F6" }} />
            <div style={{ position: "absolute", left: 32, top: 0, width: 48, height: 48, background: "#FF5A1F" }} />
            <div style={{ position: "absolute", left: 48, top: 16, width: 16, height: 16, background: "#2433FF" }} />
          </div>
          <span style={{ fontFamily: "Silkscreen", fontSize: 40, letterSpacing: 2 }}>LOBAE°</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 84, lineHeight: 1, letterSpacing: -3 }}>
            <span>Sites e landing pages</span>
            <span style={{ color: "#C9CEE6" }}>que vendem por você.</span>
          </div>
          <span style={{ fontFamily: "Silkscreen", fontSize: 26, color: "#FF5A1F", letterSpacing: 1 }}>
            NO AR EM 7 DIAS · LOBAE.COM.BR
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Host Grotesk", data: grotesk, weight: 800, style: "normal" },
        { name: "Silkscreen", data: pixel, weight: 400, style: "normal" },
      ],
    },
  );
}
