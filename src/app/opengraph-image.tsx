import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "LanguagesUp — Started learning a language more than once but still can't speak it?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          background: "#faf8f4",
          color: "#0f1d3a",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 40, fontWeight: 800 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "#0f1d3a", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 30, height: 22, borderRadius: 7, background: "#0e7c7b" }} />
          </div>
          <span>
            Languages<span style={{ color: "#0e7c7b" }}>Up</span>
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 66, fontWeight: 800, lineHeight: 1.1, letterSpacing: -1 }}>
            Started learning a language more than once… but still can&apos;t speak it?
          </div>
          <div style={{ fontSize: 30, color: "#5a6478" }}>Free 60-second quiz • No signup required</div>
        </div>
      </div>
    ),
    size,
  );
}
