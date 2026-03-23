import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Doan Duy Phuong — iOS Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#f8f9fa",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Green accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "8px",
            height: "100%",
            background: "#22c55e",
          }}
        />

        {/* Available badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#a3e635",
            borderRadius: "999px",
            padding: "8px 20px",
            width: "fit-content",
            marginBottom: "32px",
            fontSize: "20px",
            fontWeight: 600,
            color: "#1f2937",
          }}
        >
          Available for Work · Remote-Friendly
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 800,
            color: "#1f2937",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}
        >
          Doan Duy Phuong
        </div>

        {/* Role */}
        <div
          style={{
            fontSize: "36px",
            fontWeight: 600,
            color: "#22c55e",
            marginBottom: "40px",
          }}
        >
          iOS Software Engineer
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: "40px" }}>
          {[
            { value: "5+", label: "Years Experience" },
            { value: "4+", label: "Apps Shipped" },
            { value: "40%", label: "Faster Dev Time" },
          ].map((stat) => (
            <div key={stat.label} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "40px", fontWeight: 800, color: "#1f2937" }}>
                {stat.value}
              </span>
              <span style={{ fontSize: "18px", color: "#6b7280" }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
