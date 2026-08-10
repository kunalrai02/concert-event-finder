import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ListIcon, MapIcon, SearchIcon, SearchXIcon } from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { EventCard } from '../components/events/EventCard';
import { EventMap } from '../components/common/EventMap';
import { EmptyState, EventCardSkeleton } from '../components/ui/Primitives';
import { Chip, Input } from '../components/ui/Field';
import { Button } from '../components/ui/Button';
import { events } from '../data/events';
import { categories } from '../data/directory';
import { cn } from '../utils/cn';

const BATCH = 4;

export function SearchResults() {
 const [params, setParams] = useSearchParams();
 const [query, setQuery] = useState(params.get('q') ?? '');
 const [activeCats, setActiveCats] = useState<string[]>(
 params.get('category') ? [params.get('category') as string] : []
 );
 const [view, setView] = useState<'list' | 'map'>('list');
 const [visible, setVisible] = useState(BATCH);
 const [loading, setLoading] = useState(true);
 const sentinel = useRef<HTMLDivElement>(null);

 useEffect(() => {
 const id = setTimeout(() => setLoading(false), 700);
 return () => clearTimeout(id);
 }, []);

 const results = useMemo(() => {
 const q = query.trim().toLowerCase();
 return events.filter((e) => {
  const haystack = `${e.title} ${e.artist} ${e.city} ${e.venue} ${e.genre} ${e.category}`.toLowerCase();
  if (q && !haystack.includes(q)) return false;
  if (activeCats.length && !activeCats.includes(e.category)) return false;
  return true;
 });
 }, [query, activeCats]);

 useEffect(() => setVisible(BATCH), [query, activeCats]);

 useEffect(() => {
 const node = sentinel.current;
 if (!node) return;
 const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) setVisible((v) => Math.min(v + BATCH, results.length));
 });
 observer.observe(node);
 return () => observer.disconnect();
 }, [results.length]);

 return (
 <DashboardLayout title="Search results" description={`${results.length} events found`}>
  <div className="space-y-5">
  <form
   onSubmit={(e) => {
   e.preventDefault();
   setParams(query ? { q: query } : {});
   }}
   role="search"
   className="bg-surface border border-line/10 flex flex-col gap-3 rounded-xl p-3 sm:flex-row">
   
   <Input
   value={query}
   onChange={(e) => setQuery(e.target.value)}
   placeholder="Artist, festival, city or venue"
   aria-label="Search events"
   icon={<SearchIcon className="h-4 w-4" />} />
   
   <Button type="submit" className="shrink-0 justify-center">
   Search
   </Button>
  </form>

  <div className="flex flex-wrap items-center justify-between gap-3">
   <div className="flex flex-wrap gap-2">
   {categories.map((c) =>
   <Chip
    key={c}
    active={activeCats.includes(c)}
    onClick={() =>
    setActiveCats((prev) =>
    prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    )
    }>
    
    {c}
    </Chip>
   )}
   </div>
   <div className="flex rounded-xl border border-line/10 p-1">
   {(['list', 'map'] as const).map((v) =>
   <button
    key={v}
    onClick={() => setView(v)}
    aria-pressed={view === v}
    className={cn(
    'flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium capitalize',
    view === v ? 'bg-primary text-surface' : 'text-muted hover:text-text'
    )}>
    
    {v === 'list' ? <ListIcon className="h-4 w-4" /> : <MapIcon className="h-4 w-4" />}
    {v} view
    </button>
   )}
   </div>
  </div>

  {loading ?
  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
   {Array.from({ length: 3 }).map((_, i) =>
   <EventCardSkeleton key={i} />
   )}
   </div> :
  results.length === 0 ?
  <EmptyState
   icon={<SearchXIcon className="h-7 w-7" />}
   title={`No results for "${query}"`}
   description="Check the spelling, or try searching for a city or genre instead."
   action={
   <Button
   onClick={() => {
    setQuery('');
    setActiveCats([]);
   }}>
   
    Clear search
    </Button>
   } /> :

  view === 'map' ?
  <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
   <EventMap
   points={results.map((e) => ({
    id: e.id,
    lat: e.lat,
    lng: e.lng,
    title: e.title,
    subtitle: `${e.venue}, ${e.city}`
   }))}
   height={560}
   zoom={4} />
   
   <div className="max-h-[560px] space-y-4 overflow-y-auto pr-1">
    {results.map((e) =>
   <EventCard key={e.id} event={e} compact />
   )}
   </div>
   </div> :

  <>
   <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
    {results.slice(0, visible).map((e) =>
   <EventCard key={e.id} event={e} />
   )}
   </div>
   <div ref={sentinel} className="h-10" aria-hidden="true" />
   {visible < results.length &&
   <p className="text-center text-sm text-muted">Loading more events…</p>
   }
   </>
  }
  </div>
 </DashboardLayout>);

}