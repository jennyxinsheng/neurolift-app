import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  createdAt: any;
  lastLoginAt: any;
  assessmentCompleted: boolean;
  assessmentScores?: {
    kindness: number;
    socialConnection: number;
    timeAffluence: number;
    healthyPhysical: number;
    mindControl: number;
  };
}

// Sign up new user
export const signUp = async (email: string, password: string, displayName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update display name
    await updateProfile(user, { displayName });

    // Create user profile in Firestore
    await createUserProfile(user, displayName);

    return { success: true, user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Sign in existing user
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update last login time
    await updateLastLogin(user.uid);

    return { success: true, user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Sign out user
export const logOut = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Reset password
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Create user profile in Firestore
const createUserProfile = async (user: User, displayName: string) => {
  const userRef = doc(db, 'users', user.uid);
  const userData: UserProfile = {
    uid: user.uid,
    email: user.email!,
    displayName,
    createdAt: serverTimestamp(),
    lastLoginAt: serverTimestamp(),
    assessmentCompleted: false,
  };

  await setDoc(userRef, userData);
};

// Update last login time
const updateLastLogin = async (uid: string) => {
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, { lastLoginAt: serverTimestamp() }, { merge: true });
};

// Get user profile from Firestore
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

// Update assessment scores
export const updateAssessmentScores = async (uid: string, scores: UserProfile['assessmentScores']) => {
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      assessmentScores: scores,
      assessmentCompleted: true,
    }, { merge: true });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Auth state observer
export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};