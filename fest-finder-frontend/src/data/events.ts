import type { EventItem, ReviewItem } from '../types';

export const IMAGES = {
  hero: "/10882211-0c18-4ef7-b370-fd49c2518c8d.jpg",
  festival: "/79d96eed-fa36-45d7-95bd-01061b45d466.jpg",

  comedy: "/7f7668f5-9478-4859-878d-3e2d58634d74.jpg",

  food: "/2a72ba79-eed9-4a4b-b195-15023dde6e3c.jpg",
  cultural: "/9cc61a27-058e-4537-ad81-911f61071a84.jpg",

  auth: "/96a45a02-8f08-420c-a273-ff07ab2f7c99.jpg",
  artistA: "/f61e959e-9ce5-40e8-a48e-115908c177c7.jpg",

  artistB: "/fa2d02eb-ddd6-4bb7-b2d2-1a2667ee356e.jpg",

  city: "/2b3744ba-a6ef-4a90-8c41-7458be5602c1.jpg",
  venue: "/0e1d2c6a-b095-48dc-a17a-d4af87f56687.jpg"

};

export const events: EventItem[] = [
{
  id: 'nova-nights',
  title: 'Nova Nights — World Tour',
  artist: 'Aurora Vale',
  venue: 'Skyline Arena',
  city: 'Berlin',
  date: '2026-08-14',
  time: '20:00',
  price: 89,
  currency: '$',
  distanceKm: 3.2,
  rating: 4.8,
  reviews: 1284,
  category: 'Concert',
  genre: 'Indie Pop',
  image: IMAGES.hero,
  outdoor: false,
  seatsLeft: 340,
  totalSeats: 12000,
  description:
  'Aurora Vale brings the Nova Nights production to Skyline Arena — a full-scale audiovisual show with a 12-piece live band, kinetic lighting rig and a career-spanning setlist.',
  lat: 52.52,
  lng: 13.405,
  trending: true
},
{
  id: 'solstice-festival',
  title: 'Solstice Open Air Festival',
  artist: '30+ Artists',
  venue: 'Riverside Fields',
  city: 'Lisbon',
  date: '2026-08-22',
  time: '14:00',
  price: 149,
  currency: '$',
  distanceKm: 12.4,
  rating: 4.9,
  reviews: 3421,
  category: 'Festival',
  genre: 'Electronic',
  image: IMAGES.festival,
  outdoor: true,
  seatsLeft: 1820,
  totalSeats: 40000,
  description:
  'Three days, five stages and a lineup that spans house, techno and live electronica across the Riverside Fields.',
  lat: 38.722,
  lng: -9.139,
  trending: true
},
{
  id: 'late-laughs',
  title: 'Late Laughs: Stand-Up Special',
  artist: 'Mira Cohen',
  venue: 'The Basement Club',
  city: 'Berlin',
  date: '2026-08-09',
  time: '21:30',
  price: 32,
  currency: '$',
  distanceKm: 1.1,
  rating: 4.6,
  reviews: 402,
  category: 'Comedy',
  genre: 'Stand-Up',
  image: IMAGES.comedy,
  outdoor: false,
  seatsLeft: 24,
  totalSeats: 180,
  description:
  'An intimate hour of brand-new material from Mira Cohen, workshopped live before the tour recording.',
  lat: 52.5,
  lng: 13.43,
  trending: true
},
{
  id: 'night-market',
  title: 'Midnight Street Food Market',
  artist: '40 Local Kitchens',
  venue: 'Harbour Yard',
  city: 'Amsterdam',
  date: '2026-08-16',
  time: '18:00',
  price: 0,
  currency: '$',
  distanceKm: 5.8,
  rating: 4.7,
  reviews: 918,
  category: 'Food',
  genre: 'Street Food',
  image: IMAGES.food,
  outdoor: true,
  seatsLeft: 5000,
  totalSeats: 5000,
  description:
  'Forty independent kitchens, live DJs and a lantern-lit harbour setting. Free entry, pay per plate.',
  lat: 52.377,
  lng: 4.897
},
{
  id: 'lumen-ballet',
  title: 'Lumen — Contemporary Ballet',
  artist: 'Cité Dance Company',
  venue: 'Grand Opera House',
  city: 'Paris',
  date: '2026-09-02',
  time: '19:30',
  price: 65,
  currency: '$',
  distanceKm: 8.9,
  rating: 4.9,
  reviews: 611,
  category: 'Cultural',
  genre: 'Dance',
  image: IMAGES.cultural,
  outdoor: false,
  seatsLeft: 96,
  totalSeats: 1900,
  description:
  'A luminous reinterpretation of classical repertoire, staged with projection mapping and a live chamber orchestra.',
  lat: 48.871,
  lng: 2.331
},
{
  id: 'pulse-arena',
  title: 'Pulse Arena Live',
  artist: 'Kade Rivers',
  venue: 'Northgate Dome',
  city: 'London',
  date: '2026-08-28',
  time: '20:30',
  price: 74,
  currency: '$',
  distanceKm: 21.5,
  rating: 4.5,
  reviews: 2210,
  category: 'Concert',
  genre: 'Electronic',
  image: IMAGES.venue,
  outdoor: false,
  seatsLeft: 1200,
  totalSeats: 18000,
  description:
  'Kade Rivers headlines the Dome with a 360° stage and a two-hour continuous set.',
  lat: 51.507,
  lng: -0.127,
  trending: true
},
{
  id: 'harbour-jazz',
  title: 'Harbour Jazz Weekender',
  artist: 'Various Artists',
  venue: 'Old Pier Stage',
  city: 'Lisbon',
  date: '2026-09-11',
  time: '17:00',
  price: 45,
  currency: '$',
  distanceKm: 14.2,
  rating: 4.7,
  reviews: 530,
  category: 'Festival',
  genre: 'Jazz',
  image: IMAGES.festival,
  outdoor: true,
  seatsLeft: 640,
  totalSeats: 3000,
  description:
  'Two days of jazz, soul and afrobeat on a floating stage at the old pier.',
  lat: 38.706,
  lng: -9.15
},
{
  id: 'neighbourhood-fair',
  title: 'Neighbourhood Summer Fair',
  artist: 'Community Collective',
  venue: 'Kreuzberg Park',
  city: 'Berlin',
  date: '2026-08-11',
  time: '11:00',
  price: 0,
  currency: '$',
  distanceKm: 2.4,
  rating: 4.4,
  reviews: 188,
  category: 'Local',
  genre: 'Community',
  image: IMAGES.food,
  outdoor: true,
  seatsLeft: 900,
  totalSeats: 1000,
  description:
  'Local makers, kids workshops, a small acoustic stage and the annual cake contest.',
  lat: 52.494,
  lng: 13.418
},
{
  id: 'echo-chamber',
  title: 'Echo Chamber Sessions',
  artist: 'Nyra',
  venue: 'The Foundry',
  city: 'Amsterdam',
  date: '2026-09-18',
  time: '22:00',
  price: 38,
  currency: '$',
  distanceKm: 6.1,
  rating: 4.6,
  reviews: 274,
  category: 'Concert',
  genre: 'Alternative',
  image: IMAGES.hero,
  outdoor: false,
  seatsLeft: 58,
  totalSeats: 600,
  description:
  'A late-night warehouse session with an all-analogue live set and resident support.',
  lat: 52.365,
  lng: 4.88
},
{
  id: 'street-theatre',
  title: 'Street Theatre Biennale',
  artist: 'International Troupes',
  venue: 'Old Town Squares',
  city: 'Paris',
  date: '2026-09-25',
  time: '16:00',
  price: 20,
  currency: '$',
  distanceKm: 9.7,
  rating: 4.8,
  reviews: 366,
  category: 'Cultural',
  genre: 'Theatre',
  image: IMAGES.cultural,
  outdoor: true,
  seatsLeft: 420,
  totalSeats: 2500,
  description:
  'Twelve troupes from nine countries take over the old town for a weekend of open-air performance.',
  lat: 48.856,
  lng: 2.352
},
{
  id: 'roast-battle',
  title: 'Roast Battle Championship',
  artist: 'Comedy League',
  venue: 'Union Hall',
  city: 'London',
  date: '2026-08-19',
  time: '20:00',
  price: 28,
  currency: '$',
  distanceKm: 19.3,
  rating: 4.3,
  reviews: 149,
  category: 'Comedy',
  genre: 'Stand-Up',
  image: IMAGES.comedy,
  outdoor: false,
  seatsLeft: 12,
  totalSeats: 320,
  description:
  'Sixteen comics, one bracket, no mercy. Hosted by the Comedy League regulars.',
  lat: 51.52,
  lng: -0.09
},
{
  id: 'vineyard-tasting',
  title: 'Vineyard & Fire Food Festival',
  artist: 'Chef Collective',
  venue: 'Hillside Estate',
  city: 'Lisbon',
  date: '2026-10-03',
  time: '13:00',
  price: 55,
  currency: '$',
  distanceKm: 27.8,
  rating: 4.9,
  reviews: 742,
  category: 'Food',
  genre: 'Fine Dining',
  image: IMAGES.food,
  outdoor: true,
  seatsLeft: 210,
  totalSeats: 800,
  description:
  'Open-fire cooking, regional wines and long-table dining across the hillside estate.',
  lat: 38.79,
  lng: -9.31
}];


export const getEvent = (id?: string) => events.find((e) => e.id === id);

export const reviews: ReviewItem[] = [
{
  id: 'r1',
  name: 'Elena Marsh',
  rating: 5,
  date: 'Jul 12, 2026',
  body: 'Production value was unreal — the lighting design alone was worth the ticket. Doors opened on time and the venue staff were great.'
},
{
  id: 'r2',
  name: 'Tomas Reiner',
  rating: 4,
  date: 'Jun 28, 2026',
  body: 'Fantastic set list, though the bar queues got long around the interval. Would absolutely go again.'
},
{
  id: 'r3',
  name: 'Priya Raman',
  rating: 5,
  date: 'Jun 04, 2026',
  body: 'Bought tickets an hour before doors and still had a perfect view. The reminder feature meant I did not miss the support act.'
}];


export const nearbyHotels = [
{ id: 'h1', name: 'The Lumen Hotel', distance: '0.4 km', price: 148, rating: 4.6 },
{ id: 'h2', name: 'Rivergate Suites', distance: '0.9 km', price: 112, rating: 4.3 },
{ id: 'h3', name: 'Nord Boutique Rooms', distance: '1.6 km', price: 96, rating: 4.5 }];


export const nearbyRestaurants = [
{ id: 'p1', name: 'Casa Verde', cuisine: 'Mediterranean', distance: '0.2 km', rating: 4.7 },
{ id: 'p2', name: 'Ash & Ember', cuisine: 'Grill', distance: '0.5 km', rating: 4.5 },
{ id: 'p3', name: 'Nori Bar', cuisine: 'Japanese', distance: '0.8 km', rating: 4.8 }];


export const weatherForecast = [
{ day: 'Thu', temp: 24, condition: 'Clear' as const },
{ day: 'Fri', temp: 22, condition: 'Cloud' as const },
{ day: 'Sat', temp: 19, condition: 'Rain' as const },
{ day: 'Sun', temp: 25, condition: 'Clear' as const }];