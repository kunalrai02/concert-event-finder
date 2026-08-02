import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, SearchIcon } from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { EventCard } from '../components/events/EventCard';
import { EmptyState } from '../components/ui/Primitives';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Field';
import { getEvent } from '../data/events';
import { useApp } from '../contexts/AppContext';
import type { EventItem } from '../types';

export function Favorites() {
  const { saved, toggleSaved } = useApp();
  const [query, setQuery] = useState('');

  const items = saved.
  map(getEvent).
  filter(Boolean).
  filter((e) =>
  `${(e as EventItem).title} ${(e as EventItem).artist} ${(e as EventItem).city}`.
  toLowerCase().
  includes(query.toLowerCase())
  ) as EventItem[];

  return (
    <DashboardLayout
      title="Favorites"
      description={`${saved.length} events saved for later`}>
      
      <div className="space-y-6">
        <div className="max-w-md">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your favorites"
            aria-label="Search favorites"
            icon={<SearchIcon className="h-4 w-4" />} />
          
        </div>

        {items.length ?
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {items.map((event) =>
          <EventCard
            key={event.id}
            event={event}
            onRemove={() => toggleSaved(event.id, event.title)} />

          )}
          </div> :

        <EmptyState
          icon={<HeartIcon className="h-7 w-7" />}
          title={query ? 'No favorites match that search' : 'No favorites yet'}
          description={
          query ?
          'Try a different artist, city or event name.' :
          'Save events you are interested in and they will show up here for quick access.'
          }
          action={
          <Link to="/explore">
                <Button>Explore events</Button>
              </Link>
          } />

        }
      </div>
    </DashboardLayout>);

}