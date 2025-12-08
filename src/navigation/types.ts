import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';

// Define the param list for the bottom tabs
export type TabParamList = {
  Home: undefined;
  BrainGym: undefined;
  Insights: undefined;
  Profile: undefined;
};

// Define the param list for the auth stack
export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Assessment: undefined;
};

// Define the param list for the root stack
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  ExerciseDetail: { exerciseId: string };
  WorkoutBuilder: undefined;
  Calendar: undefined;
  PostDetail: { postId: string };
  Settings: undefined;
};

// Navigation prop types
export type TabNavigationProp = BottomTabNavigationProp<TabParamList>;

export type AuthStackNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Combined navigation prop for screens that need access to both navigators
export type AppNavigationProp = CompositeNavigationProp<
  TabNavigationProp,
  RootStackNavigationProp
>;

// Route prop types
export type HomeScreenRouteProp = RouteProp<TabParamList, 'Home'>;
export type BrainGymScreenRouteProp = RouteProp<TabParamList, 'BrainGym'>;
export type InsightsScreenRouteProp = RouteProp<TabParamList, 'Insights'>;
export type ProfileScreenRouteProp = RouteProp<TabParamList, 'Profile'>;

export type ExerciseDetailRouteProp = RouteProp<RootStackParamList, 'ExerciseDetail'>;
export type PostDetailRouteProp = RouteProp<RootStackParamList, 'PostDetail'>;