import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MenuIcon, MoonIcon, SunIcon, TicketIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { useApp } from '../../contexts/AppContext';
import { cn } from '../../utils/cn';

const links = [
{ to: '/explore', label: 'Explore' },
{ to: '/search', label: 'Search' },
{ to: '/calendar', label: 'Calendar' },
{ to: '/dashboard', label: 'Dashboard' }];


export function SiteHeader() {
 const { theme, toggleTheme } = useApp();
 const [open, setOpen] = useState(false);

 return (
 <header className="sticky top-0 z-40 border-b border-line/10 bg-bg/80 ">
  <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
  <Link to="/" className="flex items-center gap-2" aria-label="Concert & Festival Finder home">
   <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-surface">
   <TicketIcon className="h-5 w-5" />
   </span>
   <span className="font-display text-base font-semibold text-text">
   Concert<span className="text-primary dark:text-primary">&</span>Festival
   </span>
  </Link>

  <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
   {links.map((l) =>
   <NavLink
   key={l.to}
   to={l.to}
   className={({ isActive }) =>
   cn(
    'rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-200',
    isActive ? 'bg-surface text-text' : 'text-muted hover:text-text'
   )
   }>
   
    {l.label}
   </NavLink>
   )}
  </nav>

  <div className="flex items-center gap-2">
   <button
   onClick={toggleTheme}
   aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
   className="grid h-10 w-10 place-items-center rounded-xl border border-line/10 text-muted hover:text-text">
   
   {theme === 'dark' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
   </button>
   <Link
   to="/login"
   className="hidden h-10 items-center rounded-xl border border-line/10 px-4 text-sm font-medium text-text hover:border-primary/10 sm:inline-flex">
   
   Log in
   </Link>
   <Link
   to="/register"
   className="hidden h-10 items-center rounded-xl bg-primary px-4 text-sm font-medium text-surface hover:bg-primary sm:inline-flex">
   
   Sign up
   </Link>
   <button
   onClick={() => setOpen((o) => !o)}
   aria-label="Toggle navigation menu"
   aria-expanded={open}
   className="grid h-10 w-10 place-items-center rounded-xl border border-line/10 text-muted md:hidden">
   
   {open ? <XIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
   </button>
  </div>
  </div>

  {open &&
  <nav aria-label="Mobile" className="border-t border-line/10 px-4 py-3 md:hidden">
   <ul className="space-y-1">
   {links.map((l) =>
   <li key={l.to}>
    <NavLink
    to={l.to}
    onClick={() => setOpen(false)}
    className="block rounded-xl px-3 py-2 text-sm text-muted hover:bg-surface hover:text-text">
    
     {l.label}
    </NavLink>
    </li>
   )}
   </ul>
   <div className="mt-3 grid grid-cols-2 gap-2">
   <Link to="/login" onClick={() => setOpen(false)}>
    <Button variant="outline" className="w-full justify-center">
    Log in
    </Button>
   </Link>
   <Link to="/register" onClick={() => setOpen(false)}>
    <Button className="w-full justify-center">Sign up</Button>
   </Link>
   </div>
  </nav>
  }
 </header>);

}