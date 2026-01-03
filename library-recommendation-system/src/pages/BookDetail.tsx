import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Modal } from '@/components/common/Modal';
import { getBook, getReadingLists, updateReadingList, getReviews, createReview } from '@/services/api';
import { Book, ReadingList, Review } from '@/types';
import { formatRating, formatDate } from '@/utils/formatters';
import { handleApiError, showSuccess } from '@/utils/errorHandling';
import { useAuth } from '@/hooks/useAuth';

/**
 * BookDetail page component
 */
export function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [readingLists, setReadingLists] = useState<ReadingList[]>([]);
  const [isLoadingLists, setIsLoadingLists] = useState(false);
  const [isAddingToList, setIsAddingToList] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    if (id) {
      loadBook(id);
      loadReviews(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadBook = async (bookId: string) => {
    setIsLoading(true);
    try {
      const data = await getBook(bookId);
      if (!data) {
        navigate('/404');
        return;
      }
      setBook(data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadReadingLists = async () => {
    setIsLoadingLists(true);
    try {
      const lists = await getReadingLists();
      setReadingLists(lists);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoadingLists(false);
    }
  };

  const handleAddToList = () => {
    setIsModalOpen(true);
    loadReadingLists();
  };

  const handleSelectList = async (listId: string) => {
    if (!book) return;

    setIsAddingToList(true);
    try {
      const list = readingLists.find((l) => l.id === listId);
      if (!list) {
        throw new Error('Reading list not found');
      }

      // Check if book is already in the list
      if (list.bookIds.includes(book.id)) {
        showSuccess('Book is already in this reading list!');
        setIsModalOpen(false);
        return;
      }

      // Add book to the list
      const updatedBookIds = [...list.bookIds, book.id];
      await updateReadingList(listId, {
        name: list.name,
        description: list.description,
        bookIds: updatedBookIds,
      });

      showSuccess(`Added "${book.title}" to "${list.name}"!`);
      setIsModalOpen(false);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsAddingToList(false);
    }
  };

  const loadReviews = async (bookId: string) => {
    setIsLoadingReviews(true);
    try {
      const data = await getReviews(bookId);
      setReviews(data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoadingReviews(false);
    }
  };

  const handleWriteReview = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setIsReviewModalOpen(true);
  };

  const handleSubmitReview = async () => {
    if (!book || !user || !reviewComment.trim()) {
      alert('Please enter a review comment');
      return;
    }

    setIsSubmittingReview(true);
    try {
      const newReview = await createReview({
        bookId: book.id,
        userId: user.id,
        userName: user.name,
        rating: reviewRating,
        comment: reviewComment.trim(),
      });
      setReviews([newReview, ...reviews]);
      setIsReviewModalOpen(false);
      setReviewRating(5);
      setReviewComment('');
      showSuccess('Review submitted successfully!');
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!book) {
    return null;
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <button
          onClick={() => navigate(-1)}
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
          <span className="font-semibold">Back</span>
        </button>

        <div className="glass-effect rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 md:p-12">
            <div className="md:col-span-1">
              <div className="relative group">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full rounded-2xl shadow-2xl group-hover:shadow-glow transition-all duration-300"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('data:image/svg+xml')) {
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YxZjVmOSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBDb3ZlciBJbWFnZTwvdGV4dD48L3N2Zz4=';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-violet-900/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>

            <div className="md:col-span-2">
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3 leading-tight">
                {book.title}
              </h1>
              <p className="text-xl text-slate-600 mb-6 font-medium">by {book.author}</p>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="flex items-center bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-2 rounded-xl border border-amber-200 shadow-sm">
                  <svg
                    className="w-5 h-5 text-amber-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-lg font-bold text-amber-700">
                    {formatRating(book.rating)}
                  </span>
                </div>

                <span className="badge-gradient px-4 py-2 text-sm">{book.genre}</span>

                <div className="flex items-center text-slate-600 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
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
                  <span className="font-semibold">{book.publishedYear}</span>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                  <span className="w-1 h-6 bg-gradient-to-b from-violet-600 to-indigo-600 rounded-full mr-3"></span>
                  Description
                </h2>
                <p className="text-slate-700 leading-relaxed text-lg">{book.description}</p>
              </div>

              <div className="mb-8 glass-effect p-4 rounded-xl border border-white/20">
                <p className="text-sm text-slate-600">
                  <span className="font-semibold">ISBN:</span> {book.isbn}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg" onClick={handleAddToList}>
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
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add to Reading List
                </Button>
                <Button variant="outline" size="lg" onClick={handleWriteReview}>
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Write a Review
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews section */}
        <div className="mt-8 glass-effect rounded-3xl shadow-xl border border-white/20 p-8 md:p-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center">
            <span className="w-1 h-8 bg-gradient-to-b from-violet-600 to-indigo-600 rounded-full mr-3"></span>
            Reviews
          </h2>
            <Button variant="primary" onClick={handleWriteReview}>
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Write Review
            </Button>
          </div>

          {isLoadingReviews ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="md" />
            </div>
          ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-violet-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
            </div>
              <p className="text-slate-600 text-lg mb-4">No reviews yet</p>
              <p className="text-slate-500 text-sm">Be the first to share your thoughts!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                        {(review.userName || review.userId).charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{review.userName || `User ${review.userId.slice(0, 8)}`}</div>
                        <div className="text-sm text-slate-500">{formatDate(review.createdAt)}</div>
                      </div>
                    </div>
                    <div className="flex items-center bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
                      <svg className="w-4 h-4 text-amber-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-bold text-amber-700">{formatRating(review.rating)}</span>
                    </div>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{review.comment}</p>
                </div>
              ))}
          </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add to Reading List"
      >
        <div>
          {isLoadingLists ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner size="md" />
            </div>
          ) : readingLists.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-600 mb-4">You don't have any reading lists yet.</p>
              <Button
                variant="primary"
                onClick={() => {
                  setIsModalOpen(false);
                  navigate('/reading-lists');
                }}
              >
                Create Reading List
              </Button>
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {readingLists.map((list) => (
                <button
                  key={list.id}
                  onClick={() => handleSelectList(list.id)}
                  disabled={isAddingToList || list.bookIds.includes(book!.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    list.bookIds.includes(book!.id)
                      ? 'bg-slate-100 border-slate-300 cursor-not-allowed opacity-60'
                      : 'bg-white border-slate-200 hover:border-violet-300 hover:bg-violet-50 cursor-pointer'
                  } ${isAddingToList ? 'opacity-50 cursor-wait' : ''}`}
                >
                  <div className="font-semibold text-slate-900">{list.name}</div>
                  {list.description && (
                    <div className="text-sm text-slate-600 mt-1">{list.description}</div>
                  )}
                  <div className="text-xs text-slate-500 mt-2">
                    {list.bookIds.length} {list.bookIds.length === 1 ? 'book' : 'books'}
                    {list.bookIds.includes(book!.id) && ' • Already added'}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </Modal>

      <Modal
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          setReviewRating(5);
          setReviewComment('');
        }}
        title="Write a Review"
      >
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setReviewRating(star)}
                  className={`w-10 h-10 rounded-lg transition-all ${
                    star <= reviewRating
                      ? 'bg-amber-500 text-white'
                      : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  <svg className="w-6 h-6 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
            <div className="text-sm text-slate-500 mt-1">{reviewRating} out of 5 stars</div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">Your Review</label>
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Share your thoughts about this book..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 min-h-[120px] resize-none"
              rows={5}
            />
          </div>

          <div className="flex gap-3">
            <Button
              variant="primary"
              onClick={handleSubmitReview}
              className="flex-1"
              disabled={isSubmittingReview || !reviewComment.trim()}
            >
              {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setIsReviewModalOpen(false);
                setReviewRating(5);
                setReviewComment('');
              }}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
