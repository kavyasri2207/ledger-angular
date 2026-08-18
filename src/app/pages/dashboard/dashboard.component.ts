import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { CATEGORY_META } from '../../models/task.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private taskService = inject(TaskService);

  stats = this.taskService.stats;
  pending = this.taskService.pending;
  categoryMeta = CATEGORY_META;

  today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  get upcoming() {
    return [...this.pending()]
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
      .slice(0, 5);
  }
}
