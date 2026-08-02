import React, { useEffect, useState } from 'react';
import { countdown } from '../../utils/cn';

export function Countdown({ date, time }: {date: string;time: string;}) {
  const [remaining, setRemaining] = useState(() => countdown(date, time));

  useEffect(() => {
    const id = setInterval(() => setRemaining(countdown(date, time)), 1000);
    return () => clearInterval(id);
  }, [date, time]);

  const blocks = [
  { label: 'Days', value: remaining.days },
  { label: 'Hours', value: remaining.hours },
  { label: 'Mins', value: remaining.minutes },
  { label: 'Secs', value: remaining.seconds }];


  return (
    <div className="grid grid-cols-4 gap-2" aria-label="Time until event starts">
      {blocks.map((b) =>
      <div
        key={b.label}
        className="rounded-xl border border-line bg-elevated/60 px-2 py-3 text-center">
        
          <p className="font-display text-xl font-semibold tabular-nums text-ink">
            {String(b.value).padStart(2, '0')}
          </p>
          <p className="text-[11px] uppercase tracking-wide text-muted">{b.label}</p>
        </div>
      )}
    </div>);

}