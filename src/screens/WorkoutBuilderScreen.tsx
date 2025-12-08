import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Screen, Title, Paragraph } from '../components';
import { COLORS, SPACING, FONT_SIZE } from '../utils/theme';

export default function WorkoutBuilderScreen() {
  return (
    <Screen backgroundColor={COLORS.white}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Title>Workout Builder</Title>
          <Paragraph>Create your custom workout program</Paragraph>
        </View>
      </SafeAreaView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: SPACING.lg,
  },
});