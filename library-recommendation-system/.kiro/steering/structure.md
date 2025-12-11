---
inclusion: always
---

# Code Structure & Conventions

## Directory Layout

- `src/components/common/` - Reusable UI (Button, Card, Input, Modal, LoadingSpinner)
- `src/components/books/` - Book-specific components (BookCard, BookGrid, BookSearch)
- `src/components/layout/` - Layout components (Header, Footer, Navigation)
- `src/pages/` - Route-mapped page components
- `src/contexts/` - React Context providers (AuthContext)
- `src/hooks/` - Custom hooks (useAuth)
- `src/services/` - API layer (`api.ts` for calls, `mockData.ts` for fixtures)
- `src/types/` - Centralized TypeScript definitions
- `src/utils/` - Pure functions (formatters, validation, errorHandling)
- `src/tests/` - Test files mirroring source structure

## Code Style Rules

### Components

- Named exports: `export function ComponentName() {}`
- Props interface above component with JSDoc
- Include JSDoc comments on all components
- Common components support `variant` and `size` props

### TypeScript

- All types in `src/types/index.ts`
- Use `interface` over `type` for object shapes
- Export all types for reuse

### Styling

- Tailwind utility classes only (no CSS modules or styled-components)
- Mobile-first responsive design
- Custom theme: `primary-*`, `accent-*`, `neutral-*` (50-900 shades)

### State & Routing

- Global state: React Context (auth only)
- Local state: `useState`
- Protected routes: wrap with `<ProtectedRoute>`
- Routes defined in `App.tsx`

### API Layer

- All API calls in `src/services/api.ts` (currently mocked with TODO comments)
- Mock data in `src/services/mockData.ts`

### File Naming

- Components: `PascalCase.tsx`
- Utils: `camelCase.ts`
- Tests: `*.test.tsx` or `*.test.ts`
