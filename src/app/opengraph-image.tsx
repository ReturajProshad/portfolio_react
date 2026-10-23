import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { personal } from "@/data/portfolio";

export const alt = `${personal.fullName} — Software Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const stats = [
  { value: "3", label: "Enterprise systems" },
  { value: "50K+", label: "App downloads" },
  { value: "1,100+", label: "Problems solved" },
];

export default async function OpengraphImage() {
  const photo = await readFile(path.join(process.cwd(), "src/assets/Returaj_Proshad.png"));
  const photoSrc = `data:image/png;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #080b10 0%, #0f1a2e 55%, #0b2a24 100%)",
          color: "#e8edf5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 48 }}>
          <div style={{ display: "flex", fontSize: 24, color: "#34d399", letterSpacing: 4, textTransform: "uppercase" }}>
            Portfolio · Dhaka, Bangladesh
          </div>
          <div style={{ display: "flex", fontSize: 68, fontWeight: 800, lineHeight: 1.05, marginTop: 18 }}>
            {personal.fullName}
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: "#4f8ef7", marginTop: 14 }}>
            {personal.role}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#8a9bb8", marginTop: 14 }}>
            {personal.headline}
          </div>
          <div style={{ display: "flex", gap: 20, marginTop: 40 }}>
            {stats.map((s) => (
              <div
                key={s.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "14px 22px",
                  borderRadius: 16,
                  border: "1px solid rgba(138,155,184,0.25)",
                  background: "rgba(13,17,23,0.6)",
                }}
              >
                <div style={{ display: "flex", fontSize: 34, fontWeight: 800, color: "#e8edf5" }}>{s.value}</div>
                <div style={{ display: "flex", fontSize: 18, color: "#8a9bb8" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          alt=""
          width={300}
          height={380}
          style={{
            objectFit: "cover",
            borderRadius: 28,
            border: "4px solid rgba(79,142,247,0.55)",
          }}
        />
      </div>
    ),
    size,
  );
}
