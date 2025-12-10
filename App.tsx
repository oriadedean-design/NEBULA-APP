import React from 'react';
import { HashRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import DiscoverPage from './pages/DiscoverPage';
import ProjectsPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import CollabsPage from './pages/CollabsPage';
import StartCollabStep1Page from './pages/StartCollabStep1Page';
import StartCollabStep2Page from './pages/StartCollabStep2Page';
import StartCollabStep3Page from './pages/StartCollabStep3Page';
import StartCollabStep4Page from './pages/StartCollabStep4Page';
import CollabInitiatedPage from './pages/CollabInitiatedPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import PremiumPage from './pages/PremiumPage';
import AIAssistantPage from './pages/AIAssistantPage';
import FloatingActionButton from './components/FloatingActionButton';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import { ThemeProvider } from './hooks/useTheme';


const AppLayout: React.FC = () => {
  const location = useLocation();
  
  const noNavRoutes = [
    '/start-collab/step1',
    '/start-collab/step2',
    '/start-collab/step3',
    '/start-collab/step4',
    '/collab-initiated',
    '/project/',
    '/premium',
    '/ai-assistant/'
  ];
  const showNav = !noNavRoutes.some(path => location.pathname.startsWith(path));

  const noFabRoutes = ['/login', '/ai-assistant/'];
  const showFab = !noFabRoutes.some(path => location.pathname.startsWith(path));


  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <div className={`flex-1 ${showNav ? 'pb-28' : ''}`}>
        <Outlet />
      </div>
      {showNav && <BottomNav />}
      {showFab && <FloatingActionButton />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HashRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Routes>
                    <Route element={<AppLayout />}>
                      <Route index path="/" element={<HomePage />} />
                      <Route path="/discover" element={<DiscoverPage />} />
                      <Route path="/collabs" element={<CollabsPage />} />
                      <Route path="/projects" element={<ProjectsPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/opportunities" element={<OpportunitiesPage />} />
                    </Route>
                    <Route path="/start-collab/step1" element={<StartCollabStep1Page />} />
                    <Route path="/start-collab/step2" element={<StartCollabStep2Page />} />
                    <Route path="/start-collab/step3" element={<StartCollabStep3Page />} />
                    <Route path="/start-collab/step4" element={<StartCollabStep4Page />} />
                    <Route path="/project/:projectId" element={<ProjectDetailPage />} />
                    <Route path="/collab-initiated" element={<CollabInitiatedPage />} />
                    <Route path="/premium" element={<PremiumPage />} />
                    <Route path="/ai-assistant/:projectId" element={<AIAssistantPage />} />
                  </Routes>
                </ProtectedRoute>
              }
            />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;