import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
  addDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Exercise interfaces
export interface Exercise {
  id?: string;
  name: string;
  description: string;
  domain: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  instructions: string[];
  benefits: string[];
}

export interface CompletedExercise {
  id?: string;
  userId: string;
  exerciseId: string;
  exerciseName: string;
  domain: string;
  completedAt: Timestamp;
  duration: number; // in seconds
  notes?: string;
  rating?: number; // 1-5
}

export interface Post {
  id?: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  type: 'exercise' | 'insight' | 'education';
  title?: string;
  content: string;
  exerciseRef?: {
    id: string;
    name: string;
    domain: string;
    duration: string;
  };
  likes: string[]; // Array of user IDs who liked
  comments: number;
  createdAt: Timestamp;
  image?: string;
}

// Exercise functions
export const getExercises = async (): Promise<Exercise[]> => {
  try {
    const exercisesRef = collection(db, 'exercises');
    const snapshot = await getDocs(exercisesRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Exercise));
  } catch (error) {
    console.error('Error getting exercises:', error);
    return [];
  }
};

export const getExercisesByDomain = async (domain: string): Promise<Exercise[]> => {
  try {
    const exercisesRef = collection(db, 'exercises');
    const q = query(exercisesRef, where('domain', '==', domain));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Exercise));
  } catch (error) {
    console.error('Error getting exercises by domain:', error);
    return [];
  }
};

export const getExerciseById = async (id: string): Promise<Exercise | null> => {
  try {
    const exerciseRef = doc(db, 'exercises', id);
    const exerciseSnap = await getDoc(exerciseRef);
    if (exerciseSnap.exists()) {
      return { id: exerciseSnap.id, ...exerciseSnap.data() } as Exercise;
    }
    return null;
  } catch (error) {
    console.error('Error getting exercise:', error);
    return null;
  }
};

// Completed exercises tracking
export const trackCompletedExercise = async (data: Omit<CompletedExercise, 'id' | 'completedAt'>) => {
  try {
    const completedRef = collection(db, 'completedExercises');
    await addDoc(completedRef, {
      ...data,
      completedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getUserCompletedExercises = async (userId: string, limitCount = 50): Promise<CompletedExercise[]> => {
  try {
    const completedRef = collection(db, 'completedExercises');
    const q = query(
      completedRef,
      where('userId', '==', userId),
      orderBy('completedAt', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CompletedExercise));
  } catch (error) {
    console.error('Error getting completed exercises:', error);
    return [];
  }
};

// Social feed functions
export const getPosts = async (limitCount = 20): Promise<Post[]> => {
  try {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('createdAt', 'desc'), limit(limitCount));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
  } catch (error) {
    console.error('Error getting posts:', error);
    return [];
  }
};

export const createPost = async (post: Omit<Post, 'id' | 'createdAt' | 'likes' | 'comments'>): Promise<{ success: boolean; id?: string; error?: string }> => {
  try {
    const postsRef = collection(db, 'posts');
    const docRef = await addDoc(postsRef, {
      ...post,
      likes: [],
      comments: 0,
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const likePost = async (postId: string, userId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const postRef = doc(db, 'posts', postId);
    const postSnap = await getDoc(postRef);
    
    if (postSnap.exists()) {
      const post = postSnap.data() as Post;
      const likes = post.likes || [];
      
      if (likes.includes(userId)) {
        // Unlike
        await updateDoc(postRef, {
          likes: likes.filter(id => id !== userId),
        });
      } else {
        // Like
        await updateDoc(postRef, {
          likes: [...likes, userId],
        });
      }
      return { success: true };
    }
    return { success: false, error: 'Post not found' };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// User statistics
export const getUserStats = async (userId: string) => {
  try {
    const completedExercises = await getUserCompletedExercises(userId);
    
    // Calculate stats
    const totalExercises = completedExercises.length;
    const domainCounts: Record<string, number> = {};
    let totalDuration = 0;
    
    completedExercises.forEach(exercise => {
      domainCounts[exercise.domain] = (domainCounts[exercise.domain] || 0) + 1;
      totalDuration += exercise.duration;
    });
    
    // Calculate streak (simplified - counts consecutive days)
    const today = new Date();
    let currentStreak = 0;
    let checkDate = new Date(today);
    
    // Sort exercises by date
    const sortedExercises = [...completedExercises].sort((a, b) => 
      b.completedAt.seconds - a.completedAt.seconds
    );
    
    // Calculate streak
    if (sortedExercises.length > 0) {
      let lastDate = sortedExercises[0].completedAt.toDate();
      currentStreak = 1;
      
      for (let i = 1; i < sortedExercises.length; i++) {
        const exerciseDate = sortedExercises[i].completedAt.toDate();
        const dayDiff = Math.floor((lastDate.getTime() - exerciseDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (dayDiff === 1) {
          currentStreak++;
          lastDate = exerciseDate;
        } else if (dayDiff > 1) {
          break;
        }
      }
    }
    
    return {
      totalExercises,
      currentStreak,
      totalDuration: Math.floor(totalDuration / 60), // Convert to minutes
      domainDistribution: domainCounts,
      favoriteDomain: Object.keys(domainCounts).reduce((a, b) => 
        domainCounts[a] > domainCounts[b] ? a : b, ''
      ),
    };
  } catch (error) {
    console.error('Error calculating user stats:', error);
    return {
      totalExercises: 0,
      currentStreak: 0,
      totalDuration: 0,
      domainDistribution: {},
      favoriteDomain: '',
    };
  }
};