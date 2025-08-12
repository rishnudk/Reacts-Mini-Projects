// Enums for the student dashboard application

export enum CourseTrack {
  MERN = 'MERN',
  ML = 'ML', 
  FLUTTER = 'Flutter'
}

export enum LeaderboardFilter {
  WEEKLY = 'Weekly',
  MONTHLY = 'Monthly', 
  ALL_TIME = 'All-time'
}

export enum ActivityType {
  LEETCODE = 'leetcode',
  ATTENDANCE = 'attendance',
  YOUTUBE_SHORTS = 'youtube_shorts'
}

export enum UserRole {
  STUDENT = 'student',
  CONTRIBUTOR = 'contributor',
  ADMIN = 'admin'
}

export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent'
}