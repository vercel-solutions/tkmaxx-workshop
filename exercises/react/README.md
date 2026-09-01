# React Fundamentals Workshop - TK Maxx Edition

> **Slides:** [https://tkmaxx-workshop.vercel.app/react](https://tkmaxx-workshop.vercel.app/react)


Welcome to TK Maxx's React fundamentals workshop! Just like the shop floor, this codebase is full of ever-changing stock — and right now it's all piled into one giant component (yes, really). Learn React core concepts by refactoring it into a well-structured application.

## Prerequisites

- Node.js 18+ installed
- Basic knowledge of HTML, CSS, and JavaScript
- A code editor (VS Code recommended)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Visit http://localhost:3000
```

## Current Implementation

The store Team Directory currently works but has significant code quality issues:

- Everything is in a single giant component (`page.tsx`)
- Uses `any` everywhere instead of the types exported from `api.ts`
- No component extraction — all markup is inline
- Filters don't work together properly
- Generic empty state message regardless of active filters

## Tasks

### Task 1: Replace `any` with Proper Types

The page is full of `any` types. Import the `Employee` and `Department` types from `api.ts` and replace every `any` in `page.tsx` — state declarations, callback parameters, and `.map()` variables should all be properly typed.

### Task 2: Extract Components with Typed Props

Break the monolithic page into reusable components in `src/components/`. Each component should have a named props interface:

- `SearchBar` — Search input with controlled state
- `DepartmentFilter` — Department filter buttons
- `EmployeeCard` — Individual employee card display
- `EmployeeGrid` — Grid layout for employee cards

### Task 3: Employee Detail Modal

Refactor the inline employee detail overlay into a proper `EmployeeDetail` component that shows:
- Full name, avatar, role, department
- Email, phone, join date
- Skills list

### Task 4: Combined Filtering

Ensure search and department filters work together. Search should filter by employee name within the selected department.

### Task 5: Empty State per Filter

Show a different empty state message depending on which filters are active. For example: "No employees found in Merchandising matching 'xyz'" vs "No employees found matching 'xyz'" vs "No employees in Security".

### Task 6: Selection Context

After extracting components, you'll notice that `selectedEmployee` and `setSelectedEmployee` need to be passed through `EmployeeGrid` down to each `EmployeeCard`, and also to `EmployeeDetail` at the page level. That's prop drilling.

Refactor it using **React Context**:

- Create `src/components/selection-context.tsx` exporting:
  - A `SelectionContext` (created with `createContext`)
  - A `SelectionProvider` component that holds the `selectedEmployee` state
  - A `useSelection()` hook that wraps `use(SelectionContext)` and throws if used outside the Provider
- Wrap the page content in `<SelectionProvider>`
- Inside `EmployeeCard`, call `useSelection()` to get `setSelectedEmployee` directly — no more prop drilling
- Inside `EmployeeDetail`, call `useSelection()` to read `selectedEmployee` and get `setSelectedEmployee` for closing

The page no longer has to thread the selection state through every component.

### Task 7: Bonus — Sort Toggle

Add a sort toggle that switches between:
- Name (A-Z)
- Join date (newest first)

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [Thinking in React](https://react.dev/learn/thinking-in-react)

---

**Happy coding!** 🚀
