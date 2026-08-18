# Ledger — A Student's Day-Book (Angular Task Manager)

A task/planner app built with Angular 18 (standalone components, signals, reactive forms).
Styled as a "ledger" / notebook: a stamp-style progress ring, a ruled task board, and an archive
of closed-out entries.

## Features

- **Dashboard** — progress ring, quick stats (total / due today / overdue), upcoming tasks
- **Task Board** — full CRUD (add, edit, complete, delete), category filters, priority tags, due dates
- **Archive** — log of completed tasks, with reopen/delete
- Data persists in the browser via `localStorage` (no backend needed)
- Fully responsive, keyboard-focusable, built with Angular Router (lazy-loaded routes) and
  Reactive Forms

## Tech stack

Angular 18 · TypeScript · SCSS · Angular Signals · Reactive Forms · Angular Router

## Run locally

```bash
npm install
npm start        # ng serve, http://localhost:4200
```

## Production build

```bash
npm run build     # outputs to dist/taskflow
```

## Push to GitHub

```bash
git init
git add .
git commit -m "Ledger: Angular task planner"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

## Deploy (optional, GitHub Pages)

```bash
npm install -g angular-cli-ghpages
ng build --base-href "https://<your-username>.github.io/<repo-name>/"
npx angular-cli-ghpages --dir=dist/taskflow/browser
```
