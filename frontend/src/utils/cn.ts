import { twMerge } from 'tailwind-merge';

export function cn(...classes: Array<string | false | null | undefined>) {
  return twMerge(classes.filter(Boolean).join(' '));
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}

export function formatPrice(price: number, currency = '$') {
  return price === 0 ? 'Free' : `${currency}${price}`;
}

export function countdown(iso: string, time = '20:00') {
  const target = new Date(`${iso}T${time}:00`).getTime();
  const diff = target - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, past: true };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000 % 24),
    minutes: Math.floor(diff / 60000 % 60),
    seconds: Math.floor(diff / 1000 % 60),
    past: false
  };
}