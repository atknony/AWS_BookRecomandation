import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { BookGrid } from '@/components/books/BookGrid';
import { getRecommendations, getBook } from '@/services/api';
import { Book, Recommendation } from '@/types';
import { handleApiError } from '@/utils/errorHandling';

/**
 * Recommendations page component with AI-powered suggestions
 */
export function Recommendations() {
  const [query, setQuery] = useState('');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const exampleQueries = [
    'I love mystery novels with strong female protagonists',
    'Looking for science fiction books about space exploration',
    'Recommend me some feel-good romance novels',
    'I want to read about personal development and productivity',
  ];

  const handleGetRecommendations = async () => {
    if (!query.trim()) {
      alert('Please enter a query');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with actual Bedrock API call
      // This will call Lambda function that uses Amazon Bedrock
      // to generate personalized recommendations based on the query
      const recs = await getRecommendations();
      setRecommendations(recs);

      // Fetch full book details for each recommendation
      const books = await Promise.all(recs.map((rec) => getBook(rec.bookId)));
      setRecommendedBooks(books.filter((book): book is Book => book !== null));
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30 mx-auto">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            <span className="gradient-text">AI-Powered Recommendations</span>
          </h1>
          <p className="text-slate-600 text-xl max-w-2xl mx-auto">
            Tell us what you're looking for, and our AI will suggest the perfect books for you
          </p>
        </div>

        <div className="glass-effect rounded-3xl shadow-2xl border border-white/20 p-8 mb-8">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            What kind of book are you looking for?
          </label>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe your ideal book... (e.g., 'I want a thrilling mystery set in Victorian London')"
            className="input-modern min-h-[140px] resize-none"
          />

          <div className="mt-6">
            <p className="text-sm text-slate-700 font-semibold mb-3">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {exampleQueries.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(example)}
                  className="text-sm bg-gradient-to-r from-violet-50 to-indigo-50 hover:from-violet-100 hover:to-indigo-100 text-slate-800 px-4 py-2 rounded-xl transition-all border border-violet-200 hover:border-violet-300 font-medium hover:shadow-md"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <Button
              variant="primary"
              size="lg"
              onClick={handleGetRecommendations}
              disabled={isLoading}
              className="w-full"
            >
              <svg
                className="w-5 h-5 inline mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              {isLoading ? 'Getting Recommendations...' : 'Get Recommendations'}
            </Button>
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {!isLoading && recommendations.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8">
              <span className="gradient-text">Recommended for You</span>
            </h2>

            {/* Display recommendations with reasons */}
            <div className="space-y-6 mb-12">
              {recommendations.map((rec, index) => {
                const book = recommendedBooks[index];
                if (!book) return null;

                return (
                  <div
                    key={rec.id}
                    className="glass-effect rounded-2xl shadow-xl border border-white/20 p-6 hover-glow transition-all duration-300"
                  >
                    <div className="flex items-start gap-6">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-28 h-40 object-cover rounded-xl shadow-lg"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/112x160?text=No+Cover';
                        }}
                      />
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{book.title}</h3>
                        <p className="text-slate-600 mb-3 font-medium">by {book.author}</p>
                        <p className="text-slate-700 mb-4 leading-relaxed">{rec.reason}</p>
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="bg-gradient-to-r from-violet-100 to-indigo-100 px-3 py-1.5 rounded-xl border border-violet-200">
                            <span className="text-sm text-violet-700 font-semibold">
                              Confidence: {Math.round(rec.confidence * 100)}%
                            </span>
                          </div>
                          <span className="badge-gradient px-3 py-1.5 text-sm">{book.genre}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <BookGrid books={recommendedBooks} />
          </div>
        )}

        {!isLoading && recommendations.length === 0 && query && (
          <div className="text-center py-12">
            <p className="text-slate-700 text-lg">
              No recommendations yet. Try describing what you're looking for!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
