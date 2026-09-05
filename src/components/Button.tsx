import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  icon?: React.ReactNode
}

export default function Button({
  variant = 'secondary',
  icon,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 px-4 py-2 font-mono text-[13px] transition-colors active:translate-y-px disabled:cursor-not-allowed disabled:opacity-40 disabled:active:translate-y-0'
  const variants: Record<string, string> = {
    primary: 'border border-fg bg-fg text-ink hover:bg-transparent hover:text-fg',
    secondary: 'border border-dashed border-line-dark text-fg hover:border-solid hover:border-fg',
    ghost: 'text-muted-dark hover:text-fg',
  }

  function bracket(content: React.ReactNode) {
    return (
      <>
        <span className="text-muted-dark">[</span>
        {content}
        <span className="text-muted-dark">]</span>
      </>
    )
  }

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {icon}
      {variant === 'ghost' ? children : bracket(children)}
    </button>
  )
}
