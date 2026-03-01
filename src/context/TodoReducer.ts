import type { AppState, Todo, Category } from '../types';

export type Action =
  | { type: 'ADD_TODO'; payload: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'> }
  | { type: 'UPDATE_TODO'; payload: { id: string } & Partial<Omit<Todo, 'id' | 'createdAt'>> }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'ADD_CATEGORY'; payload: Omit<Category, 'id'> }
  | { type: 'DELETE_CATEGORY'; payload: string };

export function todoReducer(state: AppState, action: Action): AppState {
  const now = new Date().toISOString();

  switch (action.type) {
    case 'ADD_TODO': {
      const todo: Todo = {
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
      };
      return { ...state, todos: [...state.todos, todo] };
    }

    case 'UPDATE_TODO': {
      const { id, ...updates } = action.payload;
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === id ? { ...t, ...updates, updatedAt: now } : t
        ),
      };
    }

    case 'DELETE_TODO':
      return { ...state, todos: state.todos.filter((t) => t.id !== action.payload) };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload
            ? { ...t, status: t.status === 'active' ? 'completed' : 'active', updatedAt: now }
            : t
        ),
      };

    case 'ADD_CATEGORY': {
      const category: Category = {
        ...action.payload,
        id: crypto.randomUUID(),
      };
      return { ...state, categories: [...state.categories, category] };
    }

    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter((c) => c.id !== action.payload),
        todos: state.todos.map((t) => ({
          ...t,
          categoryIds: t.categoryIds.filter((cId) => cId !== action.payload),
        })),
      };

    default:
      return state;
  }
}
