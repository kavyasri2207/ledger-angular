import { Component, inject } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { CATEGORY_META } from '../../models/task.model';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [SlicePipe],
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.scss',
})
export class ArchiveComponent {
  private taskService = inject(TaskService);

  categoryMeta = CATEGORY_META;

  get completed() {
    return [...this.taskService.completed()].sort((a, b) =>
      (b.completedAt ?? '').localeCompare(a.completedAt ?? ''),
    );
  }

  restore(id: string) {
    this.taskService.toggleDone(id);
  }

  remove(id: string) {
    this.taskService.remove(id);
  }
}
