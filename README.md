# Employee Directory

React + TypeScript employee directory module. Search employees, view a list, and open details — all with dummy in-memory data, no backend.

## Stack

- React 18 + TypeScript
- Vite (dev server / build)
- React Router v6

## Folder Structure

```
src/
  components/   # Reusable UI: Button, SearchInput, EmployeeCard
  pages/        # Route-level pages: EmployeeList, EmployeeDetails
  types/        # TypeScript interfaces (Employee)
  data/         # Dummy JSON-style employee data
  App.tsx       # Route definitions
  main.tsx      # App entry, BrowserRouter
```

## Getting Started (local machine)

Requires Node.js 18+.

```bash
# 1. install dependencies
npm install

# 2. run dev server
npm run dev
```

Then open the printed URL (usually http://localhost:5173). It redirects to `/employees`.

## Build & Lint

```bash
npm run build   # type-checks + production build
npm run lint    # ESLint check
```

## Routes

| Route              | Page             |
|--------------------|------------------|
| `/employees`       | Employee list + search |
| `/employees/:id`   | Employee details (shows "Employee Not Found" for invalid id) |

## Git

```bash
git init
git add .
git commit -m "feat: initial employee directory module (list, search, details, routing)"
```
