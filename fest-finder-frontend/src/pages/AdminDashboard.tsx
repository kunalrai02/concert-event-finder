import React, { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  XAxis,
  YAxis } from
'recharts';
import {
  BellIcon,
  CalendarClockIcon,
  DollarSignIcon,
  TicketIcon,
  UsersIcon } from
'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardHeader, StatCard } from '../components/ui/Card';
import { Badge } from '../components/ui/Primitives';
import { Button } from '../components/ui/Button';
import { Tabs, Dropdown } from '../components/ui/Overlays';
import { adminUsers, attendanceTrend, categoryShare, notificationsByChannel } from '../data/analytics';
import { events } from '../data/events';
import { venues } from '../data/directory';
import { formatDate } from '../utils/cn';
import { toast } from 'sonner';

const tooltipStyle = {
  background: '#1E2942',
  border: '1px solid #33415E',
  borderRadius: 12,
  color: '#F1F5F9'
};

export function AdminDashboard() {
  const [tab, setTab] = useState('users');

  return (
    <DashboardLayout
      title="Admin analytics"
      description="Platform health across users, events and delivery"
      actions={
      <Dropdown
        label="Last 30 days"
        items={[
        { id: '7', label: 'Last 7 days', onSelect: () => toast.message('Range: last 7 days') },
        { id: '30', label: 'Last 30 days', onSelect: () => toast.message('Range: last 30 days') },
        { id: '90', label: 'Last quarter', onSelect: () => toast.message('Range: last quarter') }]
        } />

      }>
      
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <StatCard label="Total users" value="48,210" delta="+6.2% MoM" icon={<UsersIcon className="h-5 w-5" />} />
          <StatCard label="Total events" value="3,164" delta="+142 new" icon={<TicketIcon className="h-5 w-5" />} tone="cyan" />
          <StatCard label="Upcoming events" value="892" delta="Next 60 days" icon={<CalendarClockIcon className="h-5 w-5" />} tone="orange" />
          <StatCard label="Notifications sent" value="29,100" delta="98.4% delivered" icon={<BellIcon className="h-5 w-5" />} tone="emerald" />
          <StatCard label="Revenue (projected)" value="$184K" delta="+11% vs plan" icon={<DollarSignIcon className="h-5 w-5" />} />
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader title="Growth" subtitle="Users and published events per month" />
            <div className="h-72 p-5">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" vertical={false} />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                  <ReTooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="users" stroke="#7C3AED" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="events" stroke="#06B6D4" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <CardHeader title="Category share" subtitle="Events by type" />
            <div className="h-72 p-5">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryShare}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={3}>
                    
                    {categoryShare.map((entry) =>
                    <Cell key={entry.name} fill={entry.color} stroke="none" />
                    )}
                  </Pie>
                  <ReTooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <Card>
          <CardHeader title="Notifications by channel" subtitle="Messages sent this month" />
          <div className="h-64 p-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={notificationsByChannel} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" horizontal={false} />
                <XAxis type="number" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="channel" type="category" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} width={80} />
                <ReTooltip contentStyle={tooltipStyle} />
                <Bar dataKey="sent" fill="#F97316" radius={[0, 6, 6, 0]} barSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="border-b border-line/60 p-4">
            <Tabs
              value={tab}
              onChange={setTab}
              tabs={[
              { id: 'users', label: 'Users' },
              { id: 'events', label: 'Events' },
              { id: 'venues', label: 'Venues' }]
              } />
            
          </div>
          <div className="overflow-x-auto">
            {tab === 'users' &&
            <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="text-xs uppercase tracking-wide text-muted">
                  <tr className="border-b border-line/60">
                    <th scope="col" className="px-5 py-3">Name</th>
                    <th scope="col" className="px-5 py-3">Email</th>
                    <th scope="col" className="px-5 py-3">City</th>
                    <th scope="col" className="px-5 py-3">Plan</th>
                    <th scope="col" className="px-5 py-3">Status</th>
                    <th scope="col" className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60">
                  {adminUsers.map((u) =>
                <tr key={u.id} className="hover:bg-elevated/40">
                      <td className="px-5 py-3 font-medium text-ink">{u.name}</td>
                      <td className="px-5 py-3 text-muted">{u.email}</td>
                      <td className="px-5 py-3 text-muted">{u.city}</td>
                      <td className="px-5 py-3">
                        <Badge tone={u.plan === 'Pro' ? 'brand' : 'neutral'}>{u.plan}</Badge>
                      </td>
                      <td className="px-5 py-3">
                        <Badge
                      tone={
                      u.status === 'Active' ?
                      'success' :
                      u.status === 'Invited' ?
                      'warning' :
                      'danger'
                      }>
                      
                          {u.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <Button size="sm" variant="ghost">
                          Manage
                        </Button>
                      </td>
                    </tr>
                )}
                </tbody>
              </table>
            }

            {tab === 'events' &&
            <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="text-xs uppercase tracking-wide text-muted">
                  <tr className="border-b border-line/60">
                    <th scope="col" className="px-5 py-3">Event</th>
                    <th scope="col" className="px-5 py-3">Category</th>
                    <th scope="col" className="px-5 py-3">Date</th>
                    <th scope="col" className="px-5 py-3">City</th>
                    <th scope="col" className="px-5 py-3 text-right">Seats left</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60">
                  {events.slice(0, 8).map((e) =>
                <tr key={e.id} className="hover:bg-elevated/40">
                      <td className="px-5 py-3 font-medium text-ink">{e.title}</td>
                      <td className="px-5 py-3">
                        <Badge tone="cyan">{e.category}</Badge>
                      </td>
                      <td className="px-5 py-3 text-muted">{formatDate(e.date)}</td>
                      <td className="px-5 py-3 text-muted">{e.city}</td>
                      <td className="px-5 py-3 text-right text-ink">{e.seatsLeft.toLocaleString()}</td>
                    </tr>
                )}
                </tbody>
              </table>
            }

            {tab === 'venues' &&
            <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="text-xs uppercase tracking-wide text-muted">
                  <tr className="border-b border-line/60">
                    <th scope="col" className="px-5 py-3">Venue</th>
                    <th scope="col" className="px-5 py-3">City</th>
                    <th scope="col" className="px-5 py-3 text-right">Capacity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60">
                  {venues.map((v) =>
                <tr key={v.id} className="hover:bg-elevated/40">
                      <td className="px-5 py-3 font-medium text-ink">{v.name}</td>
                      <td className="px-5 py-3 text-muted">{v.city}</td>
                      <td className="px-5 py-3 text-right text-ink">{v.capacity}</td>
                    </tr>
                )}
                </tbody>
              </table>
            }
          </div>
        </Card>
      </div>
    </DashboardLayout>);

}