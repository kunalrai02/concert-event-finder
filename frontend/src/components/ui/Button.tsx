import React from 'react';
import { cn } from '../../utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'accent';
type Size = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
 variant?: Variant;
 size?: Size;
 loading?: boolean;
}

const variants: Record<Variant, string> = {
 primary:
 'bg-primary text-surface border border-primary/10 hover:bg-surface hover:text-primary active:translate-y-0.5 active:shadow-none',
 accent: 'bg-secondary text-surface border border-secondary/10 hover:bg-surface hover:text-secondary active:translate-y-0.5 active:shadow-none',
 secondary:
 'bg-surface text-text hover:bg-bg border border-line/10 active:translate-y-0.5 active:shadow-none',
 outline:
 'border border-line/10 text-text hover:border-primary/10 hover:text-primary bg-transparent',
 ghost: 'text-muted hover:text-primary hover:bg-surface border border-transparent',
 danger: 'bg-danger text-surface border border-danger/10 hover:bg-surface hover:text-danger active:translate-y-0.5 active:shadow-none'
};

const sizes: Record<Size, string> = {
 sm: 'h-10 px-4 text-sm gap-2',
 md: 'h-12 px-6 text-base gap-2',
 lg: 'h-14 px-8 text-lg gap-3',
 icon: 'h-12 w-12 justify-center'
};

export function Button({
 variant = 'primary',
 size = 'md',
 loading,
 className,
 children,
 disabled,
 ...props
}: ButtonProps) {
 return (
 <button
  className={cn(
  'inline-flex items-center font-display font-semibold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none rounded-xl',
  variants[variant],
  sizes[size],
  className
  )}
  disabled={disabled || loading}
  {...props}>
  
  {loading &&
  <span
  className="h-4 w-4 animate-spin rounded-xl border border-current border-t-transparent"
  aria-hidden="true" />

  }
  {children}
 </button>);

}