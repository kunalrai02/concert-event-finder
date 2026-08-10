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
  'bg-surface border border-line/10 rounded-xl',
  hover &&
  'transition-all duration-300 hover:-translate-y-1 hover:border-primary/10 ',
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
 <div className="flex items-start justify-between gap-4 border-b border-line/10 px-5 py-4">
  <div className="flex items-start gap-3">
  {icon &&
  <span className="mt-0.5 grid h-10 w-10 place-items-center bg-surface border border-primary/10 text-primary ">
   {icon}
   </span>
  }
  <div>
   <h3 className="font-display text-lg font-bold text-text">{title}</h3>
   {subtitle && <p className="mt-0.5 text-sm text-text font-mono">{subtitle}</p>}
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
 brand: 'bg-surface border border-primary/10 text-primary ',
 cyan: 'bg-surface border border-secondary/10 text-secondary ',
 orange: 'bg-surface border border-warning/10 text-warning ',
 emerald: 'bg-surface border border-success/10 text-success '
 };
 return (
 <Card hover className="p-5">
  <div className="flex items-start justify-between">
  <div>
   <p className="text-sm font-bold text-text font-mono">{label}</p>
   <p className="mt-2 font-display text-3xl font-bold text-text">{value}</p>
   {delta &&
   <p className="mt-1 text-xs font-bold text-success font-mono">{delta}</p>
   }
  </div>
  <span className={cn('grid h-12 w-12 place-items-center', tones[tone])}>
   {icon}
  </span>
  </div>
  {children && <div className="mt-4 h-16">{children}</div>}
 </Card>);

}