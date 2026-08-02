import React from 'react';
import { cn } from '../../utils/cn';

type BadgeTone = 'brand' | 'cyan' | 'orange' | 'neutral' | 'success' | 'danger' | 'warning';

const badgeTones: Record<BadgeTone, string> = {
  brand: 'bg-brand-500/15 text-brand-300 border-brand-500/30',
  cyan: 'bg-cyanx-500/15 text-cyanx-400 border-cyanx-500/30',
  orange: 'bg-orangex-500/15 text-orangex-400 border-orangex-500/30',
  neutral: 'bg-elevated text-muted border-line',
  success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  danger: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  warning: 'bg-amber-500/15 text-amber-400 border-amber-500/30'
};

export function Badge({
  children,
  tone = 'brand',
  className




}: {children: React.ReactNode;tone?: BadgeTone;className?: string;}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        badgeTones[tone],
        className
      )}>
      
      {children}
    </span>);

}

export function Avatar({
  name,
  src,
  size = 'md'




}: {name: string;src?: string;size?: 'sm' | 'md' | 'lg';}) {
  const sizes = { sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm', lg: 'h-16 w-16 text-lg' };
  const initials = name.
  split(' ').
  map((n) => n[0]).
  slice(0, 2).
  join('');
  return src ?
  <img
    src={src}
    alt={name}
    className={cn('rounded-full object-cover ring-2 ring-line', sizes[size])} /> :


  <span
    className={cn(
      'grid place-items-center rounded-full bg-brand-500/20 font-semibold text-brand-200 ring-2 ring-line',
      sizes[size]
    )}
    aria-hidden="true">
    
      {initials}
    </span>;

}

export function Progress({ value, tone = 'brand' }: {value: number;tone?: 'brand' | 'cyan' | 'orange';}) {
  const tones = { brand: 'bg-brand-500', cyan: 'bg-cyanx-500', orange: 'bg-orangex-500' };
  return (
    <div
      className="h-2 w-full overflow-hidden rounded-full bg-elevated"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}>
      
      <div className={cn('h-full rounded-full', tones[tone])} style={{ width: `${value}%` }} />
    </div>);

}

export function Tooltip({ label, children }: {label: string;children: React.ReactNode;}) {
  return (
    <span className="group/tt relative inline-flex">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-line bg-elevated px-2 py-1 text-xs text-ink opacity-0 shadow-soft transition-opacity duration-200 group-hover/tt:opacity-100 group-focus-within/tt:opacity-100">
        
        {label}
      </span>
    </span>);

}

export function Skeleton({ className }: {className?: string;}) {
  return (
    <div className={cn('relative overflow-hidden rounded-xl bg-elevated', className)}>
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>);

}

export function EventCardSkeleton() {
  return (
    <div className="glass rounded-2xl p-3">
      <Skeleton className="h-40 w-full" />
      <div className="space-y-2 p-2 pt-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-2/3" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 w-9" />
        </div>
      </div>
    </div>);

}

export function EmptyState({
  icon,
  title,
  description,
  action





}: {icon: React.ReactNode;title: string;description: string;action?: React.ReactNode;}) {
  return (
    <div className="glass flex flex-col items-center rounded-2xl px-6 py-16 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-500/15 text-brand-300">
        {icon}
      </span>
      <h3 className="mt-5 font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>);

}

export function ErrorState({ message, onRetry }: {message: string;onRetry?: () => void;}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center rounded-2xl border border-rose-500/30 bg-rose-500/5 px-6 py-10 text-center">
      
      <p className="font-display text-base font-semibold text-rose-300">Something went wrong</p>
      <p className="mt-1 max-w-sm text-sm text-muted">{message}</p>
      {onRetry &&
      <button
        onClick={onRetry}
        className="mt-4 rounded-xl border border-rose-500/40 px-4 py-2 text-sm font-medium text-rose-200 hover:bg-rose-500/10">
        
          Try again
        </button>
      }
    </div>);

}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action





}: {eyebrow?: string;title: string;description?: string;action?: React.ReactNode;}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow &&
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyanx-400">
            {eyebrow}
          </p>
        }
        <h2 className="mt-1 font-display text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
        {description && <p className="mt-2 max-w-2xl text-sm text-muted">{description}</p>}
      </div>
      {action}
    </div>);

}