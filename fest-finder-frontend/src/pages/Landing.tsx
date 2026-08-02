import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MailIcon,
  MapPinIcon,
  QuoteIcon,
  StarIcon,
  UsersIcon } from
'lucide-react';
import { toast } from 'sonner';
import { SiteHeader } from '../components/layout/SiteHeader';
import { SiteFooter } from '../components/layout/SiteFooter';
import { SearchBar } from '../components/events/SearchBar';
import { EventCard } from '../components/events/EventCard';
import { SectionHeading } from '../components/ui/Primitives';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Field';
import { events, IMAGES } from '../data/events';
import { artists, cities, testimonials, venues } from '../data/directory';

export function Landing() {
  const trending = events.filter((e) => e.trending);
  const festivals = events.filter((e) => e.category === 'Festival' || e.category === 'Food');
  const carouselRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');

  const scroll = (dir: number) =>
  carouselRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' });

  return (
    <div className="min-h-screen w-full bg-bg">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <img
            src={IMAGES.hero}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover" />
          
          <div className="absolute inset-0 bg-slate-950/75" />
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl">
              
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-cyanx-400">
                <span className="h-1.5 w-1.5 rounded-full bg-cyanx-400" />
                2,481 events happening this week
              </span>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Discover Concerts & Festivals Near You
              </h1>
              <p className="mt-5 max-w-2xl text-base text-slate-300 sm:text-lg">
                Find upcoming concerts, music festivals, stand-up shows, food festivals, and cultural
                events in your city.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-10">
              
              <SearchBar />
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
                <span className="text-slate-400">Popular:</span>
                {['Aurora Vale', 'Solstice Festival', 'Stand-up in Berlin', 'Free events'].map(
                  (t) =>
                  <Link
                    key={t}
                    to={`/search?q=${encodeURIComponent(t)}`}
                    className="rounded-full border border-white/15 px-3 py-1 hover:border-brand-400 hover:text-white">
                    
                      {t}
                    </Link>

                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trending carousel */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Right now"
            title="Trending events"
            description="What everyone in your area is booking this week."
            action={
            <div className="flex gap-2">
                <button
                onClick={() => scroll(-1)}
                aria-label="Scroll left"
                className="grid h-10 w-10 place-items-center rounded-xl border border-line text-muted hover:text-ink">
                
                  <ChevronLeftIcon className="h-4 w-4" />
                </button>
                <button
                onClick={() => scroll(1)}
                aria-label="Scroll right"
                className="grid h-10 w-10 place-items-center rounded-xl border border-line text-muted hover:text-ink">
                
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
              </div>
            } />
          
          <div
            ref={carouselRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            
            {trending.concat(events.slice(0, 3)).map((event, i) =>
            <div key={`${event.id}-${i}`} className="w-[300px] shrink-0 snap-start">
                <EventCard event={event} />
              </div>
            )}
          </div>
        </section>

        {/* Upcoming festivals */}
        <section className="border-y border-line/60 bg-surface/30">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Plan ahead"
              title="Upcoming festivals"
              action={
              <Link
                to="/explore"
                className="inline-flex items-center gap-1 text-sm font-medium text-cyanx-400 hover:underline">
                
                  Browse all <ArrowRightIcon className="h-4 w-4" />
                </Link>
              } />
            
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {festivals.slice(0, 4).map((event) =>
              <EventCard key={event.id} event={event} />
              )}
            </div>
          </div>
        </section>

        {/* Featured artists */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Line-ups" title="Featured artists" />
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {artists.map((artist) =>
            <Card key={artist.id} hover className="p-4 text-center">
                <img
                src={artist.image}
                alt={artist.name}
                className="mx-auto h-20 w-20 rounded-full object-cover ring-2 ring-brand-500/40"
                loading="lazy" />
              
                <p className="mt-3 truncate font-display text-sm font-semibold text-ink">
                  {artist.name}
                </p>
                <p className="text-xs text-muted">{artist.genre}</p>
                <p className="mt-2 inline-flex items-center gap-1 text-xs text-cyanx-400">
                  <UsersIcon className="h-3 w-3" /> {artist.followers}
                </p>
              </Card>
            )}
          </div>
        </section>

        {/* Popular cities */}
        <section className="border-y border-line/60 bg-surface/30">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Near you" title="Popular cities" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cities.map((city) =>
              <Link
                key={city.id}
                to={`/search?q=${city.name}`}
                className="group relative overflow-hidden rounded-2xl border border-line">
                
                  <img
                  src={city.image}
                  alt={`${city.name}, ${city.country}`}
                  className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy" />
                
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="font-display text-lg font-semibold text-white">{city.name}</p>
                    <p className="flex items-center gap-1 text-xs text-slate-300">
                      <MapPinIcon className="h-3 w-3" />
                      {city.eventCount} events · {city.country}
                    </p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Featured venues */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Where it happens" title="Featured venues" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {venues.map((venue) =>
            <Card key={venue.id} hover className="overflow-hidden">
                <img
                src={venue.image}
                alt={venue.name}
                className="h-32 w-full object-cover"
                loading="lazy" />
              
                <div className="p-4">
                  <p className="font-display text-sm font-semibold text-ink">{venue.name}</p>
                  <p className="mt-1 text-xs text-muted">
                    {venue.city} · Capacity {venue.capacity}
                  </p>
                </div>
              </Card>
            )}
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-y border-line/60 bg-surface/30">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Loved by fans" title="What people say" />
            <div className="grid gap-5 md:grid-cols-3">
              {testimonials.map((t) =>
              <Card key={t.id} className="p-6">
                  <QuoteIcon className="h-6 w-6 text-brand-400" />
                  <p className="mt-4 text-sm leading-relaxed text-ink">{t.quote}</p>
                  <div className="mt-5 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) =>
                  <StarIcon
                    key={i}
                    className={
                    i < t.rating ?
                    'h-4 w-4 fill-amber-400 text-amber-400' :
                    'h-4 w-4 text-line'
                    } />

                  )}
                  </div>
                  <p className="mt-3 text-sm font-medium text-ink">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Card className="overflow-hidden p-8 sm:p-12">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-orangex-500/15 text-orangex-400">
                  <MailIcon className="h-5 w-5" />
                </span>
                <h2 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">
                  Get the weekly drop
                </h2>
                <p className="mt-2 max-w-md text-sm text-muted">
                  One email every Thursday with newly announced shows, festival line-ups and
                  presale codes for your city.
                </p>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success('You are subscribed', { description: email });
                  setEmail('');
                }}
                className="flex flex-col gap-3 sm:flex-row">
                
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  aria-label="Email address" />
                
                <Button type="submit" size="lg" className="shrink-0 justify-center">
                  Subscribe
                </Button>
              </form>
            </div>
          </Card>
        </section>
      </main>

      <SiteFooter />
    </div>);

}