# Kanban ToDo Dashboard

A Kanban-style task management app built with Next.js. Drag tasks around, organize your work, and get stuff done. Has dark mode, search, and all that good stuff.

## Features

- 4 columns: TO DO, IN PROGRESS, IN REVIEW, and DONE
- Drag and drop tasks between columns
- Create, edit, and delete tasks
- Search tasks by title or description
- Pagination with "Load More" button (also has infinite scroll)
- Priority tags: HIGH, MEDIUM, LOW
- React Query for smart caching
- Dark/light mode toggle
- Responsive design

## Setup

You need Node.js 18+ installed.

### Install dependencies

```bash
npm install
```

### Start the API server

Run this in one terminal:

```bash
npm run json-server
```

This starts the mock API on port 4000. You'll see something like:

```
\{^_^}/ hi!

Loading db.json
Done

Resources
http://localhost:4000/tasks
```

Keep this terminal open.

### Start the app

Open a second terminal and run:

```bash
npm run dev
```

Then go to `http://localhost:3000` in your browser.

## How to Use

**Add a task**: Click "Add task" at the bottom of any column, fill it out, click Create.

**Edit**: Click the pencil icon on a task card.

**Delete**: Click the trash icon, confirm in the dialog.

**Move tasks**: Drag and drop between columns.

**Search**: Use the search bar at the top.

**Switch themes**: Click the sun/moon icon in the header.

## Project Structure

```
src/
├── app/              # Next.js pages
├── components/       # UI components
│   ├── kanban/     # Board components
│   ├── theme/      # Theme stuff
│   └── providers/  # React Query setup
├── hooks/           # Custom hooks (all the logic)
├── services/        # API calls
├── types/           # TypeScript types
└── theme/           # Material UI theme
```

I kept the logic separate from the UI. All business logic is in custom hooks, components just render stuff. Easier to test and maintain.

## API

Uses json-server for the mock API. Standard REST endpoints:

- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get one task
- `POST /tasks` - Create a task
- `PATCH /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

Tasks are in `db.json`:

```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Task title",
      "description": "Description",
      "column": "backlog",
      "priority": "high"
    }
  ]
}
```

Columns: `backlog`, `in_progress`, `review`, `done`
Priority: `high`, `medium`, `low` (optional, defaults to `low`)

## Scripts

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run start` - Run production build
- `npm run json-server` - Start mock API
- `npm run lint` - Run linter

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Material UI
- React Query
- DnD Kit
- json-server

## Troubleshooting

**Connection refused?** Make sure json-server is running on port 4000.

**Tasks not updating?** Check that json-server is watching `db.json` and check the browser console.

**Theme not saving?** It's in localStorage. Try clearing your cache.

## Development Notes

All the logic is in custom hooks (`useKanbanBoard`, `useKanbanColumn`, etc.) so components stay clean and focused on rendering. React Query caches data for 5 minutes and does optimistic updates so the UI feels fast.
