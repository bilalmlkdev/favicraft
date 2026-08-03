// useImageMode
import { useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { generateZip, downloadSingleSize } from "../utils/export";

export function useImageMode() {
  const [image, setImage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => setImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => setImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const generateZipWrapper = async () => {
    setIsGenerating(true);
    try {
      const params = { mode: "image" as const, image };
      await generateZip(params);
      setSuccessStatus(true);
      setTimeout(() => setSuccessStatus(false), 2000);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadSingleSizeWrapper = async (size: number, filename: string) => {
    const params = { mode: "image" as const, image };
    await downloadSingleSize(size, filename, params);
  };

  return {
    image,
    setImage,
    dragActive,
    setDragActive,
    handleDrop,
    handleImageUpload,
    isGenerating,
    successStatus,
    generateZip: generateZipWrapper,
    downloadSingleSize: downloadSingleSizeWrapper,
  };
}
