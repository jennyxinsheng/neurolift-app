import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './types';
import { COLORS } from '../utils/theme';

// Import auth screens (to be created)
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import AssessmentScreen from '../screens/auth/AssessmentScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
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
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTitle: '',
          headerBackTitle: '',
        }}
      />
      <Stack.Screen
        name="Assessment"
        component={AssessmentScreen}
        options={{
          headerTitle: 'NeuroLift Assessment',
          headerBackTitle: '',
          gestureEnabled: false, // Prevent going back during assessment
        }}
      />
    </Stack.Navigator>
  );
}