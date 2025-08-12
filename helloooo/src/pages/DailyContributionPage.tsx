import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
  Box,
  Button,
  TextField,
  Divider,
  Chip
} from '@mui/material';
import { YouTube as YouTubeIcon, Comment as CommentIcon, Send as SendIcon } from '@mui/icons-material';
import { mockQuery } from '../data/batchTrackMockData';

const DailyContributionPage: React.FC = () => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Array<{ id: string; author: string; text: string; time: string }>>([
    { id: '1', author: 'Sarah Chen', text: 'Great explanation of React Hooks!', time: '2 hours ago' },
    { id: '2', author: 'Mike Rodriguez', text: 'This helped me understand useEffect better', time: '1 hour ago' }
  ]);
  
  const { todaysContributors } = mockQuery;

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now().toString(),
        author: 'You',
        text: newComment,
        time: 'Just now'
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Stack spacing={4}>
        {/* Header */}
        <Box>
          <Typography variant="h4" gutterBottom>
            🌟 Today's Creators
          </Typography>
          <Typography variant="body1" color="text.secondary">
            See what your batch mates shared today
          </Typography>
        </Box>

        {/* Contributors */}
        {todaysContributors.map((contributor) => (
          <Card key={contributor.id} elevation={2}>
            <CardContent sx={{ p: 3 }}>
              {/* Contributor Info */}
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                <Avatar 
                  src={contributor.avatar} 
                  alt={contributor.name}
                  sx={{ width: 56, height: 56 }}
                />
                <Box flex={1}>
                  <Typography variant="h6">
                    {contributor.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    @{contributor.username}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(contributor.submittedAt).toLocaleTimeString()}
                  </Typography>
                </Box>
                <Chip
                  label={`${contributor.leetcodeCount} LeetCode`}
                  color="primary"
                  variant="outlined"
                />
              </Stack>

              {/* YouTube Video */}
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                    <YouTubeIcon color="error" />
                    <Typography variant="subtitle2">
                      YouTube Shorts Video
                    </Typography>
                  </Stack>
                  
                  <Box
                    sx={{
                      width: '100%',
                      height: 300,
                      bgcolor: 'grey.900',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      position: 'relative',
                      backgroundImage: 'linear-gradient(45deg, #FF0000, #FF4500)',
                      '&:hover': {
                        opacity: 0.9
                      }
                    }}
                    onClick={() => window.open(contributor.youtubeUrl, '_blank')}
                  >
                    <Stack alignItems="center" spacing={1}>
                      <YouTubeIcon sx={{ fontSize: 48, color: 'white' }} />
                      <Typography variant="body1" color="white" fontWeight="medium">
                        Click to Watch
                      </Typography>
                      <Typography variant="caption" color="white" opacity={0.8}>
                        YouTube Shorts
                      </Typography>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>

              {/* Contribution Summary */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  What they shared:
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {contributor.contribution}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Comments Section */}
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                  <CommentIcon color="action" />
                  <Typography variant="subtitle2">
                    Comments ({comments.length})
                  </Typography>
                </Stack>

                {/* Existing Comments */}
                <Stack spacing={2} sx={{ mb: 3 }}>
                  {comments.map((comment) => (
                    <Box key={comment.id} sx={{ pl: 2, borderLeft: 2, borderColor: 'grey.200' }}>
                      <Typography variant="subtitle2" color="primary">
                        {comment.author}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        {comment.text}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {comment.time}
                      </Typography>
                    </Box>
                  ))}
                </Stack>

                {/* Add Comment */}
                <Stack direction="row" spacing={2}>
                  <TextField
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    size="small"
                    fullWidth
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddComment();
                      }
                    }}
                  />
                  <Button
                    variant="contained"
                    startIcon={<SendIcon />}
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                  >
                    Send
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default DailyContributionPage;