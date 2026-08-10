import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LockIcon, MailIcon, TicketIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Field';
import { IMAGES } from '../data/events';

export function Login() {
 const navigate = useNavigate();
 const [email, setEmail] = useState('sofia@studio.co');
 const [password, setPassword] = useState('');
 const [remember, setRemember] = useState(true);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');

 const submit = (e: React.FormEvent) => {
 e.preventDefault();
 if (password.length < 6) {
  setError('Password must be at least 6 characters.');
  return;
 }
 setError('');
 setLoading(true);
 setTimeout(() => navigate('/dashboard'), 700);
 };

 return (
 <div className="grid min-h-screen w-full bg-bg lg:grid-cols-2">
  <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20">
  <Link to="/" className="mb-10 flex items-center gap-2">
   <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-surface">
   <TicketIcon className="h-5 w-5" />
   </span>
   <span className="font-display text-base font-semibold text-text">Concert&Festival</span>
  </Link>

  <div className="w-full max-w-md">
   <h1 className="font-display text-3xl font-semibold text-text">Welcome back</h1>
   <p className="mt-2 text-sm text-muted">
   Log in to track your saved events, reminders and calendar.
   </p>

   <form onSubmit={submit} className="mt-8 space-y-5" noValidate>
   <Input
    label="Email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    icon={<MailIcon className="h-4 w-4" />}
    placeholder="you@example.com"
    autoComplete="email"
    required />
   
   <Input
    label="Password"
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    icon={<LockIcon className="h-4 w-4" />}
    placeholder="••••••••"
    autoComplete="current-password"
    error={error}
    required />
   

   <div className="flex items-center justify-between">
    <label className="flex cursor-pointer items-center gap-2 text-sm text-muted">
    <input
     type="checkbox"
     checked={remember}
     onChange={(e) => setRemember(e.target.checked)}
     className="h-4 w-4 rounded-xl border-line/10 bg-transparent text-primary focus:ring-primary" />
    
    Remember me
    </label>
    <a href="#" className="text-sm font-medium text-secondary hover:border-b hover:border-primary/10">
    Forgot password?
    </a>
   </div>

   <Button type="submit" size="lg" loading={loading} className="w-full justify-center">
    Log in
   </Button>

   <div className="flex items-center gap-3">
    <span className="h-px flex-1 bg-line" />
    <span className="text-xs uppercase tracking-wide text-muted">or</span>
    <span className="h-px flex-1 bg-line" />
   </div>

   <Button
    type="button"
    variant="secondary"
    size="lg"
    className="w-full justify-center"
    onClick={() => navigate('/dashboard')}>
    
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
    <path
     fill="#EA4335"
     d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1a6.2 6.2 0 1 1 0-12.4c1.9 0 3.2.8 3.9 1.5l2.7-2.6A9.7 9.7 0 0 0 12 2a10 10 0 1 0 0 20c5.8 0 9.6-4 9.6-9.7 0-.7-.1-1.2-.2-1.7H12z" />
    
    </svg>
    Continue with Google
   </Button>
   </form>

   <p className="mt-8 text-sm text-muted">
   New here?{' '}
   <Link to="/register" className="font-medium text-primary dark:text-brand-300 hover:border-b hover:border-primary/10">
    Create an account
   </Link>
   </p>
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