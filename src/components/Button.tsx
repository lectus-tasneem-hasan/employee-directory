import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.css'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
}

function Button({ children, variant = 'primary', className, ...rest }: ButtonProps) {
  const classes = ['btn', `btn-${variant}`, className].filter(Boolean).join(' ')
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}

export default Button
