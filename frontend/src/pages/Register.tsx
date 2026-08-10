import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LockIcon, MailIcon, PhoneIcon, TicketIcon, UserIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Checkbox, Chip, Input, Select } from '../components/ui/Field';
import { cities, genres } from '../data/directory';
import { IMAGES } from '../data/events';
import type { NotificationChannel } from '../types';

const channels: NotificationChannel[] = ['Email', 'WhatsApp', 'Telegram', 'SMS'];

export function Register() {
 const navigate = useNavigate();
 const [form, setForm] = useState({
 name: '',
 email: '',
 phone: '',
 password: '',
 confirm: '',
 city: 'Berlin'
 });
 const [favoriteGenres, setFavoriteGenres] = useState<string[]>(['Indie Pop', 'Electronic']);
 const [prefs, setPrefs] = useState<NotificationChannel[]>(['Email', 'WhatsApp']);
 const [error, setError] = useState('');
 const [loading, setLoading] = useState(false);

 const set = (key: keyof typeof form, value: string) => setForm((f) => ({ ...f, [key]: value }));

 const submit = (e: React.FormEvent) => {
 e.preventDefault();
 if (form.password !== form.confirm) {
  setError('Passwords do not match.');
  return;
 }
 setError('');
 setLoading(true);
 setTimeout(() => navigate('/dashboard'), 700);
 };

 return (
 <div className="grid min-h-screen w-full bg-bg lg:grid-cols-[1.1fr_1fr]">
  <div className="px-6 py-12 sm:px-12 lg:px-20">
  <Link to="/" className="mb-10 flex items-center gap-2">
   <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-surface">
   <TicketIcon className="h-5 w-5" />
   </span>
   <span className="font-display text-base font-semibold text-text">Concert&Festival</span>
  </Link>

  <div className="w-full max-w-2xl">
   <h1 className="font-display text-3xl font-semibold text-text">Create your account</h1>
   <p className="mt-2 text-sm text-muted">
   Tell us what you like and where you are — we will handle the reminders.
   </p>

   <form onSubmit={submit} className="mt-8 space-y-6" noValidate>
   <div className="grid gap-4 sm:grid-cols-2">
    <Input
    label="Full name"
    value={form.name}
    onChange={(e) => set('name', e.target.value)}
    icon={<UserIcon className="h-4 w-4" />}
    placeholder="Sofia Almeida"
    required />
    
    <Input
    label="Email"
    type="email"
    value={form.email}
    onChange={(e) => set('email', e.target.value)}
    icon={<MailIcon className="h-4 w-4" />}
    placeholder="you@example.com"
    required />
    
    <Input
    label="Phone number"
    type="tel"
    value={form.phone}
    onChange={(e) => set('phone', e.target.value)}
    icon={<PhoneIcon className="h-4 w-4" />}
    placeholder="+49 170 000 0000" />
    
    <Select
    label="Preferred city"
    value={form.city}
    onChange={(e) => set('city', e.target.value)}
    options={cities.map((c) => ({ value: c.name, label: c.name }))} />
    
    <Input
    label="Password"
    type="password"
    value={form.password}
    onChange={(e) => set('password', e.target.value)}
    icon={<LockIcon className="h-4 w-4" />}
    hint="At least 8 characters"
    required />
    
    <Input
    label="Confirm password"
    type="password"
    value={form.confirm}
    onChange={(e) => set('confirm', e.target.value)}
    icon={<LockIcon className="h-4 w-4" />}
    error={error}
    required />
    
   </div>

   <fieldset>
    <legend className="mb-2 text-sm font-medium text-text">Favorite genres</legend>
    <div className="flex flex-wrap gap-2">
    {genres.map((g) =>
    <Chip
     key={g}
     active={favoriteGenres.includes(g)}
     onClick={() =>
     setFavoriteGenres((prev) =>
     prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
     )
     }>
     
     {g}
     </Chip>
    )}
    </div>
   </fieldset>

   <fieldset>
    <legend className="mb-2 text-sm font-medium text-text">
    Notification preferences
    </legend>
    <div className="grid gap-3 sm:grid-cols-2">
    {channels.map((c) =>
    <Checkbox
     key={c}
     label={c}
     description={
     c === 'Email' ?
     'Weekly digest and reminders' :
     `Instant alerts via ${c}`
     }
     checked={prefs.includes(c)}
     onChange={(v) =>
     setPrefs((prev) => v ? [...prev, c] : prev.filter((x) => x !== c))
     } />

    )}
    </div>
   </fieldset>

   <Button type="submit" size="lg" loading={loading} className="w-full justify-center">
    Create account
   </Button>

   <p className="text-sm text-muted">
    Already have an account?{' '}
    <Link to="/login" className="font-medium text-primary dark:text-brand-300 hover:border-b hover:border-primary/10">
    Log in
    </Link>
   </p>
   </form>
  </div>
  </div>

  <div className="relative hidden items-center justify-center overflow-hidden border-l border-line/60 bg-surface/40 lg:flex">
  <img
   src={IMAGES.auth}
   alt="Illustration of a concert stage surrounded-xl by tickets and calendar reminders"
   className="max-h-[80vh] w-auto animate-floaty object-contain" />
  
  </div>
 </div>);

}