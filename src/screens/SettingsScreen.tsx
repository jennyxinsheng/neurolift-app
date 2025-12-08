import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Screen,
  Title,
  Card,
  CardContent,
  SwitchRow,
  Spacer,
} from '../components';
import { COLORS, SPACING } from '../utils/theme';

export default function SettingsScreen() {
  const [morningReminders, setMorningReminders] = React.useState(true);
  const [eveningReminders, setEveningReminders] = React.useState(true);
  const [shareProgress, setShareProgress] = React.useState(false);

  return (
    <Screen backgroundColor={COLORS.gray100}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            <Card variant="flat">
              <CardContent>
                <Title style={styles.sectionTitle}>Notifications</Title>
                <Spacer size={SPACING.md} />
                <SwitchRow
                  value={morningReminders}
                  onChange={setMorningReminders}
                  label="Morning Reminders"
                  description="Get a gentle reminder each morning"
                />
                <Spacer size={SPACING.md} />
                <SwitchRow
                  value={eveningReminders}
                  onChange={setEveningReminders}
                  label="Evening Check-ins"
                  description="Review your day and plan tomorrow"
                />
              </CardContent>
            </Card>
            
            <Spacer size={SPACING.md} />
            
            <Card variant="flat">
              <CardContent>
                <Title style={styles.sectionTitle}>Privacy</Title>
                <Spacer size={SPACING.md} />
                <SwitchRow
                  value={shareProgress}
                  onChange={setShareProgress}
                  label="Share Progress"
                  description="Allow others to see your completed exercises"
                />
              </CardContent>
            </Card>
          </View>
        </ScrollView>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
});