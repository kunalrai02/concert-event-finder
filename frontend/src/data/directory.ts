import type { Artist, City, Testimonial, Venue } from '../types';
import { IMAGES } from './events';

export const artists: Artist[] = [
{ id: 'a1', name: 'Aurora Vale', genre: 'Indie Pop', followers: '2.4M', image: IMAGES.artistA },
{ id: 'a2', name: 'Kade Rivers', genre: 'Electronic', followers: '1.8M', image: IMAGES.artistB },
{ id: 'a3', name: 'Nyra', genre: 'Alternative', followers: '860K', image: IMAGES.artistA },
{ id: 'a4', name: 'Mira Cohen', genre: 'Stand-Up', followers: '410K', image: IMAGES.artistB },
{ id: 'a5', name: 'Cité Dance Co.', genre: 'Dance', followers: '220K', image: IMAGES.artistA },
{ id: 'a6', name: 'The Foundry DJs', genre: 'House', followers: '540K', image: IMAGES.artistB }];


export const cities: City[] = [
{ id: 'c1', name: 'Berlin', country: 'Germany', eventCount: 412, image: IMAGES.city },
{ id: 'c2', name: 'Lisbon', country: 'Portugal', eventCount: 268, image: IMAGES.city },
{ id: 'c3', name: 'London', country: 'United Kingdom', eventCount: 736, image: IMAGES.city },
{ id: 'c4', name: 'Amsterdam', country: 'Netherlands', eventCount: 305, image: IMAGES.city },
{ id: 'c5', name: 'Paris', country: 'France', eventCount: 589, image: IMAGES.city },
{ id: 'c6', name: 'Barcelona', country: 'Spain', eventCount: 351, image: IMAGES.city }];


export const venues: Venue[] = [
{ id: 'v1', name: 'Skyline Arena', city: 'Berlin', capacity: '12,000', image: IMAGES.venue },
{ id: 'v2', name: 'Northgate Dome', city: 'London', capacity: '18,000', image: IMAGES.venue },
{ id: 'v3', name: 'Grand Opera House', city: 'Paris', capacity: '1,900', image: IMAGES.venue },
{ id: 'v4', name: 'The Foundry', city: 'Amsterdam', capacity: '600', image: IMAGES.venue }];


export const testimonials: Testimonial[] = [
{
  id: 't1',
  name: 'Sofia Almeida',
  role: 'Festival regular, Lisbon',
  quote:
  'I used to find out about shows the week after they happened. Now I get a nudge on WhatsApp the moment tickets drop in my city.',
  rating: 5
},
{
  id: 't2',
  name: 'Daniel Okafor',
  role: 'Concert photographer, London',
  quote:
  'The calendar sync is the killer feature. Every shoot, every door time, every reminder — all in one place.',
  rating: 5
},
{
  id: 't3',
  name: 'Lena Brandt',
  role: 'Music student, Berlin',
  quote:
  'The recommendations actually match my taste. I found three small venue gigs I would never have heard about.',
  rating: 4
}];


export const genres = [
'Indie Pop',
'Electronic',
'Jazz',
'Alternative',
'House',
'Stand-Up',
'Dance',
'Theatre',
'Street Food',
'Fine Dining',
'Community'];


export const categories = [
'Concert',
'Festival',
'Comedy',
'Food',
'Cultural',
'Local'] as
const;