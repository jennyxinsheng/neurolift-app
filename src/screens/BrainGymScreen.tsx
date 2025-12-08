import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '../navigation/types';
import {
  Screen,
  Title,
  Subtitle,
  Paragraph,
  Card,
  CardHeader,
  CardContent,
  Button,
  Badge,
  ChipGroup,
  Spacer,
  Row,
  ProgressBar,
  WeekView,
} from '../components';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, DOMAINS } from '../utils/theme';

const DOMAIN_EXERCISES = {
  kindness: [
    { id: '1', name: 'Gratitude Journaling', duration: '5 min', difficulty: 'Beginner' },
    { id: '2', name: 'Random Act of Kindness', duration: '10 min', difficulty: 'Beginner' },
    { id: '3', name: 'Thank You Note', duration: '15 min', difficulty: 'Intermediate' },
  ],
  socialConnection: [
    { id: '4', name: 'Quality Time', duration: '30 min', difficulty: 'Intermediate' },
    { id: '5', name: 'Reach Out to Friend', duration: '10 min', difficulty: 'Beginner' },
    { id: '6', name: 'Active Listening', duration: '20 min', difficulty: 'Advanced' },
  ],
  timeAffluence: [
    { id: '7', name: 'Mindfulness Meditation', duration: '10 min', difficulty: 'Beginner' },
    { id: '8', name: 'Digital Detox', duration: '60 min', difficulty: 'Intermediate' },
    { id: '9', name: 'Savoring Exercise', duration: '15 min', difficulty: 'Beginner' },
  ],
  healthyPhysical: [
    { id: '10', name: 'Nature Walk', duration: '20 min', difficulty: 'Beginner' },
    { id: '11', name: 'Sleep Hygiene Check', duration: '10 min', difficulty: 'Beginner' },
    { id: '12', name: 'Hydration Tracking', duration: '5 min', difficulty: 'Beginner' },
  ],
  mindControl: [
    { id: '13', name: 'Cognitive Reframing', duration: '15 min', difficulty: 'Advanced' },
    { id: '14', name: 'Breathing Exercise', duration: '5 min', difficulty: 'Beginner' },
    { id: '15', name: 'Visualization', duration: '10 min', difficulty: 'Intermediate' },
  ],
};

const PRESET_PROGRAMS = [
  { id: 'beginner', name: 'Beginner', duration: '10-15 min/day', exercises: 1 },
  { id: 'intermediate', name: 'Intermediate', duration: '20-30 min/day', exercises: 2 },
  { id: 'advanced', name: 'Advanced', duration: '40+ min/day', exercises: 3 },
];

export default function BrainGymScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const [selectedDomains, setSelectedDomains] = useState<string[]>(['kindness']);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'exercises' | 'programs'>('exercises');

  const handleExercisePress = (exerciseId: string) => {
    navigation.navigate('ExerciseDetail', { exerciseId });
  };

  const handleCalendarPress = () => {
    navigation.navigate('Calendar');
  };

  const handleWorkoutBuilderPress = () => {
    navigation.navigate('WorkoutBuilder');
  };

  const renderExerciseCard = (exercise: any, domain: string) => {
    return (
      <TouchableOpacity
        key={exercise.id}
        onPress={() => handleExercisePress(exercise.id)}
        activeOpacity={0.9}
      >
        <Card variant="flat" style={styles.exerciseCard}>
          <CardContent>
            <Row gap={SPACING.sm} style={styles.exerciseHeader}>
              <Badge label={domain} variant="outline" />
              <Badge label={exercise.difficulty} variant="default" />
            </Row>
            <Spacer size={SPACING.xs} />
            <Subtitle style={styles.exerciseName}>{exercise.name}</Subtitle>
            <Paragraph style={styles.exerciseDuration}>{exercise.duration}</Paragraph>
          </CardContent>
        </Card>
      </TouchableOpacity>
    );
  };

  const renderProgramCard = (program: typeof PRESET_PROGRAMS[0]) => {
    const isSelected = selectedProgram === program.id;
    return (
      <TouchableOpacity
        key={program.id}
        onPress={() => setSelectedProgram(program.id)}
        activeOpacity={0.9}
      >
        <Card 
          variant={isSelected ? "elevated" : "flat"} 
          style={[styles.programCard, isSelected && styles.programCardSelected]}
        >
          <CardHeader title={program.name} subtitle={program.duration} />
          <CardContent>
            <Paragraph style={styles.programDescription}>
              {program.exercises} exercise{program.exercises > 1 ? 's' : ''} per day
            </Paragraph>
            {isSelected && (
              <>
                <Spacer size={SPACING.md} />
                <Button
                  title="Start Program"
                  onPress={() => console.log('Start program:', program.id)}
                  variant="primary"
                  size="sm"
                />
              </>
            )}
          </CardContent>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <Screen backgroundColor={COLORS.gray100}>
      <SafeAreaView style={styles.container} edges={[]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="never"
        >
          {/* Today's Progress */}
          <Card variant="elevated" style={styles.progressCard}>
            <CardContent>
              <Subtitle>Today's Progress</Subtitle>
              <Spacer size={SPACING.sm} />
              <ProgressBar progress={33} label="1 of 3 exercises completed" showPercentage />
              <Spacer size={SPACING.md} />
              <WeekView
                markedDates={{
                  [new Date().toISOString().split('T')[0]]: { scheduled: true },
                }}
              />
            </CardContent>
          </Card>

          {/* View Mode Toggle */}
          <View style={styles.viewModeContainer}>
            <Row gap={SPACING.sm}>
              <Button
                title="Exercises"
                onPress={() => setViewMode('exercises')}
                variant={viewMode === 'exercises' ? 'primary' : 'outline'}
                size="sm"
                style={styles.viewModeButton}
              />
              <Button
                title="Programs"
                onPress={() => setViewMode('programs')}
                variant={viewMode === 'programs' ? 'primary' : 'outline'}
                size="sm"
                style={styles.viewModeButton}
              />
              <Button
                title="Custom"
                onPress={handleWorkoutBuilderPress}
                variant="ghost"
                size="sm"
                style={styles.viewModeButton}
              />
            </Row>
          </View>

          {viewMode === 'exercises' ? (
            <>
              {/* Domain Filter */}
              <View style={styles.domainFilterContainer}>
                <Subtitle style={styles.sectionTitle}>Select Domains</Subtitle>
                <Spacer size={SPACING.sm} />
                <ChipGroup
                  chips={Object.values(DOMAINS)}
                  selectedChips={selectedDomains}
                  onChipPress={(chip) => {
                    const domainKey = Object.keys(DOMAINS).find(
                      key => DOMAINS[key as keyof typeof DOMAINS] === chip
                    );
                    if (domainKey) {
                      setSelectedDomains(prev =>
                        prev.includes(domainKey)
                          ? prev.filter(d => d !== domainKey)
                          : [...prev, domainKey]
                      );
                    }
                  }}
                  multiple
                />
              </View>

              {/* Exercises List */}
              <View style={styles.exercisesContainer}>
                <Subtitle style={styles.sectionTitle}>Available Exercises</Subtitle>
                <Spacer size={SPACING.sm} />
                {selectedDomains.map(domain => (
                  <View key={domain}>
                    {DOMAIN_EXERCISES[domain as keyof typeof DOMAIN_EXERCISES]?.map(exercise =>
                      renderExerciseCard(exercise, DOMAINS[domain as keyof typeof DOMAINS])
                    )}
                  </View>
                ))}
              </View>
            </>
          ) : (
            <>
              {/* Preset Programs */}
              <View style={styles.programsContainer}>
                <Subtitle style={styles.sectionTitle}>Choose Your Program</Subtitle>
                <Spacer size={SPACING.sm} />
                {PRESET_PROGRAMS.map(renderProgramCard)}
              </View>
            </>
          )}
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
  calendarButton: {
    padding: SPACING.xs,
  },
  calendarIcon: {
    fontSize: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  progressCard: {
    marginHorizontal: SPACING.md,
    marginTop: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0,
    marginBottom: SPACING.sm,
  },
  viewModeContainer: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  viewModeButton: {
    flex: 1,
  },
  domainFilterContainer: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: COLORS.black,
  },
  exercisesContainer: {
    paddingHorizontal: SPACING.md,
  },
  exerciseCard: {
    marginBottom: SPACING.sm,
  },
  exerciseHeader: {
    marginBottom: SPACING.xs,
  },
  exerciseName: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.black,
  },
  exerciseDuration: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
    marginTop: 2,
  },
  programsContainer: {
    paddingHorizontal: SPACING.md,
  },
  programCard: {
    marginBottom: SPACING.sm,
  },
  programCardSelected: {
    borderWidth: 2,
    borderColor: COLORS.black,
  },
  programDescription: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray600,
  },
});