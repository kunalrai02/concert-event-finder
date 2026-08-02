export type Category =
'Concert' |
'Festival' |
'Comedy' |
'Food' |
'Cultural' |
'Local';

export type NotificationChannel = 'Email' | 'WhatsApp' | 'Telegram' | 'SMS';

export interface EventItem {
  id: string;
  title: string;
  artist: string;
  venue: string;
  city: string;
  date: string; // ISO date
  time: string;
  price: number;
  currency: string;
  distanceKm: number;
  rating: number;
  reviews: number;
  category: Category;
  genre: string;
  image: string;
  outdoor: boolean;
  seatsLeft: number;
  totalSeats: number;
  description: string;
  lat: number;
  lng: number;
  trending?: boolean;
}

export interface Artist {
  id: string;
  name: string;
  genre: string;
  followers: string;
  image: string;
}

export interface City {
  id: string;
  name: string;
  country: string;
  eventCount: number;
  image: string;
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  capacity: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface Reminder {
  id: string;
  eventId: string;
  date: string;
  time: string;
  channels: NotificationChannel[];
}

export interface NotificationRecord {
  id: string;
  eventName: string;
  reminderDate: string;
  deliveredTime: string;
  channel: NotificationChannel;
  status: 'Success' | 'Failed' | 'Pending';
  bucket: 'today' | 'week' | 'month';
}

export interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  date: string;
  body: string;
}