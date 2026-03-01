import { useState } from 'react';
import { useTodo } from '../../hooks/useTodo';
import { CategoryBadge } from '../ui/Badge';
import { Button } from '../ui/Button';

const COLORS = ['blue', 'green', 'purple', 'orange', 'pink', 'gray'];

export function Sidebar() {
  const { state, dispatch, filter, setFilter } = useTodo();
  const [newCatName, setNewCatName] = useState('');
  const [newCatColor, setNewCatColor] = useState('blue');
  const [showForm, setShowForm] = useState(false);

  const totalActive = state.todos.filter((t) => t.status === 'active').length;
  const totalCompleted = state.todos.filter((t) => t.status === 'completed').length;

  function addCategory() {
    if (!newCatName.trim()) return;
    dispatch({ type: 'ADD_CATEGORY', payload: { name: newCatName.trim(), color: newCatColor } });
    setNewCatName('');
    setShowForm(false);
  }

  return (
    <aside className="w-56 bg-gray-50 border-r border-gray-200 p-4 flex flex-col gap-6 shrink-0">
      {/* Status filter */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">ステータス</p>
        <ul className="space-y-1">
          {(['all', 'active', 'completed'] as const).map((s) => (
            <li key={s}>
              <button
                onClick={() => setFilter((f) => ({ ...f, status: s }))}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  filter.status === s
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {s === 'all' ? `すべて (${state.todos.length})` : s === 'active' ? `進行中 (${totalActive})` : `完了 (${totalCompleted})`}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Priority filter */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">優先度</p>
        <ul className="space-y-1">
          {(['all', 'high', 'medium', 'low'] as const).map((p) => (
            <li key={p}>
              <button
                onClick={() => setFilter((f) => ({ ...f, priority: p }))}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  filter.priority === p
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {p === 'all' ? 'すべての優先度' : p === 'high' ? '高' : p === 'medium' ? '中' : '低'}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Categories */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">カテゴリー</p>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="text-blue-600 hover:text-blue-700 text-xs"
          >
            {showForm ? 'キャンセル' : '+ 追加'}
          </button>
        </div>

        {showForm && (
          <div className="mb-2 space-y-1.5">
            <input
              type="text"
              placeholder="カテゴリー名"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCategory()}
              className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
            />
            <div className="flex gap-1 flex-wrap">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setNewCatColor(c)}
                  className={`w-4 h-4 rounded-full bg-${c}-400 ring-offset-1 ${newCatColor === c ? 'ring-2 ring-blue-500' : ''}`}
                  title={c}
                />
              ))}
            </div>
            <Button size="sm" onClick={addCategory} className="w-full justify-center">追加</Button>
          </div>
        )}

        <ul className="space-y-1">
          <li>
            <button
              onClick={() => setFilter((f) => ({ ...f, categoryId: 'all' }))}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                filter.categoryId === 'all'
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              すべてのカテゴリー
            </button>
          </li>
          {state.categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => setFilter((f) => ({ ...f, categoryId: cat.id }))}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center justify-between group ${
                  filter.categoryId === cat.id
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <CategoryBadge name={cat.name} color={cat.color} />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch({ type: 'DELETE_CATEGORY', payload: cat.id });
                    if (filter.categoryId === cat.id) setFilter((f) => ({ ...f, categoryId: 'all' }));
                  }}
                  className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 text-xs"
                  aria-label={`カテゴリー「${cat.name}」を削除`}
                >
                  ×
                </button>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
