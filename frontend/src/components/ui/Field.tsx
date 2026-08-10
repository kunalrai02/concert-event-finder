import React, { useId } from 'react';
import { cn } from '../../utils/cn';

const baseField =
'w-full rounded-xl border border-line/10 bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-muted/70 outline-none transition-colors duration-200 focus:border-primary/10 focus:border-primary/10';

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
  <label htmlFor={fieldId} className="mb-1.5 block text-sm font-bold font-mono text-text">
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
   className={cn(baseField, icon && 'pl-10', error && 'border-danger/10 focus:border-danger/10', className)}
   aria-invalid={!!error}
   {...props} />
  
  </div>
  {(hint || error) &&
  <p className={cn('mt-1.5 text-xs', error ? 'text-danger' : 'text-muted')}>
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
  <label htmlFor={fieldId} className="mb-1.5 block text-sm font-bold font-mono text-text">
   {label}
  </label>
  }
  <select id={fieldId} className={cn(baseField, 'appearance-none pr-8', className)} {...props}>
  {options.map((o) =>
  <option key={o.value} value={o.value} className="bg-surface text-text">
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
  <label htmlFor={fieldId} className="mb-1.5 block text-sm font-bold font-mono text-text">
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
 <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line/10 bg-surface p-3 hover:border-primary/10">
  <input
  type="checkbox"
  checked={checked}
  onChange={(e) => onChange(e.target.checked)}
  className="mt-0.5 h-4 w-4 rounded-xl border-line/10 bg-transparent text-primary focus:border-primary/10" />
  
  <span>
  <span className="block text-sm font-bold font-mono text-text">{label}</span>
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
  <p className="text-sm font-bold font-mono text-text">{label}</p>
  {description && <p className="text-xs text-muted">{description}</p>}
  </div>
  <button
  type="button"
  role="switch"
  aria-checked={checked}
  aria-label={label}
  onClick={() => onChange(!checked)}
  className={cn(
   'relative h-6 w-11 shrink-0 rounded-xl transition-colors duration-200',
   checked ? 'bg-primary' : 'bg-line'
  )}>
  
  <span
   className={cn(
   'absolute left-0 top-0.5 h-5 w-5 rounded-xl bg-surface transition-transform duration-200',
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
  'rounded-xl border px-3.5 py-1.5 text-sm font-bold font-mono transition-colors duration-200',
  active ?
  'border-primary/10 bg-primary text-surface ' :
  'border-line/10 bg-surface text-muted hover:text-primary hover:border-primary/10'
  )}>
  
  {children}
 </button>);

}