# Kanban ToDo Dashboard

A modern Kanban-style task management application built with Next.js, React Query, and Material UI.

## Features

- ✅ **4 Kanban Columns**: Backlog, In Progress, Review, and Done
- ✅ **Drag-and-Drop**: Move tasks between columns with smooth drag-and-drop functionality
- ✅ **CRUD Operations**: Create, read, update, and delete tasks
- ✅ **Search & Filter**: Search tasks by title or description
- ✅ **Pagination**: Load more tasks in each column with pagination
- ✅ **React Query**: Efficient data fetching and caching
- ✅ **Material UI**: Beautiful and responsive UI components

## Prerequisites

- Node.js 18+ and npm
- json-server (installed as dev dependency)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Mock API Server

In a separate terminal, start the json-server:

```bash
npm run json-server
```

This will start the API server on `http://localhost:4000`

### 3. Start the Next.js Development Server

In another terminal:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Usage

### Creating a Task

1. Click the "Add Task" button in any column
2. Fill in the task title (required) and description
3. Select the target column
4. Click "Create"

### Editing a Task

1. Click the edit icon (pencil) on any task card
2. Modify the task details
3. Click "Update"

### Deleting a Task

1. Click the delete icon (trash) on any task card
2. Confirm the deletion

### Moving Tasks

1. Click and drag any task card
2. Drop it into a different column
3. The task will automatically update its column

### Searching Tasks

1. Use the search bar at the top of the board
2. Type to filter tasks by title or description
3. The search works across all columns

### Pagination

- Each column displays 5 tasks by default
- Click "Load More" to see additional tasks in that column
- Pagination resets when search query changes

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Main Kanban board page
├── components/
│   ├── kanban/            # Kanban board components
│   │   ├── KanbanBoard.tsx
│   │   ├── KanbanColumn.tsx
│   │   ├── TaskCard.tsx
│   │   └── TaskDialog.tsx
│   └── providers/         # React Query provider
│       └── QueryProvider.tsx
├── hooks/
│   └── use-tasks.ts       # React Query hooks for tasks
├── services/
│   └── task.service.ts    # API service functions
└── types/
    └── task.types.ts      # TypeScript type definitions
```

## API Endpoints

The application uses json-server which provides RESTful endpoints:

- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get a specific task
- `POST /tasks` - Create a new task
- `PATCH /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

## Data Structure

Tasks are stored in `db.json` with the following structure:

```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Task title",
      "description": "Task description",
      "column": "backlog"
    }
  ]
}
```

Valid column values: `backlog`, `in_progress`, `review`, `done`

## Technologies Used

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Material UI** - Component library
- **React Query (@tanstack/react-query)** - Data fetching and caching
- **DnD Kit** - Drag-and-drop functionality
- **json-server** - Mock REST API

## Development

### Available Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run json-server` - Start mock API server
- `npm run lint` - Run ESLint

## Notes

- The mock API server must be running for the application to work
- Data is persisted in `db.json` file
- React Query caches data for 1 minute by default
- Drag-and-drop requires a minimum drag distance of 8px to activate
