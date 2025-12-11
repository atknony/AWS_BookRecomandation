---
inclusion: always
---

# Product Rules & Context

AI-powered library book recommendation system. Frontend-only with mock data; AWS backend prepared but not implemented.

## User Roles

- **Public**: Browse books, view details, search
- **Authenticated**: Public features + reading lists, personalized recommendations, reviews/ratings
- **Admin**: User features + catalog management, metrics dashboard (check `user.role === 'admin'`)

## Implementation Status

Currently implemented with mock data:

- Book browsing, search, filters
- Book detail pages with covers, descriptions, ratings
- Auth flow (UI only)
- Reading lists (UI only)
- Admin dashboard (UI only)

AWS integration prepared (TODO comments in `src/services/api.ts`):

- Cognito auth, Bedrock AI, Lambda + API Gateway backend

## Critical Product Rules

1. All features must work with mock data first
2. Handle loading/error states for future API calls (use `<LoadingSpinner>`)
3. Auth-required features wrapped in `<ProtectedRoute>`
4. Book cover images in `/public/book-covers/` with kebab-case filenames
5. Search currently client-side (title, author, genre) - will become server-side
6. Forms validate on submit with inline errors (see `src/utils/validation.ts`)
7. User-friendly error messages (see `src/utils/errorHandling.ts`)
8. Modals for destructive actions (delete, logout)
9. Mobile-responsive with min 44x44px touch targets
