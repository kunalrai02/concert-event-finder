import React, { useState } from 'react';
import { KeyRoundIcon, MoonIcon, PlugZapIcon, ShieldCheckIcon, SunIcon } from 'lucide-react';
import { toast } from 'sonner';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Select, Toggle } from '../components/ui/Field';
import { Badge } from '../components/ui/Primitives';
import { Accordion } from '../components/ui/Overlays';
import { useApp } from '../contexts/AppContext';
import { cn } from '../utils/cn';
import type { NotificationChannel } from '../types';

const integrations = [
{ id: 'gcal', name: 'Google Calendar', status: 'Connected', detail: 'Two-way sync every 15 min' },
{ id: 'maps', name: 'Google Maps', status: 'Connected', detail: 'Venue directions and distance' },
{ id: 'tg', name: 'Telegram Bot', status: 'Connected', detail: '@concertfinder_bot' },
{ id: 'wa', name: 'WhatsApp Business', status: 'Not connected', detail: 'Reminder delivery' }];


export function Settings() {
  const { theme, toggleTheme } = useApp();
  const [language, setLanguage] = useState('en');
  const [channels, setChannels] = useState<Record<NotificationChannel, boolean>>({
    Email: true,
    SMS: false,
    WhatsApp: true,
    Telegram: true
  });
  const [privacy, setPrivacy] = useState({ profilePublic: false, shareActivity: true });
  const [location, setLocation] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <DashboardLayout title="Settings" description="Theme, privacy, notifications and integrations">
      <div className="max-w-4xl space-y-6">
        <Card>
          <CardHeader title="Appearance" subtitle="Choose how the app looks" />
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            {(['dark', 'light'] as const).map((mode) =>
            <button
              key={mode}
              onClick={() => mode !== theme && toggleTheme()}
              aria-pressed={theme === mode}
              className={cn(
                'flex items-center gap-3 rounded-2xl border p-4 text-left',
                theme === mode ? 'border-brand-400 bg-brand-500/10' : 'border-line hover:border-brand-400/50'
              )}>
              
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-elevated text-brand-300">
                  {mode === 'dark' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
                </span>
                <span>
                  <span className="block text-sm font-medium capitalize text-ink">{mode} mode</span>
                  <span className="block text-xs text-muted">
                    {mode === 'dark' ? 'Default, easier at night' : 'High contrast daylight theme'}
                  </span>
                </span>
              </button>
            )}
            <div className="sm:col-span-2">
              <Select
                label="Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                options={[
                { value: 'en', label: 'English' },
                { value: 'de', label: 'Deutsch' },
                { value: 'pt', label: 'Português' },
                { value: 'fr', label: 'Français' }]
                } />
              
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="Notification preferences" />
          <div className="divide-y divide-line/60 px-5">
            {(Object.keys(channels) as NotificationChannel[]).map((c) =>
            <Toggle
              key={c}
              label={c}
              description={`Event reminders and announcements via ${c}`}
              checked={channels[c]}
              onChange={(v) => setChannels((prev) => ({ ...prev, [c]: v }))} />

            )}
          </div>
        </Card>

        <Card>
          <CardHeader title="Privacy & permissions" icon={<ShieldCheckIcon className="h-4 w-4" />} />
          <div className="divide-y divide-line/60 px-5">
            <Toggle
              label="Public profile"
              description="Let other fans see the events you are attending"
              checked={privacy.profilePublic}
              onChange={(v) => setPrivacy((p) => ({ ...p, profilePublic: v }))} />
            
            <Toggle
              label="Share activity for recommendations"
              description="Improves AI suggestions based on what you view and save"
              checked={privacy.shareActivity}
              onChange={(v) => setPrivacy((p) => ({ ...p, shareActivity: v }))} />
            
            <Toggle
              label="Location permission"
              description="Used to show nearby events and travel distance"
              checked={location}
              onChange={setLocation} />
            
          </div>
        </Card>

        <Card>
          <CardHeader title="Security" icon={<KeyRoundIcon className="h-4 w-4" />} />
          <div className="space-y-4 p-5">
            <Toggle
              label="Two-factor authentication"
              description="Require a one-time code when logging in from a new device"
              checked={twoFactor}
              onChange={(v) => {
                setTwoFactor(v);
                toast.success(v ? 'Two-factor authentication enabled' : 'Two-factor disabled');
              }} />
            
            <Button variant="outline" onClick={() => toast.success('Recovery codes downloaded')}>
              Download recovery codes
            </Button>
          </div>
        </Card>

        <Card>
          <CardHeader title="API integrations" icon={<PlugZapIcon className="h-4 w-4" />} />
          <ul className="divide-y divide-line/60">
            {integrations.map((i) =>
            <li key={i.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
                <div>
                  <p className="text-sm font-medium text-ink">{i.name}</p>
                  <p className="text-xs text-muted">{i.detail}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge tone={i.status === 'Connected' ? 'success' : 'neutral'}>{i.status}</Badge>
                  <Button
                  size="sm"
                  variant={i.status === 'Connected' ? 'outline' : 'primary'}
                  onClick={() => toast.success(`${i.name} updated`)}>
                  
                    {i.status === 'Connected' ? 'Manage' : 'Connect'}
                  </Button>
                </div>
              </li>
            )}
          </ul>
        </Card>

        <Card>
          <CardHeader title="Help & FAQ" />
          <div className="p-5">
            <Accordion
              items={[
              {
                id: 'f1',
                question: 'How early are reminders sent?',
                answer:
                'By default we send a reminder 24 hours and 2 hours before doors open. You can override this per reminder when you create it.'
              },
              {
                id: 'f2',
                question: 'Can I sync with Apple Calendar?',
                answer:
                'Yes — export your calendar as an .ics file from the Calendar page and subscribe to it in Apple Calendar.'
              },
              {
                id: 'f3',
                question: 'How do you calculate distance to a venue?',
                answer:
                'Distance is measured from your last known location, which requires the location permission above to be enabled.'
              }]
              } />
            
          </div>
        </Card>
      </div>
    </DashboardLayout>);

}