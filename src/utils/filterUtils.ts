import type { Todo, FilterState } from '../types';

export function applyFilters(todos: Todo[], filter: FilterState): Todo[] {
  let result = todos;

  if (filter.status !== 'all') {
    result = result.filter((t) => t.status === filter.status);
  }

  if (filter.priority !== 'all') {
    result = result.filter((t) => t.priority === filter.priority);
  }

  if (filter.categoryId !== 'all') {
    result = result.filter((t) => t.categoryIds.includes(filter.categoryId as string));
  }

  if (filter.searchQuery.trim()) {
    const q = filter.searchQuery.toLowerCase();
    result = result.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    );
  }

  return result;
}
