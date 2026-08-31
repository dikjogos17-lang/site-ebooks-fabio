import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Ebooks from './pages/Ebooks';
import EbookDetails from './pages/EbookDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import Reader from './pages/Reader';
import NotFound from './pages/NotFound';

import Login from './pages/admin/Login';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import EbooksManager from './pages/admin/EbooksManager';
import CategoriesManager from './pages/admin/CategoriesManager';

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

function App() {
  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Toaster position="top-right" />
        <Routes>
          {/* Reader Route without Navbar/Footer */}
          <Route path="/read/:id" element={<Reader />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="ebooks" element={<EbooksManager />} />
            <Route path="categories" element={<CategoriesManager />} />
          </Route>

          {/* Main App Routes with Navbar/Footer */}
          <Route path="*" element={
            <>
              <Header />
              <main className="flex-grow pt-16">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/ebooks" element={<Ebooks />} />
                  <Route path="/ebook/:id" element={<EbookDetails />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </>
  );
}

export default App;
