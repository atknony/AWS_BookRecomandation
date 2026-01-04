import { Book, ReadingList, Review, Recommendation } from '@/types';
import { mockBooks } from './mockData';
import { fetchAuthSession } from 'aws-amplify/auth';

/**
 * ============================================================================
 * API SERVICE LAYER - BACKEND COMMUNICATION
 * ============================================================================
 *
 * ⚠️ IMPORTANT: This file currently uses MOCK DATA for all API calls.
 *
 * TO IMPLEMENT AWS BACKEND:
 * Follow the step-by-step guide in IMPLEMENTATION_GUIDE.md
 *
 * Quick Reference:
 * - Week 2: Implement Books API (getBooks, getBook, createBook, etc.)
 * - Week 2: Implement Reading Lists API
 * - Week 3: Add Cognito authentication headers
 * - Week 4: Implement AI recommendations with Bedrock
 *
 * ============================================================================
 * IMPLEMENTATION CHECKLIST:
 * ============================================================================
 *
 * [ ] Week 1: Set up AWS account and first Lambda function
 * [ ] Week 2: Create DynamoDB tables (Books, ReadingLists)
 * [ ] Week 2: Deploy Lambda functions for Books API
 * [ ] Week 2: Deploy Lambda functions for Reading Lists API
 * [ ] Week 2: Set VITE_API_BASE_URL in .env file
 * [ ] Week 3: Set up Cognito User Pool
 * [ ] Week 3: Install aws-amplify: npm install aws-amplify
 * [ ] Week 3: Configure Amplify in src/main.tsx
 * [ ] Week 3: Update AuthContext with Cognito functions
 * [ ] Week 3: Implement getAuthHeaders() function below
 * [ ] Week 3: Add Cognito authorizer to API Gateway
 * [ ] Week 4: Deploy Bedrock recommendations Lambda
 * [ ] Week 4: Update getRecommendations() function
 * [ ] Week 4: Remove all mock data returns
 * [ ] Week 4: Delete src/services/mockData.ts
 *
 * ============================================================================
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function getAuthHeaders(): Promise<Record<string, string>> {
  try {
    const session = await fetchAuthSession();
    const token = session.tokens?.idToken?.toString();
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  } catch {
    return {
      'Content-Type': 'application/json',
    };
  }
}

/**
 * Get all books from the catalog
 *
 * TODO: Replace with real API call in Week 2, Day 3-4
 *
 * Implementation steps:
 * 1. Deploy Lambda function: library-get-books (see IMPLEMENTATION_GUIDE.md)
 * 2. Create API Gateway endpoint: GET /books
 * 3. Uncomment API_BASE_URL at top of file
 * 4. Replace mock code below with:
 *
 * const response = await fetch(`${API_BASE_URL}/books`);
 * if (!response.ok) throw new Error('Failed to fetch books');
 * return response.json();
 *
 * Expected response: Array of Book objects from DynamoDB
 */
export async function getBooks(): Promise<Book[]> {
  const response = await fetch(`${API_BASE_URL}/books`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch books: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  
  // Handle Lambda Proxy Integration response format
  if (data.body && typeof data.body === 'string') {
    const parsedBody = JSON.parse(data.body);
    if (Array.isArray(parsedBody)) {
      return parsedBody;
    }
  }
  
  if (Array.isArray(data)) {
    return data;
  }
  
  return [];
}

/**
 * Get a single book by ID
 *
 * TODO: Replace with real API call in Week 2, Day 3-4
 *
 * Implementation steps:
 * 1. Deploy Lambda function: library-get-book (see IMPLEMENTATION_GUIDE.md)
 * 2. Create API Gateway endpoint: GET /books/{id}
 * 3. Replace mock code below with:
 *
 * const response = await fetch(`${API_BASE_URL}/books/${id}`);
 * if (response.status === 404) return null;
 * if (!response.ok) throw new Error('Failed to fetch book');
 * return response.json();
 *
 * Expected response: Single Book object or null if not found
 */
export async function getBook(id: string): Promise<Book | null> {
  // TODO: Remove this mock implementation after deploying Lambda
  return new Promise((resolve) => {
    setTimeout(() => {
      const book = mockBooks.find((b) => b.id === id);
      resolve(book || null);
    }, 300);
  });
}

/**
 * Create a new book (admin only)
 */
export async function createBook(book: Omit<Book, 'id'>): Promise<Book> {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_BASE_URL}/books`, {
    method: 'POST',
    headers,
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    throw new Error(`Failed to create book: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  // Handle Lambda Proxy Integration response format
  if (data.body && typeof data.body === 'string') {
    return JSON.parse(data.body);
  }

  return data;
}

/**
 * Update an existing book (admin only)
 */
export async function updateBook(id: string, book: Partial<Book>): Promise<Book> {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_BASE_URL}/books/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    throw new Error(`Failed to update book: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  // Handle Lambda Proxy Integration response format
  if (data.body && typeof data.body === 'string') {
    return JSON.parse(data.body);
  }

  return data;
}

/**
 * Delete a book (admin only)
 */
export async function deleteBook(id?: string): Promise<void> {
  if (!id) {
    throw new Error('Book ID is required for deletion');
  }

  const headers = await getAuthHeaders();
  const response = await fetch(`${API_BASE_URL}/books/${id}`, {
    method: 'DELETE',
    headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to delete book: ${response.status} ${response.statusText}`);
  }
}

/**
 * Get AI-powered book recommendations using Amazon Bedrock
 */
export async function getRecommendations(query: string): Promise<Recommendation[]> {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_BASE_URL}/recommendations`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query }),
  });
  
  if (!response.ok) {
    // Handle specific error codes
    if (response.status === 429) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'AI service rate limit exceeded. Please try again in 24 hours.');
    }
    throw new Error('Failed to get recommendations');
  }
  
  const data = await response.json();
  
  // Handle Lambda Proxy Integration response format
  if (data.body && typeof data.body === 'string') {
    const parsedBody = JSON.parse(data.body);
    if (parsedBody.recommendations && Array.isArray(parsedBody.recommendations)) {
      return parsedBody.recommendations;
    }
    if (Array.isArray(parsedBody)) {
      return parsedBody;
    }
  }
  
  // If data is directly the recommendations array
  if (data.recommendations && Array.isArray(data.recommendations)) {
    return data.recommendations;
  }
  
  // If data is directly an array
  if (Array.isArray(data)) {
    return data;
  }
  
  throw new Error('Unexpected API response format');
}

/**
 * Get user's reading lists
 *
 * TODO: Replace with real API call in Week 2, Day 5-7
 *
 * Implementation steps:
 * 1. Deploy Lambda function: library-get-reading-lists
 * 2. Lambda should query DynamoDB by userId (from Cognito token)
 * 3. Create API Gateway endpoint: GET /reading-lists
 * 4. Add Cognito authorizer (Week 3)
 * 5. Replace mock code below with:
 *
 * const headers = await getAuthHeaders();
 * const response = await fetch(`${API_BASE_URL}/reading-lists`, {
 *   headers
 * });
 * if (!response.ok) throw new Error('Failed to fetch reading lists');
 * return response.json();
 *
 * Expected response: Array of ReadingList objects for the authenticated user
 */
export async function getReadingLists(): Promise<ReadingList[]> {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_BASE_URL}/reading-lists`, {
    headers,
  });
  
  if (!response.ok) {
    // Try to get error details from response
    let errorMessage = `Failed to fetch reading lists: ${response.status} ${response.statusText}`;
    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage += ` - ${errorData.message}`;
      } else if (errorData.body) {
        const parsedBody = typeof errorData.body === 'string' ? JSON.parse(errorData.body) : errorData.body;
        if (parsedBody.message) {
          errorMessage += ` - ${parsedBody.message}`;
        }
      }
      console.error('API Error Response:', errorData);
    } catch (e) {
      // If we can't parse error response, use default message
    }
    throw new Error(errorMessage);
  }
  
  const data = await response.json();
  
  // Handle Lambda Proxy Integration response format
  if (data.body && typeof data.body === 'string') {
    const parsedBody = JSON.parse(data.body);
    if (Array.isArray(parsedBody)) {
      return parsedBody;
    }
    throw new Error('API response body is not an array');
  }
  
  // If data is directly an array (non-proxy integration)
  if (Array.isArray(data)) {
    return data;
  }
  
  throw new Error('Unexpected API response format');
}

/**
 * Create a new reading list
 *
 * TODO: Replace with real API call in Week 2, Day 5-7
 *
 * Implementation steps:
 * 1. Deploy Lambda function: library-create-reading-list
 * 2. Lambda should generate UUID for id and timestamps
 * 3. Lambda should get userId from Cognito token
 * 4. Create API Gateway endpoint: POST /reading-lists
 * 5. Add Cognito authorizer (Week 3)
 * 6. Replace mock code below with:
 *
 * const headers = await getAuthHeaders();
 * const response = await fetch(`${API_BASE_URL}/reading-lists`, {
 *   method: 'POST',
 *   headers,
 *   body: JSON.stringify(list)
 * });
 * if (!response.ok) throw new Error('Failed to create reading list');
 * return response.json();
 *
 * Expected response: Complete ReadingList object with generated id and timestamps
 */
export async function createReadingList(
  list: Omit<ReadingList, 'id' | 'createdAt' | 'updatedAt'>
): Promise<ReadingList> {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_BASE_URL}/reading-lists`, {
    method: 'POST',
    headers,
    body: JSON.stringify(list),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to create reading list: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  
  // Handle Lambda Proxy Integration response format
  if (data.body && typeof data.body === 'string') {
    const parsedBody = JSON.parse(data.body);
    // Convert books to bookIds if needed
    if (parsedBody.books && !parsedBody.bookIds) {
      parsedBody.bookIds = parsedBody.books;
      delete parsedBody.books;
    }
    return parsedBody;
  }
  
  // If data is directly the object
  if (data.bookIds || data.books) {
    // Convert books to bookIds if needed
    if (data.books && !data.bookIds) {
      data.bookIds = data.books;
      delete data.books;
    }
    return data;
  }
  
  throw new Error('Unexpected API response format');
}

/**
 * Update a reading list
 */
export async function updateReadingList(
  id: string,
  list: Partial<ReadingList>
): Promise<ReadingList> {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_BASE_URL}/reading-lists/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(list),
  });

  if (!response.ok) {
    let errorMessage = `Failed to update reading list: ${response.status} ${response.statusText}`;
    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage += ` - ${errorData.message}`;
      } else if (errorData.body) {
        const parsedBody = typeof errorData.body === 'string' ? JSON.parse(errorData.body) : errorData.body;
        if (parsedBody.message || parsedBody.error) {
          errorMessage += ` - ${parsedBody.message || parsedBody.error}`;
        }
      }
      console.error('Update Reading List API Error Response:', errorData);
    } catch (e) {
      // If we can't parse error response, use default message
    }
    throw new Error(errorMessage);
  }

  const data = await response.json();

  // Handle Lambda Proxy Integration response format
  if (data.body && typeof data.body === 'string') {
    const parsedBody = JSON.parse(data.body);
    // Convert books to bookIds if needed
    if (parsedBody.books && !parsedBody.bookIds) {
      parsedBody.bookIds = parsedBody.books;
      delete parsedBody.books;
    }
    return parsedBody;
  }

  // If data is directly the object
  if (data.bookIds || data.books) {
    // Convert books to bookIds if needed
    if (data.books && !data.bookIds) {
      data.bookIds = data.books;
      delete data.books;
    }
    return data;
  }

  throw new Error('Unexpected API response format');
}

/**
 * Delete a reading list
 */
export async function deleteReadingList(id: string): Promise<void> {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_BASE_URL}/reading-lists/${id}`, {
    method: 'DELETE',
    headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to delete reading list: ${response.status} ${response.statusText}`);
  }
}

/**
 * Get reviews for a book
 */
export async function getReviews(bookId: string): Promise<Review[]> {
  const response = await fetch(`${API_BASE_URL}/books/${bookId}/reviews`);

  if (!response.ok) {
    throw new Error(`Failed to fetch reviews: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  // Handle Lambda Proxy Integration response format
  if (data.body && typeof data.body === 'string') {
    const parsedBody = JSON.parse(data.body);
    if (Array.isArray(parsedBody)) {
      return parsedBody;
    }
  }

  if (Array.isArray(data)) {
    return data;
  }

  return [];
}

/**
 * Create a new review
 */
export async function createReview(review: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_BASE_URL}/books/${review.bookId}/reviews`, {
    method: 'POST',
    headers,
    body: JSON.stringify(review),
  });

  if (!response.ok) {
    throw new Error(`Failed to create review: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  // Handle Lambda Proxy Integration response format
  if (data.body && typeof data.body === 'string') {
    return JSON.parse(data.body);
  }

  return data;
}
