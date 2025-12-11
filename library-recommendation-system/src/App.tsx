import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { Home } from './pages/Home';
import { Books } from './pages/Books';
import { BookDetail } from './pages/BookDetail';
import { Recommendations } from './pages/Recommendations';
import { ReadingLists } from './pages/ReadingLists';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Admin } from './pages/Admin';
import { NotFound } from './pages/NotFound';

/**
 * Main App component with routing and layout
 */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<Books />} />
              <Route path="/books/:id" element={<BookDetail />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route
                path="/reading-lists"
                element={
                  <ProtectedRoute>
                    <ReadingLists />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requireAdmin>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
