import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AppProvider } from './contexts/AppContext';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Explore } from './pages/Explore';
import { EventDetails } from './pages/EventDetails';
import { CalendarPage } from './pages/CalendarPage';
import { ReminderCreate } from './pages/ReminderCreate';
import { NotificationHistory } from './pages/NotificationHistory';
import { Favorites } from './pages/Favorites';
import { SearchResults } from './pages/SearchResults';
import { AdminDashboard } from './pages/AdminDashboard';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/reminders/new" element={<ReminderCreate />} />
          <Route path="/notifications" element={<NotificationHistory />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/saved" element={<Favorites />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'rgb(30 41 66)',
              border: '1px solid rgb(51 65 94)',
              color: 'rgb(241 245 249)',
              borderRadius: '16px'
            }
          }} />
        
      </BrowserRouter>
    </AppProvider>);

}