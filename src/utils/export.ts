// Export utilities
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { generateTextCanvasBlob, generateImageCanvasBlob } from "./canvas";
import { getFrameworkSnippet } from "./frameworkSnippets";

type ExportParams = {
  mode: "text" | "image";
  textVal?: string;
  fontFamily?: string;
  fontColor?: string;
  textBgColor?: string;
  bgShape?: string;
  fontWeight?: string;
  fontSize?: number;
  image?: string | null;
  // extra advanced params can be added here if needed
};

export async function downloadSingleSize(
  size: number,
  filename: string,
  params: ExportParams,
) {
  const blob =
    params.mode === "text"
      ? await generateTextCanvasBlob(
          size,
          params.textVal!,
          params.fontFamily!,
          params.fontColor!,
          params.textBgColor!,
          params.bgShape!,
          params.fontWeight!,
          params.fontSize!,
        )
      : await generateImageCanvasBlob(size, params.image || null);
  if (blob) saveAs(blob, filename);
}

export async function generateZip(params: ExportParams): Promise<void> {
  const zip = new JSZip();
  const sizes = [16, 32, 48, 180, 192, 512];

  for (const size of sizes) {
    const blob =
      params.mode === "text"
        ? await generateTextCanvasBlob(
            size,
            params.textVal!,
            params.fontFamily!,
            params.fontColor!,
            params.textBgColor!,
            params.bgShape!,
            params.fontWeight!,
            params.fontSize!,
          )
        : await generateImageCanvasBlob(size, params.image || null);

    if (blob) {
      const name =
        size === 180
          ? "apple-touch-icon.png"
          : size === 192
            ? "android-chrome-192x192.png"
            : size === 512
              ? "android-chrome-512x512.png"
              : `favicon-${size}x${size}.png`;
      zip.file(name, blob);
    }
  }

  const manifest = {
    name: "Favicon Generator App",
    short_name: "App",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: params.mode === "text" ? params.textBgColor : "#ffffff",
    background_color: params.mode === "text" ? params.textBgColor : "#ffffff",
    display: "standalone",
  };
  zip.file("site.webmanifest", JSON.stringify(manifest, null, 2));

  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, "favicon-package.zip");
}

export { getFrameworkSnippet };
