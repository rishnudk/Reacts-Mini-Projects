import React from 'react';
import { Card, CardContent, Avatar, Typography, Stack } from '@mui/material';
import { formatPoints } from '../../utils/formatters';

interface UserCardProps {
  id: string;
  name: string;
  avatar: string;
  points?: number;
  rank?: number;
  username?: string;
  onClick?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  name,
  avatar,
  points,
  rank,
  username,
  onClick
}) => {
  return (
    <Card 
      onClick={onClick}
      sx={{ 
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? { transform: 'translateY(-2px)', boxShadow: 2 } : {},
        transition: 'all 0.2s ease-in-out'
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src={avatar} alt={name} sx={{ width: 48, height: 48 }} />
          <Stack flex={1}>
            <Typography variant="h6" component="div">
              {name}
            </Typography>
            {username && (
              <Typography variant="body2" color="text.secondary">
                @{username}
              </Typography>
            )}
          </Stack>
          {rank && (
            <Typography variant="h4" color="primary.main" fontWeight="bold">
              #{rank}
            </Typography>
          )}
          {points !== undefined && (
            <Typography variant="body1" fontWeight="medium">
              {formatPoints(points)} pts
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default UserCard;