import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ReadingListBookCard } from '@/components/books/ReadingListBookCard';
import { getReadingLists, getBooks, updateReadingList, deleteReadingList } from '@/services/api';
import { Book, ReadingList } from '@/types';
import { formatDate } from '@/utils/formatters';
import { handleApiError, showSuccess } from '@/utils/errorHandling';

/**
 * ReadingListDetail page component
 */
export function ReadingListDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [readingList, setReadingList] = useState<ReadingList | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadReadingList(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadReadingList = async (listId: string) => {
    setIsLoading(true);
    try {
      // Get all reading lists and find the one we want
      const lists = await getReadingLists();
      const list = lists.find((l) => l.id === listId);
      
      if (!list) {
        navigate('/404');
        return;
      }

      setReadingList(list);

      // Load books for this list
      if (list.bookIds.length > 0) {
        await loadBooks(list.bookIds);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadBooks = async (bookIds: string[]) => {
    try {
      // Get all books first
      const allBooks = await getBooks();
      // Filter to only include books in this list
      const listBooks = allBooks.filter((book) => bookIds.includes(book.id));
      setBooks(listBooks);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleDeleteList = async () => {
    if (!readingList || !window.confirm(`Are you sure you want to delete "${readingList.name}"?`)) {
      return;
    }

    try {
      await deleteReadingList(readingList.id);
      showSuccess('Reading list deleted successfully!');
      navigate('/reading-lists');
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleRemoveBook = async (bookId: string) => {
    if (!readingList) return;

    try {
      const updatedBookIds = readingList.bookIds.filter((id) => id !== bookId);
      await updateReadingList(readingList.id, {
        name: readingList.name,
        description: readingList.description,
        bookIds: updatedBookIds,
      });
      
      // Update local state
      setReadingList({ ...readingList, bookIds: updatedBookIds });
      setBooks(books.filter((book) => book.id !== bookId));
      showSuccess('Book removed from list!');
    } catch (error) {
      handleApiError(error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!readingList) {
    return null;
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <button
          onClick={() => navigate('/reading-lists')}
          className="flex items-center text-slate-600 hover:text-violet-600 mb-8 transition-colors group glass-effect px-4 py-2 rounded-xl border border-white/20 w-fit"
        >
          <svg
            className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="font-semibold">Back to Reading Lists</span>
        </button>

        <div className="glass-effect rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
                {readingList.name}
              </h1>
              {readingList.description && (
                <p className="text-xl text-slate-600 mb-4">{readingList.description}</p>
              )}
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <span className="font-semibold">
                    {books.length} {books.length === 1 ? 'book' : 'books'}
                  </span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Created {formatDate(readingList.createdAt)}</span>
                </div>
                {readingList.updatedAt !== readingList.createdAt && (
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    <span>Updated {formatDate(readingList.updatedAt)}</span>
                  </div>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleDeleteList}
              className="ml-4"
            >
              <svg
                className="w-5 h-5 mr-2 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete List
            </Button>
          </div>
        </div>

        {books.length === 0 ? (
          <div className="glass-effect rounded-3xl shadow-xl border border-white/20 p-12 text-center">
            <svg
              className="w-16 h-16 text-slate-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No books in this list yet</h3>
            <p className="text-slate-600 mb-6">
              Start adding books to build your reading list!
            </p>
            <Button variant="primary" onClick={() => navigate('/books')}>
              Browse Books
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <ReadingListBookCard key={book.id} book={book} onRemove={handleRemoveBook} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

