import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button';

/**
 * Modern Home page with stunning gradients and animations
 */
export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-hero animated-bg text-white py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-violet-500 rounded-full filter blur-3xl animate-pulse-slow"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl animate-pulse-slow"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse-slow"
            style={{ animationDelay: '2s' }}
          ></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="text-sm font-semibold text-white">✨ Powered by AI</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-extrabold mb-6 text-white leading-tight tracking-tight">
            Discover Your Next
            <br />
            <span className="bg-gradient-to-r from-violet-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent">
              Favorite Book
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-slate-200 leading-relaxed font-light">
            AI-powered recommendations tailored to your unique reading preferences. Discover books
            you'll love with intelligent suggestions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/books">
              <Button variant="secondary" size="lg" className="min-w-[200px]">
                Browse Books
              </Button>
            </Link>
            <Link to="/recommendations">
              <Button variant="gradient" size="lg" className="min-w-[200px]">
                Get Recommendations
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="glass-dark rounded-2xl p-6">
              <div className="text-4xl font-bold text-white mb-2">10,000+</div>
              <div className="text-slate-300">Books Available</div>
            </div>
            <div className="glass-dark rounded-2xl p-6">
              <div className="text-4xl font-bold text-white mb-2">50,000+</div>
              <div className="text-slate-300">Happy Readers</div>
            </div>
            <div className="glass-dark rounded-2xl p-6">
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-slate-300">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4 section-light">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
              <span className="gradient-text">Why Choose LibraryAI?</span>
            </h2>
            <p className="text-slate-600 text-xl max-w-2xl mx-auto">
              Experience the future of book discovery with our intelligent recommendation system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card-modern hover-glow group">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-violet-500/30 group-hover:shadow-xl group-hover:shadow-violet-500/50 transition-all duration-300 group-hover:scale-110">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-violet-600 transition-colors">
                AI-Powered Recommendations
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Get personalized book suggestions using advanced AI technology powered by Amazon
                Bedrock. Simply describe what you're looking for, and we'll find the perfect match.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card-modern hover-glow group">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-rose-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-pink-500/30 group-hover:shadow-xl group-hover:shadow-pink-500/50 transition-all duration-300 group-hover:scale-110">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-pink-600 transition-colors">
                Reading Lists
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Organize your reading journey with custom lists. Track books you want to read,
                currently reading, and have finished. Share your lists with friends.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card-modern hover-glow group">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30 group-hover:shadow-xl group-hover:shadow-indigo-500/50 transition-all duration-300 group-hover:scale-110">
                <svg
                  className="w-8 h-8 text-white"
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
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">
                Extensive Catalog
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Browse thousands of books across all genres. Search by title, author, or genre. Read
                reviews and ratings from other readers to make informed choices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-hero animated-bg text-white py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-20 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl animate-pulse-slow"></div>
          <div
            className="absolute bottom-10 left-20 w-96 h-96 bg-violet-500 rounded-full filter blur-3xl animate-pulse-slow"
            style={{ animationDelay: '1.5s' }}
          ></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-white">
            Ready to Start Your
            <br />
            <span className="bg-gradient-to-r from-violet-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent">
              Reading Journey?
            </span>
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto text-slate-200 leading-relaxed font-light">
            Join thousands of readers discovering their next favorite books with AI-powered
            recommendations
          </p>
          <Link to="/signup">
            <Button variant="secondary" size="lg" className="min-w-[250px]">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
