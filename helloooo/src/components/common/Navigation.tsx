import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Stack, Avatar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LeaderboardIcon from '@mui/icons-material/EmojiEvents';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import UploadIcon from '@mui/icons-material/Upload';
import { mockStore } from '../../data/batchTrackMockData';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = mockStore;

  const navigationItems = [
    { path: '/dashboard', icon: DashboardIcon, label: 'Dashboard' },
    { path: '/leaderboard', icon: LeaderboardIcon, label: 'Leaderboard' },
    { path: '/profile', icon: PersonIcon, label: 'Profile' },
    { path: '/history', icon: HistoryIcon, label: 'History' },
    { path: '/submit', icon: UploadIcon, label: 'Submit Activity' }
  ];

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          BatchTrack
        </Typography>
        
        <Stack direction="row" spacing={1} alignItems="center">
          {navigationItems.map(({ path, icon: Icon, label }) => (
            <IconButton
              key={path}
              onClick={() => navigate(path)}
              color={location.pathname === path ? 'secondary' : 'inherit'}
              title={label}
            >
              <Icon />
            </IconButton>
          ))}
          
          <Avatar 
            src={currentUser.avatar} 
            alt={currentUser.name}
            sx={{ width: 32, height: 32, ml: 2, cursor: 'pointer' }}
            onClick={() => navigate('/profile')}
          />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;