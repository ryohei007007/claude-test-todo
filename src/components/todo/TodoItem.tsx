import type { Todo, Category } from '../../types';
import { Badge, CategoryBadge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { isOverdue, isDueToday, formatDate } from '../../utils/dateUtils';

interface TodoItemProps {
  todo: Todo;
  categories: Category[];
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, categories, onToggle, onEdit, onDelete }: TodoItemProps) {
  const overdue = isOverdue(todo.dueDate, todo.status);
  const dueToday = isDueToday(todo.dueDate) && todo.status === 'active';
  const todoCats = categories.filter((c) => todo.categoryIds.includes(c.id));

  return (
    <div
      className={`bg-white rounded-lg border p-4 transition-all hover:shadow-sm ${
        todo.status === 'completed' ? 'border-gray-200 opacity-70' : overdue ? 'border-red-200' : 'border-gray-200'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          className={`mt-0.5 w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${
            todo.status === 'completed'
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-blue-400'
          }`}
          aria-label={todo.status === 'completed' ? '進行中にする' : '完了にする'}
        >
          {todo.status === 'completed' && (
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={`font-medium text-gray-900 break-words ${
                todo.status === 'completed' ? 'line-through text-gray-500' : ''
              }`}
            >
              {todo.title}
            </h3>
            <div className="flex items-center gap-1 shrink-0">
              <Badge priority={todo.priority} />
            </div>
          </div>

          {todo.description && (
            <p className="text-sm text-gray-500 mt-1 break-words">{todo.description}</p>
          )}

          <div className="flex flex-wrap items-center gap-2 mt-2">
            {/* Categories */}
            {todoCats.map((cat) => (
              <CategoryBadge key={cat.id} name={cat.name} color={cat.color} />
            ))}

            {/* Due date */}
            {todo.dueDate && (
              <span
                className={`text-xs flex items-center gap-1 ${
                  overdue
                    ? 'text-red-600 font-medium'
                    : dueToday
                    ? 'text-orange-500 font-medium'
                    : 'text-gray-400'
                }`}
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {overdue ? '期限超過 · ' : dueToday ? '今日期限 · ' : ''}
                {formatDate(todo.dueDate)}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(todo)}
            aria-label="タスクを編集"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(todo.id)}
            aria-label="タスクを削除"
            className="text-red-400 hover:text-red-600 hover:bg-red-50"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}
