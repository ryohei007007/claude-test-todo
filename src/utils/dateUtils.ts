export function isOverdue(dueDate: string | null, status: string): boolean {
  if (!dueDate || status === 'completed') return false;
  return new Date(dueDate) < new Date(new Date().toDateString());
}

export function formatDate(dateStr: string | null): string {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function isDueToday(dueDate: string | null): boolean {
  if (!dueDate) return false;
  const today = new Date().toDateString();
  return new Date(dueDate + 'T00:00:00').toDateString() === today;
}
