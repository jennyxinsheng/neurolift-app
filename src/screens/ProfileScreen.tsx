import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '../navigation/types';
import {
  Screen,
  Title,
  Subtitle,
  Paragraph,
  Card,
  CardContent,
  Avatar,
  Button,
  Badge,
  Spacer,
  Row,
  Divider,
  StatCard,
} from '../components';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '../utils/theme';

const MOCK_USER = {
  name: 'Alex Thompson',
  email: 'alex@example.com',
  joinDate: 'Member since Oct 2024',
  stats: {
    totalExercises: 142,
    followers: 23,
    following: 45,
  },
  subscription: 'Premium',
  completedExercises: [
    { id: '1', name: 'Gratitude Journaling', date: '2 days ago', domain: 'Kindness' },
    { id: '2', name: 'Meditation', date: '3 days ago', domain: 'Mind Control' },
    { id: '3', name: 'Nature Walk', date: '4 days ago', domain: 'Physical Health' },
    { id: '4', name: 'Active Listening', date: '5 days ago', domain: 'Social Connection' },
  ],
};

const SETTINGS_OPTIONS = [
  { id: 'notifications', title: 'Notifications', icon: '🔔' },
  { id: 'privacy', title: 'Privacy', icon: '🔒' },
  { id: 'subscription', title: 'Subscription', icon: '💎' },
  { id: 'help', title: 'Help & Support', icon: '❓' },
  { id: 'about', title: 'About', icon: 'ℹ️' },
];

export default function ProfileScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const [viewMode, setViewMode] = useState<'feed' | 'stats'>('feed');

  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  };

  const handleEditProfile = () => {
    console.log('Edit profile');
  };

  const handleLogout = () => {
    console.log('Logout');
    // TODO: Implement logout
  };

  const renderCompletedExercise = (exercise: typeof MOCK_USER.completedExercises[0]) => {
    return (
      <Card key={exercise.id} variant="flat" style={styles.exerciseCard}>
        <CardContent>
          <Row gap={SPACING.sm} style={styles.exerciseHeader}>
            <Badge label={exercise.domain} variant="outline" />
            <Paragraph style={styles.exerciseDate}>{exercise.date}</Paragraph>
          </Row>
          <Spacer size={SPACING.xs} />
          <Subtitle style={styles.exerciseName}>{exercise.name}</Subtitle>
        </CardContent>
      </Card>
    );
  };

  const renderSettingOption = (option: typeof SETTINGS_OPTIONS[0]) => {
    return (
      <TouchableOpacity
        key={option.id}
        style={styles.settingOption}
        onPress={() => {
          if (option.id === 'subscription' || option.id === 'notifications') {
            handleSettingsPress();
          }
        }}
      >
        <Row gap={SPACING.md} style={styles.settingRow}>
          <View style={styles.settingIcon}>
            <Paragraph style={styles.settingIconText}>{option.icon}</Paragraph>
          </View>
          <View style={{ flex: 1 }}>
            <Paragraph style={styles.settingTitle}>{option.title}</Paragraph>
          </View>
          <Paragraph style={styles.settingArrow}>›</Paragraph>
        </Row>
      </TouchableOpacity>
    );
  };

  return (
    <Screen backgroundColor={COLORS.gray100}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Info */}
          <Card variant="elevated" style={styles.profileCard}>
            <CardContent>
              <View style={styles.profileHeader}>
                <Avatar name={MOCK_USER.name} size="lg" />
                <Spacer size={SPACING.md} />
                <Title style={styles.userName}>{MOCK_USER.name}</Title>
                <Paragraph style={styles.userEmail}>{MOCK_USER.email}</Paragraph>
                <Paragraph style={styles.joinDate}>{MOCK_USER.joinDate}</Paragraph>
                
                {MOCK_USER.subscription && (
                  <>
                    <Spacer size={SPACING.sm} />
                    <Badge label={`✨ ${MOCK_USER.subscription}`} variant="filled" />
                  </>
                )}
                
                <Spacer size={SPACING.md} />
                <Button
                  title="Edit Profile"
                  onPress={handleEditProfile}
                  variant="outline"
                  size="sm"
                />
              </View>

              <Divider style={styles.divider} />

              {/* Stats */}
              <Row gap={SPACING.xs}>
                <View style={styles.statItem}>
                  <Paragraph style={styles.statValue}>{MOCK_USER.stats.totalExercises}</Paragraph>
                  <Paragraph style={styles.statLabel}>exercises</Paragraph>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Paragraph style={styles.statValue}>{MOCK_USER.stats.followers}</Paragraph>
                  <Paragraph style={styles.statLabel}>followers</Paragraph>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Paragraph style={styles.statValue}>{MOCK_USER.stats.following}</Paragraph>
                  <Paragraph style={styles.statLabel}>following</Paragraph>
                </View>
              </Row>
            </CardContent>
          </Card>

          {/* View Mode Toggle */}
          <View style={styles.viewModeContainer}>
            <Row gap={SPACING.sm}>
              <Button
                title="My Feed"
                onPress={() => setViewMode('feed')}
                variant={viewMode === 'feed' ? 'primary' : 'outline'}
                size="sm"
                style={styles.viewModeButton}
              />
              <Button
                title="Statistics"
                onPress={() => setViewMode('stats')}
                variant={viewMode === 'stats' ? 'primary' : 'outline'}
                size="sm"
                style={styles.viewModeButton}
              />
            </Row>
          </View>

          {viewMode === 'feed' ? (
            <>
              {/* Recent Activity */}
              <View style={styles.activityContainer}>
                <Subtitle style={styles.sectionTitle}>Recent Activity</Subtitle>
                <Spacer size={SPACING.sm} />
                {MOCK_USER.completedExercises.map(renderCompletedExercise)}
              </View>
            </>
          ) : (
            <>
              {/* Statistics */}
              <View style={styles.statsContainer}>
                <Subtitle style={styles.sectionTitle}>Your Progress</Subtitle>
                <Spacer size={SPACING.md} />
                <Row gap={SPACING.sm}>
                  <StatCard
                    label="This Month"
                    value="28"
                    subValue="exercises"
                    trend="up"
                    style={styles.statCard}
                  />
                  <StatCard
                    label="Best Streak"
                    value="14"
                    subValue="days"
                    style={styles.statCard}
                  />
                </Row>
                <Spacer size={SPACING.sm} />
                <Row gap={SPACING.sm}>
                  <StatCard
                    label="Favorite Domain"
                    value="Kindness"
                    subValue="45% of practice"
                    style={styles.statCard}
                  />
                  <StatCard
                    label="Total Time"
                    value="18.5"
                    subValue="hours"
                    style={styles.statCard}
                  />
                </Row>
              </View>
            </>
          )}

          {/* Settings Options */}
          <View style={styles.settingsContainer}>
            <Subtitle style={styles.sectionTitle}>Settings</Subtitle>
            <Spacer size={SPACING.sm} />
            <Card variant="flat" style={styles.settingsCard}>
              <CardContent style={styles.settingsContent}>
                {SETTINGS_OPTIONS.map(renderSettingOption)}
              </CardContent>
            </Card>
          </View>

          {/* Logout Button */}
          <View style={styles.logoutContainer}>
            <Button
              title="Sign Out"
              onPress={handleLogout}
              variant="ghost"
            />
          </View>

          <Spacer size={SPACING.xxl} />
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: 60, // Account for status bar + some padding
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  headerTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
  },
  settingsIcon: {
    fontSize: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    // No additional padding needed, SafeAreaView handles it
  },
  profileCard: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  userName: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  userEmail: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray600,
    marginTop: 2,
  },
  joinDate: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
    marginTop: 4,
  },
  divider: {
    marginVertical: SPACING.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  statLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: COLORS.gray300,
  },
  viewModeContainer: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  viewModeButton: {
    flex: 1,
  },
  activityContainer: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: COLORS.black,
  },
  exerciseCard: {
    marginBottom: SPACING.sm,
  },
  exerciseHeader: {
    alignItems: 'center',
  },
  exerciseDate: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
  },
  exerciseName: {
    fontSize: FONT_SIZE.md,
    fontWeight: '500',
    color: COLORS.black,
  },
  statsContainer: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  statCard: {
    flex: 1,
  },
  settingsContainer: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  settingsCard: {
    overflow: 'hidden',
  },
  settingsContent: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  settingOption: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  settingRow: {
    alignItems: 'center',
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingIconText: {
    fontSize: 16,
  },
  settingTitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.black,
    fontWeight: '500',
  },
  settingArrow: {
    fontSize: 24,
    color: COLORS.gray400,
  },
  logoutContainer: {
    paddingHorizontal: SPACING.md,
  },
});