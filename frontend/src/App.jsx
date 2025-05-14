import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './Components/Header';
import LandingPage from './pages/Main/LandingPage';
import ProfessorsPage from './pages/professorsPage/ProfessorsPages';
import GalleryPage from './pages/admin/GalleryPage';
import ReviewsPage from './pages/admin/ReviewsPage';
import AdminPanel from './pages/admin/AdminPanel';
import AdminLogin from './pages/admin/AdminLogin';
import { AdminProvider } from './pages/admin/context/AdminContext';

import ProfileView from './pages/SkillsPassport/ProfileView.jsx';
import AuthPage from './pages/SkillsPassport/AuthPage.jsx';
import SkillsDashboard from './pages/SkillsPassport/SkillsDashboard';
import SkillsBlock from './pages/SkillsPassport/SkillsBlock';
import ConnectionTest from './components/ConnectionTest';

// Create router with future flags
const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

function App() {
  const [headerLinks, setHeaderLinks] = useState(() => {
    const savedLinks = localStorage.getItem('headerLinks');
    return savedLinks 
      ? JSON.parse(savedLinks)
      : [
          { label: 'Преподаватели', path: '/professors' },
          { label: 'Скиллз паспорт', path: '/skills' },
          { label: 'Галерея', path: '/gallery' }
        ];
  });

  return (
    <BrowserRouter {...router}>
      <AdminProvider>
        <div className="min-h-screen flex flex-col">
          <Header links={headerLinks} setHeaderLinks={setHeaderLinks} />
          <main className="flex-grow">
            <div className="main-container py-8">
              <Routes>
                {/* Skills Passport Routes */}
                <Route path="/skills" element={<AuthPage />} />
                <Route path="/skills/profile" element={<ProfileView />} />
                <Route path="/skills/profile/:id" element={<ProfileView />} />
                <Route path="/skills/dashboard" element={<SkillsDashboard />} />
                <Route path="/skills/block" element={<SkillsBlock />} />

                {/* Main Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/professors" element={<ProfessorsPage />} />
                <Route path="/gallery" element={<GalleryPage />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminPanel headerLinks={headerLinks} setHeaderLinks={setHeaderLinks} />}>
                  <Route path="gallery" element={<GalleryPage />} />
                  <Route path="reviews" element={<ReviewsPage />} />
                </Route>
              </Routes>
            </div>
          </main>
        </div>

        <ConnectionTest />
      </AdminProvider>
    </BrowserRouter>
  );
}

export default App;