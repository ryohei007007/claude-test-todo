import { useTodo } from '../../hooks/useTodo';
import type { FilterState } from '../../types';

type SortField = FilterState['sortField'];

const sortOptions: { value: SortField; label: string }[] = [
  { value: 'createdAt', label: '作成日' },
  { value: 'updatedAt', label: '更新日' },
  { value: 'dueDate', label: '期日' },
  { value: 'priority', label: '優先度' },
  { value: 'title', label: 'タイトル' },
];

export function SortControl() {
  const { filter, setFilter } = useTodo();

  return (
    <div className="flex items-center gap-2 text-sm">
      <label className="text-gray-500 whitespace-nowrap">並び替え:</label>
      <select
        value={filter.sortField}
        onChange={(e) => setFilter((f) => ({ ...f, sortField: e.target.value as SortField }))}
        className="border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {sortOptions.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <button
        onClick={() => setFilter((f) => ({ ...f, sortDir: f.sortDir === 'asc' ? 'desc' : 'asc' }))}
        className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
        title={filter.sortDir === 'asc' ? '昇順' : '降順'}
      >
        {filter.sortDir === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  );
}
