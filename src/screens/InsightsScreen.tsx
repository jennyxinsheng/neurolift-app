import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Screen,
  Title,
  Subtitle,
  Paragraph,
  Card,
  CardContent,
  BarChart,
  RadarChart,
  StatCard,
  Badge,
  Button,
  Spacer,
  Row,
  ChipGroup,
} from '../components';
import { COLORS, SPACING, FONT_SIZE, DOMAINS } from '../utils/theme';

const MOCK_DOMAIN_DATA = [
  { label: 'Kindness', value: 70 },
  { label: 'Social', value: 50 },
  { label: 'Time', value: 40 },
  { label: 'Physical', value: 30 },
  { label: 'Mind', value: 10 },
];

const MOCK_WEEKLY_DATA = [
  { label: 'Mon', value: 3 },
  { label: 'Tue', value: 5 },
  { label: 'Wed', value: 2 },
  { label: 'Thu', value: 7 },
  { label: 'Fri', value: 4 },
  { label: 'Sat', value: 6 },
  { label: 'Sun', value: 3 },
];

const RECOMMENDATIONS = [
  {
    domain: 'Mind Control',
    reason: 'Only 5% of your practice',
    exercises: [
      'Try a 5-minute breathing exercise',
      'Practice cognitive reframing',
      'Explore visualization techniques',
    ],
  },
  {
    domain: 'Physical Health',
    reason: 'Below weekly average',
    exercises: [
      'Take a 20-minute nature walk',
      'Check your sleep hygiene',
      'Track your hydration',
    ],
  },
];

export default function InsightsScreen() {
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'all'>('week');
  const [selectedTimeRange, setSelectedTimeRange] = useState<string[]>(['week']);

  return (
    <Screen backgroundColor={COLORS.gray100}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Time Filter */}
          <View style={styles.timeFilterContainer}>
            <ChipGroup
              chips={['Week', 'Month', 'All Time']}
              selectedChips={selectedTimeRange}
              onChipPress={(chip) => {
                const filterMap = { 'Week': 'week', 'Month': 'month', 'All Time': 'all' };
                setTimeFilter(filterMap[chip as keyof typeof filterMap] as any);
                setSelectedTimeRange([chip]);
              }}
              multiple={false}
            />
          </View>

          {/* Stats Overview */}
          <View style={styles.statsContainer}>
            <Row gap={SPACING.sm}>
              <StatCard 
                label="Current Streak" 
                value="7" 
                subValue="days" 
                trend="up"
                style={styles.statCard} 
              />
              <StatCard 
                label="Total Exercises" 
                value="42" 
                subValue="completed" 
                style={styles.statCard} 
              />
            </Row>
            <Spacer size={SPACING.sm} />
            <Row gap={SPACING.sm}>
              <StatCard 
                label="This Week" 
                value="30" 
                subValue="exercises" 
                trend="up"
                style={styles.statCard} 
              />
              <StatCard 
                label="Time Invested" 
                value="4.5" 
                subValue="hours" 
                style={styles.statCard} 
              />
            </Row>
          </View>

          {/* Domain Distribution */}
          <Card variant="elevated" style={styles.chartCard}>
            <CardContent>
              <Subtitle style={styles.chartTitle}>Domain Distribution</Subtitle>
              <Spacer size={SPACING.sm} />
              <Paragraph style={styles.chartDescription}>
                Your psychological fitness balance across all domains
              </Paragraph>
              <Spacer size={SPACING.md} />
              <View style={styles.radarChartContainer}>
                <RadarChart
                  data={MOCK_DOMAIN_DATA}
                  size={260}
                />
              </View>
            </CardContent>
          </Card>

          {/* Weekly Activity */}
          <Card variant="elevated" style={styles.chartCard}>
            <CardContent>
              <Subtitle style={styles.chartTitle}>Weekly Activity</Subtitle>
              <Spacer size={SPACING.sm} />
              <Paragraph style={styles.chartDescription}>
                Exercises completed per day
              </Paragraph>
              <Spacer size={SPACING.md} />
              <BarChart
                data={MOCK_WEEKLY_DATA}
                height={120}
              />
            </CardContent>
          </Card>

          {/* Recommendations */}
          <View style={styles.recommendationsContainer}>
            <Subtitle style={styles.sectionTitle}>Balance Your Practice</Subtitle>
            <Spacer size={SPACING.sm} />
            <Paragraph style={styles.sectionDescription}>
              Based on your activity, we recommend focusing on these areas:
            </Paragraph>
            <Spacer size={SPACING.md} />
            
            {RECOMMENDATIONS.map((rec, index) => (
              <Card key={index} variant="flat" style={styles.recommendationCard}>
                <CardContent>
                  <Row gap={SPACING.sm} style={styles.recommendationHeader}>
                    <Badge label={rec.domain} variant="filled" />
                    <Paragraph style={styles.recommendationReason}>{rec.reason}</Paragraph>
                  </Row>
                  <Spacer size={SPACING.sm} />
                  {rec.exercises.map((exercise, idx) => (
                    <View key={idx} style={styles.exerciseItem}>
                      <Paragraph style={styles.exerciseText}>• {exercise}</Paragraph>
                    </View>
                  ))}
                  <Spacer size={SPACING.md} />
                  <Button
                    title="Try Now"
                    onPress={() => console.log('Try exercise')}
                    variant="outline"
                    size="sm"
                  />
                </CardContent>
              </Card>
            ))}
          </View>

          {/* Weekly Review */}
          <Card variant="elevated" style={styles.reviewCard}>
            <CardContent>
              <Row gap={SPACING.sm} style={styles.reviewHeader}>
                <View style={styles.celebrationIcon}>
                  <Paragraph style={styles.celebrationEmoji}>🎉</Paragraph>
                </View>
                <View style={{ flex: 1 }}>
                  <Subtitle>Weekly Review Ready!</Subtitle>
                  <Paragraph style={styles.reviewDescription}>
                    See your progress and celebrate your achievements
                  </Paragraph>
                </View>
              </Row>
              <Spacer size={SPACING.md} />
              <Button
                title="View Weekly Review"
                onPress={() => console.log('View review')}
                variant="primary"
              />
            </CardContent>
          </Card>

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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    // No additional padding needed, SafeAreaView handles it
  },
  timeFilterContainer: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  statsContainer: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  statCard: {
    flex: 1,
  },
  chartCard: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  chartTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: COLORS.black,
  },
  chartDescription: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray600,
  },
  recommendationsContainer: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: COLORS.black,
  },
  sectionDescription: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray600,
  },
  recommendationCard: {
    marginBottom: SPACING.sm,
  },
  recommendationHeader: {
    alignItems: 'center',
  },
  recommendationReason: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
  },
  exerciseItem: {
    marginVertical: 2,
  },
  exerciseText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray700,
  },
  reviewCard: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  reviewHeader: {
    alignItems: 'center',
  },
  celebrationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  celebrationEmoji: {
    fontSize: 20,
  },
  reviewDescription: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray600,
    marginTop: 2,
  },
  radarChartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});