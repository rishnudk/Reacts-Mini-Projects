import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  Box,
  Chip
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import AttendanceHeatmap from '../components/charts/AttendanceHeatmap';
import { mockQuery } from '../data/batchTrackMockData';

const WeeklyProgressPage: React.FC = () => {
  const { weeklyProgress } = mockQuery;

  // Prepare data for line chart
  const chartData = weeklyProgress.map((item, index) => ({
    day: item.day,
    dayIndex: index,
    leetcode: item.leetcode,
    attendance: item.attendance
  }));

  const totalLeetCode = weeklyProgress.reduce((sum, day) => sum + day.leetcode, 0);
  const totalAttendance = weeklyProgress.reduce((sum, day) => sum + day.attendance, 0);
  const attendanceRate = Math.round((totalAttendance / weeklyProgress.length) * 100);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack spacing={4}>
        {/* Header */}
        <Box>
          <Typography variant="h4" gutterBottom>
            📊 Weekly Progress Tracker
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track your daily activity and attendance patterns
          </Typography>
        </Box>

        {/* Weekly Stats */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          <Card sx={{ flex: 1 }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="h3" color="primary.main" fontWeight="bold">
                {totalLeetCode}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                LeetCode Problems
              </Typography>
              <Typography variant="caption" color="text.secondary">
                This Week
              </Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ flex: 1 }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="h3" color="success.main" fontWeight="bold">
                {attendanceRate}%
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Attendance Rate
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {totalAttendance}/{weeklyProgress.length} days
              </Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ flex: 1 }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="h3" color="warning.main" fontWeight="bold">
                7
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Active Days
              </Typography>
              <Typography variant="caption" color="text.secondary">
                This Week
              </Typography>
            </CardContent>
          </Card>
        </Stack>

        {/* Daily Activity Line Chart */}
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📈 Daily Activity (7 Days)
            </Typography>
            <Box sx={{ width: '100%', height: 350 }}>
              <LineChart
                dataset={chartData}
                xAxis={[{ 
                  scaleType: 'point', 
                  dataKey: 'day',
                  tickLabelStyle: { fontSize: 12 }
                }]}
                series={[
                  {
                    dataKey: 'leetcode',
                    label: 'LeetCode Problems',
                    color: '#6366F1',
                    curve: 'monotoneX',
                    showMark: true
                  },
                  {
                    dataKey: 'attendance',
                    label: 'Attendance',
                    color: '#10B981',
                    curve: 'monotoneX',
                    showMark: true
                  }
                ]}
                width={800}
                height={350}
                margin={{ top: 20, right: 30, bottom: 60, left: 60 }}
                grid={{ horizontal: true, vertical: true }}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Daily Breakdown */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📅 Daily Breakdown
            </Typography>
            <Stack spacing={2}>
              {weeklyProgress.map((day, index) => (
                <Box
                  key={day.day}
                  sx={{
                    p: 2,
                    bgcolor: 'grey.50',
                    borderRadius: 2,
                    border: day.attendance ? '2px solid' : '1px solid',
                    borderColor: day.attendance ? 'success.main' : 'grey.200'
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {day.day}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                        <Chip
                          label={`${day.leetcode} problems`}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                        <Chip
                          label={day.attendance ? 'Present' : 'Absent'}
                          size="small"
                          color={day.attendance ? 'success' : 'error'}
                          variant={day.attendance ? 'filled' : 'outlined'}
                        />
                      </Stack>
                    </Box>
                    
                    <Box textAlign="right">
                      <Typography variant="h6" color="primary.main">
                        {day.leetcode + day.attendance * 10}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        points
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>

        {/* Calendar Heatmap */}
        <AttendanceHeatmap />

        {/* Weekly Summary */}
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📝 Weekly Summary
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" color="text.secondary">
                • Most productive day: Thursday ({Math.max(...weeklyProgress.map(d => d.leetcode))} problems)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Attendance streak: {weeklyProgress.filter(d => d.attendance).length} consecutive days
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Average problems per day: {(totalLeetCode / 7).toFixed(1)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Total points earned: {weeklyProgress.reduce((sum, day) => sum + day.leetcode + (day.attendance * 10), 0)}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
};

export default WeeklyProgressPage;