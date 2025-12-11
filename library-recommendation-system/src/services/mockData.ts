import { Book, User, ReadingList } from '@/types';

/**
 * ============================================================================
 * MOCK DATA FOR DEVELOPMENT
 * ============================================================================
 *
 * ⚠️ IMPORTANT FOR AI ASSISTANTS AND DEVELOPERS:
 * This file contains ALL mock data used in the application during development.
 * When implementing the AWS backend, you should:
 *
 * 1. REMOVE all mock data from this file
 * 2. UPDATE src/services/api.ts to call real AWS Lambda functions
 * 3. LOAD this data into DynamoDB tables for initial testing
 * 4. DELETE this file once backend integration is complete
 *
 * ============================================================================
 * MOCK DATA LOCATIONS IN THE APPLICATION:
 * ============================================================================
 *
 * This mock data is currently used in:
 * - src/services/api.ts (all API functions return mock data)
 * - src/pages/Books.tsx (displays mockBooks)
 * - src/pages/BookDetail.tsx (finds book from mockBooks)
 * - src/pages/ReadingLists.tsx (displays mockReadingLists)
 * - src/pages/Admin.tsx (uses mockBooks for admin operations)
 *
 * ============================================================================
 * HOW TO REPLACE MOCK DATA WITH REAL API:
 * ============================================================================
 *
 * Step 1: Deploy DynamoDB tables using CDK (see infrastructure/lib/database-stack.ts)
 * Step 2: Load this data into DynamoDB using AWS CLI or Lambda function
 * Step 3: Deploy Lambda functions (see infrastructure/lambda/)
 * Step 4: Update src/services/api.ts to call Lambda via API Gateway
 * Step 5: Remove mock data returns from api.ts functions
 * Step 6: Test each endpoint individually
 * Step 7: Delete this file
 *
 * ============================================================================
 * DATA STRUCTURE NOTES:
 * ============================================================================
 *
 * - Book IDs: Simple numeric strings ('1', '2', etc.) - replace with UUIDs in production
 * - Dates: ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)
 * - Ratings: Float between 0.0 and 5.0
 * - Cover Images: Relative paths to /public/book-covers/ directory
 * - ISBNs: ISBN-13 format (978-XXXXXXXXXX)
 *
 * ============================================================================
 */

/**
 * MOCK BOOKS DATA
 *
 * This array contains 10 sample books across different genres.
 *
 * TO LOAD INTO DYNAMODB:
 * Use the AWS CLI or create a Lambda function to batch write these items:
 *
 * ```bash
 * aws dynamodb batch-write-item --request-items file://books-data.json
 * ```
 *
 * TO REPLACE IN CODE:
 * Update src/services/api.ts getBooks() function to call:
 * GET /books endpoint (Lambda function: get-books)
 */
export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    genre: 'Fiction',
    description:
      'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.',
    coverImage: '/book-covers/midnight-library.jpg',
    rating: 4.5,
    publishedYear: 2020,
    isbn: '978-0525559474',
  },
  {
    id: '2',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    genre: 'Science Fiction',
    description:
      'A lone astronaut must save the earth from disaster in this incredible new science-based thriller from the author of The Martian.',
    coverImage: '/book-covers/project-hail-mary.jpg',
    rating: 4.8,
    publishedYear: 2021,
    isbn: '978-0593135204',
  },
  {
    id: '3',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    genre: 'Mystery',
    description:
      "Alicia Berenson's life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house. One evening her husband returns home late, and Alicia shoots him five times in the face, and then never speaks another word.",
    coverImage: '/book-covers/silent-patient.jpg',
    rating: 4.3,
    publishedYear: 2019,
    isbn: '978-1250301697',
  },
  {
    id: '4',
    title: 'People We Meet on Vacation',
    author: 'Emily Henry',
    genre: 'Romance',
    description: 'Two best friends. Ten summer trips. One last chance to fall in love.',
    coverImage: '/book-covers/people-we-meet.jpg',
    rating: 4.2,
    publishedYear: 2021,
    isbn: '978-1984806758',
  },
  {
    id: '5',
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Non-Fiction',
    description:
      'An Easy & Proven Way to Build Good Habits & Break Bad Ones. Tiny changes, remarkable results.',
    coverImage: '/book-covers/atomic-habits.jpg',
    rating: 4.7,
    publishedYear: 2018,
    isbn: '978-0735211292',
  },
  {
    id: '6',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    genre: 'Fiction',
    description:
      'Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life.',
    coverImage: '/book-covers/evelyn-hugo.jpg',
    rating: 4.6,
    publishedYear: 2017,
    isbn: '978-1501161933',
  },
  {
    id: '7',
    title: 'Dune',
    author: 'Frank Herbert',
    genre: 'Science Fiction',
    description:
      'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world.',
    coverImage: '/book-covers/dune.jpg',
    rating: 4.4,
    publishedYear: 1965,
    isbn: '978-0441172719',
  },
  {
    id: '8',
    title: 'The Thursday Murder Club',
    author: 'Richard Osman',
    genre: 'Mystery',
    description:
      'Four unlikely friends meet weekly to investigate unsolved killings. But when a local developer is found dead, these unorthodox detectives find themselves in the middle of their first live case.',
    coverImage: '/book-covers/thursday-murder-club.jpg',
    rating: 4.1,
    publishedYear: 2020,
    isbn: '978-1984880987',
  },
  {
    id: '9',
    title: 'Educated',
    author: 'Tara Westover',
    genre: 'Non-Fiction',
    description:
      'A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.',
    coverImage: '/book-covers/educated.jpg',
    rating: 4.5,
    publishedYear: 2018,
    isbn: '978-0399590504',
  },
  {
    id: '10',
    title: 'The Song of Achilles',
    author: 'Madeline Miller',
    genre: 'Fiction',
    description:
      "A tale of gods, kings, immortal fame and the human heart, The Song of Achilles is a dazzling literary feat that brilliantly reimagines Homer's enduring masterwork, The Iliad.",
    coverImage: '/book-covers/song-of-achilles.jpg',
    rating: 4.6,
    publishedYear: 2011,
    isbn: '978-0062060624',
  },
];

/**
 * MOCK USERS DATA
 *
 * This array contains sample users for testing authentication and authorization.
 *
 * ⚠️ IN PRODUCTION: Users will be managed by Amazon Cognito, NOT DynamoDB
 *
 * DO NOT load this into DynamoDB. Instead:
 * 1. Set up Cognito User Pool (see infrastructure/lib/auth-stack.ts)
 * 2. Create test users via Cognito Console or AWS CLI
 * 3. User authentication will be handled by Cognito
 * 4. User profile data (name, role) can be stored in DynamoDB separately
 *
 * TO REPLACE IN CODE:
 * Update src/contexts/AuthContext.tsx to use AWS Amplify Auth:
 * - Auth.signIn() for login
 * - Auth.signUp() for registration
 * - Auth.currentAuthenticatedUser() for getting current user
 */
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    role: 'user',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    email: 'admin@library.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: '2024-01-01T10:00:00Z',
  },
];

/**
 * MOCK READING LISTS DATA
 *
 * This array contains sample reading lists for testing list management features.
 *
 * TO LOAD INTO DYNAMODB:
 * Use the AWS CLI or create a Lambda function to batch write these items:
 *
 * ```bash
 * aws dynamodb batch-write-item --request-items file://reading-lists-data.json
 * ```
 *
 * DYNAMODB TABLE STRUCTURE:
 * - Partition Key: userId (string)
 * - Sort Key: id (string)
 * - GSI: id-index (for querying by list ID)
 *
 * TO REPLACE IN CODE:
 * Update src/services/api.ts reading list functions to call:
 * - GET /reading-lists (Lambda: get-reading-lists)
 * - POST /reading-lists (Lambda: create-reading-list)
 * - PUT /reading-lists/:id (Lambda: update-reading-list)
 * - DELETE /reading-lists/:id (Lambda: delete-reading-list)
 */
export const mockReadingLists: ReadingList[] = [
  {
    id: '1',
    userId: '1',
    name: 'Summer Reading 2024',
    description: 'Books to read during summer vacation',
    bookIds: ['1', '2', '4'],
    createdAt: '2024-06-01T10:00:00Z',
    updatedAt: '2024-06-15T14:30:00Z',
  },
  {
    id: '2',
    userId: '1',
    name: 'Sci-Fi Favorites',
    description: 'My favorite science fiction novels',
    bookIds: ['2', '7'],
    createdAt: '2024-05-10T10:00:00Z',
    updatedAt: '2024-05-10T10:00:00Z',
  },
];
