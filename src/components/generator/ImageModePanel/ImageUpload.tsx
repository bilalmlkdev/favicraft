// ImageUpload – drop zone and file input
import { ChangeEvent, DragEvent } from "react";
import { Upload, ImagePlusIcon, RefreshCw, Trash2 } from "lucide-react";

interface Props {
  image: string | null;
  setImage: (img: string | null) => void;
  dragActive: boolean;
  setDragActive: (active: boolean) => void;
  handleDrop: (e: DragEvent<HTMLDivElement>) => void;
  handleImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function ImageUpload({
  image,
  setImage,
  dragActive,
  setDragActive,
  handleDrop,
  handleImageUpload,
}: Props) {
  if (!image) {
    return (
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-[5px] p-15 text-center transition-all duration-100"
        style={{
          borderColor: dragActive ? "var(--accent)" : "var(--border-strong)",
          backgroundColor: dragActive
            ? "var(--accent-soft)"
            : "var(--panel-subtle)",
        }}
      >
        <input
          type="file"
          id="image-file"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <label
          htmlFor="image-file"
          className="cursor-pointer flex flex-col items-center justify-center space-y-2.5"
        >
          <div className="overflow-hidden flex-shrink-0 flex items-center justify-between">
            <Upload className="w-5 h-5" />
          </div>
          <span className="px-4.5 py-2.5 rounded-full flex items-center gap-1 text-[12px] font-semibold bg-[var(--invert)] text-[var(--invert-text)]">
            <ImagePlusIcon size={16} /> <span>Choose image</span>
          </span>
          <div>
            <p className="text-[13px] font-semibold text-[var(--text)]">
              Drop an image here, or choose a file
            </p>
            <p className="text-[11px] mt-1 font-medium text-[var(--text-faint)]">
              PNG, JPG, WebP, or SVG · up to 5 MB
            </p>
          </div>
        </label>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 py-4 px-1">
      <div className="w-24 h-24 rounded-[8px] overflow-hidden flex-shrink-0 shadow-sm bg-[var(--panel)] border border-[var(--border-strong)]">
        <img
          src={image}
          alt="Uploaded favicon preview"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="cursor-pointer px-3 py-1.5 rounded-full text-[12px] font-semibold flex items-center gap-1.5 transition-all hover:bg-opacity-80 active:scale-95 bg-[var(--panel)] border border-[var(--border-strong)] text-[var(--text)]">
          <RefreshCw className="w-3.5 h-3.5" /> Use a different image
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
        <button
          onClick={() => setImage(null)}
          className="px-3 py-1.5 rounded-full text-[12px] font-semibold flex items-center gap-1.5 transition-all hover:bg-opacity-80 active:scale-95 text-red-500 hover:bg-red-50"
        >
          <Trash2 className="w-3.5 h-3.5" /> Remove
        </button>
      </div>
    </div>
  );
}
