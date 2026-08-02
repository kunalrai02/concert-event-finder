import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  BellIcon,
  CalendarIcon,
  CloudIcon,
  CloudRainIcon,
  HeartIcon,
  HotelIcon,
  MapPinIcon,
  Share2Icon,
  StarIcon,
  SunIcon,
  TicketIcon,
  UsersIcon,
  UtensilsIcon } from
'lucide-react';
import { toast } from 'sonner';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge, EmptyState, Progress } from '../components/ui/Primitives';
import { Button } from '../components/ui/Button';
import { Modal, Tabs } from '../components/ui/Overlays';
import { Countdown } from '../components/common/Countdown';
import { EventMap } from '../components/common/EventMap';
import { EventCard } from '../components/events/EventCard';
import {
  events,
  getEvent,
  nearbyHotels,
  nearbyRestaurants,
  reviews,
  weatherForecast } from
'../data/events';
import { artists } from '../data/directory';
import { useApp } from '../contexts/AppContext';
import { cn, formatDate, formatPrice } from '../utils/cn';

const weatherIcon = { Clear: SunIcon, Cloud: CloudIcon, Rain: CloudRainIcon };

export function EventDetails() {
  const { id } = useParams();
  const event = getEvent(id);
  const { isSaved, toggleSaved, markViewed } = useApp();
  const [tab, setTab] = useState('about');
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    if (event) markViewed(event.id);
  }, [event, markViewed]);

  if (!event) {
    return (
      <DashboardLayout title="Event not found">
        <EmptyState
          icon={<TicketIcon className="h-7 w-7" />}
          title="We could not find that event"
          description="It may have been removed or the link is out of date."
          action={
          <Link to="/explore">
              <Button>Back to explore</Button>
            </Link>
          } />
        
      </DashboardLayout>);

  }

  const artist = artists.find((a) => a.name === event.artist);
  const sold = Math.round((event.totalSeats - event.seatsLeft) / event.totalSeats * 100);
  const related = events.filter((e) => e.id !== event.id && e.category === event.category).slice(0, 3);
  const saved = isSaved(event.id);

  return (
    <DashboardLayout title={event.title} description={`${event.venue} · ${event.city}`}>
      <div className="space-y-6">
        <div className="relative overflow-hidden rounded-2xl border border-line">
          <img src={event.image} alt={event.title} className="h-64 w-full object-cover sm:h-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-end justify-between gap-4 p-6">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge tone="brand">{event.category}</Badge>
                <Badge tone="cyan">{event.genre}</Badge>
                <Badge tone="neutral">{event.outdoor ? 'Outdoor' : 'Indoor'}</Badge>
              </div>
              <h2 className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">
                {event.title}
              </h2>
              <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-300">
                <span className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" /> {formatDate(event.date)} · {event.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPinIcon className="h-4 w-4" /> {event.venue}, {event.city}
                </span>
                <span className="flex items-center gap-1">
                  <StarIcon className="h-4 w-4 fill-amber-400 text-amber-400" /> {event.rating} (
                  {event.reviews})
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="min-w-0 space-y-6">
            <Tabs
              value={tab}
              onChange={setTab}
              tabs={[
              { id: 'about', label: 'About' },
              { id: 'venue', label: 'Venue & map' },
              { id: 'gallery', label: 'Gallery' },
              { id: 'reviews', label: 'Reviews' }]
              } />
            

            {tab === 'about' &&
            <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="font-display text-lg font-semibold text-ink">About this event</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{event.description}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Doors open 90 minutes before the start time. Bags larger than A4 are not
                    permitted. Accessible seating and a companion ticket scheme are available
                    directly from the venue box office.
                  </p>
                </Card>

                {artist &&
              <Card className="flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center">
                    <img
                  src={artist.image}
                  alt={artist.name}
                  className="h-20 w-20 rounded-2xl object-cover" />
                
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-wide text-cyanx-400">Performing</p>
                      <h3 className="font-display text-lg font-semibold text-ink">{artist.name}</h3>
                      <p className="mt-1 text-sm text-muted">
                        {artist.genre} · <UsersIcon className="inline h-3.5 w-3.5" />{' '}
                        {artist.followers} followers
                      </p>
                    </div>
                    <Button variant="outline">Follow artist</Button>
                  </Card>
              }

                <div className="grid gap-6 sm:grid-cols-2">
                  <Card>
                    <CardHeader title="Weather forecast" icon={<SunIcon className="h-4 w-4" />} />
                    <div className="grid grid-cols-4 gap-2 p-5">
                      {weatherForecast.map((w) => {
                      const Icon = weatherIcon[w.condition];
                      return (
                        <div
                          key={w.day}
                          className="rounded-xl border border-line bg-elevated/50 p-3 text-center">
                          
                            <p className="text-xs text-muted">{w.day}</p>
                            <Icon className="mx-auto my-2 h-5 w-5 text-cyanx-400" />
                            <p className="text-sm font-semibold text-ink">{w.temp}°</p>
                          </div>);

                    })}
                    </div>
                  </Card>

                  <Card>
                    <CardHeader title="Nearby hotels" icon={<HotelIcon className="h-4 w-4" />} />
                    <ul className="divide-y divide-line/60">
                      {nearbyHotels.map((h) =>
                    <li key={h.id} className="flex items-center justify-between p-4">
                          <div>
                            <p className="text-sm font-medium text-ink">{h.name}</p>
                            <p className="text-xs text-muted">{h.distance} away · ★ {h.rating}</p>
                          </div>
                          <p className="text-sm font-semibold text-ink">${h.price}</p>
                        </li>
                    )}
                    </ul>
                  </Card>
                </div>

                <Card>
                  <CardHeader
                  title="Nearby restaurants"
                  icon={<UtensilsIcon className="h-4 w-4" />} />
                
                  <ul className="grid gap-px bg-line/40 sm:grid-cols-3">
                    {nearbyRestaurants.map((r) =>
                  <li key={r.id} className="bg-surface/60 p-4">
                        <p className="text-sm font-medium text-ink">{r.name}</p>
                        <p className="text-xs text-muted">
                          {r.cuisine} · {r.distance} · ★ {r.rating}
                        </p>
                      </li>
                  )}
                  </ul>
                </Card>
              </div>
            }

            {tab === 'venue' &&
            <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="font-display text-lg font-semibold text-ink">{event.venue}</h3>
                  <p className="mt-2 text-sm text-muted">
                    {event.city} · {event.outdoor ? 'Open air site' : 'Indoor arena'} · Capacity{' '}
                    {event.totalSeats.toLocaleString()}
                  </p>
                  <div className="mt-5">
                    <EventMap
                    points={[
                    {
                      id: event.id,
                      lat: event.lat,
                      lng: event.lng,
                      title: event.venue,
                      subtitle: event.city
                    }]
                    }
                    height={340}
                    zoom={13} />
                  
                  </div>
                </Card>
              </div>
            }

            {tab === 'gallery' &&
            <div className="grid gap-4 sm:grid-cols-3">
                {events.slice(0, 6).map((e) =>
              <img
                key={e.id}
                src={e.image}
                alt={`Photo from a past ${event.category.toLowerCase()} event`}
                className="h-40 w-full rounded-2xl border border-line object-cover transition-transform duration-300 hover:scale-[1.02]"
                loading="lazy" />

              )}
              </div>
            }

            {tab === 'reviews' &&
            <div className="space-y-4">
                {reviews.map((r) =>
              <Card key={r.id} className="p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-ink">{r.name}</p>
                      <span className="text-xs text-muted">{r.date}</span>
                    </div>
                    <div className="mt-2 flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) =>
                  <StarIcon
                    key={i}
                    className={cn(
                      'h-4 w-4',
                      i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-line'
                    )} />

                  )}
                    </div>
                    <p className="mt-3 text-sm text-muted">{r.body}</p>
                  </Card>
              )}
              </div>
            }

            <section>
              <h3 className="mb-4 font-display text-lg font-semibold text-ink">
                You may also like
              </h3>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {related.map((e) =>
                <EventCard key={e.id} event={e} compact />
                )}
              </div>
            </section>
          </div>

          {/* Booking rail */}
          <aside className="space-y-6 xl:sticky xl:top-24 xl:h-fit">
            <Card className="p-6">
              <p className="text-sm text-muted">Tickets from</p>
              <p className="font-display text-3xl font-semibold text-ink">
                {formatPrice(event.price, event.currency)}
              </p>
              <div className="mt-5">
                <Countdown date={event.date} time={event.time} />
              </div>
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-xs text-muted">
                  <span>{event.seatsLeft.toLocaleString()} seats left</span>
                  <span>{sold}% sold</span>
                </div>
                <Progress value={sold} tone={sold > 85 ? 'orange' : 'brand'} />
              </div>
              <Button
                size="lg"
                className="mt-5 w-full justify-center"
                onClick={() => setBooking(true)}>
                
                <TicketIcon className="h-4 w-4" />
                Book ticket
              </Button>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <Button
                  variant="secondary"
                  onClick={() => toggleSaved(event.id, event.title)}
                  aria-label="Save event"
                  className="justify-center">
                  
                  <HeartIcon className={cn('h-4 w-4', saved && 'fill-rose-400 text-rose-400')} />
                </Button>
                <Link to={`/reminders/new?event=${event.id}`}>
                  <Button variant="secondary" className="w-full justify-center" aria-label="Add reminder">
                    <BellIcon className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="secondary"
                  className="justify-center"
                  aria-label="Share event"
                  onClick={() => toast.success('Link copied to clipboard')}>
                  
                  <Share2Icon className="h-4 w-4" />
                </Button>
              </div>
            </Card>

            <Card>
              <CardHeader title="Event details" />
              <dl className="divide-y divide-line/60 text-sm">
                {[
                ['Date', formatDate(event.date)],
                ['Time', `${event.time} · doors 90 min earlier`],
                ['Venue', `${event.venue}, ${event.city}`],
                ['Distance', `${event.distanceKm} km from you`],
                ['Available seats', event.seatsLeft.toLocaleString()]].
                map(([label, value]) =>
                <div key={label} className="flex items-center justify-between gap-4 px-5 py-3">
                    <dt className="text-muted">{label}</dt>
                    <dd className="text-right font-medium text-ink">{value}</dd>
                  </div>
                )}
              </dl>
            </Card>
          </aside>
        </div>
      </div>

      <Modal
        open={booking}
        onClose={() => setBooking(false)}
        title="Book your ticket"
        description={`${event.title} · ${formatDate(event.date)} at ${event.time}`}
        footer={
        <>
            <Button variant="ghost" onClick={() => setBooking(false)}>
              Cancel
            </Button>
            <Button
            onClick={() => {
              setBooking(false);
              toast.success('Ticket reserved', { description: 'Check your email for the QR code.' });
            }}>
            
              Confirm booking
            </Button>
          </>
        }>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between rounded-xl border border-line bg-elevated/50 px-4 py-3">
            <span className="text-muted">General admission × 1</span>
            <span className="font-medium text-ink">{formatPrice(event.price)}</span>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-line bg-elevated/50 px-4 py-3">
            <span className="text-muted">Booking fee</span>
            <span className="font-medium text-ink">$4.50</span>
          </div>
          <div className="flex items-center justify-between px-4 pt-1">
            <span className="font-medium text-ink">Total</span>
            <span className="font-display text-lg font-semibold text-brand-300">
              ${(event.price + 4.5).toFixed(2)}
            </span>
          </div>
        </div>
      </Modal>
    </DashboardLayout>);

}