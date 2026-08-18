import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-mark">§</span>
        <div class="brand-text">
          <span class="brand-name">Ledger</span>
          <span class="brand-sub">a student's day-book</span>
        </div>
      </div>

      <nav class="nav">
        <a routerLink="/dashboard" routerLinkActive="active" class="nav-link">
          <span class="nav-index">01</span> Overview
        </a>
        <a routerLink="/board" routerLinkActive="active" class="nav-link">
          <span class="nav-index">02</span> Task Board
        </a>
        <a routerLink="/archive" routerLinkActive="active" class="nav-link">
          <span class="nav-index">03</span> Archive
        </a>
      </nav>

      <div class="sidebar-footer">
        <span class="stamp">est. 2026</span>
      </div>
    </aside>
  `,
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {}
