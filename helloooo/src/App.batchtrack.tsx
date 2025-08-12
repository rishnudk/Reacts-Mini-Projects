import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

// Theme
import theme from './theme/theme';

// Components
import Navigation from './components/common/Navigation';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import LeaderboardPage from './pages/LeaderboardPage';
import DailyContributionPage from './pages/DailyContributionPage';
import SubmitActivityPage from './pages/SubmitActivityPage';
import ProfilePage from './pages/ProfilePage';
import HistoryPage from './pages/HistoryPage';
import WeeklyProgressPage from './pages/WeeklyProgressPage';

// Create emotion cache
const createEmotionCache = () => {
  return createCache({
    key: 'mui',
    prepend: true,
  });
};

const emotionCache = createEmotionCache();

const App: React.FC = () => {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            {/* Login Route */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected Routes with Navigation */}
            <Route path="/*" element={
              <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
                <Navigation />
                <Routes>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/leaderboard" element={<LeaderboardPage />} />
                  <Route path="/daily-contribution" element={<DailyContributionPage />} />
                  <Route path="/submit" element={<SubmitActivityPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/history" element={<HistoryPage />} />
                  <Route path="/weekly-progress" element={<WeeklyProgressPage />} />
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </Box>
            } />
          </Routes>
        </Router>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;