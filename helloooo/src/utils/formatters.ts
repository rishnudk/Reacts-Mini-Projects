import { CourseTrack, AttendanceStatus } from '../types/enums';

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

export const formatPoints = (points: number): string => {
  return points.toLocaleString();
};

export const formatStreak = (streak: number): string => {
  return `${streak} day${streak !== 1 ? 's' : ''}`;
};

export const formatCourseTrack = (track: CourseTrack): string => {
  return track;
};

export const formatAttendanceStatus = (status: AttendanceStatus): string => {
  return status === AttendanceStatus.PRESENT ? 'Present' : 'Absent';
};

export const formatRank = (rank: number): string => {
  const suffix = rank === 1 ? 'st' : rank === 2 ? 'nd' : rank === 3 ? 'rd' : 'th';
  return `${rank}${suffix}`;
};