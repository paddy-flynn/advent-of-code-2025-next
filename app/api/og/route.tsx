import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const font = fetch(new URL("../../../public/VT323.ttf", import.meta.url)).then(
  (res) => res.arrayBuffer()
);

const santaImage = fetch(new URL("../../../public/santa.png", import.meta.url)).then(
  (res) => res.arrayBuffer()
);

// Static snow decorations (fewer elements for OG image compatibility)
const snowflakes = [
  { x: 10, y: 15, size: 8, color: "#ffffff" },
  { x: 85, y: 25, size: 6, color: "#e8f4f8" },
  { x: 20, y: 70, size: 7, color: "#b8e6f0" },
  { x: 75, y: 65, size: 5, color: "#ffffff" },
  { x: 45, y: 10, size: 6, color: "#e8f4f8" },
  { x: 60, y: 85, size: 7, color: "#b8e6f0" },
  { x: 30, y: 40, size: 5, color: "#ffffff" },
  { x: 90, y: 50, size: 6, color: "#e8f4f8" },
];

export async function GET(req: NextRequest) {
  try {
    const fontData = await font;
    const santaImageData = await santaImage;
    const { searchParams } = new URL(req.url);

    const title = searchParams.get("title")?.slice(0, 200);
    
    // Convert santa image to base64
    const santaBase64 = Buffer.from(santaImageData).toString("base64");
    const santaDataUrl = `data:image/png;base64,${santaBase64}`;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#1a1a2e",
            fontFamily: "VT323",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Snow decorations */}
          {snowflakes.map((flake, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${flake.x}%`,
                top: `${flake.y}%`,
                width: flake.size,
                height: flake.size,
                backgroundColor: flake.color,
                opacity: 0.8,
                imageRendering: "pixelated",
              }}
            />
          ))}
          
          {/* Main content container with glass effect */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(20, 20, 40, 0.85)",
              border: "4px solid rgba(255, 100, 100, 0.3)",
              padding: "60px 80px",
              position: "relative",
              zIndex: 1 as number,
              boxShadow: "4px 4px 0 0 rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* Title */}
            <div
              style={{
                display: "flex",
                color: "#ffd700",
                fontSize: 72,
                fontWeight: 800,
                textShadow: "2px 2px 0 rgba(0, 0, 0, 0.8)",
                marginBottom: 20,
              }}
            >
              Advent of Code 2025
            </div>
            
            {/* Subtitle if provided */}
            {title && (
              <div
                style={{
                  display: "flex",
                  color: "#ffeb3b",
                  fontSize: 48,
                  textShadow: "2px 2px 0 rgba(0, 0, 0, 0.8)",
                  marginBottom: 20,
                }}
              >
                {title}
              </div>
            )}
            
            {/* Santa image */}
            <div style={{ display: "flex", marginTop: 20, marginBottom: 20 }}>
              <img
                src={santaDataUrl}
                width={256}
                height={140}
                style={{
                  imageRendering: "pixelated",
                }}
                alt="Santa"
              />
            </div>
            
            {/* Author */}
            <div
              style={{
                display: "flex",
                color: "#ffffff",
                fontSize: 36,
                textShadow: "2px 2px 0 rgba(0, 0, 0, 0.8)",
              }}
            >
              Solution{title ? "" : "s"} by Patrick Flynn
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "VT323",
            data: fontData,
            style: "normal",
          },
        ],
      }
    ) as Response;
  } catch (e: unknown) {
    console.log(`${e instanceof Error ? e.message : String(e)}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
