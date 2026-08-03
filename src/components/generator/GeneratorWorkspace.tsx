// Generator workspace (main controller)
import { useState, useRef, useEffect } from "react";
import { useTextMode } from "../../hooks/useTextMode";
import { useImageMode } from "../../hooks/useImageMode";
import { TextModePanel } from "./TextModePanel";
import { ImageModePanel } from "./ImageModePanel";
import { FaviconChecker } from "./FaviconChecker";
import { ExportPanel } from "./ExportPanel";
import { Loader } from "../ui/Loader";
import { getFrameworkSnippet } from "../../utils/frameworkSnippets";

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

  // Tab switching state
  const [isSwitching, setIsSwitching] = useState(false);
  const [pendingMode, setPendingMode] = useState<Mode | null>(null);
  const switchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTabClick = (newMode: Mode) => {
    if (newMode === mode || isSwitching) return;
    // Cancel any pending switch
    if (switchTimeoutRef.current) {
      clearTimeout(switchTimeoutRef.current);
    }
    setIsSwitching(true);
    setPendingMode(newMode);
    switchTimeoutRef.current = setTimeout(() => {
      setMode(newMode);
      setIsSwitching(false);
      setPendingMode(null);
      switchTimeoutRef.current = null;
    }, 500);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (switchTimeoutRef.current) {
        clearTimeout(switchTimeoutRef.current);
      }
    };
  }, []);

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
      {/* Mode toggle – pills dimmed and disabled during switch */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="px-1 py-1 inline-flex items-center text-xs bg-linear-to-br from-white via-white to-blue-100/80 rounded-full shadow-sm border-transparent ring ring-neutral-600/20 mb-2">
          <button
            onClick={() => handleTabClick("text")}
            disabled={isSwitching}
            className={`px-7 py-2.5 rounded-full text-[14px] transition-all duration-300 ${
              mode === "text" && !isSwitching
                ? "bg-[var(--accent)] text-white"
                : "text-[var(--text-muted)]"
            } ${isSwitching && pendingMode === "text" ? "opacity-50" : ""} ${
              isSwitching && mode === "text" ? "opacity-30" : ""
            }`}
            style={
              mode === "text" && !isSwitching
                ? { backgroundColor: "var(--accent)", color: "#ffffff" }
                : { color: "var(--text-muted)" }
            }
          >
            Text to Favicon
          </button>
          <button
            onClick={() => handleTabClick("image")}
            disabled={isSwitching}
            className={`px-7 py-2.5 rounded-full text-[14px] transition-all duration-300 ${
              mode === "image" && !isSwitching
                ? "bg-[var(--accent)] text-white"
                : "text-[var(--text-muted)]"
            } ${isSwitching && pendingMode === "image" ? "opacity-50" : ""} ${
              isSwitching && mode === "image" ? "opacity-30" : ""
            }`}
            style={
              mode === "image" && !isSwitching
                ? { backgroundColor: "var(--accent)", color: "#ffffff" }
                : { color: "var(--text-muted)" }
            }
          >
            Image To Favicon
          </button>
          <button
            onClick={() => handleTabClick("checker")}
            disabled={isSwitching}
            className={`px-7 py-2.5 rounded-full text-[14px] transition-all duration-300 ${
              mode === "checker" && !isSwitching
                ? "bg-[var(--accent)] text-white"
                : "text-[var(--text-muted)]"
            } ${isSwitching && pendingMode === "checker" ? "opacity-50" : ""} ${
              isSwitching && mode === "checker" ? "opacity-30" : ""
            }`}
            style={
              mode === "checker" && !isSwitching
                ? { backgroundColor: "var(--accent)", color: "#ffffff" }
                : { color: "var(--text-muted)" }
            }
          >
            Favicon Checker
          </button>
        </div>
        <p className="text-[14px] text-[var(--text-muted)] max-w-xl">
          {isSwitching
            ? "Switching…"
            : mode === "text"
              ? "Design a text favicon with custom fonts, colors, and shapes."
              : mode === "image"
                ? "Upload an image and generate a complete favicon set."
                : "Check if a website has a favicon and preview it."}
        </p>
      </div>

      {/* Main content area with loader overlay */}
      <div className="relative flex flex-col gap-8">
        {isSwitching && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg)]/60 z-20 rounded-2xl">
            <Loader size={48} color="var(--accent)" />
          </div>
        )}

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
