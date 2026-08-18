# Ledger

<p align="center">
  <b>A polished Angular task planner styled like a student day-book.</b><br />
  Track work, view progress at a glance, and archive completed tasks in a clean notebook-inspired interface.
</p>

## Overview

Ledger is a task management app built with Angular 18. It combines a visual dashboard, a structured task board, and a completed-task archive so planning feels organized instead of cluttered.

## Highlights

- Dashboard with progress overview, quick stats, and upcoming work
- Task board with create, edit, complete, delete, filters, priorities, and due dates
- Archive for finished tasks with reopen and delete actions
- Browser persistence through `localStorage`, so no backend is required
- Responsive layout built with Angular Router, standalone components, signals, and reactive forms

## Tech Stack

Angular 18 · TypeScript · SCSS · Angular Signals · Reactive Forms · Angular Router

## Run Locally

```bash
npm install
npm start
```

Then open `http://localhost:4200` in your browser.

## Build for Production

```bash
npm run build
```

The production output is generated in `dist/taskflow`.

## Project Snapshot

- `Dashboard` for progress and due-date visibility
- `Board` for active task management
- `Archive` for completed items
- `Sidebar` for navigation between sections

## Publish to GitHub

This repository is currently tracking `origin/master`. If you want to keep that branch name, push with:

```bash
git add .
git commit -m "Refine README"
git push
```

If you prefer `main`, rename the branch first and then push it:

```bash
git branch -M main
git push -u origin main
```

## Optional GitHub Pages Deploy

```bash
npm install -g angular-cli-ghpages
ng build --base-href "https://<your-username>.github.io/<repo-name>/"
npx angular-cli-ghpages --dir=dist/taskflow/browser
```
