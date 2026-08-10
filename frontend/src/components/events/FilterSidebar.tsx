import React from 'react';
import { SlidersHorizontalIcon } from 'lucide-react';
import { Checkbox, Chip, Select } from '../ui/Field';
import { Button } from '../ui/Button';
import { categories, cities, genres } from '../../data/directory';

export interface Filters {
 city: string;
 date: string;
 maxPrice: number;
 categories: string[];
 genre: string;
 paid: 'all' | 'free' | 'paid';
 place: 'all' | 'indoor' | 'outdoor';
}

export const defaultFilters: Filters = {
 city: 'all',
 date: '',
 maxPrice: 200,
 categories: [],
 genre: 'all',
 paid: 'all',
 place: 'all'
};

export function FilterSidebar({
 filters,
 onChange



}: {filters: Filters;onChange: (filters: Filters) => void;}) {
 const set = <K extends keyof Filters,>(key: K, value: Filters[K]) =>
 onChange({ ...filters, [key]: value });

 return (
 <aside
  aria-label="Event filters"
  className="bg-surface border border-line/10 h-fit space-y-6 rounded-xl p-5 lg:sticky lg:top-24">
  
  <div className="flex items-center justify-between">
  <h2 className="flex items-center gap-2 font-display text-base font-semibold text-text">
   <SlidersHorizontalIcon className="h-4 w-4 text-primary dark:text-brand-300" />
   Filters
  </h2>
  <button
   onClick={() => onChange(defaultFilters)}
   className="text-xs font-medium text-secondary hover:border-b hover:border-primary/10">
   
   Reset
  </button>
  </div>

  <Select
  label="Location"
  value={filters.city}
  onChange={(e) => set('city', e.target.value)}
  options={[
  { value: 'all', label: 'All cities' },
  ...cities.map((c) => ({ value: c.name, label: c.name }))]
  } />
  

  <div>
  <label htmlFor="filter-date" className="mb-1.5 block text-sm font-medium text-text">
   Date from
  </label>
  <input
   id="filter-date"
   type="date"
   value={filters.date}
   onChange={(e) => set('date', e.target.value)}
   className="w-full rounded-xl border border-line/10 bg-surface px-3.5 py-2.5 text-sm text-text focus:border-primary/10 focus:outline-none" />
  
  </div>

  <div>
  <div className="mb-2 flex items-center justify-between">
   <label htmlFor="filter-price" className="text-sm font-medium text-text">
   Max price
   </label>
   <span className="text-sm text-primary dark:text-brand-300">${filters.maxPrice}</span>
  </div>
  <input
   id="filter-price"
   type="range"
   min={0}
   max={200}
   step={5}
   value={filters.maxPrice}
   onChange={(e) => set('maxPrice', Number(e.target.value))}
   className="w-full accent-[#F237A1]" />
  
  </div>

  <fieldset>
  <legend className="mb-2 text-sm font-medium text-text">Category</legend>
  <div className="flex flex-wrap gap-2">
   {categories.map((c) =>
   <Chip
   key={c}
   active={filters.categories.includes(c)}
   onClick={() =>
   set(
    'categories',
    filters.categories.includes(c) ?
    filters.categories.filter((x) => x !== c) :
    [...filters.categories, c]
   )
   }>
   
    {c}
   </Chip>
   )}
  </div>
  </fieldset>

  <Select
  label="Genre"
  value={filters.genre}
  onChange={(e) => set('genre', e.target.value)}
  options={[
  { value: 'all', label: 'All genres' },
  ...genres.map((g) => ({ value: g, label: g }))]
  } />
  

  <fieldset className="space-y-2">
  <legend className="mb-2 text-sm font-medium text-text">Ticket type</legend>
  <Checkbox
   label="Free events only"
   checked={filters.paid === 'free'}
   onChange={(v) => set('paid', v ? 'free' : 'all')} />
  
  <Checkbox
   label="Paid events only"
   checked={filters.paid === 'paid'}
   onChange={(v) => set('paid', v ? 'paid' : 'all')} />
  
  </fieldset>

  <fieldset className="space-y-2">
  <legend className="mb-2 text-sm font-medium text-text">Setting</legend>
  <Checkbox
   label="Indoor"
   checked={filters.place === 'indoor'}
   onChange={(v) => set('place', v ? 'indoor' : 'all')} />
  
  <Checkbox
   label="Outdoor"
   checked={filters.place === 'outdoor'}
   onChange={(v) => set('place', v ? 'outdoor' : 'all')} />
  
  </fieldset>

  <Button variant="outline" className="w-full justify-center lg:hidden">
  Apply filters
  </Button>
 </aside>);

}