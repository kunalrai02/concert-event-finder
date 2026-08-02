import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BellIcon,
  CalendarIcon,
  ClockIcon,
  HeartIcon,
  MapPinIcon,
  NavigationIcon,
  Share2Icon,
  StarIcon } from
'lucide-react';
import type { EventItem } from '../../types';
import { Badge, Tooltip } from '../ui/Primitives';
import { useApp } from '../../contexts/AppContext';
import { cn, formatDate, formatPrice } from '../../utils/cn';
import { toast } from 'sonner';

const categoryTone: Record<string, 'brand' | 'cyan' | 'orange' | 'neutral'> = {
  Concert: 'brand',
  Festival: 'cyan',
  Comedy: 'orange',
  Food: 'orange',
  Cultural: 'cyan',
  Local: 'neutral'
};

export function EventCard({
  event,
  compact,
  onRemove




}: {event: EventItem;compact?: boolean;onRemove?: () => void;}) {
  const { isSaved, toggleSaved } = useApp();
  const saved = isSaved(event.id);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="group glass flex flex-col overflow-hidden rounded-2xl shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/60 hover:shadow-lift">
      
      <Link to={`/events/${event.id}`} className="relative block overflow-hidden">
        <img
          src={event.image}
          alt={`${event.title} at ${event.venue}`}
          className={cn(
            'w-full object-cover transition-transform duration-500 group-hover:scale-105',
            compact ? 'h-32' : 'h-44'
          )}
          loading="lazy" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent" />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge tone={categoryTone[event.category] ?? 'brand'}>{event.category}</Badge>
          {event.price === 0 && <Badge tone="success">Free</Badge>}
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs font-medium text-white">
          <StarIcon className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          {event.rating}
          <span className="text-white/60">({event.reviews})</span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-base font-semibold leading-snug text-ink">
          <Link to={`/events/${event.id}`} className="hover:text-brand-300">
            {event.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-cyanx-400">{event.artist}</p>

        <dl className="mt-3 grid grid-cols-2 gap-y-2 text-xs text-muted">
          <div className="flex items-center gap-1.5">
            <MapPinIcon className="h-3.5 w-3.5" />
            <span className="truncate">
              {event.venue}, {event.city}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarIcon className="h-3.5 w-3.5" />
            {formatDate(event.date)}
          </div>
          <div className="flex items-center gap-1.5">
            <ClockIcon className="h-3.5 w-3.5" />
            {event.time}
          </div>
          <div className="flex items-center gap-1.5">
            <NavigationIcon className="h-3.5 w-3.5" />
            {event.distanceKm} km away
          </div>
        </dl>

        <div className="mt-4 flex items-center justify-between">
          <p className="font-display text-lg font-semibold text-ink">
            {formatPrice(event.price, event.currency)}
            {event.price > 0 && <span className="text-xs font-normal text-muted"> onwards</span>}
          </p>
          <div className="flex items-center gap-1">
            <Tooltip label={saved ? 'Remove from favorites' : 'Save event'}>
              <button
                onClick={() => onRemove ? onRemove() : toggleSaved(event.id, event.title)}
                aria-label={saved ? 'Remove from favorites' : 'Save event'}
                className={cn(
                  'grid h-9 w-9 place-items-center rounded-xl border border-line hover:border-brand-400',
                  saved ? 'text-rose-400' : 'text-muted'
                )}>
                
                <HeartIcon className={cn('h-4 w-4', saved && 'fill-rose-400')} />
              </button>
            </Tooltip>
            <Tooltip label="Set reminder">
              <Link
                to={`/reminders/new?event=${event.id}`}
                aria-label="Set reminder"
                className="grid h-9 w-9 place-items-center rounded-xl border border-line text-muted hover:border-brand-400 hover:text-ink">
                
                <BellIcon className="h-4 w-4" />
              </Link>
            </Tooltip>
            <Tooltip label="Share">
              <button
                onClick={() => toast.success('Link copied to clipboard')}
                aria-label="Share event"
                className="grid h-9 w-9 place-items-center rounded-xl border border-line text-muted hover:border-brand-400 hover:text-ink">
                
                <Share2Icon className="h-4 w-4" />
              </button>
            </Tooltip>
          </div>
        </div>

        <Link
          to={`/events/${event.id}`}
          className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-xl bg-brand-500 text-sm font-medium text-white transition-colors duration-200 hover:bg-brand-600">
          
          View details
        </Link>
      </div>
    </motion.article>);

}