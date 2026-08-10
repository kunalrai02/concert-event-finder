import React, { useState } from 'react';
import { CameraIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { toast } from 'sonner';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardHeader } from '../components/ui/Card';
import { Avatar, Badge } from '../components/ui/Primitives';
import { Button } from '../components/ui/Button';
import { Chip, Input, Select, Toggle } from '../components/ui/Field';
import { Modal } from '../components/ui/Overlays';
import { cities, genres } from '../data/directory';
import type { NotificationChannel } from '../types';

const connections = [
{ id: 'google', name: 'Google', detail: 'sofia@studio.co', connected: true },
{ id: 'telegram', name: 'Telegram', detail: '@sofia_a', connected: true },
{ id: 'whatsapp', name: 'WhatsApp', detail: 'Not connected', connected: false }];


export function Profile() {
 const [editing, setEditing] = useState(false);
 const [deleteOpen, setDeleteOpen] = useState(false);
 const [favorites, setFavorites] = useState<string[]>(['Indie Pop', 'Electronic', 'Jazz']);
 const [channels, setChannels] = useState<Record<NotificationChannel, boolean>>({
 Email: true,
 WhatsApp: true,
 Telegram: false,
 SMS: false
 });

 return (
 <DashboardLayout title="Profile" description="Manage your details and preferences">
  <div className="grid max-w-5xl gap-6 lg:grid-cols-[320px_1fr]">
  <Card className="h-fit p-6 text-center">
   <div className="relative mx-auto w-fit">
   <Avatar name="Sofia Almeida" size="lg" />
   <button
    aria-label="Change profile picture"
    className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-xl border border-line/10 bg-surface text-muted hover:text-text">
    
    <CameraIcon className="h-4 w-4" />
   </button>
   </div>
   <h2 className="mt-4 font-display text-lg font-semibold text-text">Sofia Almeida</h2>
   <p className="text-sm text-muted">Festival regular · Lisbon</p>
   <div className="mt-4 flex flex-wrap justify-center gap-2">
   <Badge tone="brand">Pro member</Badge>
   <Badge tone="cyan">18 events attended</Badge>
   </div>
   <div className="mt-6 space-y-2 text-left text-sm">
   <p className="flex items-center gap-2 text-muted">
    <MailIcon className="h-4 w-4" /> sofia@studio.co
   </p>
   <p className="flex items-center gap-2 text-muted">
    <PhoneIcon className="h-4 w-4" /> +351 910 000 000
   </p>
   <p className="flex items-center gap-2 text-muted">
    <MapPinIcon className="h-4 w-4" /> Lisbon, Portugal
   </p>
   </div>
   <div className="mt-6 space-y-2">
   <Button className="w-full justify-center" onClick={() => setEditing(true)}>
    Edit profile
   </Button>
   <Button
    variant="outline"
    className="w-full justify-center"
    onClick={() => toast.success('Password reset link sent')}>
    
    Change password
   </Button>
   <Button
    variant="ghost"
    className="w-full justify-center text-danger "
    onClick={() => setDeleteOpen(true)}>
    
    Delete account
   </Button>
   </div>
  </Card>

  <div className="space-y-6">
   <Card>
   <CardHeader title="Personal information" />
   <div className="grid gap-4 p-5 sm:grid-cols-2">
    <Input label="Full name" defaultValue="Sofia Almeida" disabled={!editing} />
    <Input label="Email" defaultValue="sofia@studio.co" disabled={!editing} />
    <Input label="Phone" defaultValue="+351 910 000 000" disabled={!editing} />
    <Select
    label="Location"
    defaultValue="Lisbon"
    disabled={!editing}
    options={cities.map((c) => ({ value: c.name, label: `${c.name}, ${c.country}` }))} />
    
    {editing &&
    <div className="sm:col-span-2 flex gap-3">
     <Button
     onClick={() => {
     setEditing(false);
     toast.success('Profile updated');
     }}>
     
     Save changes
     </Button>
     <Button variant="ghost" onClick={() => setEditing(false)}>
     Cancel
     </Button>
    </div>
    }
   </div>
   </Card>

   <Card>
   <CardHeader title="Favorite categories" subtitle="Used to personalise recommendations" />
   <div className="flex flex-wrap gap-2 p-5">
    {genres.map((g) =>
    <Chip
    key={g}
    active={favorites.includes(g)}
    onClick={() =>
    setFavorites((prev) =>
    prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    )
    }>
    
     {g}
    </Chip>
    )}
   </div>
   </Card>

   <Card>
   <CardHeader title="Notification settings" />
   <div className="divide-y divide-line/60 px-5">
    {(Object.keys(channels) as NotificationChannel[]).map((c) =>
    <Toggle
    key={c}
    label={c}
    description={`Receive event reminders via ${c}`}
    checked={channels[c]}
    onChange={(v) => setChannels((prev) => ({ ...prev, [c]: v }))} />

    )}
   </div>
   </Card>

   <Card>
   <CardHeader title="Connected accounts" />
   <ul className="divide-y divide-line/60">
    {connections.map((c) =>
    <li key={c.id} className="flex items-center justify-between gap-4 p-5">
     <div>
     <p className="text-sm font-medium text-text">{c.name}</p>
     <p className="text-xs text-muted">{c.detail}</p>
     </div>
     <Button
     size="sm"
     variant={c.connected ? 'outline' : 'primary'}
     onClick={() =>
     toast.success(c.connected ? `${c.name} disconnected` : `${c.name} connected`)
     }>
     
     {c.connected ? 'Disconnect' : 'Connect'}
     </Button>
    </li>
    )}
   </ul>
   </Card>
  </div>
  </div>

  <Modal
  open={deleteOpen}
  onClose={() => setDeleteOpen(false)}
  title="Delete your account?"
  description="This removes your saved events, reminders and history. This cannot be undone."
  footer={
  <>
   <Button variant="ghost" onClick={() => setDeleteOpen(false)}>
    Keep account
   </Button>
   <Button
   variant="danger"
   onClick={() => {
    setDeleteOpen(false);
    toast.error('Account scheduled for deletion');
   }}>
   
    Delete account
   </Button>
   </>
  } />
  
 </DashboardLayout>);

}