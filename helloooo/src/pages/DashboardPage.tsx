import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Box,
  Avatar,
  Chip
} from '@mui/material';
import { CheckCircle as CheckIcon, YouTube as YouTubeIcon } from '@mui/icons-material';
import UserCard from '../components/common/UserCard';
import WeeklyProgressChart from '../components/charts/WeeklyProgressChart';
import { mockStore, mockQuery, mockRootProps } from '../data/batchTrackMockData';
import { formatDate } from '../utils/formatters';

const DashboardPage: React.FC = () => {
  const [hasMarkedAttendance, setHasMarkedAttendance] = useState(mockRootProps.hasMarkedAttendance);
  const { currentUser } = mockStore;
  const { topLeaderboard, todaysContributors } = mockQuery;
  const currentDate = new Date(mockRootProps.currentDate);

  const handleMarkAttendance = () => {
    setHasMarkedAttendance(true);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack spacing={4}>
        {/* Header Section */}
        <Box>
          <Typography variant="h4" gutterBottom>
            Welcome back, {currentUser.name}! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {formatDate(currentDate)}
          </Typography>
        </Box>

        {/* Main Content Grid */}
        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={4}>
          {/* Left Column */}
          <Stack flex={2} spacing={4}>
            {/* Top 3 Leaderboard */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🏆 Top 3 Leaderboard
                </Typography>
                <Stack spacing={2}>
                  {topLeaderboard.slice(0, 3).map((user) => (
                    <UserCard
                      key={user.id}
                      id={user.id}
                      name={user.name}
                      avatar={user.avatar}
                      points={user.points}
                      rank={user.rank}
                    />
                  ))}
                </Stack>
              </CardContent>
            </Card>

            {/* Weekly Progress Chart */}
            <WeeklyProgressChart />

            {/* Attendance Button */}
            <Card>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Daily Attendance
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Mark your attendance for today
                    </Typography>
                  </Box>
                  <Button
                    variant={hasMarkedAttendance ? "outlined" : "contained"}
                    startIcon={<CheckIcon />}
                    onClick={handleMarkAttendance}
                    disabled={hasMarkedAttendance}
                    color={hasMarkedAttendance ? "success" : "primary"}
                  >
                    {hasMarkedAttendance ? 'Marked Present' : 'Mark Attendance'}
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>

          {/* Right Column - Today's Contributors */}
          <Stack flex={1} spacing={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🌟 Today's Contributors
                </Typography>
                <Stack spacing={3}>
                  {todaysContributors.map((contributor) => (
                    <Box key={contributor.id}>
                      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                        <Avatar src={contributor.avatar} alt={contributor.name} />
                        <Box flex={1}>
                          <Typography variant="subtitle2">
                            {contributor.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            @{contributor.username}
                          </Typography>
                        </Box>
                      </Stack>
                      
                      {/* YouTube Video Embed */}
                      <Card variant="outlined" sx={{ mb: 2 }}>
                        <CardContent sx={{ p: 2 }}>
                          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                            <YouTubeIcon color="error" />
                            <Typography variant="caption" color="text.secondary">
                              YouTube Shorts
                            </Typography>
                          </Stack>
                          <Box
                            sx={{
                              width: '100%',
                              height: 200,
                              bgcolor: 'grey.100',
                              borderRadius: 1,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer'
                            }}
                            onClick={() => window.open(contributor.youtubeUrl, '_blank')}
                          >
                            <Typography variant="body2" color="text.secondary">
                              Click to watch video
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>

                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {contributor.contribution}
                      </Typography>
                      
                      <Chip
                        label={`${contributor.leetcodeCount} LeetCode problems`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default DashboardPage;