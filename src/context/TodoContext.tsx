import { createContext, useReducer, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { AppState, FilterState, Todo } from '../types';
import { todoReducer, type Action } from './TodoReducer';
import { applyFilters } from '../utils/filterUtils';
import { applySorting } from '../utils/sortUtils';

const STORAGE_KEY = 'todo-app-v1';

const defaultAppState: AppState = {
  todos: [],
  categories: [],
};

const defaultFilter: FilterState = {
  status: 'all',
  priority: 'all',
  categoryId: 'all',
  searchQuery: '',
  sortField: 'createdAt',
  sortDir: 'desc',
};

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AppState;
  } catch {
    // ignore
  }
  return defaultAppState;
}

interface TodoContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  filteredTodos: Todo[];
}

export const TodoContext = createContext<TodoContextValue | null>(null);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, undefined, loadState);
  const [filter, setFilter] = useState<FilterState>(defaultFilter);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const filteredTodos = useMemo(() => {
    const filtered = applyFilters(state.todos, filter);
    return applySorting(filtered, filter);
  }, [state.todos, filter]);

  return (
    <TodoContext.Provider value={{ state, dispatch, filter, setFilter, filteredTodos }}>
      {children}
    </TodoContext.Provider>
  );
}
