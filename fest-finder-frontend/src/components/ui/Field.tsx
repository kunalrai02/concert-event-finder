import React, { useId } from 'react';
import { cn } from '../../utils/cn';

const baseField =
'w-full rounded-xl border border-line bg-elevated/70 px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/70 outline-none transition-colors duration-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-500/25';

export function Input({
  label,
  hint,
  error,
  icon,
  className,
  id,
  ...props





}: React.InputHTMLAttributes<HTMLInputElement> & {label?: string;hint?: string;error?: string;icon?: React.ReactNode;}) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <div className="w-full">
      {label &&
      <label htmlFor={fieldId} className="mb-1.5 block text-sm font-medium text-ink">
          {label}
        </label>
      }
      <div className="relative">
        {icon &&
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
            {icon}
          </span>
        }
        <input
          id={fieldId}
          className={cn(baseField, icon && 'pl-10', error && 'border-rose-500/60', className)}
          aria-invalid={!!error}
          {...props} />
        
      </div>
      {(hint || error) &&
      <p className={cn('mt-1.5 text-xs', error ? 'text-rose-400' : 'text-muted')}>
          {error || hint}
        </p>
      }
    </div>);

}

export function Select({
  label,
  options,
  className,
  id,
  ...props



}: React.SelectHTMLAttributes<HTMLSelectElement> & {label?: string;options: {value: string;label: string;}[];}) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <div className="w-full">
      {label &&
      <label htmlFor={fieldId} className="mb-1.5 block text-sm font-medium text-ink">
          {label}
        </label>
      }
      <select id={fieldId} className={cn(baseField, 'appearance-none pr-8', className)} {...props}>
        {options.map((o) =>
        <option key={o.value} value={o.value} className="bg-surface text-ink">
            {o.label}
          </option>
        )}
      </select>
    </div>);

}

export function Textarea({
  label,
  className,
  id,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {label?: string;}) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <div className="w-full">
      {label &&
      <label htmlFor={fieldId} className="mb-1.5 block text-sm font-medium text-ink">
          {label}
        </label>
      }
      <textarea id={fieldId} rows={4} className={cn(baseField, className)} {...props} />
    </div>);

}

export function Checkbox({
  label,
  description,
  checked,
  onChange





}: {label: string;description?: string;checked: boolean;onChange: (checked: boolean) => void;}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-elevated/50 p-3 hover:border-brand-400/60">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 rounded border-line bg-transparent text-brand-500 focus:ring-brand-500" />
      
      <span>
        <span className="block text-sm font-medium text-ink">{label}</span>
        {description && <span className="block text-xs text-muted">{description}</span>}
      </span>
    </label>);

}

export function Toggle({
  label,
  description,
  checked,
  onChange





}: {label: string;description?: string;checked: boolean;onChange: (checked: boolean) => void;}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-medium text-ink">{label}</p>
        {description && <p className="text-xs text-muted">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200',
          checked ? 'bg-brand-500' : 'bg-line'
        )}>
        
        <span
          className={cn(
            'absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-200',
            checked ? 'translate-x-[22px]' : 'translate-x-0.5'
          )} />
        
      </button>
    </div>);

}

export function Chip({
  children,
  active,
  onClick




}: {children: React.ReactNode;active?: boolean;onClick?: () => void;}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors duration-200',
        active ?
        'border-brand-400 bg-brand-500/20 text-brand-200' :
        'border-line bg-elevated/60 text-muted hover:text-ink'
      )}>
      
      {children}
    </button>);

}