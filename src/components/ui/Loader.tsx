// Loader – simple spinner with custom size & color
export function Loader({
  size = 24,
  color = "currentColor",
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-2 border-solid border-t-transparent ${className}`}
      style={{
        width: size,
        height: size,
        borderColor: `${color} transparent ${color} ${color}`,
      }}
    />
  );
}
