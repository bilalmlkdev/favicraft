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
    'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-[13.5px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40'
  const variants: Record<string, string> = {
    primary: 'bg-amber text-ink hover:bg-[#f7b246]',
    secondary:
      'border border-line-dark bg-ink-elevated text-[#EDEBE5] hover:border-[#3a3f46]',
    ghost: 'text-muted-dark hover:text-[#EDEBE5]',
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {icon}
      {children}
    </button>
  )
}
