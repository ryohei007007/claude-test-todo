export type Priority = 'high' | 'medium' | 'low';
export type Status = 'active' | 'completed';

export interface Todo {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  categoryIds: string[];
  dueDate: string | null; // "YYYY-MM-DD" or null
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface FilterState {
  status: Status | 'all';
  priority: Priority | 'all';
  categoryId: string | 'all';
  searchQuery: string;
  sortField: 'createdAt' | 'updatedAt' | 'dueDate' | 'priority' | 'title';
  sortDir: 'asc' | 'desc';
}

export interface AppState {
  todos: Todo[];
  categories: Category[];
}
