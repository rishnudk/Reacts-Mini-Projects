import React, { useState } from 'react';
import {
  Container,
  Typography,
  ButtonGroup,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Stack,
  Chip,
  Box
} from '@mui/material';
import { EmojiEvents as TrophyIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { LeaderboardFilter, UserRole } from '../types/enums';
import { mockQuery, mockStore } from '../data/batchTrackMockData';
import { formatPoints, formatRank } from '../utils/formatters';

const LeaderboardPage: React.FC = () => {
  const [filter, setFilter] = useState<LeaderboardFilter>(LeaderboardFilter.WEEKLY);
  const { topLeaderboard } = mockQuery;
  const { currentUser } = mockStore;

  // Extended leaderboard data for demonstration
  const extendedLeaderboard = [
    ...topLeaderboard,
    {
      id: "user-4",
      name: "Emma Davis",
      avatar: "https://i.pravatar.cc/150?img=4",
      points: 2180,
      rank: 4,
      problemsSolved: 35,
      attendanceRate: 90
    },
    {
      id: "user-5",
      name: "David Kim",
      avatar: "https://i.pravatar.cc/150?img=5",
      points: 2050,
      rank: 5,
      problemsSolved: 32,
      attendanceRate: 85
    }
  ];

  const handleResetLeaderboard = () => {
    // Only admin can reset
    if (currentUser.role === UserRole.ADMIN) {
      console.log('Resetting monthly leaderboard...');
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'warning'; // Gold
      case 2: return 'default'; // Silver  
      case 3: return 'secondary'; // Bronze
      default: return 'primary';
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank <= 3) {
      return <TrophyIcon sx={{ color: rank === 1 ? 'gold' : rank === 2 ? 'silver' : '#CD7F32' }} />;
    }
    return null;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack spacing={4}>
        {/* Header */}
        <Box>
          <Typography variant="h4" gutterBottom>
            🏆 Leaderboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            See how you rank against your batch mates
          </Typography>
        </Box>

        {/* Filters and Actions */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <ButtonGroup variant="outlined">
            {Object.values(LeaderboardFilter).map((filterOption) => (
              <Button
                key={filterOption}
                variant={filter === filterOption ? 'contained' : 'outlined'}
                onClick={() => setFilter(filterOption)}
              >
                {filterOption}
              </Button>
            ))}
          </ButtonGroup>

          {currentUser.role === UserRole.ADMIN && (
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleResetLeaderboard}
              color="warning"
            >
              Reset Monthly
            </Button>
          )}
        </Stack>

        {/* Leaderboard Table */}
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                <TableCell>Rank</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="right">Points</TableCell>
                <TableCell align="right">Problems</TableCell>
                <TableCell align="right">Attendance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {extendedLeaderboard.map((user) => (
                <TableRow 
                  key={user.id}
                  sx={{ 
                    '&:hover': { bgcolor: 'grey.50' },
                    bgcolor: user.id === currentUser.id ? 'primary.50' : 'inherit'
                  }}
                >
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getRankIcon(user.rank)}
                      <Chip
                        label={formatRank(user.rank)}
                        size="small"
                        color={getRankColor(user.rank)}
                        variant={user.rank <= 3 ? 'filled' : 'outlined'}
                      />
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar src={user.avatar} alt={user.name} sx={{ width: 40, height: 40 }} />
                      <Box>
                        <Typography variant="subtitle2">
                          {user.name}
                          {user.id === currentUser.id && (
                            <Chip label="You" size="small" sx={{ ml: 1 }} />
                          )}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body1" fontWeight="medium">
                      {formatPoints(user.points)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2">
                      {user.problemsSolved}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={`${user.attendanceRate}%`}
                      size="small"
                      color={user.attendanceRate >= 90 ? 'success' : user.attendanceRate >= 75 ? 'warning' : 'error'}
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Container>
  );
};

export default LeaderboardPage;