import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { mockQuery } from '../../data/batchTrackMockData';

const WeeklyProgressChart: React.FC = () => {
  const { weeklyProgress } = mockQuery;

  const chartData = weeklyProgress.map(item => ({
    day: item.day,
    LeetCode: item.leetcode,
    Attendance: item.attendance
  }));

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Weekly Progress
        </Typography>
        <Box sx={{ width: '100%', height: 300 }}>
          <BarChart
            dataset={chartData}
            xAxis={[{ scaleType: 'band', dataKey: 'day' }]}
            series={[
              { dataKey: 'LeetCode', label: 'LeetCode Problems', color: '#6366F1' },
              { dataKey: 'Attendance', label: 'Attendance', color: '#10B981' }
            ]}
            width={500}
            height={300}
            margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeeklyProgressChart;