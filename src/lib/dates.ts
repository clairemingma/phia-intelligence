/** Dates are held and shown as MM/DD/YYYY throughout, so the parsing and
 *  formatting live here rather than beside each field that needs them. */

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** Sunday-first, matching the calendar grid. */
export const WEEKDAY_INITIALS = ["S", "M", "T", "W", "T", "F", "S"];

export function parseMMDDYYYY(s: string): Date | null {
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return null;
  const [month, day, year] = [+m[1], +m[2], +m[3]];
  const d = new Date(year, month - 1, day);
  // Rejects the likes of 02/31 — the roll-over lands on a different month.
  if (d.getMonth() !== month - 1 || d.getDate() !== day) return null;
  return isFinite(d.getTime()) ? d : null;
}

export function formatMMDDYYYY(d: Date): string {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${mm}/${dd}/${d.getFullYear()}`;
}

export function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Midnight, so two dates compare on the day rather than the moment. */
export function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/**
 * Shapes whatever has been typed into MM/DD/YYYY as it goes, keeping only
 * digits and laying the slashes in for the typist.
 */
export function maskMMDDYYYY(input: string): string {
  let digits = input.replace(/\D/g, "");
  // No month starts 2–9 and no day starts 4–9, so a lone high digit means the
  // leading zero was skipped — someone typing "3/15" rather than "03/15".
  if (digits.length >= 1 && +digits[0] > 1) digits = `0${digits}`;
  if (digits.length >= 3 && +digits[2] > 3) {
    digits = `${digits.slice(0, 2)}0${digits.slice(2)}`;
  }
  digits = digits.slice(0, 8);
  const parts = [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)];
  return parts.filter((p) => p.length).join("/");
}

/**
 * The days to draw for a month, padded with the neighbouring days that share
 * its weeks so the grid is always whole.
 */
export function monthGrid(year: number, month: number): Date[] {
  const first = new Date(year, month, 1);
  const start = new Date(year, month, 1 - first.getDay());
  return Array.from(
    { length: 42 },
    (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i),
  );
}
