import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { CATEGORY_META, Category, Priority, PRIORITY_META, Task } from '../../models/task.model';

type FilterKey = 'all' | Category;

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  private taskService = inject(TaskService);
  private fb = inject(FormBuilder);

  categoryMeta = CATEGORY_META;
  priorityMeta = PRIORITY_META;
  categories = Object.keys(CATEGORY_META) as Category[];
  priorities = Object.keys(PRIORITY_META) as Priority[];

  filter = signal<FilterKey>('all');
  showForm = signal(false);
  editingId = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    notes: [''],
    category: ['academics' as Category, Validators.required],
    priority: ['medium' as Priority, Validators.required],
    dueDate: [new Date().toISOString().slice(0, 10), Validators.required],
  });

  get filtered(): Task[] {
    const list = this.taskService.pending();
    const f = this.filter();
    const scoped = f === 'all' ? list : list.filter((t) => t.category === f);
    return [...scoped].sort(
      (a, b) =>
        PRIORITY_META[b.priority].weight - PRIORITY_META[a.priority].weight ||
        a.dueDate.localeCompare(b.dueDate),
    );
  }

  setFilter(key: FilterKey) {
    this.filter.set(key);
  }

  get todayForTemplate(): string {
    return new Date().toISOString().slice(0, 10);
  }

  openNewForm() {
    this.editingId.set(null);
    this.form.reset({
      title: '',
      notes: '',
      category: 'academics',
      priority: 'medium',
      dueDate: new Date().toISOString().slice(0, 10),
    });
    this.showForm.set(true);
  }

  edit(task: Task) {
    this.editingId.set(task.id);
    this.form.setValue({
      title: task.title,
      notes: task.notes ?? '',
      category: task.category,
      priority: task.priority,
      dueDate: task.dueDate,
    });
    this.showForm.set(true);
  }

  cancel() {
    this.showForm.set(false);
    this.editingId.set(null);
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    const id = this.editingId();
    if (id) {
      this.taskService.update(id, value);
    } else {
      this.taskService.add(value);
    }
    this.showForm.set(false);
    this.editingId.set(null);
  }

  toggle(id: string) {
    this.taskService.toggleDone(id);
  }

  remove(id: string) {
    this.taskService.remove(id);
  }
}
