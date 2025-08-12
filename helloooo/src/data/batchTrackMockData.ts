import { CourseTrack, LeaderboardFilter, ActivityType, UserRole, AttendanceStatus } from '../types/enums';

// Data for global state store
export const mockStore = {
  currentUser: {
    id: "user-1",
    name: "Alex Johnson",
    username: "alexj_dev",
    email: "alex.johnson@email.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    courseTrack: CourseTrack.MERN as const,
    role: UserRole.CONTRIBUTOR as const,
    totalPoints: 2450,
    currentStreak: 15,
    isLoggedIn: true
  },
  leaderboardFilter: LeaderboardFilter.WEEKLY as const
};

// Data returned by API queries
export const mockQuery = {
  topLeaderboard: [
    {
      id: "user-1",
      name: "Alex Johnson", 
      avatar: "https://i.pravatar.cc/150?img=1",
      points: 2450,
      rank: 1,
      problemsSolved: 45,
      attendanceRate: 95
    },
    {
      id: "user-2", 
      name: "Sarah Chen",
      avatar: "https://i.pravatar.cc/150?img=2",
      points: 2380,
      rank: 2,
      problemsSolved: 42,
      attendanceRate: 92
    },
    {
      id: "user-3",
      name: "Mike Rodriguez", 
      avatar: "https://i.pravatar.cc/150?img=3",
      points: 2290,
      rank: 3,
      problemsSolved: 38,
      attendanceRate: 88
    }
  ],

  todaysContributors: [
    {
      id: "user-1",
      name: "Alex Johnson",
      username: "alexj_dev", 
      avatar: "https://i.pravatar.cc/150?img=1",
      youtubeUrl: "https://www.youtube.com/shorts/dQw4w9WgXcQ",
      contribution: "Explained React Hooks in detail",
      leetcodeCount: 3,
      submittedAt: "2024-01-15T10:30:00Z" as const
    },
    {
      id: "user-4",
      name: "Emma Davis",
      username: "emma_codes",
      avatar: "https://i.pravatar.cc/150?img=4", 
      youtubeUrl: "https://www.youtube.com/shorts/abc123def456",
      contribution: "Dynamic Programming patterns walkthrough",
      leetcodeCount: 2,
      submittedAt: "2024-01-15T14:20:00Z" as const
    }
  ],
  weeklyProgress: [
    { day: "Mon" as const, leetcode: 2, attendance: 1 },
    { day: "Tue" as const, leetcode: 3, attendance: 1 },
    { day: "Wed" as const, leetcode: 1, attendance: 0 },
    { day: "Thu" as const, leetcode: 4, attendance: 1 },
    { day: "Fri" as const, leetcode: 2, attendance: 1 },
    { day: "Sat" as const, leetcode: 0, attendance: 0 },
    { day: "Sun" as const, leetcode: 1, attendance: 0 }
  ],
  monthlyHistory: [
    {
      month: "December 2024" as const,
      winners: [
        { id: "user-1", name: "Alex Johnson", avatar: "https://i.pravatar.cc/150?img=1", points: 2450 },
        { id: "user-2", name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?img=2", points: 2380 },
        { id: "user-3", name: "Mike Rodriguez", avatar: "https://i.pravatar.cc/150?img=3", points: 2290 }
      ]
    },
    {
      month: "November 2024" as const,
      winners: [
        { id: "user-2", name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?img=2", points: 2180 },
        { id: "user-1", name: "Alex Johnson", avatar: "https://i.pravatar.cc/150?img=1", points: 2150 },
        { id: "user-5", name: "David Kim", avatar: "https://i.pravatar.cc/150?img=5", points: 2090 }
      ]
    }
  ]
};

// Data passed as props to the root component
export const mockRootProps = {
  currentDate: "2024-01-15T00:00:00Z" as const,
  hasMarkedAttendance: false,
  canSubmitActivity: true
};