import { CourseTrack, LeaderboardFilter, UserRole } from './enums';

// Props types (data passed to components)
export interface PropTypes {
  currentDate: string;
  hasMarkedAttendance: boolean;
  canSubmitActivity: boolean;
}

// Store types (global state data)
export interface StoreTypes {
  currentUser: {
    id: string;
    name: string;
    username: string;
    email: string;
    avatar: string;
    courseTrack: CourseTrack;
    role: UserRole;
    totalPoints: number;
    currentStreak: number;
    isLoggedIn: boolean;
  };
  leaderboardFilter: LeaderboardFilter;
}

// Query types (API response data)
export interface QueryTypes {
  topLeaderboard: Array<{
    id: string;
    name: string;
    avatar: string;
    points: number;
    rank: number;
    problemsSolved: number;
    attendanceRate: number;
  }>;
  todaysContributors: Array<{
    id: string;
    name: string;
    username: string;
    avatar: string;
    youtubeUrl: string;
    contribution: string;
    leetcodeCount: number;
    submittedAt: string;
  }>;
  weeklyProgress: Array<{
    day: string;
    leetcode: number;
    attendance: number;
  }>;
  monthlyHistory: Array<{
    month: string;
    winners: Array<{
      id: string;
      name: string;
      avatar: string;
      points: number;
    }>;
  }>;
}