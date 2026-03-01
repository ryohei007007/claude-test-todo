import type { Todo } from '../../types';
import { useTodo } from '../../hooks/useTodo';
import { TodoItem } from './TodoItem';
import { EmptyState } from '../ui/EmptyState';

interface TodoListProps {
  onEdit: (todo: Todo) => void;
  onAdd: () => void;
}

export function TodoList({ onEdit, onAdd }: TodoListProps) {
  const { filteredTodos, state, dispatch } = useTodo();

  function handleToggle(id: string) {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }

  function handleDelete(id: string) {
    if (window.confirm('このタスクを削除しますか？')) {
      dispatch({ type: 'DELETE_TODO', payload: id });
    }
  }

  if (filteredTodos.length === 0) {
    return (
      <EmptyState
        message={state.todos.length === 0 ? 'タスクがありません' : 'フィルターに一致するタスクがありません'}
        onAdd={state.todos.length === 0 ? onAdd : undefined}
      />
    );
  }

  return (
    <div className="space-y-3">
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          categories={state.categories}
          onToggle={handleToggle}
          onEdit={onEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
