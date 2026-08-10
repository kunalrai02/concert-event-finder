import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BellRingIcon, CheckCircle2Icon, MailIcon, MessageCircleIcon, SendIcon, SmartphoneIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Checkbox, Select } from '../components/ui/Field';
import { Badge } from '../components/ui/Primitives';
import { events, getEvent } from '../data/events';
import { useApp } from '../contexts/AppContext';
import { formatDate } from '../utils/cn';
import type { NotificationChannel } from '../types';

const channelMeta: {id: NotificationChannel;icon: React.ElementType;hint: string;}[] = [
{ id: 'Email', icon: MailIcon, hint: 'sofia@studio.co' },
{ id: 'WhatsApp', icon: MessageCircleIcon, hint: '+49 170 000 0000' },
{ id: 'Telegram', icon: SendIcon, hint: '@sofia_a' },
{ id: 'SMS', icon: SmartphoneIcon, hint: '+49 170 000 0000' }];


export function ReminderCreate() {
 const [params] = useSearchParams();
 const { addReminder } = useApp();
 const [eventId, setEventId] = useState(params.get('event') ?? events[0].id);
 const [date, setDate] = useState('2026-08-09');
 const [time, setTime] = useState('19:30');
 const [channels, setChannels] = useState<NotificationChannel[]>(['Email', 'WhatsApp']);
 const [saved, setSaved] = useState(false);

 const event = getEvent(eventId) ?? events[0];

 const submit = (e: React.FormEvent) => {
 e.preventDefault();
 addReminder({ id: `rem-${Date.now()}`, eventId, date, time, channels });
 setSaved(true);
 };

 return (
 <DashboardLayout title="Create a reminder" description="Get nudged before doors open">
  <div className="grid max-w-5xl gap-6 lg:grid-cols-[1fr_340px]">
  <Card>
   <CardHeader
   title="Reminder details"
   subtitle="Choose when and how you want to be notified"
   icon={<BellRingIcon className="h-4 w-4" />} />
   
   <form onSubmit={submit} className="space-y-6 p-5">
   <Select
    label="Event"
    value={eventId}
    onChange={(e) => setEventId(e.target.value)}
    options={events.map((e) => ({ value: e.id, label: `${e.title} — ${e.city}` }))} />
   

   <div className="grid gap-4 sm:grid-cols-2">
    <div>
    <label htmlFor="rem-date" className="mb-1.5 block text-sm font-medium text-text">
     Reminder date
    </label>
    <input
     id="rem-date"
     type="date"
     value={date}
     onChange={(e) => setDate(e.target.value)}
     className="w-full rounded-xl border border-line/10 bg-surface px-3.5 py-2.5 text-sm text-text focus:border-primary/10 focus:outline-none"
     required />
    
    </div>
    <div>
    <label htmlFor="rem-time" className="mb-1.5 block text-sm font-medium text-text">
     Reminder time
    </label>
    <input
     id="rem-time"
     type="time"
     value={time}
     onChange={(e) => setTime(e.target.value)}
     className="w-full rounded-xl border border-line/10 bg-surface px-3.5 py-2.5 text-sm text-text focus:border-primary/10 focus:outline-none"
     required />
    
    </div>
   </div>

   <fieldset>
    <legend className="mb-2 text-sm font-medium text-text">Notification type</legend>
    <div className="grid gap-3 sm:grid-cols-2">
    {channelMeta.map((c) =>
    <Checkbox
     key={c.id}
     label={c.id}
     description={c.hint}
     checked={channels.includes(c.id)}
     onChange={(v) =>
     setChannels((prev) => v ? [...prev, c.id] : prev.filter((x) => x !== c.id))
     } />

    )}
    </div>
    {channels.length === 0 &&
    <p className="mt-2 text-xs text-danger ">Select at least one channel.</p>
    }
   </fieldset>

   <div className="flex gap-3">
    <Button type="submit" size="lg" disabled={channels.length === 0}>
    Save reminder
    </Button>
    <Link to="/notifications">
    <Button type="button" variant="ghost" size="lg">
     View history
    </Button>
    </Link>
   </div>

   {saved &&
   <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    role="status"
    className="flex items-start gap-3 rounded-xl border border-success/30 bg-surface border border-success/10 p-4">
    
    <CheckCircle2Icon className="mt-0.5 h-5 w-5 text-success " />
    <div>
     <p className="text-sm font-medium text-success">Reminder saved</p>
     <p className="text-xs text-muted">
     We will notify you on {channels.join(', ')} at {time} on {formatDate(date)}.
     </p>
    </div>
    </motion.div>
   }
   </form>
  </Card>

  <Card className="h-fit">
   <CardHeader title="Preview" subtitle="How your reminder will look" />
   <div className="space-y-4 p-5">
   <img src={event.image} alt="" className="h-28 w-full rounded-xl object-cover" />
   <div className="rounded-xl border border-line/10 bg-surface/60 p-4">
    <p className="text-xs font-semibold uppercase tracking-wide text-primary dark:text-brand-300">
    Concert&Festival
    </p>
    <p className="mt-2 text-sm font-medium text-text">
    {event.title} starts soon
    </p>
    <p className="mt-1 text-xs text-muted">
    {formatDate(event.date)} · {event.time} · {event.venue}, {event.city}
    </p>
    <p className="mt-3 text-xs text-muted">
    Tap to see the line-up, doors time and directions.
    </p>
   </div>
   <div className="flex flex-wrap gap-2">
    {channels.map((c) =>
    <Badge key={c} tone="cyan">
     {c}
    </Badge>
    )}
   </div>
   </div>
  </Card>
  </div>
 </DashboardLayout>);

}