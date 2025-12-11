---
inclusion: always
---

# Tech Stack & Tooling

## Stack

- React 19 + TypeScript 5.9 (strict mode)
- Vite (dev server port 5173)
- React Router DOM v7
- Tailwind CSS with custom theme (`primary`, `accent`, `neutral` colors)
- Vitest + React Testing Library

## Critical Rules

- Use `@/` path alias for imports from `src/`
- Named exports only: `export function ComponentName() {}`
- Run `npm run lint` before committing
- DO NOT run `npm run dev` or `npm test` via bash - these are long-running processes
- Tests target ~75% coverage, located in `src/tests/` mirroring source structure

## AWS Integration (Prepared, Not Implemented)

- Cognito for auth, Bedrock for AI, Lambda + API Gateway for backend
- All marked with TODO comments in `src/services/api.ts`
- Environment variables in `.env` (see `.env.example`)
