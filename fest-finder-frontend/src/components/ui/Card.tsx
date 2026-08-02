import React from 'react';
import { cn } from '../../utils/cn';

export function Card({
  className,
  children,
  hover,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {hover?: boolean;}) {
  return (
    <div
      className={cn(
        'glass rounded-2xl shadow-soft',
        hover &&
        'transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/60 hover:shadow-lift',
        className
      )}
      {...props}>
      
      {children}
    </div>);

}

export function CardHeader({
  title,
  subtitle,
  action,
  icon





}: {title: string;subtitle?: string;action?: React.ReactNode;icon?: React.ReactNode;}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line/60 px-5 py-4">
      <div className="flex items-start gap-3">
        {icon &&
        <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-xl bg-brand-500/15 text-brand-300">
            {icon}
          </span>
        }
        <div>
          <h3 className="font-display text-base font-semibold text-ink">{title}</h3>
          {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>);

}

export function StatCard({
  label,
  value,
  delta,
  icon,
  tone = 'brand',
  children







}: {label: string;value: string;delta?: string;icon: React.ReactNode;tone?: 'brand' | 'cyan' | 'orange' | 'emerald';children?: React.ReactNode;}) {
  const tones = {
    brand: 'bg-brand-500/15 text-brand-300',
    cyan: 'bg-cyanx-500/15 text-cyanx-400',
    orange: 'bg-orangex-500/15 text-orangex-400',
    emerald: 'bg-emerald-500/15 text-emerald-400'
  };
  return (
    <Card hover className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted">{label}</p>
          <p className="mt-2 font-display text-2xl font-semibold text-ink">{value}</p>
          {delta &&
          <p className="mt-1 text-xs font-medium text-emerald-400">{delta}</p>
          }
        </div>
        <span className={cn('grid h-11 w-11 place-items-center rounded-2xl', tones[tone])}>
          {icon}
        </span>
      </div>
      {children && <div className="mt-4 h-16">{children}</div>}
    </Card>);

}