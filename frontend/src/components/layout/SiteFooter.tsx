import React from 'react';
import { Link } from 'react-router-dom';
import { InstagramIcon, TicketIcon, TwitterIcon, YoutubeIcon } from 'lucide-react';

const columns = [
{
 title: 'Discover',
 links: [
 { label: 'Trending events', to: '/explore' },
 { label: 'Festivals', to: '/explore' },
 { label: 'Comedy', to: '/explore' },
 { label: 'Food & drink', to: '/explore' }]

},
{
 title: 'Account',
 links: [
 { label: 'Dashboard', to: '/dashboard' },
 { label: 'Favorites', to: '/favorites' },
 { label: 'Calendar', to: '/calendar' },
 { label: 'Settings', to: '/settings' }]

},
{
 title: 'Company',
 links: [
 { label: 'About', to: '/' },
 { label: 'Careers', to: '/' },
 { label: 'Press', to: '/' },
 { label: 'Contact', to: '/' }]

}];


export function SiteFooter() {
 return (
 <footer className="border-t border-line/10 bg-surface/40">
  <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
  <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
   <div>
   <div className="flex items-center gap-2">
    <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-surface">
    <TicketIcon className="h-5 w-5" />
    </span>
    <span className="font-display text-base font-semibold text-text">
    Concert<span className="text-primary dark:text-primary">&</span>Festival
    </span>
   </div>
   <p className="mt-4 max-w-xs text-sm text-muted">
    Never miss a show again. Discover concerts, festivals and local events near you — with
    reminders on every channel you use.
   </p>
   <div className="mt-5 flex gap-2">
    {[TwitterIcon, InstagramIcon, YoutubeIcon].map((Icon, i) =>
    <a
    key={i}
    href="#"
    aria-label="Social media"
    className="grid h-9 w-9 place-items-center rounded-xl border border-line/10 text-muted hover:border-primary/10 hover:text-text">
    
     <Icon className="h-4 w-4" />
    </a>
    )}
   </div>
   </div>

   {columns.map((col) =>
   <div key={col.title}>
    <h3 className="font-display text-sm font-semibold text-text">{col.title}</h3>
    <ul className="mt-4 space-y-2.5">
    {col.links.map((l) =>
    <li key={l.label}>
     <Link to={l.to} className="text-sm text-muted hover:text-text">
      {l.label}
     </Link>
     </li>
    )}
    </ul>
   </div>
   )}
  </div>

  <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-line/10 pt-6 text-xs text-muted sm:flex-row">
   <p>© 2026 Concert & Festival Finder. All rights reserved.</p>
   <div className="flex gap-5">
   <a href="#" className="hover:text-text">
    Privacy
   </a>
   <a href="#" className="hover:text-text">
    Terms
   </a>
   <a href="#" className="hover:text-text">
    Cookies
   </a>
   </div>
  </div>
  </div>
 </footer>);

}