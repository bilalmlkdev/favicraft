// Generator workspace (main controller)
import { useState, ChangeEvent, DragEvent } from "react";
import { useTextMode } from "../../hooks/useTextMode";
import { useImageMode } from "../../hooks/useImageMode";
import { TextModePanel } from "./TextModePanel";
import { ImageModePanel } from "./ImageModePanel";
import { FaviconChecker } from "./FaviconChecker";
import { ExportPanel } from "./ExportPanel";
import {
  generateZip,
  downloadSingleSize,
  getFrameworkSnippet,
} from "../../utils/export";

type Mode = "text" | "image" | "checker";

interface Props {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

export default function GeneratorWorkspace({ mode, setMode }: Props) {
  const textState = useTextMode();
  const imageState = useImageMode();

  const [selectedFramework, setSelectedFramework] = useState("HTML");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedAi, setCopiedAi] = useState(false);

  const isGenerating =
    mode === "text" ? textState.isGenerating : imageState.isGenerating;
  const successStatus =
    mode === "text" ? textState.successStatus : imageState.successStatus;

  const handleGenerateZip = async () => {
    if (mode === "text") {
      await textState.generateZip();
    } else if (mode === "image") {
      await imageState.generateZip();
    }
  };

  const handleDownloadSingle = async (size: number, filename: string) => {
    if (mode === "text") {
      await textState.downloadSingleSize(size, filename);
    } else if (mode === "image") {
      await imageState.downloadSingleSize(size, filename);
    }
  };

  const installCodeSnippet = getFrameworkSnippet(selectedFramework);
  const aiPromptSnippet = `You are working in my web project. Add the favicon package I downloaded.\nTarget stack: ${selectedFramework}\nTasks:\n1. Identify project structure before editing.\n2. Place favicon.ico, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png in public folder.\n3. Update metadata accordingly.`;

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center mb-10">
        <div className="px-1 py-1 inline-flex items-center text-xs bg-linear-to-br from-white via-white to-blue-100/80 rounded-full shadow-sm border-transparent ring ring-neutral-600/20 mb-2">
          <button
            onClick={() => setMode("text")}
            className="px-7 py-2.5 rounded-full text-[14px] transition-all duration-300"
            style={
              mode === "text"
                ? { backgroundColor: "var(--accent)", color: "#ffffff" }
                : { color: "var(--text-muted)" }
            }
          >
            Text to Favicon
          </button>
          <button
            onClick={() => setMode("image")}
            className="px-7 py-2.5 rounded-full text-[14px] transition-all duration-300"
            style={
              mode === "image"
                ? { backgroundColor: "var(--accent)", color: "#ffffff" }
                : { color: "var(--text-muted)" }
            }
          >
            Image To Favicon
          </button>
          <button
            onClick={() => setMode("checker")}
            className="px-7 py-2.5 rounded-full text-[14px] transition-all duration-300"
            style={
              mode === "checker"
                ? { backgroundColor: "var(--accent)", color: "#ffffff" }
                : { color: "var(--text-muted)" }
            }
          >
            Favicon Checker
          </button>
        </div>
        <p className="text-[14px] text-[var(--text-muted)] max-w-xl">
          {mode === "text"
            ? "Design a text favicon with custom fonts, colors, and shapes."
            : mode === "image"
              ? "Upload an image and generate a complete favicon set."
              : "Check if a website has a favicon and preview it."}
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <div className="w-full">
          {mode === "text" ? (
            <TextModePanel
              {...textState}
              downloadSingleSize={handleDownloadSingle}
              generateZip={handleGenerateZip}
            />
          ) : mode === "image" ? (
            <ImageModePanel
              {...imageState}
              downloadSingleSize={handleDownloadSingle}
              generateZip={handleGenerateZip}
            />
          ) : (
            <FaviconChecker />
          )}
        </div>

        {mode !== "checker" && (
          <div className="w-full">
            <ExportPanel
              selectedFramework={selectedFramework}
              setSelectedFramework={setSelectedFramework}
              installCodeSnippet={installCodeSnippet}
              aiPromptSnippet={aiPromptSnippet}
              copiedCode={copiedCode}
              setCopiedCode={setCopiedCode}
              copiedAi={copiedAi}
              setCopiedAi={setCopiedAi}
            />
          </div>
        )}
      </div>
    </div>
  );
}
