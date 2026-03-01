import type { Priority } from '../../types';

interface BadgeProps {
  priority: Priority;
}

const classes: Record<Priority, string> = {
  high: 'bg-red-100 text-red-700 border border-red-200',
  medium: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
  low: 'bg-green-100 text-green-700 border border-green-200',
};

const labels: Record<Priority, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

export function Badge({ priority }: BadgeProps) {
  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${classes[priority]}`}>
      {labels[priority]}
    </span>
  );
}

interface CategoryBadgeProps {
  name: string;
  color?: string;
  onRemove?: () => void;
}

const colorMap: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
  purple: 'bg-purple-100 text-purple-700',
  orange: 'bg-orange-100 text-orange-700',
  pink: 'bg-pink-100 text-pink-700',
  gray: 'bg-gray-100 text-gray-700',
};

export function CategoryBadge({ name, color = 'gray', onRemove }: CategoryBadgeProps) {
  const cls = colorMap[color] ?? colorMap.gray;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full ${cls}`}>
      {name}
      {onRemove && (
        <button onClick={onRemove} className="hover:opacity-70 leading-none" aria-label={`Remove ${name}`}>
          ×
        </button>
      )}
    </span>
  );
}
