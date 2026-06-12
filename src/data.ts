export const value_converter = (value: string | number): string => {
  const num = typeof value === 'string' ? parseInt(value, 10) : value;
  if (num >= 1_000_000) return Math.floor(num / 1_000_000) + 'M';
  if (num >= 1_000) return Math.floor(num / 1_000) + 'K';
  return String(num);
};

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

const TIME_DIVISIONS: { unit: Intl.RelativeTimeFormatUnit; ms: number }[] = [
  { unit: 'year',   ms: 365 * 24 * 60 * 60 * 1000 },
  { unit: 'month',  ms: 30  * 24 * 60 * 60 * 1000 },
  { unit: 'week',   ms: 7   * 24 * 60 * 60 * 1000 },
  { unit: 'day',    ms: 24  * 60 * 60 * 1000 },
  { unit: 'hour',   ms: 60  * 60 * 1000 },
  { unit: 'minute', ms: 60  * 1000 },
  { unit: 'second', ms: 1000 },
];

export const time_ago = (dateString: string): string => {
  const elapsed = new Date(dateString).getTime() - Date.now();
  for (const { unit, ms } of TIME_DIVISIONS) {
    if (Math.abs(elapsed) >= ms) return rtf.format(Math.round(elapsed / ms), unit);
  }
  return 'just now';
};
