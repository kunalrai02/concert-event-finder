import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon, XIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer







}: {open: boolean;onClose: () => void;title: string;description?: string;children?: React.ReactNode;footer?: React.ReactNode;}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open &&
      <motion.div
        className="fixed inset-0 z-50 grid place-items-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}>
        
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="glass relative z-10 w-full max-w-lg rounded-2xl p-6 shadow-lift">
          
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>
                {description && <p className="mt-1 text-sm text-muted">{description}</p>}
              </div>
              <button
              onClick={onClose}
              aria-label="Close dialog"
              className="rounded-lg p-1.5 text-muted hover:bg-elevated hover:text-ink">
              
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            {children && <div className="mt-5">{children}</div>}
            {footer && <div className="mt-6 flex justify-end gap-3">{footer}</div>}
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);

}

export function Tabs({
  tabs,
  value,
  onChange




}: {tabs: {id: string;label: string;}[];value: string;onChange: (id: string) => void;}) {
  return (
    <div role="tablist" className="flex gap-1 overflow-x-auto rounded-xl border border-line bg-elevated/50 p-1">
      {tabs.map((tab) => {
        const active = tab.id === value;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200',
              active ? 'text-white' : 'text-muted hover:text-ink'
            )}>
            
            {active &&
            <motion.span
              layoutId="tab-pill"
              className="absolute inset-0 rounded-lg bg-brand-500"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }} />

            }
            <span className="relative z-10">{tab.label}</span>
          </button>);

      })}
    </div>);

}

export function Accordion({
  items


}: {items: {id: string;question: string;answer: string;}[];}) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  return (
    <div className="divide-y divide-line/60 overflow-hidden rounded-2xl border border-line">
      {items.map((item) => {
        const expanded = open === item.id;
        return (
          <div key={item.id}>
            <button
              onClick={() => setOpen(expanded ? null : item.id)}
              aria-expanded={expanded}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-elevated/50">
              
              <span className="text-sm font-medium text-ink">{item.question}</span>
              <ChevronDownIcon
                className={cn('h-4 w-4 shrink-0 text-muted transition-transform', expanded && 'rotate-180')} />
              
            </button>
            <AnimatePresence initial={false}>
              {expanded &&
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden">
                
                  <p className="px-5 pb-4 text-sm text-muted">{item.answer}</p>
                </motion.div>
              }
            </AnimatePresence>
          </div>);

      })}
    </div>);

}

export function Pagination({
  page,
  totalPages,
  onChange




}: {page: number;totalPages: number;onChange: (page: number) => void;}) {
  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="rounded-lg border border-line px-3 py-2 text-sm text-muted hover:text-ink disabled:opacity-40">
        
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) =>
      <button
        key={p}
        onClick={() => onChange(p)}
        aria-current={p === page ? 'page' : undefined}
        className={cn(
          'h-9 w-9 rounded-lg text-sm font-medium',
          p === page ? 'bg-brand-500 text-white' : 'border border-line text-muted hover:text-ink'
        )}>
        
          {p}
        </button>
      )}
      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="rounded-lg border border-line px-3 py-2 text-sm text-muted hover:text-ink disabled:opacity-40">
        
        Next
      </button>
    </nav>);

}

export function Dropdown({
  label,
  items



}: {label: React.ReactNode;items: {id: string;label: string;onSelect: () => void;danger?: boolean;}[];}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-xl border border-line bg-elevated/60 px-3 py-2 text-sm text-ink hover:border-brand-400/60">
        
        {label}
        <ChevronDownIcon className={cn('h-4 w-4 text-muted transition-transform', open && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open &&
        <motion.div
          role="menu"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.16 }}
          className="glass absolute right-0 z-40 mt-2 w-56 overflow-hidden rounded-xl p-1 shadow-lift">
          
            {items.map((item) =>
          <button
            key={item.id}
            role="menuitem"
            onClick={() => {
              item.onSelect();
              setOpen(false);
            }}
            className={cn(
              'block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-elevated',
              item.danger ? 'text-rose-400' : 'text-ink'
            )}>
            
                {item.label}
              </button>
          )}
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}