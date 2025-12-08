import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../utils/theme';
import { TabParamList } from './types';

// Import screens (to be created)
import HomeScreen from '../screens/HomeScreen';
import BrainGymScreen from '../screens/BrainGymScreen';
import InsightsScreen from '../screens/InsightsScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Tab icon component
const TabIcon = ({ focused, icon }: { focused: boolean; icon: string }) => {
  // Simple text icons for now - can be replaced with actual icons
  const iconMap: { [key: string]: string } = {
    home: '🏠',
    brain: '🧠',
    insights: '📊',
    profile: '👤',
  };

  return (
    <View style={[styles.iconContainer, focused && styles.iconFocused]}>
      <View style={styles.iconText}>
        {iconMap[icon] && (
          <View style={[styles.iconCircle, focused && styles.iconCircleFocused]}>
            <View style={styles.iconInner} />
          </View>
        )}
      </View>
    </View>
  );
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: COLORS.gray500,
        tabBarLabelStyle: styles.tabLabel,
        headerStyle: styles.header,
        headerTintColor: COLORS.black,
        headerTitleStyle: styles.headerTitle,
        headerShadowVisible: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'home',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="home" />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="BrainGym"
        component={BrainGymScreen}
        options={{
          tabBarLabel: 'braingym',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="brain" />,
          headerTitle: 'BrainGym',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Insights"
        component={InsightsScreen}
        options={{
          tabBarLabel: 'insights',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="insights" />,
          headerTitle: 'Insights',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'profile',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="profile" />,
          headerTitle: 'Profile',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.black,
    borderTopWidth: 0,
    height: 80,
    paddingBottom: SPACING.md,
    paddingTop: SPACING.sm,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'lowercase',
  },
  header: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
  },
  iconContainer: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconFocused: {
    transform: [{ scale: 1.1 }],
  },
  iconText: {
    fontSize: 20,
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.gray500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircleFocused: {
    borderColor: COLORS.white,
  },
  iconInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.gray500,
  },
});