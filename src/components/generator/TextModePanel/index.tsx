// TextModePanel – main container
import { Download, CheckCircle2 } from "lucide-react";
import { Panel } from "../../ui/Panel";
import { FaviconPreview } from "../FaviconPreview";
import { TextControls } from "./TextControls";
import { GeneratedList } from "./GeneratedList";
import { useTextMode } from "../../../hooks/useTextMode";

interface Props extends ReturnType<typeof useTextMode> {
  downloadSingleSize: (size: number, filename: string) => Promise<void>;
  generateZip: () => Promise<void>;
}

export function TextModePanel(props: Props) {
  const {
    textVal,
    fontFamily,
    fontColor,
    textBgColor,
    bgShape,
    fontWeight,
    fontSize,
    letterSpacing,
    textRotation,
    shadowColor,
    shadowEnabled,
    shadowBlur,
    shadowOffsetX,
    shadowOffsetY,
    strokeColor,
    strokeWidth,
    strokeEnabled,
    borderWidth,
    borderColor,
    borderStyle,
    gradientEnabled,
    gradientColor1,
    gradientColor2,
    gradientAngle,
    customRadius,
    padding,
    fontStyle,
    isGenerating,
    successStatus,
    downloadSingleSize,
    generateZip,
  } = props;

  const renderTextIcon = (size: number = 56) => {
    let borderRadius: string;
    if (customRadius !== null) {
      borderRadius = `${customRadius}%`;
    } else {
      borderRadius =
        bgShape === "Rounded" ? "22%" : bgShape === "Circle" ? "50%" : "4px";
    }

    const bgStyle = gradientEnabled
      ? `linear-gradient(${gradientAngle}deg, ${gradientColor1}, ${gradientColor2})`
      : textBgColor;

    const textShadow = shadowEnabled
      ? `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${shadowColor}`
      : "none";

    const textStroke =
      strokeEnabled && strokeWidth > 0
        ? `${strokeWidth}px ${strokeColor}`
        : "none";

    const borderStyleStr =
      borderWidth > 0
        ? `${borderWidth}px ${borderStyle} ${borderColor}`
        : "none";

    return (
      <div
        className="shadow-sm transition-all flex items-center justify-center flex-shrink-0"
        style={{
          width: size,
          height: size,
          background: bgStyle,
          borderRadius,
          padding: `${padding}px`,
          border: borderStyleStr,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            color: fontColor,
            fontFamily: `'${fontFamily}', sans-serif`,
            fontWeight: fontWeight,
            fontSize: `${(fontSize / 150) * size}px`,
            letterSpacing: `${letterSpacing}px`,
            transform: `rotate(${textRotation}deg)`,
            textShadow: textShadow,
            WebkitTextStroke: textStroke,
            fontStyle: fontStyle,
            lineHeight: 1,
          }}
        >
          {textVal || "F"}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      {/* Live Preview */}
      <Panel className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {[64, 48, 32, 16].map((sz) => (
              <div key={sz} className="flex flex-col items-center gap-0.5">
                {renderTextIcon(sz)}
                <span className="text-[8px] font-mono text-[var(--text-faint)]">
                  {sz}×{sz}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={generateZip}
            disabled={isGenerating}
            className="px-2.5 py-1.5 rounded-[6px] text-[11px] font-semibold flex items-center gap-1 bg-black text-white shadow-sm hover:opacity-90 transition-opacity"
          >
            {isGenerating ? (
              <div className="w-3 h-3 border-2 border-t-transparent rounded-full animate-spin border-white" />
            ) : successStatus ? (
              <CheckCircle2 className="w-3 h-3 text-green-500" />
            ) : (
              <Download className="w-3 h-3" />
            )}
            {isGenerating ? "Build" : successStatus ? "Done" : "Package"}
          </button>
        </div>
      </Panel>

      {/* 1. Design */}
      <Panel className="p-3 space-y-2">
        <div>
          <h3 className="text-[12px] font-bold tracking-tight text-[var(--text)]">
            1. Design Your Favicon
          </h3>
          <p className="text-[11px] mt-0.5 font-medium text-[var(--text-muted)]">
            Customize text, font, colors, and shape
          </p>
        </div>
        <TextControls {...props} />
      </Panel>

      {/* 2. Preview */}
      <Panel className="p-3 space-y-3">
        <div>
          <h3 className="text-[12px] font-bold tracking-tight text-[var(--text)]">
            2. Preview
          </h3>
          <p className="text-[11px] mt-0.5 font-medium text-[var(--text-muted)]">
            See how your favicon looks in real context
          </p>
        </div>
        <FaviconPreview renderIcon={renderTextIcon} />
      </Panel>

      {/* 3. Generated */}
      <Panel className="p-3 space-y-3">
        <div>
          <h3 className="text-[12px] font-bold tracking-tight text-[var(--text)]">
            3. Generated Favicons
          </h3>
          <p className="text-[11px] mt-0.5 font-medium text-[var(--text-muted)]">
            Click to download individual sizes, or download all at once
          </p>
        </div>
        <GeneratedList
          renderIcon={renderTextIcon}
          downloadSingleSize={downloadSingleSize}
        />
        <button
          onClick={generateZip}
          disabled={isGenerating}
          className="w-full py-2 rounded-full font-semibold text-[12px] flex items-center justify-center gap-1.5 transition-all hover:opacity-90 active:scale-[0.98] shadow-sm bg-black text-white"
        >
          {isGenerating ? (
            <div className="w-3 h-3 border-2 border-t-transparent rounded-full animate-spin border-white" />
          ) : successStatus ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
          ) : (
            <Download className="w-3.5 h-3.5" />
          )}
          {isGenerating
            ? "Building…"
            : successStatus
              ? "Downloaded"
              : "Download All"}
        </button>
      </Panel>
    </div>
  );
}
