import type { Todo, FilterState, Priority } from '../types';

const priorityOrder: Record<Priority, number> = { high: 0, medium: 1, low: 2 };

export function applySorting(todos: Todo[], filter: FilterState): Todo[] {
  const { sortField, sortDir } = filter;
  const dir = sortDir === 'asc' ? 1 : -1;

  return [...todos].sort((a, b) => {
    if (sortField === 'priority') {
      return dir * (priorityOrder[a.priority] - priorityOrder[b.priority]);
    }
    if (sortField === 'title') {
      return dir * a.title.localeCompare(b.title);
    }
    if (sortField === 'dueDate') {
      const da = a.dueDate ?? '9999-99-99';
      const db = b.dueDate ?? '9999-99-99';
      return dir * da.localeCompare(db);
    }
    // createdAt | updatedAt
    const va = a[sortField] ?? '';
    const vb = b[sortField] ?? '';
    return dir * va.localeCompare(vb);
  });
}
