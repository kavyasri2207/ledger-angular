import { Injectable, computed, signal } from '@angular/core';
import { Task } from '../models/task.model';

const STORAGE_KEY = 'ledger.tasks.v1';

function seedTasks(): Task[] {
  const today = new Date();
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  const plus = (days: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() + days);
    return iso(d);
  };
  return [
    {
      id: crypto.randomUUID(),
      title: 'Finish Angular capstone submission',
      notes: 'Push to GitHub and attach repo link before the deadline.',
      category: 'academics',
      priority: 'high',
      dueDate: iso(today),
      done: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      title: 'Revise resume bullet points',
      category: 'career',
      priority: 'medium',
      dueDate: plus(2),
      done: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      title: 'Morning walk',
      category: 'health',
      priority: 'low',
      dueDate: plus(1),
      done: true,
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
    },
  ];
}

function loadInitial(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Task[];
  } catch {
    /* ignore corrupt storage */
  }
  return seedTasks();
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly _tasks = signal<Task[]>(loadInitial());
  readonly tasks = this._tasks.asReadonly();

  readonly pending = computed(() => this._tasks().filter((t) => !t.done));
  readonly completed = computed(() => this._tasks().filter((t) => t.done));

  readonly stats = computed(() => {
    const all = this._tasks();
    const total = all.length;
    const done = all.filter((t) => t.done).length;
    const overdue = all.filter((t) => !t.done && t.dueDate < todayIso()).length;
    const dueToday = all.filter((t) => !t.done && t.dueDate === todayIso()).length;
    return {
      total,
      done,
      overdue,
      dueToday,
      progress: total === 0 ? 0 : Math.round((done / total) * 100),
    };
  });

  private persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._tasks()));
  }

  add(task: Omit<Task, 'id' | 'createdAt' | 'done' | 'completedAt'>) {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      done: false,
      createdAt: new Date().toISOString(),
    };
    this._tasks.update((list) => [newTask, ...list]);
    this.persist();
  }

  update(id: string, changes: Partial<Task>) {
    this._tasks.update((list) => list.map((t) => (t.id === id ? { ...t, ...changes } : t)));
    this.persist();
  }

  toggleDone(id: string) {
    this._tasks.update((list) =>
      list.map((t) =>
        t.id === id
          ? { ...t, done: !t.done, completedAt: !t.done ? new Date().toISOString() : undefined }
          : t,
      ),
    );
    this.persist();
  }

  remove(id: string) {
    this._tasks.update((list) => list.filter((t) => t.id !== id));
    this.persist();
  }
}

export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}
