// useTextMode.ts
import { useState } from "react";
import { generateZip, downloadSingleSize } from "../utils/export";

export function useTextMode() {
  const [textVal, setTextVal] = useState("F");
  const [fontFamily, setFontFamily] = useState("Caveat");
  const [fontColor, setFontColor] = useState("#FFFFFF");
  const [textBgColor, setTextBgColor] = useState("#4F46E5");
  const [bgShape, setBgShape] = useState("Rounded");
  const [fontWeight, setFontWeight] = useState("800");
  const [fontSize, setFontSize] = useState(110);
  const [isGenerating, setIsGenerating] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);

  // Advanced state
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [textRotation, setTextRotation] = useState(0);
  const [shadowColor, setShadowColor] = useState("#000000");
  const [shadowEnabled, setShadowEnabled] = useState(false);
  const [shadowBlur, setShadowBlur] = useState(4);
  const [shadowOffsetX, setShadowOffsetX] = useState(2);
  const [shadowOffsetY, setShadowOffsetY] = useState(2);
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(0);
  const [strokeEnabled, setStrokeEnabled] = useState(false);
  const [borderWidth, setBorderWidth] = useState(0);
  const [borderColor, setBorderColor] = useState("#000000");
  const [borderStyle, setBorderStyle] = useState("solid");
  const [gradientEnabled, setGradientEnabled] = useState(false);
  const [gradientColor1, setGradientColor1] = useState("#4F46E5");
  const [gradientColor2, setGradientColor2] = useState("#7C3AED");
  const [gradientAngle, setGradientAngle] = useState(135);
  const [customRadius, setCustomRadius] = useState<number | null>(null);
  const [padding, setPadding] = useState(0);
  const [fontStyle, setFontStyle] = useState<"normal" | "italic" | "oblique">(
    "normal",
  );

  const generateZipWrapper = async () => {
    setIsGenerating(true);
    try {
      const params = {
        mode: "text" as const,
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
      };
      await generateZip(params);
      setSuccessStatus(true);
      setTimeout(() => setSuccessStatus(false), 2000);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadSingleSizeWrapper = async (size: number, filename: string) => {
    const params = {
      mode: "text" as const,
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
    };
    await downloadSingleSize(size, filename, params);
  };

  return {
    textVal,
    setTextVal,
    fontFamily,
    setFontFamily,
    fontColor,
    setFontColor,
    textBgColor,
    setTextBgColor,
    bgShape,
    setBgShape,
    fontWeight,
    setFontWeight,
    fontSize,
    setFontSize,
    letterSpacing,
    setLetterSpacing,
    textRotation,
    setTextRotation,
    shadowColor,
    setShadowColor,
    shadowEnabled,
    setShadowEnabled,
    shadowBlur,
    setShadowBlur,
    shadowOffsetX,
    setShadowOffsetX,
    shadowOffsetY,
    setShadowOffsetY,
    strokeColor,
    setStrokeColor,
    strokeWidth,
    setStrokeWidth,
    strokeEnabled,
    setStrokeEnabled,
    borderWidth,
    setBorderWidth,
    borderColor,
    setBorderColor,
    borderStyle,
    setBorderStyle,
    gradientEnabled,
    setGradientEnabled,
    gradientColor1,
    setGradientColor1,
    gradientColor2,
    setGradientColor2,
    gradientAngle,
    setGradientAngle,
    customRadius,
    setCustomRadius,
    padding,
    setPadding,
    fontStyle,
    setFontStyle,
    isGenerating,
    successStatus,
    generateZip: generateZipWrapper,
    downloadSingleSize: downloadSingleSizeWrapper,
  };
}
