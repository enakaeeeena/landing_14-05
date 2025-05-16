import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
// import ConnectionTest from './Components/ConnectionTest';
import FooterBlock from './blocks/FooterBlock/FooterBlock';


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
  const [footerContent, setFooterContent] = useState(() => {
    const saved = localStorage.getItem('footerContent');
    return saved ? JSON.parse(saved) : {
      logo: '',
      address: 'г. Санкт–Петербург\nм. Невский проспект,\nнаб. реки Мойки, 4В',
      links: [
        { label: 'о программе', url: '/', isExternal: false },
        { label: 'галерея', url: '/gallery', isExternal: false },
        { label: 'абитуриенту', url: '/admission', isExternal: false },
        { label: 'скиллс-паспорт', url: '/skills', isExternal: false },
        { label: 'лаборатория', url: '/lab', isExternal: false },
      ],
      phone: '+7 (812) 571-10-03',
      email: 'icsto@herzen.spb.ru',
    };
  });
  useEffect(() => {
    localStorage.setItem('footerContent', JSON.stringify(footerContent));
  }, [footerContent]);

  return (
    <AdminProvider>
      <div className="min-h-screen flex flex-col">
        <Header links={headerLinks} setHeaderLinks={setHeaderLinks} />
        <main className="flex-grow pt-[6rem]">
          <div className="main-container py-8">
            <Routes>
              {/* Skills Passport Routes */}
              <Route path="/skills" element={<AuthPage />} />
              <Route path="/skills/profile" element={<ProfileView />} />
              <Route path="/skills/profile/:id" element={<ProfileView />} />
              <Route path="/skills/dashboard" element={<SkillsDashboard />} />
              <Route path="/skills/block" element={<SkillsBlock />} />
              <Route path="/skills/admin" element={<AdminPanel headerLinks={headerLinks} setHeaderLinks={setHeaderLinks} />} />

              {/* Main Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/professors" element={<ProfessorsPage />} />
              <Route path="/gallery" element={<GalleryPage />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminPanel headerLinks={headerLinks} setHeaderLinks={setHeaderLinks} />} />
              <Route path="/admin/gallery" element={<GalleryPage />} />
              <Route path="/admin/reviews" element={<ReviewsPage />} />
            </Routes>
          </div>
        </main>

        {/* <ConnectionTest /> */}
        <FooterBlock content={footerContent} />
      </div>
    </AdminProvider>
  );
}

export default App;