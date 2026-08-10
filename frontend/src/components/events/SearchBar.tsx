import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, LayersIcon, SearchIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { categories } from '../../data/directory';

export function SearchBar({ variant = 'hero' }: {variant?: 'hero' | 'inline';}) {
 const navigate = useNavigate();
 const [query, setQuery] = useState('');
 const [date, setDate] = useState('');
 const [category, setCategory] = useState('all');

 const submit = (e: React.FormEvent) => {
 e.preventDefault();
 const params = new URLSearchParams();
 if (query) params.set('q', query);
 if (date) params.set('date', date);
 if (category !== 'all') params.set('category', category);
 navigate(`/search?${params.toString()}`);
 };

 return (
 <form
  onSubmit={submit}
  role="search"
  aria-label="Search events"
  className={
  variant === 'hero' ?
  'bg-surface border border-line/10 grid w-full gap-3 rounded-xl p-3 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_auto]' :
  'bg-surface border border-line/10 grid w-full gap-3 rounded-xl p-2 sm:grid-cols-[1.6fr_1fr_1fr_auto]'
  }>
  
  <div className="relative">
  <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
  <input
   value={query}
   onChange={(e) => setQuery(e.target.value)}
   placeholder="Artist, festival, city or venue"
   aria-label="Search by artist, festival, city or venue"
   className="h-12 w-full rounded-xl border border-line/10 bg-surface pl-10 pr-3 text-sm text-text placeholder:text-muted/80 focus:border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/25" />
  
  </div>

  <div className="relative">
  <CalendarIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
  <input
   type="date"
   value={date}
   onChange={(e) => setDate(e.target.value)}
   aria-label="Event date"
   className="h-12 w-full rounded-xl border border-line/10 bg-surface pl-10 pr-3 text-sm text-text focus:border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/25" />
  
  </div>

  <div className="relative">
  <LayersIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
  <select
   value={category}
   onChange={(e) => setCategory(e.target.value)}
   aria-label="Category"
   className="h-12 w-full appearance-none rounded-xl border border-line/10 bg-surface pl-10 pr-8 text-sm text-text focus:border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/25">
   
   <option value="all">All categories</option>
   {categories.map((c) =>
   <option key={c} value={c}>
    {c}
   </option>
   )}
  </select>
  </div>

  <Button type="submit" size="lg" className="h-12 justify-center">
  <SearchIcon className="h-4 w-4" />
  Search
  </Button>
 </form>);

}