import { useTodo } from '../../hooks/useTodo';

export function SearchBar() {
  const { filter, setFilter } = useTodo();

  return (
    <div className="relative">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
        fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0" />
      </svg>
      <input
        type="text"
        placeholder="タスクを検索..."
        value={filter.searchQuery}
        onChange={(e) => setFilter((f) => ({ ...f, searchQuery: e.target.value }))}
        className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {filter.searchQuery && (
        <button
          onClick={() => setFilter((f) => ({ ...f, searchQuery: '' }))}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      )}
    </div>
  );
}
