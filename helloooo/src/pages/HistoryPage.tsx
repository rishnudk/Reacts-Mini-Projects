import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';
import { LineChart } from '@mui/x-charts/LineChart';
import { mockQuery } from '../data/batchTrackMockData';
import { formatPoints, formatRank } from '../utils/formatters';

const HistoryPage: React.FC = () => {
  const [expandedMonth, setExpandedMonth] = useState<string | null>(null);
  const { monthlyHistory } = mockQuery;

  // Mock progress data for the last 3 months
  const progressData = [
    { month: 'Oct', totalPoints: 1850, problems: 28, attendance: 85 },
    { month: 'Nov', totalPoints: 2100, problems: 35, attendance: 90 },
    { month: 'Dec', totalPoints: 2450, problems: 45, attendance: 95 }
  ];

  // Extended leaderboard for each month
  const getFullLeaderboard = (monthWinners: any[]) => [
    ...monthWinners,
    { id: 'user-4', name: 'Emma Davis', avatar: 'https://i.pravatar.cc/150?img=4', points: monthWinners[2].points - 100, rank: 4 },
    { id: 'user-5', name: 'David Kim', avatar: 'https://i.pravatar.cc/150?img=5', points: monthWinners[2].points - 200, rank: 5 },
    { id: 'user-6', name: 'Lisa Wang', avatar: 'https://i.pravatar.cc/150?img=6', points: monthWinners[2].points - 300, rank: 6 }
  ];

  const handleExpandMonth = (month: string) => {
    setExpandedMonth(expandedMonth === month ? null : month);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack spacing={4}>
        {/* Header */}
        <Box>
          <Typography variant="h4" gutterBottom>
            📊 History
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track your progress and see past winners
          </Typography>
        </Box>

        {/* Progress Chart */}
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📈 Your Progress (Last 3 Months)
            </Typography>
            <Box sx={{ width: '100%', height: 300 }}>
              <LineChart
                dataset={progressData}
                xAxis={[{ scaleType: 'point', dataKey: 'month' }]}
                series={[
                  {
                    dataKey: 'totalPoints',
                    label: 'Total Points',
                    color: '#6366F1',
                    curve: 'monotoneX'
                  },
                  {
                    dataKey: 'problems',
                    label: 'Problems Solved',
                    color: '#10B981',
                    curve: 'monotoneX'
                  }
                ]}
                width={800}
                height={300}
                margin={{ top: 20, right: 20, bottom: 40, left: 60 }}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Monthly Timeline */}
        <Typography variant="h5" gutterBottom>
          🏆 Monthly Winners
        </Typography>

        <Stack spacing={3}>
          {monthlyHistory.map((monthData) => (
            <Card key={monthData.month} elevation={2}>
              <CardContent>
                {/* Month Header with Top 3 */}
                <Stack 
                  direction="row" 
                  justifyContent="space-between" 
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <Typography variant="h6">
                    {monthData.month}
                  </Typography>
                  <IconButton
                    onClick={() => handleExpandMonth(monthData.month)}
                    aria-label="expand"
                  >
                    {expandedMonth === monthData.month ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Stack>

                {/* Top 3 Winners Display */}
                <Stack direction="row" spacing={3} justifyContent="center" sx={{ mb: 2 }}>
                  {monthData.winners.map((winner, index) => (
                    <Stack key={winner.id} alignItems="center" spacing={1}>
                      <Box position="relative">
                        <Avatar
                          src={winner.avatar}
                          alt={winner.name}
                          sx={{ 
                            width: index === 0 ? 80 : 64, 
                            height: index === 0 ? 80 : 64,
                            border: index === 0 ? '3px solid gold' : index === 1 ? '3px solid silver' : '3px solid #CD7F32'
                          }}
                        />
                        <Chip
                          label={formatRank(index + 1)}
                          size="small"
                          color={index === 0 ? 'warning' : index === 1 ? 'default' : 'secondary'}
                          sx={{
                            position: 'absolute',
                            top: -8,
                            right: -8,
                            fontSize: '0.75rem'
                          }}
                        />
                      </Box>
                      <Typography variant="subtitle2" textAlign="center">
                        {winner.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatPoints(winner.points)} pts
                      </Typography>
                    </Stack>
                  ))}
                </Stack>

                {/* Expandable Full Leaderboard */}
                <Collapse in={expandedMonth === monthData.month}>
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Full Leaderboard
                    </Typography>
                    <TableContainer component={Paper} variant="outlined">
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ bgcolor: 'grey.50' }}>
                            <TableCell>Rank</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Points</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {getFullLeaderboard(monthData.winners).map((user, index) => (
                            <TableRow key={user.id}>
                              <TableCell>
                                <Chip
                                  label={formatRank(index + 1)}
                                  size="small"
                                  color={index < 3 ? 'primary' : 'default'}
                                  variant={index < 3 ? 'filled' : 'outlined'}
                                />
                              </TableCell>
                              <TableCell>
                                <Stack direction="row" spacing={2} alignItems="center">
                                  <Avatar 
                                    src={user.avatar} 
                                    alt={user.name}
                                    sx={{ width: 32, height: 32 }}
                                  />
                                  <Typography variant="body2">
                                    {user.name}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="right">
                                <Typography variant="body2" fontWeight="medium">
                                  {formatPoints(user.points)}
                                </Typography>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};

export default HistoryPage;