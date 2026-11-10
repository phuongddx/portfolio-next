import { ImageResponse } from "next/og";
import { careerTimeline } from "@/components/data/experience-data";

export const runtime = "edge";
export const alt = "Doan Duy Phuong, software engineer (iOS → AI platform)";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#1c1c1c";
const PAPER = "#e3e2da";

function months(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + m;
}

export default function OgImage() {
  const start = months(careerTimeline[0].from);
  const span = months(careerTimeline[careerTimeline.length - 1].to) + 1 - start;
  const bars = ["#1c1c1c", "#38424a", "#1c1c1c", "#38424a", "#2c3620"];

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#a6b3bc", padding: 16, gap: 16 }}>
        <div
          style={{
            flex: 1.25,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: PAPER,
            padding: "56px 48px 44px",
            fontFamily: "serif",
            color: INK,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 56, lineHeight: 1.1, letterSpacing: "-0.02em" }}>Doan Duy Phuong,</div>
            <div style={{ fontSize: 56, lineHeight: 1.1, letterSpacing: "-0.02em" }}>iOS → AI platform</div>
            <div style={{ fontSize: 26, marginTop: 28, maxWidth: 560, lineHeight: 1.4 }}>
              Six years shipping iOS apps from Ho Chi Minh City, now building an internal AI agent platform.
            </div>
          </div>
          <div style={{ display: "flex", position: "relative", height: 48, width: "100%" }}>
            {careerTimeline.map((seg, i) => (
              <div
                key={seg.id}
                style={{
                  position: "absolute",
                  top: 0,
                  height: 48,
                  left: `${((months(seg.from) - start) / span) * 100}%`,
                  width: `${((months(seg.to) + 1 - months(seg.from)) / span) * 100}%`,
                  background: bars[i % bars.length],
                }}
              />
            ))}
          </div>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            gap: 10,
            background: "#b7c8be",
            padding: "56px 48px",
            fontFamily: "serif",
            fontSize: 30,
            color: INK,
          }}
        >
          {["ePost design system", "Windscribe VPN", "tvOS learning platform", "jarvis, an MCP server", "LLM gateway"].map(
            (name) => (
              <div key={name}>{name}</div>
            ),
          )}
        </div>
      </div>
    ),
    size,
  );
}
