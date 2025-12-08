import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { ExerciseDetailRouteProp } from '../navigation/types';
import {
  Screen,
  Title,
  Subtitle,
  Paragraph,
  Button,
  Card,
  CardContent,
  Badge,
  Spacer,
} from '../components';
import { COLORS, SPACING, FONT_SIZE } from '../utils/theme';

export default function ExerciseDetailScreen() {
  const route = useRoute<ExerciseDetailRouteProp>();
  const { exerciseId } = route.params;

  const handleStartExercise = () => {
    console.log('Start exercise:', exerciseId);
  };

  return (
    <Screen backgroundColor={COLORS.white}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Badge label="Kindness" variant="outline" />
          <Spacer size={SPACING.sm} />
          
          <Title style={styles.title}>Gratitude Journaling</Title>
          <Paragraph style={styles.duration}>Duration: 5 minutes</Paragraph>
          
          <Spacer size={SPACING.lg} />
          
          <Card variant="flat">
            <CardContent>
              <Subtitle>Instructions</Subtitle>
              <Spacer size={SPACING.sm} />
              <Paragraph style={styles.instructions}>
                1. Find a quiet space where you won't be interrupted
                {"\n\n"}
                2. Take three deep breaths to center yourself
                {"\n\n"}
                3. Write down three things you're grateful for today
                {"\n\n"}
                4. For each item, spend a moment reflecting on why you're grateful
                {"\n\n"}
                5. Close your eyes and feel the gratitude in your body
              </Paragraph>
            </CardContent>
          </Card>
          
          <Spacer size={SPACING.lg} />
          
          <Card variant="flat">
            <CardContent>
              <Subtitle>Benefits</Subtitle>
              <Spacer size={SPACING.sm} />
              <Paragraph style={styles.benefits}>
                • Increases positive emotions
                {"\n"}
                • Improves sleep quality
                {"\n"}
                • Enhances relationships
                {"\n"}
                • Reduces stress and anxiety
              </Paragraph>
            </CardContent>
          </Card>
        </ScrollView>
        
        <View style={styles.footer}>
          <Button
            title="Start Exercise"
            onPress={handleStartExercise}
            variant="primary"
            style={styles.startButton}
          />
        </View>
      </SafeAreaView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZE.xxl,
    color: COLORS.black,
  },
  duration: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray500,
    marginTop: SPACING.xs,
  },
  instructions: {
    fontSize: FONT_SIZE.md,
    lineHeight: 22,
    color: COLORS.gray700,
  },
  benefits: {
    fontSize: FONT_SIZE.md,
    lineHeight: 22,
    color: COLORS.gray700,
  },
  footer: {
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  startButton: {
    width: '100%',
  },
});