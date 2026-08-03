// TextControls – compact 4‑column grid
import { Label } from '../../ui/Label';
import { CustomSelect } from '../../ui/CustomSelect';
import { useTextMode } from '../../../hooks/useTextMode';

type Props = ReturnType<typeof useTextMode>;

export function TextControls(props: Props) {
  const {
    textVal, setTextVal,
    fontFamily, setFontFamily,
    fontColor, setFontColor,
    textBgColor, setTextBgColor,
    bgShape, setBgShape,
    fontWeight, setFontWeight,
    fontSize, setFontSize,
    letterSpacing, setLetterSpacing,
    textRotation, setTextRotation,
    shadowColor, setShadowColor,
    shadowEnabled, setShadowEnabled,
    shadowBlur, setShadowBlur,
    shadowOffsetX, setShadowOffsetX,
    shadowOffsetY, setShadowOffsetY,
    strokeColor, setStrokeColor,
    strokeWidth, setStrokeWidth,
    strokeEnabled, setStrokeEnabled,
    borderWidth, setBorderWidth,
    borderColor, setBorderColor,
    borderStyle, setBorderStyle,
    gradientEnabled, setGradientEnabled,
    gradientColor1, setGradientColor1,
    gradientColor2, setGradientColor2,
    gradientAngle, setGradientAngle,
    customRadius, setCustomRadius,
    padding, setPadding,
    fontStyle, setFontStyle,
  } = props;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
      {/* Text */}
      <div className="space-y-0.5">
        <Label>Text</Label>
        <input
          type="text"
          maxLength={4}
          value={textVal}
          onChange={(e) => setTextVal(e.target.value)}
          className="w-full rounded-lg px-2 py-1 text-[12px] font-medium outline-none transition-all duration-200 bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text)] focus:border-[var(--accent)] focus:shadow-[0_0_0_4px_var(--accent-soft)]"
        />
      </div>

      {/* Font family */}
      <div className="space-y-0.5">
        <Label>Font family</Label>
        <CustomSelect
          value={fontFamily}
          onChange={setFontFamily}
          options={[
            { value: 'Caveat', label: 'Caveat' },
            { value: 'Inter', label: 'Inter' },
            { value: 'Roboto', label: 'Roboto' },
            { value: 'Courier New', label: 'Courier New' },
          ]}
        />
      </div>

      {/* Font color */}
      <div className="space-y-0.5">
        <Label>Font color</Label>
        <div className="flex items-center gap-2 rounded-lg px-2 py-1 bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text)]">
          <input
            type="color"
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
            className="w-4 h-4 bg-transparent cursor-pointer rounded border-0"
          />
          <span className="text-[11px] font-mono uppercase font-medium text-[var(--text-muted)]">{fontColor}</span>
        </div>
        <div className="flex items-center gap-1 pt-0.5 flex-wrap">
          {['#FFFFFF', '#000000', '#F3F4F6', '#F59E0B', '#EF4444', '#3B82F6', '#10B981'].map((col) => (
            <button key={col} onClick={() => setFontColor(col)} className="w-3 h-3 rounded-full transition-transform hover:scale-110 active:scale-95 shadow-sm" style={{ backgroundColor: col, border: '1px solid var(--border)' }} />
          ))}
        </div>
      </div>

      {/* Background color */}
      <div className="space-y-0.5">
        <Label>Bg color</Label>
        <div className="flex items-center gap-2 rounded-lg px-2 py-1 bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text)]">
          <input
            type="color"
            value={textBgColor}
            onChange={(e) => setTextBgColor(e.target.value)}
            className="w-4 h-4 bg-transparent cursor-pointer rounded border-0"
          />
          <span className="text-[11px] font-mono uppercase font-medium text-[var(--text-muted)]">{textBgColor}</span>
        </div>
        <div className="flex items-center gap-1 pt-0.5 flex-wrap">
          {['#4F46E5', '#1E293B', '#DC2626', '#2563EB', '#059669', '#7C3AED', '#DB2777'].map((col) => (
            <button key={col} onClick={() => setTextBgColor(col)} className="w-3 h-3 rounded-full transition-transform hover:scale-110 active:scale-95 shadow-sm" style={{ backgroundColor: col, border: '1px solid var(--border)' }} />
          ))}
        </div>
      </div>

      {/* Background shape */}
      <div className="space-y-0.5">
        <Label>Bg shape</Label>
        <CustomSelect
          value={bgShape}
          onChange={setBgShape}
          options={[
            { value: 'Rounded', label: 'Rounded' },
            { value: 'Circle', label: 'Circle' },
            { value: 'Square', label: 'Square' },
          ]}
        />
      </div>

      {/* Font weight */}
      <div className="space-y-0.5">
        <Label>Font weight</Label>
        <CustomSelect
          value={fontWeight}
          onChange={setFontWeight}
          options={[
            { value: '400', label: '400' },
            { value: '600', label: '600' },
            { value: '800', label: '800' },
          ]}
        />
      </div>

      {/* Font size */}
      <div className="space-y-0.5">
        <Label>Font size</Label>
        <div className="flex items-center gap-1.5">
          <input type="range" min={50} max={150} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="flex-1 h-1 rounded-full cursor-pointer accent-indigo-600 outline-none bg-[var(--border)]" />
          <span className="text-[11px] font-mono w-8 text-[var(--text)]">{fontSize}</span>
        </div>
      </div>

      {/* Letter spacing */}
      <div className="space-y-0.5">
        <Label>Letter spacing</Label>
        <div className="flex items-center gap-1.5">
          <input type="range" min={0} max={20} value={letterSpacing} onChange={(e) => setLetterSpacing(Number(e.target.value))} className="flex-1 h-1 rounded-full cursor-pointer accent-indigo-600 outline-none bg-[var(--border)]" />
          <span className="text-[11px] font-mono w-6 text-[var(--text)]">{letterSpacing}px</span>
        </div>
      </div>

      {/* Text rotation */}
      <div className="space-y-0.5">
        <Label>Rotation</Label>
        <div className="flex items-center gap-1.5">
          <input type="range" min={-45} max={45} value={textRotation} onChange={(e) => setTextRotation(Number(e.target.value))} className="flex-1 h-1 rounded-full cursor-pointer accent-indigo-600 outline-none bg-[var(--border)]" />
          <span className="text-[11px] font-mono w-8 text-[var(--text)]">{textRotation}°</span>
        </div>
      </div>

      {/* Font style */}
      <div className="space-y-0.5">
        <Label>Font style</Label>
        <CustomSelect
          value={fontStyle}
          onChange={(v) => setFontStyle(v as 'normal' | 'italic' | 'oblique')}
          options={[
            { value: 'normal', label: 'Normal' },
            { value: 'italic', label: 'Italic' },
            { value: 'oblique', label: 'Oblique' },
          ]}
        />
      </div>

      {/* Gradient angle */}
      <div className="space-y-0.5">
        <Label>Gradient angle</Label>
        <div className="flex items-center gap-1.5">
          <input type="range" min={0} max={360} value={gradientAngle} onChange={(e) => setGradientAngle(Number(e.target.value))} className="flex-1 h-1 rounded-full cursor-pointer accent-indigo-600 outline-none bg-[var(--border)]" disabled={!gradientEnabled} />
          <span className="text-[11px] font-mono w-8 text-[var(--text)]">{gradientAngle}°</span>
        </div>
      </div>

      {/* Gradient bg toggle */}
      <div className="space-y-0.5">
        <div className="flex items-center gap-2">
          <Label>Gradient bg</Label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={gradientEnabled} onChange={() => setGradientEnabled(!gradientEnabled)} className="sr-only peer" />
            <div className="w-7 h-3.5 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition-colors after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-3.5" />
          </label>
        </div>
        {gradientEnabled && (
          <div className="flex items-center gap-1 mt-1">
            <div className="flex items-center gap-1.5 rounded-lg px-1.5 py-0.5 bg-[var(--input-bg)] border border-[var(--border)]">
              <input type="color" value={gradientColor1} onChange={(e) => setGradientColor1(e.target.value)} className="w-4 h-4 bg-transparent cursor-pointer rounded border-0" />
              <span className="text-[10px] font-mono uppercase text-[var(--text-muted)]">{gradientColor1}</span>
            </div>
            <span className="text-[var(--text-faint)] text-[10px]">→</span>
            <div className="flex items-center gap-1.5 rounded-lg px-1.5 py-0.5 bg-[var(--input-bg)] border border-[var(--border)]">
              <input type="color" value={gradientColor2} onChange={(e) => setGradientColor2(e.target.value)} className="w-4 h-4 bg-transparent cursor-pointer rounded border-0" />
              <span className="text-[10px] font-mono uppercase text-[var(--text-muted)]">{gradientColor2}</span>
            </div>
          </div>
        )}
      </div>

      {/* Text shadow – spans 2 columns when enabled */}
      <div className="space-y-0.5 col-span-1 md:col-span-2">
        <div className="flex items-center gap-2">
          <Label>Text shadow</Label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={shadowEnabled} onChange={() => setShadowEnabled(!shadowEnabled)} className="sr-only peer" />
            <div className="w-7 h-3.5 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition-colors after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-3.5" />
          </label>
        </div>
        {shadowEnabled && (
          <div className="space-y-1">
            <div className="flex items-center gap-2 rounded-lg px-2 py-1 bg-[var(--input-bg)] border border-[var(--border)]">
              <input type="color" value={shadowColor} onChange={(e) => setShadowColor(e.target.value)} className="w-4 h-4 bg-transparent cursor-pointer rounded border-0" />
              <span className="text-[11px] font-mono uppercase text-[var(--text-muted)]">{shadowColor}</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <div className="flex flex-col gap-0.5">
                <span className="text-[8px] text-[var(--text-faint)]">Blur</span>
                <input type="range" min={0} max={20} value={shadowBlur} onChange={(e) => setShadowBlur(Number(e.target.value))} className="w-full h-0.5 rounded-full cursor-pointer accent-indigo-600 outline-none bg-[var(--border)]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[8px] text-[var(--text-faint)]">X</span>
                <input type="range" min={-10} max={10} value={shadowOffsetX} onChange={(e) => setShadowOffsetX(Number(e.target.value))} className="w-full h-0.5 rounded-full cursor-pointer accent-indigo-600 outline-none bg-[var(--border)]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[8px] text-[var(--text-faint)]">Y</span>
                <input type="range" min={-10} max={10} value={shadowOffsetY} onChange={(e) => setShadowOffsetY(Number(e.target.value))} className="w-full h-0.5 rounded-full cursor-pointer accent-indigo-600 outline-none bg-[var(--border)]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Text stroke – spans 2 columns when enabled */}
      <div className="space-y-0.5 col-span-1 md:col-span-2">
        <div className="flex items-center gap-2">
          <Label>Text stroke</Label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={strokeEnabled} onChange={() => setStrokeEnabled(!strokeEnabled)} className="sr-only peer" />
            <div className="w-7 h-3.5 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition-colors after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-3.5" />
          </label>
        </div>
        {strokeEnabled && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-lg px-2 py-1 bg-[var(--input-bg)] border border-[var(--border)] flex-1">
              <input type="color" value={strokeColor} onChange={(e) => setStrokeColor(e.target.value)} className="w-4 h-4 bg-transparent cursor-pointer rounded border-0" />
              <span className="text-[11px] font-mono uppercase text-[var(--text-muted)]">{strokeColor}</span>
            </div>
            <input type="range" min={0} max={10} value={strokeWidth} onChange={(e) => setStrokeWidth(Number(e.target.value))} className="flex-1 h-1 rounded-full cursor-pointer accent-indigo-600 outline-none bg-[var(--border)]" />
            <span className="text-[11px] font-mono w-5 text-[var(--text)]">{strokeWidth}px</span>
          </div>
        )}
      </div>

      {/* Border width */}
      <div className="space-y-0.5">
        <Label>Border width</Label>
        <div className="flex items-center gap-1.5">
          <input type="range" min={0} max={8} value={borderWidth} onChange={(e) => setBorderWidth(Number(e.target.value))} className="flex-1 h-1 rounded-full cursor-pointer accent-indigo-600 outline-none bg-[var(--border)]" />
          <span className="text-[11px] font-mono w-5 text-[var(--text)]">{borderWidth}px</span>
        </div>
        {borderWidth > 0 && (
          <div className="space-y-0.5 mt-0.5">
            <div className="flex items-center gap-2 rounded-lg px-2 py-1 bg-[var(--input-bg)] border border-[var(--border)]">
              <input type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} className="w-4 h-4 bg-transparent cursor-pointer rounded border-0" />
              <span className="text-[11px] font-mono uppercase text-[var(--text-muted)]">{borderColor}</span>
            </div>
            <CustomSelect
              value={borderStyle}
              onChange={setBorderStyle}
              options={[
                { value: 'solid', label: 'Solid' },
                { value: 'dashed', label: 'Dashed' },
                { value: 'dotted', label: 'Dotted' },
              ]}
            />
          </div>
        )}
      </div>

      {/* Border radius */}
      <div className="space-y-0.5">
        <Label>Border radius</Label>
        <div className="flex items-center gap-1.5">
          <input type="range" min={0} max={50} value={customRadius ?? 22} onChange={(e) => setCustomRadius(Number(e.target.value))} className="flex-1 h-1 rounded-full cursor-pointer accent-indigo-600 outline-none bg-[var(--border)]" />
          <span className="text-[11px] font-mono w-7 text-[var(--text)]">{customRadius ?? 22}%</span>
          <button onClick={() => setCustomRadius(null)} className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--panel-subtle)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]">Reset</button>
        </div>
      </div>

      {/* Padding */}
      <div className="space-y-0.5">
        <Label>Padding</Label>
        <div className="flex items-center gap-1.5">
          <input type="range" min={0} max={30} value={padding} onChange={(e) => setPadding(Number(e.target.value))} className="flex-1 h-1 rounded-full cursor-pointer accent-indigo-600 outline-none bg-[var(--border)]" />
          <span className="text-[11px] font-mono w-7 text-[var(--text)]">{padding}px</span>
        </div>
      </div>
    </div>
  );
}
