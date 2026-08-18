export type Priority = 'low' | 'medium' | 'high';

export type Category = 'academics' | 'personal' | 'career' | 'health';

export interface Task {
  id: string;
  title: string;
  notes?: string;
  category: Category;
  priority: Priority;
  dueDate: string; // ISO date string, yyyy-mm-dd
  done: boolean;
  createdAt: string;
  completedAt?: string;
}

export const CATEGORY_META: Record<Category, { label: string; icon: string }> = {
  academics: { label: 'Academics', icon: '📘' },
  personal: { label: 'Personal', icon: '🌱' },
  career: { label: 'Career', icon: '🎯' },
  health: { label: 'Health', icon: '🌤' },
};

export const PRIORITY_META: Record<Priority, { label: string; weight: number }> = {
  high: { label: 'High', weight: 3 },
  medium: { label: 'Medium', weight: 2 },
  low: { label: 'Low', weight: 1 },
};
