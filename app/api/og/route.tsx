import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const font = fetch(new URL("../../../public/VT323.ttf", import.meta.url)).then(
  (res) => res.arrayBuffer()
);

export async function GET(req: NextRequest) {
  try {
    const fontData = await font;
    const { searchParams } = new URL(req.url);

    const title = searchParams.get("title")?.slice(0, 200);

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
            backgroundColor: "#27272a",
            color: "#4ade80",
            fontFamily: "VT323",
            fontSize: 64,
            fontWeight: 800,
          }}
        >
          <div>Advent of Code 2025</div>
          {title && <div>{title}</div>}
          <div style={{ marginTop: 40, display: "flex" }}>
            Solution{title ? "" : "s"} by Patrick Flynn
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
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
