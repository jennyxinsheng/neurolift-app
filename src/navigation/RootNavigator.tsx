import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { COLORS } from '../utils/theme';

// Import navigators
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';

// Import additional screens (to be created)
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen';
import WorkoutBuilderScreen from '../screens/WorkoutBuilderScreen';
import CalendarScreen from '../screens/CalendarScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  // TODO: Replace with actual auth state management
  // Starting with false to show auth flow first
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Export this function to allow screens to update auth state
  React.useEffect(() => {
    // @ts-ignore
    global.setIsAuthenticated = setIsAuthenticated;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.white,
          },
          headerTintColor: COLORS.black,
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: COLORS.white,
          },
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Main"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ExerciseDetail"
              component={ExerciseDetailScreen}
              options={{
                headerTitle: 'Exercise',
                presentation: 'modal',
              }}
            />
            <Stack.Screen
              name="WorkoutBuilder"
              component={WorkoutBuilderScreen}
              options={{
                headerTitle: 'Build Workout',
                presentation: 'modal',
              }}
            />
            <Stack.Screen
              name="Calendar"
              component={CalendarScreen}
              options={{
                headerTitle: 'Schedule',
                presentation: 'modal',
              }}
            />
            <Stack.Screen
              name="PostDetail"
              component={PostDetailScreen}
              options={{
                headerTitle: '',
                presentation: 'modal',
              }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                headerTitle: 'Settings',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}