import { SearchBar } from './SearchBar';
import { SortControl } from './SortControl';
import { useTodo } from '../../hooks/useTodo';

export function FilterBar() {
  const { filteredTodos } = useTodo();

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <div className="flex-1 min-w-48">
        <SearchBar />
      </div>
      <SortControl />
      <span className="text-sm text-gray-400 whitespace-nowrap">
        {filteredTodos.length} 件
      </span>
    </div>
  );
}
