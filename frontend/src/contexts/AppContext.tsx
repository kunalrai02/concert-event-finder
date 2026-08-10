import React, {
 createContext,
 useCallback,
 useContext,
 useEffect,
 useMemo,
 useState } from
'react';
import { toast } from 'sonner';
import type { Reminder } from '../types';

type Theme = 'dark' | 'light';

interface AppState {
 theme: Theme;
 toggleTheme: () => void;
 saved: string[];
 toggleSaved: (id: string, title?: string) => void;
 isSaved: (id: string) => boolean;
 recentlyViewed: string[];
 markViewed: (id: string) => void;
 reminders: Reminder[];
 addReminder: (reminder: Reminder) => void;
 unreadCount: number;
 clearUnread: () => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: {children: React.ReactNode;}) {
 const [theme, setTheme] = useState<Theme>('dark');
 const [saved, setSaved] = useState<string[]>([
 'solstice-festival',
 'late-laughs',
 'lumen-ballet']
 );
 const [recentlyViewed, setRecentlyViewed] = useState<string[]>([
 'nova-nights',
 'pulse-arena']
 );
 const [reminders, setReminders] = useState<Reminder[]>([
 {
 id: 'rem-1',
 eventId: 'late-laughs',
 date: '2026-08-09',
 time: '19:30',
 channels: ['WhatsApp', 'Email']
 }]
 );
 const [unreadCount, setUnreadCount] = useState(3);

 useEffect(() => {
 document.documentElement.classList.toggle('light', theme === 'light');
 }, [theme]);

 const toggleTheme = useCallback(
 () => setTheme((t) => t === 'dark' ? 'light' : 'dark'),
 []
 );

 const toggleSaved = useCallback((id: string, title?: string) => {
 setSaved((prev) => {
  const exists = prev.includes(id);
  toast[exists ? 'message' : 'success'](
  exists ? 'Removed from favorites' : 'Saved to favorites',
  { description: title }
  );
  return exists ? prev.filter((s) => s !== id) : [id, ...prev];
 });
 }, []);

 const markViewed = useCallback((id: string) => {
 setRecentlyViewed((prev) => [id, ...prev.filter((p) => p !== id)].slice(0, 6));
 }, []);

 const addReminder = useCallback((reminder: Reminder) => {
 setReminders((prev) => [reminder, ...prev]);
 setUnreadCount((c) => c + 1);
 }, []);

 const value = useMemo<AppState>(
 () => ({
  theme,
  toggleTheme,
  saved,
  toggleSaved,
  isSaved: (id: string) => saved.includes(id),
  recentlyViewed,
  markViewed,
  reminders,
  addReminder,
  unreadCount,
  clearUnread: () => setUnreadCount(0)
 }),
 [theme, toggleTheme, saved, toggleSaved, recentlyViewed, markViewed, reminders, addReminder, unreadCount]
 );

 return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
 const ctx = useContext(AppContext);
 if (!ctx) throw new Error('useApp must be used inside AppProvider');
 return ctx;
}