import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from '@/types';
import { formatRating } from '@/utils/formatters';
import { Button } from '@/components/common/Button';

/**
 * ReadingListBookCard component props
 */
interface ReadingListBookCardProps {
  book: Book;
  onRemove: (bookId: string) => void;
}

// Base64 encoded SVG placeholder (works offline, no external dependencies)
const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YxZjVmOSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBDb3ZlciBJbWFnZTwvdGV4dD48L3N2Zz4=';

/**
 * BookCard component for reading list detail page with remove functionality
 */
export function ReadingListBookCard({ book, onRemove }: ReadingListBookCardProps) {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(book.coverImage);
  const [hasError, setHasError] = useState(false);

  const handleClick = () => {
    navigate(`/books/${book.id}`);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(book.id);
  };

  const handleImageError = () => {
    if (!hasError && !imageSrc.includes('data:image/svg+xml')) {
      setHasError(true);
      setImageSrc(PLACEHOLDER_IMAGE);
    }
  };

  return (
    <div className="glass-effect rounded-2xl overflow-hidden card-hover group border border-white/20 hover-glow relative">
      <div className="relative overflow-hidden cursor-pointer" onClick={handleClick}>
        <img
          src={imageSrc}
          alt={book.title}
          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <Button
            variant="secondary"
            size="sm"
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            View Details
          </Button>
        </div>

        {/* Remove Button */}
        <button
          onClick={handleRemove}
          className="absolute top-4 right-4 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          aria-label="Remove from list"
        >
          <svg
            className="w-5 h-5 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Floating Badge */}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-amber-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-bold text-slate-900">{formatRating(book.rating)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-violet-600 transition-colors">
          {book.title}
        </h3>
        <p className="text-sm text-slate-600 mb-4 font-medium">{book.author}</p>
        <div className="flex items-center justify-between">
          <span className="badge-modern">{book.genre}</span>
          <div className="flex items-center text-slate-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xs font-medium">{book.publishedYear}</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-200">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleRemove}
          >
            <svg
              className="w-4 h-4 mr-2 inline"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Remove from List
          </Button>
        </div>
      </div>
    </div>
  );
}


