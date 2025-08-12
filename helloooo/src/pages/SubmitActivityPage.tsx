import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  Box,
  Alert,
  Chip
} from '@mui/material';
import { Upload as UploadIcon, YouTube as YouTubeIcon, Code as CodeIcon } from '@mui/icons-material';
import { mockRootProps } from '../data/batchTrackMockData';

const SubmitActivityPage: React.FC = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [contribution, setContribution] = useState('');
  const [leetcodeCount, setLeetcodeCount] = useState('');
  const [leetcodeLinks, setLeetcodeLinks] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { canSubmitActivity } = mockRootProps;

  const validateYouTubeUrl = (url: string): boolean => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/shorts\/|youtu\.be\/)/;
    return youtubeRegex.test(url);
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!youtubeUrl) {
      newErrors.youtubeUrl = 'YouTube Shorts URL is required';
    } else if (!validateYouTubeUrl(youtubeUrl)) {
      newErrors.youtubeUrl = 'Please enter a valid YouTube Shorts URL';
    }

    if (!contribution.trim()) {
      newErrors.contribution = 'Please describe what you shared';
    } else if (contribution.trim().length < 10) {
      newErrors.contribution = 'Description must be at least 10 characters';
    }

    if (!leetcodeCount) {
      newErrors.leetcodeCount = 'Number of problems is required';
    } else if (isNaN(Number(leetcodeCount)) || Number(leetcodeCount) < 0) {
      newErrors.leetcodeCount = 'Please enter a valid number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // Reset form
      setYoutubeUrl('');
      setContribution('');
      setLeetcodeCount('');
      setLeetcodeLinks('');
      setErrors({});
    }, 2000);
  };

  if (!canSubmitActivity) {
    return (
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Alert severity="info">
          You are not assigned as a contributor for today. Check back tomorrow!
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Stack spacing={4}>
        {/* Header */}
        <Box>
          <Typography variant="h4" gutterBottom>
            📤 Submit Activity
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Share your learning with the batch
          </Typography>
        </Box>

        {submitted && (
          <Alert severity="success" onClose={() => setSubmitted(false)}>
            Your activity has been submitted successfully! 🎉
          </Alert>
        )}

        {/* Submit Form */}
        <Card elevation={2}>
          <CardContent sx={{ p: 4 }}>
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={4}>
                {/* YouTube URL */}
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                    <YouTubeIcon color="error" />
                    <Typography variant="h6">
                      YouTube Shorts Video
                    </Typography>
                    <Chip label="Required" size="small" color="error" />
                  </Stack>
                  <TextField
                    fullWidth
                    label="YouTube Shorts URL"
                    placeholder="https://youtube.com/shorts/..."
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    error={!!errors.youtubeUrl}
                    helperText={errors.youtubeUrl || 'Paste the URL of your YouTube Shorts video'}
                    required
                  />
                </Box>

                {/* Contribution Description */}
                <Box>
                  <Typography variant="h6" gutterBottom>
                    What did you share today?
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Describe your contribution"
                    placeholder="e.g., Explained React Hooks in detail, covered useState and useEffect..."
                    value={contribution}
                    onChange={(e) => setContribution(e.target.value)}
                    error={!!errors.contribution}
                    helperText={errors.contribution || 'Minimum 10 characters'}
                    required
                  />
                </Box>

                {/* LeetCode Problems */}
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                    <CodeIcon color="primary" />
                    <Typography variant="h6">
                      LeetCode Problems
                    </Typography>
                  </Stack>
                  
                  <Stack spacing={2}>
                    <TextField
                      label="Number of problems solved"
                      type="number"
                      value={leetcodeCount}
                      onChange={(e) => setLeetcodeCount(e.target.value)}
                      error={!!errors.leetcodeCount}
                      helperText={errors.leetcodeCount}
                      inputProps={{ min: 0 }}
                      sx={{ maxWidth: 200 }}
                      required
                    />
                    
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Problem links (optional)"
                      placeholder="Paste LeetCode problem URLs, one per line..."
                      value={leetcodeLinks}
                      onChange={(e) => setLeetcodeLinks(e.target.value)}
                      helperText="Optional: Add links to the problems you solved"
                    />
                  </Stack>
                </Box>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={<UploadIcon />}
                  disabled={isSubmitting}
                  sx={{ alignSelf: 'flex-start', px: 4 }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Activity'}
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>

        {/* Guidelines */}
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📋 Submission Guidelines
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" color="text.secondary">
                • Share educational content that helps your batch mates learn
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • YouTube Shorts should be under 60 seconds
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Include problem-solving techniques, explanations, or tips
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • LeetCode problems contribute to your daily score
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
};

export default SubmitActivityPage;