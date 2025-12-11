import React, { useState } from 'react';

/**
 * BookSearch component props
 */
interface BookSearchProps {
  onSearch: (query: string) => void;
}

/**
 * Modern BookSearch component with beautiful glass morphism
 *
 * @example
 * <BookSearch onSearch={handleSearch} />
 */
export function BookSearch({ onSearch }: BookSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="glass-effect rounded-2xl p-6 border border-white/20 shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search books by title, author, or genre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-modern pl-12"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-violet-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <button
            type="submit"
            className="btn-gradient px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Search
          </button>
        </div>

        {/* TODO: Implement filter logic */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Genre</label>
            <select className="input-modern">
              <option value="">All Genres</option>
              <option value="fiction">Fiction</option>
              <option value="sci-fi">Science Fiction</option>
              <option value="mystery">Mystery</option>
              <option value="romance">Romance</option>
              <option value="non-fiction">Non-Fiction</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Rating</label>
            <select className="input-modern">
              <option value="">All Ratings</option>
              <option value="4.5">4.5+ Stars</option>
              <option value="4.0">4.0+ Stars</option>
              <option value="3.5">3.5+ Stars</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Year</label>
            <select className="input-modern">
              <option value="">All Years</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}
