
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Scene } from './components/Scene';
import { WealthOptimizer } from './pages/WealthOptimizer';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { useUser, UserProvider } from './context/UserContext';
import { AnimatePresence } from 'framer-motion';

import { MarketInsights } from './pages/MarketInsights';
import { Portfolio } from './pages/Portfolio';
import { Settings } from './pages/Settings';

function MainApp() {
  const { isAuthenticated } = useUser();

  if (!isAuthenticated) {
    return (
      <>
        <Scene />
        <Login />
      </>
    );
  }

  return (
    <Router>
      <Scene />
      <div className="app-content">
        <Sidebar />
        <main className="main-area">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/optimizer" element={<WealthOptimizer />} />
              <Route path="/insights" element={<MarketInsights />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}

function App() {
  return (
    <UserProvider>
      <MainApp />
    </UserProvider>
  );
}

export default App;
