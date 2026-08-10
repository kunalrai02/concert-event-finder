import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
 BellOffIcon,
 CheckCircle2Icon,
 ClockIcon,
 MailIcon,
 MessageCircleIcon,
 SendIcon,
 SmartphoneIcon,
 XCircleIcon } from
'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Badge, EmptyState } from '../components/ui/Primitives';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Overlays';
import { notificationHistory } from '../data/analytics';
import { useApp } from '../contexts/AppContext';
import type { NotificationChannel } from '../types';

const channelIcon: Record<NotificationChannel, React.ElementType> = {
 Email: MailIcon,
 WhatsApp: MessageCircleIcon,
 Telegram: SendIcon,
 SMS: SmartphoneIcon
};

const statusMeta = {
 Success: { tone: 'success' as const, icon: CheckCircle2Icon },
 Failed: { tone: 'danger' as const, icon: XCircleIcon },
 Pending: { tone: 'warning' as const, icon: ClockIcon }
};

export function NotificationHistory() {
 const { clearUnread } = useApp();
 const [range, setRange] = useState('today');

 useEffect(() => clearUnread(), [clearUnread]);

 const items = notificationHistory.filter((n) =>
 range === 'today' ?
 n.bucket === 'today' :
 range === 'week' ?
 n.bucket !== 'month' :
 true
 );

 return (
 <DashboardLayout
  title="Notification history"
  description="Every reminder we sent on your behalf">
  
  <div className="max-w-4xl space-y-6">
  <Tabs
   value={range}
   onChange={setRange}
   tabs={[
   { id: 'today', label: 'Today' },
   { id: 'week', label: 'This week' },
   { id: 'month', label: 'This month' }]
   } />
  

  {items.length === 0 ?
  <EmptyState
   icon={<BellOffIcon className="h-7 w-7" />}
   title="No notifications in this period"
   description="Set a reminder on an event and delivery records will appear here."
   action={
   <Link to="/reminders/new">
    <Button>Create a reminder</Button>
    </Link>
   } /> :


  <ol className="relative space-y-4 border-l border-line/70 pl-6">
   {items.map((n) => {
   const Icon = channelIcon[n.channel];
   const status = statusMeta[n.status];
   const StatusIcon = status.icon;
   return (
    <li key={n.id} className="relative">
     <span className="absolute -left-[31px] top-4 grid h-6 w-6 place-items-center rounded-xl border border-line/10 bg-surface text-primary dark:text-brand-300">
     <Icon className="h-3 w-3" />
     </span>
     <div className="bg-surface border border-line/10 rounded-xl p-4">
     <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
      <p className="text-sm font-medium text-text">{n.eventName}</p>
      <p className="mt-1 text-xs text-muted">Scheduled {n.reminderDate}</p>
      </div>
      <Badge tone={status.tone}>
      <StatusIcon className="h-3 w-3" />
      {n.status}
      </Badge>
     </div>
     <dl className="mt-3 grid gap-2 text-xs text-muted sm:grid-cols-3">
      <div>
      <dt className="text-muted/70">Channel</dt>
      <dd className="text-text">{n.channel}</dd>
      </div>
      <div>
      <dt className="text-muted/70">Delivered at</dt>
      <dd className="text-text">{n.deliveredTime}</dd>
      </div>
      <div>
      <dt className="text-muted/70">Result</dt>
      <dd className="text-text">
       {n.status === 'Failed' ? 'Carrier rejected — retry available' : 'Delivered'}
      </dd>
      </div>
     </dl>
     {n.status === 'Failed' &&
     <Button size="sm" variant="outline" className="mt-3">
      Retry delivery
      </Button>
     }
     </div>
    </li>);

   })}
   </ol>
  }
  </div>
 </DashboardLayout>);

}