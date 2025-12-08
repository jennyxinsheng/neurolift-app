import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Screen, Title, Calendar } from '../components';
import { COLORS, SPACING } from '../utils/theme';

export default function CalendarScreen() {
  return (
    <Screen backgroundColor={COLORS.white}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Title style={styles.title}>Your Schedule</Title>
          <Calendar
            markedDates={{
              [new Date().toISOString().split('T')[0]]: { scheduled: true, completed: false },
            }}
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
  content: {
    padding: SPACING.lg,
  },
  title: {
    marginBottom: SPACING.lg,
  },
});