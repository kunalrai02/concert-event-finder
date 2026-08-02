import type { NotificationRecord } from '../types';

export const notificationHistory: NotificationRecord[] = [
{
  id: 'n1',
  eventName: 'Late Laughs: Stand-Up Special',
  reminderDate: 'Aug 09, 2026 · 19:30',
  deliveredTime: '19:30:04',
  channel: 'WhatsApp',
  status: 'Success',
  bucket: 'today'
},
{
  id: 'n2',
  eventName: 'Nova Nights — World Tour',
  reminderDate: 'Aug 09, 2026 · 09:00',
  deliveredTime: '09:00:11',
  channel: 'Email',
  status: 'Success',
  bucket: 'today'
},
{
  id: 'n3',
  eventName: 'Neighbourhood Summer Fair',
  reminderDate: 'Aug 08, 2026 · 08:00',
  deliveredTime: '—',
  channel: 'SMS',
  status: 'Failed',
  bucket: 'week'
},
{
  id: 'n4',
  eventName: 'Midnight Street Food Market',
  reminderDate: 'Aug 07, 2026 · 17:00',
  deliveredTime: '17:00:02',
  channel: 'Telegram',
  status: 'Success',
  bucket: 'week'
},
{
  id: 'n5',
  eventName: 'Solstice Open Air Festival',
  reminderDate: 'Aug 05, 2026 · 12:00',
  deliveredTime: '12:00:31',
  channel: 'Email',
  status: 'Success',
  bucket: 'week'
},
{
  id: 'n6',
  eventName: 'Harbour Jazz Weekender',
  reminderDate: 'Jul 28, 2026 · 10:00',
  deliveredTime: '10:00:09',
  channel: 'WhatsApp',
  status: 'Success',
  bucket: 'month'
},
{
  id: 'n7',
  eventName: 'Roast Battle Championship',
  reminderDate: 'Jul 22, 2026 · 18:00',
  deliveredTime: '—',
  channel: 'Telegram',
  status: 'Pending',
  bucket: 'month'
}];


export const attendanceTrend = [
{ month: 'Feb', events: 180, users: 4200 },
{ month: 'Mar', events: 240, users: 5100 },
{ month: 'Apr', events: 300, users: 6400 },
{ month: 'May', events: 280, users: 7300 },
{ month: 'Jun', events: 420, users: 9100 },
{ month: 'Jul', events: 510, users: 11200 },
{ month: 'Aug', events: 620, users: 13400 }];


export const notificationsByChannel = [
{ channel: 'Email', sent: 12400 },
{ channel: 'WhatsApp', sent: 9800 },
{ channel: 'Telegram', sent: 4300 },
{ channel: 'SMS', sent: 2600 }];


export const categoryShare = [
{ name: 'Concert', value: 42, color: '#7C3AED' },
{ name: 'Festival', value: 24, color: '#06B6D4' },
{ name: 'Comedy', value: 14, color: '#F97316' },
{ name: 'Food', value: 12, color: '#22D3EE' },
{ name: 'Cultural', value: 8, color: '#A47CF1' }];


export const userActivity = [
{ day: 'Mon', saved: 4, viewed: 18 },
{ day: 'Tue', saved: 2, viewed: 12 },
{ day: 'Wed', saved: 6, viewed: 24 },
{ day: 'Thu', saved: 3, viewed: 15 },
{ day: 'Fri', saved: 8, viewed: 31 },
{ day: 'Sat', saved: 5, viewed: 27 },
{ day: 'Sun', saved: 7, viewed: 22 }];


export const adminUsers = [
{ id: 'u1', name: 'Sofia Almeida', email: 'sofia@studio.co', city: 'Lisbon', plan: 'Pro', status: 'Active' },
{ id: 'u2', name: 'Daniel Okafor', email: 'dan@lensmail.com', city: 'London', plan: 'Free', status: 'Active' },
{ id: 'u3', name: 'Lena Brandt', email: 'lena.b@uni.de', city: 'Berlin', plan: 'Pro', status: 'Invited' },
{ id: 'u4', name: 'Marc Dupont', email: 'marc@dupont.fr', city: 'Paris', plan: 'Free', status: 'Suspended' },
{ id: 'u5', name: 'Ines Vermeer', email: 'ines@vermeer.nl', city: 'Amsterdam', plan: 'Pro', status: 'Active' }];