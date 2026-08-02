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
  'bg-brand-500 text-white hover:bg-brand-600 shadow-lift active:scale-[.98]',
  accent: 'bg-orangex-500 text-white hover:bg-orangex-600 active:scale-[.98]',
  secondary:
  'bg-elevated text-ink hover:bg-line/70 border border-line active:scale-[.98]',
  outline:
  'border border-line text-ink hover:border-brand-400 hover:text-brand-300 bg-transparent',
  ghost: 'text-muted hover:text-ink hover:bg-elevated',
  danger: 'bg-rose-600 text-white hover:bg-rose-700'
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm gap-1.5',
  md: 'h-11 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2',
  icon: 'h-10 w-10 justify-center'
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
        'inline-flex items-center rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}>
      
      {loading &&
      <span
        className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        aria-hidden="true" />

      }
      {children}
    </button>);

}