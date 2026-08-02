import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths } from
'date-fns';
import {
  BellIcon,
  CalendarPlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon } from
'lucide-react';
import { toast } from 'sonner';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge, EmptyState } from '../components/ui/Primitives';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Overlays';
import { events } from '../data/events';
import { cn, formatDate } from '../utils/cn';

export function CalendarPage() {
  const [view, setView] = useState('month');
  const [cursor, setCursor] = useState(new Date('2026-08-01'));
  const [selected, setSelected] = useState(new Date('2026-08-09'));

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(cursor), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(cursor), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [cursor]);

  const weekDays = useMemo(
    () =>
    eachDayOfInterval({
      start: startOfWeek(selected, { weekStartsOn: 1 }),
      end: endOfWeek(selected, { weekStartsOn: 1 })
    }),
    [selected]
  );

  const eventsOn = (day: Date) => events.filter((e) => isSameDay(new Date(e.date), day));
  const dayEvents = eventsOn(selected);

  return (
    <DashboardLayout
      title="My calendar"
      description="Everything you saved, in one schedule"
      actions={
      <div className="hidden gap-2 sm:flex">
          <Button size="sm" variant="outline" onClick={() => toast.success('Calendar exported (.ics)')}>
            <DownloadIcon className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm" onClick={() => toast.success('Synced with Google Calendar')}>
            <CalendarPlusIcon className="h-4 w-4" />
            Sync
          </Button>
        </div>
      }>
      
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Tabs
            value={view}
            onChange={setView}
            tabs={[
            { id: 'month', label: 'Month' },
            { id: 'week', label: 'Week' },
            { id: 'day', label: 'Day' }]
            } />
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCursor(subMonths(cursor, 1))}
              aria-label="Previous month"
              className="grid h-10 w-10 place-items-center rounded-xl border border-line text-muted hover:text-ink">
              
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <p className="w-40 text-center font-display text-base font-semibold text-ink">
              {format(cursor, 'MMMM yyyy')}
            </p>
            <button
              onClick={() => setCursor(addMonths(cursor, 1))}
              aria-label="Next month"
              className="grid h-10 w-10 place-items-center rounded-xl border border-line text-muted hover:text-ink">
              
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
          <Card className="p-4 sm:p-6">
            {view === 'month' &&
            <div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium uppercase tracking-wide text-muted">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) =>
                <span key={d} className="py-2">
                      {d}
                    </span>
                )}
                </div>
                <div className="mt-1 grid grid-cols-7 gap-1">
                  {days.map((day) => {
                  const dayItems = eventsOn(day);
                  const isSelected = isSameDay(day, selected);
                  return (
                    <button
                      key={day.toISOString()}
                      onClick={() => setSelected(day)}
                      aria-label={format(day, 'PPPP')}
                      aria-pressed={isSelected}
                      className={cn(
                        'flex min-h-[76px] flex-col rounded-xl border p-2 text-left transition-colors duration-200',
                        isSelected ?
                        'border-brand-400 bg-brand-500/15' :
                        'border-line/60 hover:border-brand-400/50 hover:bg-elevated/50',
                        !isSameMonth(day, cursor) && 'opacity-40'
                      )}>
                      
                        <span
                        className={cn(
                          'text-xs font-semibold',
                          isSelected ? 'text-brand-200' : 'text-ink'
                        )}>
                        
                          {format(day, 'd')}
                        </span>
                        <span className="mt-1 space-y-1">
                          {dayItems.slice(0, 2).map((e) =>
                        <span
                          key={e.id}
                          className="block truncate rounded-md bg-cyanx-500/20 px-1.5 py-0.5 text-[10px] text-cyanx-300">
                          
                              {e.time} {e.title}
                            </span>
                        )}
                          {dayItems.length > 2 &&
                        <span className="block text-[10px] text-muted">
                              +{dayItems.length - 2} more
                            </span>
                        }
                        </span>
                      </button>);

                })}
                </div>
              </div>
            }

            {view === 'week' &&
            <div className="grid gap-2 sm:grid-cols-7">
                {weekDays.map((day) =>
              <div key={day.toISOString()} className="rounded-xl border border-line/60 p-3">
                    <p className="text-xs font-semibold text-muted">{format(day, 'EEE d')}</p>
                    <div className="mt-2 space-y-2">
                      {eventsOn(day).map((e) =>
                  <Link
                    key={e.id}
                    to={`/events/${e.id}`}
                    className="block rounded-lg bg-brand-500/15 p-2 text-[11px] text-brand-200 hover:bg-brand-500/25">
                    
                          {e.time} · {e.title}
                        </Link>
                  )}
                    </div>
                  </div>
              )}
              </div>
            }

            {view === 'day' &&
            <div className="space-y-1">
                {Array.from({ length: 14 }, (_, i) => i + 9).map((hour) => {
                const slotEvents = dayEvents.filter(
                  (e) => Number(e.time.split(':')[0]) === hour
                );
                return (
                  <div key={hour} className="flex gap-4 border-b border-line/40 py-2">
                      <span className="w-14 shrink-0 text-xs text-muted">
                        {String(hour).padStart(2, '0')}:00
                      </span>
                      <div className="flex-1 space-y-2">
                        {slotEvents.map((e) =>
                      <Link
                        key={e.id}
                        to={`/events/${e.id}`}
                        className="block rounded-xl border border-brand-500/40 bg-brand-500/10 px-3 py-2 text-sm text-ink hover:bg-brand-500/20">
                        
                            <span className="font-medium">{e.title}</span>
                            <span className="block text-xs text-muted">{e.venue}</span>
                          </Link>
                      )}
                      </div>
                    </div>);

              })}
              </div>
            }
          </Card>

          <Card className="h-fit">
            <CardHeader
              title={format(selected, 'EEEE, MMM d')}
              subtitle={`${dayEvents.length} event${dayEvents.length === 1 ? '' : 's'} scheduled`} />
            
            {dayEvents.length ?
            <ul className="divide-y divide-line/60">
                {dayEvents.map((e) =>
              <li key={e.id} className="p-4">
                    <Link to={`/events/${e.id}`} className="flex gap-3">
                      <img src={e.image} alt="" className="h-14 w-14 rounded-xl object-cover" />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium text-ink">
                          {e.title}
                        </span>
                        <span className="block text-xs text-muted">
                          {e.time} · {e.venue}
                        </span>
                        <Badge tone="cyan" className="mt-1">
                          {e.category}
                        </Badge>
                      </span>
                    </Link>
                    <Link to={`/reminders/new?event=${e.id}`}>
                      <Button size="sm" variant="outline" className="mt-3 w-full justify-center">
                        <BellIcon className="h-4 w-4" />
                        Add reminder
                      </Button>
                    </Link>
                  </li>
              )}
              </ul> :

            <div className="p-4">
                <EmptyState
                icon={<CalendarPlusIcon className="h-7 w-7" />}
                title="Nothing scheduled"
                description={`You have no events on ${formatDate(format(selected, 'yyyy-MM-dd'))}.`}
                action={
                <Link to="/explore">
                      <Button size="sm">Find something</Button>
                    </Link>
                } />
              
              </div>
            }
          </Card>
        </div>
      </div>
    </DashboardLayout>);

}