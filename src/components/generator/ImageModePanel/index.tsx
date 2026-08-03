// ImageModePanel – main container
import { Download, CheckCircle2 } from "lucide-react";
import { Panel } from "../../ui/Panel";
import { IconPreview } from "../../ui/IconPreview";
import { FaviconPreview } from "../FaviconPreview";
import { ImageUpload } from "./ImageUpload";
import { GeneratedList } from "../TextModePanel/GeneratedList";
import { useImageMode } from "../../../hooks/useImageMode";

interface Props extends ReturnType<typeof useImageMode> {
  downloadSingleSize: (size: number, filename: string) => Promise<void>;
  generateZip: () => Promise<void>;
}

export function ImageModePanel(props: Props) {
  const {
    image,
    setImage,
    dragActive,
    setDragActive,
    handleDrop,
    handleImageUpload,
    isGenerating,
    successStatus,
    downloadSingleSize,
    generateZip,
  } = props;

  const renderIcon = (size: number) => (
    <IconPreview image={image} size={size} />
  );

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      <Panel className="p-4 space-y-3">
        <div>
          <h3 className="text-[13px] font-bold tracking-tight text-[var(--text)]">
            1. Upload Your Image
          </h3>
          <p className="text-[12px] mt-0.5 font-medium text-[var(--text-muted)]">
            Choose a high-resolution image with a transparent background for
            best results
          </p>
        </div>
        <ImageUpload
          image={image}
          setImage={setImage}
          dragActive={dragActive}
          setDragActive={setDragActive}
          handleDrop={handleDrop}
          handleImageUpload={handleImageUpload}
        />
      </Panel>

      <Panel className="p-4 space-y-4">
        <div>
          <h3 className="text-[13px] font-bold tracking-tight text-[var(--text)]">
            2. Preview
          </h3>
          <p className="text-[12px] mt-0.5 font-medium text-[var(--text-muted)]">
            See how your favicon looks in real context
          </p>
        </div>
        <FaviconPreview renderIcon={renderIcon} />
      </Panel>

      <Panel className="p-4 space-y-4">
        <div>
          <h3 className="text-[13px] font-bold tracking-tight text-[var(--text)]">
            3. Generated Favicons
          </h3>
          <p className="text-[12px] mt-0.5 font-medium text-[var(--text-muted)]">
            Click to download individual sizes, or download all at once
          </p>
        </div>
        <GeneratedList
          renderIcon={renderIcon}
          downloadSingleSize={downloadSingleSize}
        />
        <button
          onClick={generateZip}
          disabled={isGenerating}
          className="w-full py-3 rounded-full font-semibold text-[13px] flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98] shadow-sm bg-black text-white"
        >
          {isGenerating ? (
            <div className="w-3.5 h-3.5 border-2 border-t-transparent rounded-full animate-spin border-white" />
          ) : successStatus ? (
            <CheckCircle2 className="w-4 h-4 text-green-400" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          {isGenerating
            ? "Building package…"
            : successStatus
              ? "Package downloaded!"
              : "Download All Favicons"}
        </button>
      </Panel>
    </div>
  );
}
