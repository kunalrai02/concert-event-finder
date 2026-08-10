import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
 BarChart3Icon,
 BellIcon,
 BookmarkIcon,
 CalendarDaysIcon,
 CompassIcon,
 HeartIcon,
 HomeIcon,
 LogOutIcon,
 MenuIcon,
 MoonIcon,
 SearchIcon,
 SettingsIcon,
 SunIcon,
 TicketIcon,
 UserIcon,
 XIcon } from
'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { cn } from '../../utils/cn';
import { Avatar } from '../ui/Primitives';

const nav = [
{ to: '/dashboard', label: 'Dashboard', icon: HomeIcon },
{ to: '/explore', label: 'Explore events', icon: CompassIcon },
{ to: '/saved', label: 'Saved events', icon: BookmarkIcon },
{ to: '/calendar', label: 'My calendar', icon: CalendarDaysIcon },
{ to: '/notifications', label: 'Notifications', icon: BellIcon },
{ to: '/favorites', label: 'Favorites', icon: HeartIcon },
{ to: '/admin', label: 'Admin analytics', icon: BarChart3Icon },
{ to: '/settings', label: 'Settings', icon: SettingsIcon }];


const mobileNav = [
{ to: '/dashboard', label: 'Home', icon: HomeIcon },
{ to: '/search', label: 'Search', icon: SearchIcon },
{ to: '/calendar', label: 'Calendar', icon: CalendarDaysIcon },
{ to: '/favorites', label: 'Favorites', icon: HeartIcon },
{ to: '/profile', label: 'Profile', icon: UserIcon }];


export function DashboardLayout({
 title,
 description,
 actions,
 children





}: {title: string;description?: string;actions?: React.ReactNode;children: React.ReactNode;}) {
 const { theme, toggleTheme, unreadCount } = useApp();
 const [open, setOpen] = useState(false);
 const navigate = useNavigate();

 const sidebar =
 <div className="flex h-full flex-col">
  <Link to="/" className="flex items-center gap-2 px-5 py-5">
  <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-surface">
   <TicketIcon className="h-5 w-5" />
  </span>
  <span className="font-display text-sm font-semibold text-text">Concert&Festival</span>
  </Link>
  <nav aria-label="Dashboard" className="flex-1 space-y-1 px-3">
  {nav.map((item) =>
  <NavLink
  key={item.to}
  to={item.to}
  onClick={() => setOpen(false)}
  className={({ isActive }) =>
  cn(
   'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors duration-200',
   isActive ?
   'bg-primary/15 text-brand-800 dark:text-brand-200' :
   'text-text hover:bg-surface'
  )
  }>
  
   <item.icon className="h-4 w-4" />
   {item.label}
   {item.to === '/notifications' && unreadCount > 0 &&
  <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-xl bg-warning px-1.5 text-[11px] font-semibold text-surface">
    {unreadCount}
    </span>
  }
   </NavLink>
  )}
  </nav>
  <div className="border-t border-line/10 p-3">
  <Link
  to="/profile"
  className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-surface">
  
   <Avatar name="Sofia Almeida" size="sm" />
   <span className="min-w-0">
   <span className="block truncate text-sm font-bold text-text">Sofia Almeida</span>
   <span className="block truncate text-xs text-muted">sofia@studio.co</span>
   </span>
  </Link>
  <button
  onClick={() => navigate('/login')}
  className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-text hover:bg-surface hover:text-danger ">
  
   <LogOutIcon className="h-4 w-4" />
   Logout
  </button>
  </div>
 </div>;


 return (
 <div className="flex min-h-screen w-full bg-bg">

  {open &&
  <div className="fixed inset-0 z-50">
   <div className="absolute inset-0 bg-slate-950/70" onClick={() => setOpen(false)} />
   <aside className="absolute inset-y-0 left-0 w-72 border-r border-line/10 bg-surface">
   <button
   onClick={() => setOpen(false)}
   aria-label="Close menu"
   className="absolute right-3 top-5 rounded-xl p-1.5 text-muted hover:text-text">
   
    <XIcon className="h-5 w-5" />
   </button>
   {sidebar}
   </aside>
  </div>
  }

  <div className="flex min-w-0 flex-1 flex-col">
  <header className="sticky top-0 z-30 border-b border-line/10 bg-bg/80 px-4 py-3 sm:px-6">
   <div className="flex items-center gap-3">
   <button
    onClick={() => setOpen(true)}
    aria-label="Open menu"
    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line/10 text-muted hover:text-text">
    
    <MenuIcon className="h-4 w-4" />
   </button>
   <div className="min-w-0 flex-1">
    <h1 className="truncate font-display text-lg font-semibold text-text sm:text-xl">
    {title}
    </h1>
    {description && <p className="truncate text-sm text-muted">{description}</p>}
   </div>
   <div className="flex items-center gap-2">
    {actions}
    <button
    onClick={toggleTheme}
    aria-label="Toggle theme"
    className="grid h-10 w-10 place-items-center rounded-xl border border-line/10 text-muted hover:text-text">
    
    {theme === 'dark' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
    </button>
    <Link
    to="/notifications"
    aria-label={`Notifications, ${unreadCount} unread`}
    className="relative grid h-10 w-10 place-items-center rounded-xl border border-line/10 text-muted hover:text-text">
    
    <BellIcon className="h-4 w-4" />
    {unreadCount > 0 &&
    <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-xl bg-warning px-1 text-[10px] font-semibold text-surface">
     {unreadCount}
     </span>
    }
    </Link>
   </div>
   </div>
  </header>

  <main className="flex-1 px-4 pb-28 pt-6 sm:px-6 lg:pb-10">{children}</main>

  <nav
   aria-label="Mobile navigation"
   className="fixed inset-x-0 bottom-0 z-40 border-t border-line/10 bg-surface/95 lg:hidden">
   
   <ul className="grid grid-cols-5">
   {mobileNav.map((item) =>
   <li key={item.to}>
    <NavLink
    to={item.to}
    className={({ isActive }) =>
    cn(
     'flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium',
     isActive ? 'text-primary dark:text-brand-300' : 'text-muted'
    )
    }>
    
     <item.icon className="h-5 w-5" />
     {item.label}
    </NavLink>
    </li>
   )}
   </ul>
  </nav>

  <Link
   to="/search"
   aria-label="Quick search"
   className="fixed bottom-20 right-5 z-40 grid h-14 w-14 place-items-center rounded-xl bg-primary text-surface hover:bg-primary lg:hidden">
   
   <SearchIcon className="h-5 w-5" />
  </Link>
  </div>
 </div>);

}