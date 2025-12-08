import { DomainKey } from '../utils/theme';

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  bio?: string;
  createdAt: Date;
  subscriptionStatus: 'free' | 'premium';
  subscriptionTier?: 'monthly' | 'annual';
}

export interface ContentmentScore {
  positiveEmotion: number;
  engagement: number;
  relationships: number;
  meaning: number;
  accomplishment: number;
  overall: number;
  recordedAt: Date;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  domain: DomainKey;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  instructions: string[];
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exercises: Exercise[];
  estimatedDuration: number;
}

export interface CompletedExercise {
  id: string;
  exerciseId: string;
  userId: string;
  completedAt: Date;
  photos: string[];
  videos: string[];
  journalEntry?: string;
  isShared: boolean;
}

export interface SocialPost {
  id: string;
  userId: string;
  user: {
    displayName: string;
    photoURL?: string;
  };
  type: 'exercise' | 'insight' | 'education';
  content: string;
  mediaUrls: string[];
  likes: number;
  comments: Comment[];
  createdAt: Date;
  exerciseId?: string;
  domain?: DomainKey;
}

export interface Comment {
  id: string;
  userId: string;
  user: {
    displayName: string;
    photoURL?: string;
  };
  content: string;
  createdAt: Date;
}

export interface UserProgram {
  id: string;
  userId: string;
  workoutId?: string;
  exercises: ScheduledExercise[];
  startDate: Date;
}

export interface ScheduledExercise {
  exerciseId: string;
  exercise: Exercise;
  scheduledDate: Date;
  completed: boolean;
  completedExerciseId?: string;
}

export interface WeeklyStats {
  weekStartDate: Date;
  domainStats: Record<DomainKey, number>;
  totalExercises: number;
  totalMinutes: number;
  streak: number;
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
