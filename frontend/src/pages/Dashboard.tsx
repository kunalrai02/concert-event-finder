import React from 'react';
import { Link } from 'react-router-dom';
import {
 Area,
 AreaChart,
 Bar,
 BarChart,
 CartesianGrid,
 ResponsiveContainer,
 Tooltip as ReTooltip,
 XAxis,
 YAxis } from
'recharts';
import {
 BellRingIcon,
 BookmarkIcon,
 CalendarCheckIcon,
 ClockIcon,
 EyeIcon,
 MapPinIcon,
 SparklesIcon,
 TicketIcon } from
'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardHeader, StatCard } from '../components/ui/Card';
import { Badge, EmptyState } from '../components/ui/Primitives';
import { Button } from '../components/ui/Button';
import { EventCard } from '../components/events/EventCard';
import { Countdown } from '../components/common/Countdown';
import { events, getEvent } from '../data/events';
import { userActivity, attendanceTrend } from '../data/analytics';
import { useApp } from '../contexts/AppContext';
import { formatDate } from '../utils/cn';

const chartStyles = {
 grid: 'rgba(148,163,184,0.15)',
 axis: 'rgb(44 64 167)'
};

export function Dashboard() {
 const { saved, recentlyViewed, reminders } = useApp();
 const savedEvents = saved.map(getEvent).filter(Boolean) as typeof events;
 const viewedEvents = recentlyViewed.map(getEvent).filter(Boolean) as typeof events;
 const nextEvent = getEvent(reminders[0]?.eventId) ?? events[0];
 const nearby = [...events].sort((a, b) => a.distanceKm - b.distanceKm).slice(0, 3);
 const recommended = events.filter((e) => !saved.includes(e.id)).slice(0, 3);

 return (
 <DashboardLayout
  title="Welcome back, Sofia"
  description="Here is what is coming up in Berlin this month."
  actions={
  <Link to="/reminders/new" className="hidden sm:block">
   <Button size="sm">
   <BellRingIcon className="h-4 w-4" />
   New reminder
   </Button>
  </Link>
  }>
  
  <div className="space-y-6">
  {/* Stats */}
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
   <StatCard label="Saved events" value={String(saved.length)} delta="+2 this week" icon={<BookmarkIcon className="h-5 w-5" />} />
   <StatCard label="Active reminders" value={String(reminders.length)} delta="All delivered" icon={<BellRingIcon className="h-5 w-5" />} tone="cyan" />
   <StatCard label="Events attended" value="18" delta="+3 vs last month" icon={<TicketIcon className="h-5 w-5" />} tone="orange" />
   <StatCard label="Cities explored" value="6" delta="Berlin, Lisbon +4" icon={<MapPinIcon className="h-5 w-5" />} tone="emerald" />
  </div>

  {/* Reminder + charts */}
  <div className="grid gap-6 xl:grid-cols-3">
   <Card className="xl:col-span-1">
   <CardHeader title="Upcoming reminder" subtitle="Your next alert" icon={<ClockIcon className="h-4 w-4" />} />
   <div className="p-5">
    <img
    src={nextEvent.image}
    alt={nextEvent.title}
    className="h-32 w-full rounded-xl object-cover" />
    
    <h3 className="mt-4 font-display text-base font-semibold text-text">
    {nextEvent.title}
    </h3>
    <p className="text-sm text-muted">
    {formatDate(nextEvent.date)} · {nextEvent.time} · {nextEvent.venue}
    </p>
    <div className="mt-4">
    <Countdown date={nextEvent.date} time={nextEvent.time} />
    </div>
    <div className="mt-4 flex gap-2">
    <Link to={`/events/${nextEvent.id}`} className="flex-1">
     <Button size="sm" className="w-full justify-center">
     View event
     </Button>
    </Link>
    <Link to="/calendar">
     <Button size="sm" variant="outline">
     <CalendarCheckIcon className="h-4 w-4" />
     </Button>
    </Link>
    </div>
   </div>
   </Card>

   <Card className="xl:col-span-2">
   <CardHeader
    title="Your activity"
    subtitle="Events viewed and saved over the last 7 days"
    icon={<EyeIcon className="h-4 w-4" />} />
   
   <div className="h-64 p-5">
    <ResponsiveContainer width="100%" height="100%">
    <BarChart data={userActivity}>
     <CartesianGrid strokeDasharray="3 3" stroke={chartStyles.grid} vertical={false} />
     <XAxis dataKey="day" stroke={chartStyles.axis} fontSize={12} tickLine={false} axisLine={false} />
     <YAxis stroke={chartStyles.axis} fontSize={12} tickLine={false} axisLine={false} />
     <ReTooltip
     contentStyle={{
      background: 'rgb(255 255 255)',
      border: '2px solid rgb(44 64 167)',
      borderRadius: 12,
      color: 'rgb(17 24 39)'
     }} />
     
     <Bar dataKey="viewed" fill="#F237A1" radius={[6, 6, 0, 0]} />
     <Bar dataKey="saved" fill="#2C40A7" radius={[6, 6, 0, 0]} />
    </BarChart>
    </ResponsiveContainer>
   </div>
   </Card>
  </div>

  {/* Recommended */}
  <section>
   <div className="mb-4 flex items-center justify-between">
   <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-text">
    <SparklesIcon className="h-5 w-5 text-primary dark:text-brand-300" />
    Recommended for you
    <Badge tone="cyan">AI picks</Badge>
   </h2>
   <Link to="/explore" className="text-sm font-medium text-secondary hover:border-b hover:border-primary/10">
    See all
   </Link>
   </div>
   <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
   {recommended.map((e) =>
   <EventCard key={e.id} event={e} />
   )}
   </div>
  </section>

  {/* Saved + nearby */}
  <div className="grid gap-6 xl:grid-cols-2">
   <section>
   <h2 className="mb-4 font-display text-lg font-semibold text-text">Saved events</h2>
   {savedEvents.length ?
   <div className="grid gap-5 sm:grid-cols-2">
    {savedEvents.slice(0, 2).map((e) =>
    <EventCard key={e.id} event={e} compact />
    )}
    </div> :

   <EmptyState
    icon={<BookmarkIcon className="h-7 w-7" />}
    title="Nothing saved yet"
    description="Tap the heart on any event to keep it here for later."
    action={
    <Link to="/explore">
     <Button>Explore events</Button>
     </Link>
    } />

   }
   </section>

   <section>
   <h2 className="mb-4 font-display text-lg font-semibold text-text">Nearby events</h2>
   <Card className="divide-y divide-line/60">
    {nearby.map((e) =>
    <Link
    key={e.id}
    to={`/events/${e.id}`}
    className="flex items-center gap-4 p-4 hover:bg-surface">
    
     <img src={e.image} alt="" className="h-14 w-14 rounded-xl object-cover" />
     <div className="min-w-0 flex-1">
     <p className="truncate text-sm font-medium text-text">{e.title}</p>
     <p className="truncate text-xs text-muted">
      {formatDate(e.date)} · {e.venue}
     </p>
     </div>
     <Badge tone="neutral">{e.distanceKm} km</Badge>
    </Link>
    )}
   </Card>
   </section>
  </div>

  {/* Recently viewed + trend */}
  <div className="grid gap-6 xl:grid-cols-3">
   <Card className="xl:col-span-2">
   <CardHeader title="Scene activity" subtitle="Events published in your cities" />
   <div className="h-56 p-5">
    <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={attendanceTrend}>
     <defs>
     <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#F237A1" stopOpacity={0.5} />
      <stop offset="100%" stopColor="#F237A1" stopOpacity={0} />
     </linearGradient>
     </defs>
     <CartesianGrid strokeDasharray="3 3" stroke={chartStyles.grid} vertical={false} />
     <XAxis dataKey="month" stroke={chartStyles.axis} fontSize={12} tickLine={false} axisLine={false} />
     <YAxis stroke={chartStyles.axis} fontSize={12} tickLine={false} axisLine={false} />
     <ReTooltip
     contentStyle={{
      background: 'rgb(255 255 255)',
      border: '2px solid rgb(44 64 167)',
      borderRadius: 12,
      color: 'rgb(17 24 39)'
     }} />
     
     <Area type="monotone" dataKey="events" stroke="#F237A1" strokeWidth={2} fill="url(#areaFill)" />
    </AreaChart>
    </ResponsiveContainer>
   </div>
   </Card>

   <Card>
   <CardHeader title="Recently viewed" icon={<EyeIcon className="h-4 w-4" />} />
   <div className="divide-y divide-line/60">
    {viewedEvents.map((e) =>
    <Link key={e.id} to={`/events/${e.id}`} className="flex items-center gap-3 p-4 hover:bg-surface">
     <img src={e.image} alt="" className="h-12 w-12 rounded-xl object-cover" />
     <div className="min-w-0">
     <p className="truncate text-sm font-medium text-text">{e.title}</p>
     <p className="truncate text-xs text-muted">{e.city}</p>
     </div>
    </Link>
    )}
   </div>
   </Card>
  </div>
  </div>
 </DashboardLayout>);

}