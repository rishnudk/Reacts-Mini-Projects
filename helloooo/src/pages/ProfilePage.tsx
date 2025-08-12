import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
  Box,
  Chip,
  Divider
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import AttendanceHeatmap from '../components/charts/AttendanceHeatmap';
import { mockStore } from '../data/batchTrackMockData';
import { formatPoints, formatStreak, formatCourseTrack } from '../utils/formatters';

const ProfilePage: React.FC = () => {
  const { currentUser } = mockStore;

  // Mock monthly LeetCode data
  const monthlyData = [
    { month: 'Jan', problems: 25 },
    { month: 'Feb', problems: 32 },
    { month: 'Mar', problems: 28 },
    { month: 'Apr', problems: 45 },
    { month: 'May', problems: 38 },
    { month: 'Jun', problems: 52 }
  ];

  const achievements = [
    { title: 'First Contribution', description: 'Made your first video submission', icon: '🎬' },
    { title: 'Problem Solver', description: 'Solved 50+ LeetCode problems', icon: '💻' },
    { title: 'Consistent Learner', description: '10+ day streak', icon: '🔥' },
    { title: 'Top Performer', description: 'Reached top 3 in leaderboard', icon: '🏆' }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack spacing={4}>
        {/* Profile Header */}
        <Card elevation={2}>
          <CardContent sx={{ p: 4 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center">
              <Avatar
                src={currentUser.avatar}
                alt={currentUser.name}
                sx={{ width: 120, height: 120 }}
              />
              <Box flex={1}>
                <Typography variant="h4" gutterBottom>
                  {currentUser.name}
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  @{currentUser.username}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {currentUser.email}
                </Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  <Chip
                    label={formatCourseTrack(currentUser.courseTrack)}
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    label={currentUser.role}
                    color="secondary"
                    variant="outlined"
                  />
                </Stack>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          <Card sx={{ flex: 1 }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="h3" color="primary.main" fontWeight="bold">
                {formatPoints(currentUser.totalPoints)}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Total Points
              </Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ flex: 1 }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="h3" color="warning.main" fontWeight="bold">
                {formatStreak(currentUser.currentStreak)}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Current Streak
              </Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ flex: 1 }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="h3" color="success.main" fontWeight="bold">
                156
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Problems Solved
              </Typography>
            </CardContent>
          </Card>
        </Stack>

        {/* Charts Section */}
        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
          {/* Monthly LeetCode Chart */}
          <Card sx={{ flex: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📈 Monthly LeetCode Progress
              </Typography>
              <Box sx={{ width: '100%', height: 300 }}>
                <LineChart
                  dataset={monthlyData}
                  xAxis={[{ scaleType: 'point', dataKey: 'month' }]}
                  series={[
                    {
                      dataKey: 'problems',
                      label: 'Problems Solved',
                      color: '#6366F1',
                      curve: 'monotoneX'
                    }
                  ]}
                  width={500}
                  height={300}
                  margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
                />
              </Box>
            </CardContent>
          </Card>

          {/* Attendance Heatmap */}
          <Box sx={{ flex: 1 }}>
            <AttendanceHeatmap />
          </Box>
        </Stack>

        {/* Achievements */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              🏅 Achievements & Badges
            </Typography>
            <Stack spacing={2}>
              {achievements.map((achievement, index) => (
                <Box key={index}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="h4">{achievement.icon}</Typography>
                    <Box flex={1}>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {achievement.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {achievement.description}
                      </Typography>
                    </Box>
                  </Stack>
                  {index < achievements.length - 1 && <Divider sx={{ mt: 2 }} />}
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>

        {/* Past Contributions */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📚 Past Contributions
            </Typography>
            <Stack spacing={2}>
              {[
                { date: '2024-01-14', title: 'React State Management Deep Dive', views: 245 },
                { date: '2024-01-12', title: 'JavaScript Closures Explained', views: 189 },
                { date: '2024-01-10', title: 'CSS Grid Layout Tutorial', views: 156 }
              ].map((contribution, index) => (
                <Box key={index} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="subtitle2">
                        {contribution.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {contribution.date}
                      </Typography>
                    </Box>
                    <Chip
                      label={`${contribution.views} views`}
                      size="small"
                      variant="outlined"
                    />
                  </Stack>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
};

export default ProfilePage;