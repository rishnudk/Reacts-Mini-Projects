import React from 'react';
import { Card, CardContent, Typography, Box, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeatmapCell = styled(Box)<{ active: boolean }>(({ theme, active }) => ({
  width: 12,
  height: 12,
  borderRadius: 2,
  backgroundColor: active ? theme.palette.success.main : theme.palette.grey[200],
  margin: 1
}));

const AttendanceHeatmap: React.FC = () => {
  // Generate mock attendance data for the last 30 days
  const generateHeatmapData = () => {
    const data = [];
    for (let i = 0; i < 30; i++) {
      data.push({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
        active: Math.random() > 0.3 // 70% attendance rate
      });
    }
    return data.reverse();
  };

  const heatmapData = generateHeatmapData();

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Attendance Heatmap
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, maxWidth: 300 }}>
          {heatmapData.map((day, index) => (
            <HeatmapCell key={index} active={day.active} />
          ))}
        </Box>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Less
          </Typography>
          <HeatmapCell active={false} />
          <HeatmapCell active={true} />
          <Typography variant="caption" color="text.secondary">
            More
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AttendanceHeatmap;