import React, { useEffect, useMemo, useState } from 'react';
import { CompassIcon, LayoutGridIcon, ListIcon, SearchXIcon } from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { EventCard } from '../components/events/EventCard';
import { FilterSidebar, defaultFilters, type Filters } from '../components/events/FilterSidebar';
import { EmptyState, EventCardSkeleton } from '../components/ui/Primitives';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Field';
import { Pagination } from '../components/ui/Overlays';
import { events } from '../data/events';
import { cn } from '../utils/cn';

const PER_PAGE = 6;

export function Explore() {
 const [filters, setFilters] = useState<Filters>(defaultFilters);
 const [sort, setSort] = useState('popularity');
 const [layout, setLayout] = useState<'grid' | 'list'>('grid');
 const [loading, setLoading] = useState(true);
 const [page, setPage] = useState(1);

 useEffect(() => {
 const id = setTimeout(() => setLoading(false), 900);
 return () => clearTimeout(id);
 }, []);

 const filtered = useMemo(() => {
 const result = events.filter((e) => {
  if (filters.city !== 'all' && e.city !== filters.city) return false;
  if (filters.date && e.date < filters.date) return false;
  if (e.price > filters.maxPrice) return false;
  if (filters.categories.length && !filters.categories.includes(e.category)) return false;
  if (filters.genre !== 'all' && e.genre !== filters.genre) return false;
  if (filters.paid === 'free' && e.price !== 0) return false;
  if (filters.paid === 'paid' && e.price === 0) return false;
  if (filters.place === 'indoor' && e.outdoor) return false;
  if (filters.place === 'outdoor' && !e.outdoor) return false;
  return true;
 });
 const sorters: Record<string, (a: typeof events[number], b: typeof events[number]) => number> = {
  popularity: (a, b) => b.reviews - a.reviews,
  newest: (a, b) => a.date.localeCompare(b.date),
  nearest: (a, b) => a.distanceKm - b.distanceKm,
  price: (a, b) => a.price - b.price
 };
 return [...result].sort(sorters[sort]);
 }, [filters, sort]);

 const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
 const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

 return (
 <DashboardLayout
  title="Explore events"
  description={`${filtered.length} events match your filters`}>
  
  <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
  <FilterSidebar
   filters={filters}
   onChange={(f) => {
   setFilters(f);
   setPage(1);
   }} />
  

  <div className="min-w-0 space-y-5">
   <div className="bg-surface border border-line/10 flex flex-wrap items-center justify-between gap-3 rounded-xl p-3">
   <div className="flex items-center gap-2">
    <div className="flex rounded-xl border border-line/10 p-1">
    <button
     onClick={() => setLayout('grid')}
     aria-label="Grid view"
     aria-pressed={layout === 'grid'}
     className={cn(
     'grid h-8 w-8 place-items-center rounded-xl',
     layout === 'grid' ? 'bg-primary text-surface' : 'text-muted'
     )}>
     
     <LayoutGridIcon className="h-4 w-4" />
    </button>
    <button
     onClick={() => setLayout('list')}
     aria-label="List view"
     aria-pressed={layout === 'list'}
     className={cn(
     'grid h-8 w-8 place-items-center rounded-xl',
     layout === 'list' ? 'bg-primary text-surface' : 'text-muted'
     )}>
     
     <ListIcon className="h-4 w-4" />
    </button>
    </div>
   </div>
   <div className="w-48">
    <Select
    aria-label="Sort events"
    value={sort}
    onChange={(e) => setSort(e.target.value)}
    options={[
    { value: 'popularity', label: 'Sort: Popularity' },
    { value: 'newest', label: 'Sort: Newest' },
    { value: 'nearest', label: 'Sort: Nearest' },
    { value: 'price', label: 'Sort: Price' }]
    } />
    
   </div>
   </div>

   {loading ?
   <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
    {Array.from({ length: 6 }).map((_, i) =>
   <EventCardSkeleton key={i} />
   )}
   </div> :
   pageItems.length === 0 ?
   <EmptyState
   icon={<SearchXIcon className="h-7 w-7" />}
   title="No events match those filters"
   description="Try widening your price range, clearing categories, or picking a different city."
   action={<Button onClick={() => setFilters(defaultFilters)}>Reset filters</Button>} /> :


   <>
    <div
    className={cn(
    'grid gap-5',
    layout === 'grid' ? 'sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1 max-w-3xl'
    )}>
    
    {pageItems.map((event) =>
    <EventCard key={event.id} event={event} />
    )}
    </div>
    <Pagination page={page} totalPages={totalPages} onChange={setPage} />
   </>
   }
  </div>
  </div>
 </DashboardLayout>);

}