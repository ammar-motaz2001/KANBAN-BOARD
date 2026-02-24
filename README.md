# Kanban ToDo Dashboard

A modern, professional Kanban-style task management application built with Next.js, React Query, Material UI, and TypeScript. Features drag-and-drop functionality, real-time updates, dark/light mode, and responsive design.

## 🚀 Features

- ✅ **4 Kanban Columns**: TO DO, IN PROGRESS, IN REVIEW, and DONE
- ✅ **Drag-and-Drop**: Smooth drag-and-drop functionality to move tasks between columns
- ✅ **CRUD Operations**: Create, read, update, and delete tasks with real-time updates
- ✅ **Search & Filter**: Search tasks by title or description across all columns
- ✅ **Pagination & Infinite Scroll**: Load more tasks in each column with pagination and infinite scroll
- ✅ **Priority System**: Assign HIGH, MEDIUM, or LOW priority to tasks with color-coded tags
- ✅ **React Query Caching**: Efficient data fetching and caching with optimistic updates
- ✅ **Dark/Light Mode**: Toggle between dark and light themes with persistent preference
- ✅ **Responsive Design**: Fully responsive layout that works on all screen sizes
- ✅ **Professional UI**: Clean, modern design with Material UI components

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and npm
- **json-server** (installed as dev dependency)

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Mock API Server

In a separate terminal window, start the json-server:

```bash
npm run json-server
```

This will start the API server on `http://localhost:4000` and watch the `db.json` file for changes.

You should see output like:
```
\{^_^}/ hi!

Loading db.json
Done

Resources
http://localhost:4000/tasks

Home
http://localhost:4000
```

### 3. Start the Next.js Development Server

In another terminal window:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Main Kanban board page
│   └── globals.css              # Global styles
├── components/
│   ├── kanban/                  # Kanban board components
│   │   ├── KanbanBoard.tsx     # Main board component (presentational)
│   │   ├── KanbanColumn.tsx    # Column component (presentational)
│   │   ├── TaskCard.tsx        # Task card component (presentational)
│   │   ├── TaskDialog.tsx      # Task create/edit dialog (presentational)
│   │   ├── DeleteConfirmationDialog.tsx  # Delete confirmation dialog
│   │   └── index.ts            # Barrel exports
│   ├── theme/                   # Theme components
│   │   ├── ThemeRegistry.tsx   # Theme provider wrapper
│   │   ├── ThemeContext.tsx    # Theme context and provider
│   │   └── ThemeToggle.tsx     # Theme toggle button
│   └── providers/               # Context providers
│       └── QueryProvider.tsx   # React Query provider
├── hooks/                        # Custom React hooks (business logic)
│   ├── use-tasks.ts            # Task CRUD operations hooks
│   ├── use-kanban-board.ts     # Kanban board state and logic
│   ├── use-kanban-column.ts    # Column pagination logic
│   └── use-task-dialog.ts      # Task dialog form logic
├── services/                     # API service layer
│   └── task.service.ts         # Task API service functions
├── types/                        # TypeScript type definitions
│   └── task.types.ts           # Task-related types
└── theme/                        # Material UI theme configuration
    └── theme.ts                 # Light and dark theme definitions
```

## 🎯 Architecture & Best Practices

This project follows Next.js best practices with a clear separation of concerns:

### Component Architecture

- **Presentational Components**: All components in `components/` are focused solely on UI and styling
- **Custom Hooks**: All business logic is extracted into custom hooks in `hooks/`
- **Service Layer**: API calls are abstracted in the `services/` directory
- **Type Safety**: Full TypeScript coverage with proper type definitions

### Code Organization

1. **Logic Separation**: Business logic is in custom hooks, components handle only presentation
2. **TSDoc Documentation**: All components, hooks, and functions are documented with TSDoc comments
3. **Reusable Hooks**: Custom hooks can be easily tested and reused
4. **Type Safety**: Strict TypeScript ensures type safety throughout the application

## 📖 Usage Guide

### Creating a Task

1. Click the "Add task" button at the bottom of any column
2. Fill in the task details:
   - **Title** (required): Task title
   - **Description**: Task description
   - **Column**: Select target column
   - **Priority**: Choose HIGH, MEDIUM, or LOW
3. Click "Create" to save

### Editing a Task

1. Click the edit icon (pencil) on any task card
2. Modify the task details
3. Click "Update" to save changes

### Deleting a Task

1. Click the delete icon (trash) on any task card
2. Confirm deletion in the dialog that appears
3. The task will be permanently deleted

### Moving Tasks

1. Click and drag any task card
2. Drop it into a different column
3. The task will automatically update its column

### Searching Tasks

1. Use the search bar at the top of the board
2. Type to filter tasks by title or description
3. Search works across all columns in real-time

### Theme Toggle

1. Click the theme toggle button (sun/moon icon) in the header
2. Switch between dark and light modes
3. Your preference is saved automatically

## 🔌 API Endpoints

The application uses json-server which provides RESTful endpoints:

- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get a specific task
- `POST /tasks` - Create a new task
- `PATCH /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

## 📊 Data Structure

Tasks are stored in `db.json` with the following structure:

```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Task title",
      "description": "Task description",
      "column": "backlog",
      "priority": "high"
    }
  ]
}
```

### Valid Values

- **Column**: `backlog`, `in_progress`, `review`, `done`
- **Priority**: `high`, `medium`, `low` (optional, defaults to `low`)

## 🛠️ Available Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run json-server` - Start mock API server (port 4000)
- `npm run lint` - Run ESLint

## 🎨 Technologies Used

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Material UI** - Component library and theming
- **React Query (@tanstack/react-query)** - Data fetching and caching
- **DnD Kit** - Drag-and-drop functionality
- **json-server** - Mock REST API

## 📝 Development Notes

### Custom Hooks

All business logic is extracted into custom hooks:

- `useKanbanBoard` - Manages board state, drag-and-drop, and task operations
- `useKanbanColumn` - Handles column pagination and infinite scroll
- `useTaskDialog` - Manages task dialog form state
- `useTasks`, `useCreateTask`, `useUpdateTask`, `useDeleteTask` - Task CRUD operations

### Component Responsibilities

- **KanbanBoard**: Layout and composition only
- **KanbanColumn**: Column UI and rendering
- **TaskCard**: Task card UI and drag handle
- **TaskDialog**: Form UI only
- **DeleteConfirmationDialog**: Confirmation UI only

### React Query Caching

- Data is cached for 5 minutes (staleTime)
- Cache persists for 10 minutes (gcTime)
- Optimistic updates for instant UI feedback
- Automatic cache invalidation on mutations

## 🐛 Troubleshooting

### API Connection Error

If you see `ERR_CONNECTION_REFUSED`:
1. Make sure json-server is running: `npm run json-server`
2. Verify it's running on port 4000
3. Check that `db.json` exists in the project root

### Tasks Not Updating

1. Ensure json-server is running and watching `db.json`
2. Check browser console for errors
3. Verify React Query is properly configured

### Theme Not Persisting

- Theme preference is stored in localStorage
- Clear browser cache if theme doesn't persist
- Check browser console for localStorage errors

## 📄 License

This project is private and for educational purposes.

## 👨‍💻 Development

This project follows Next.js best practices:
- Server Components by default
- Client Components only when needed (interactivity, hooks)
- Custom hooks for business logic
- Presentational components for UI
- Full TypeScript coverage
- TSDoc documentation
