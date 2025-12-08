import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AuthStackNavigationProp } from '../../navigation/types';
import { Button, Title, Paragraph, Spacer, Screen } from '../../components';
import { COLORS, SPACING, FONT_SIZE } from '../../utils/theme';

export default function WelcomeScreen() {
  const navigation = useNavigation<AuthStackNavigationProp>();

  return (
    <Screen backgroundColor={COLORS.white}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            {/* Logo placeholder - replace with actual logo */}
            <View style={styles.logoPlaceholder}>
              <Title style={styles.logoText}>NeuroLift</Title>
            </View>
          </View>

          <View style={styles.textContainer}>
            <Title style={styles.title}>Build Your Psychological Fitness</Title>
            <Spacer size={SPACING.sm} />
            <Paragraph style={styles.subtitle}>
              Transform your mental wellbeing through science-backed exercises across five key domains
            </Paragraph>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Get Started"
              onPress={() => navigation.navigate('Login')}
              variant="primary"
              style={styles.button}
            />
            <Spacer size={SPACING.md} />
            <Button
              title="I already have an account"
              onPress={() => navigation.navigate('Login')}
              variant="ghost"
              style={styles.button}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Paragraph style={styles.footerText}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Paragraph>
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
    flex: 1,
    paddingHorizontal: SPACING.lg,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  title: {
    fontSize: FONT_SIZE.xxl,
    textAlign: 'center',
    color: COLORS.black,
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    textAlign: 'center',
    color: COLORS.gray600,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    width: '100%',
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  footerText: {
    fontSize: FONT_SIZE.xs,
    textAlign: 'center',
    color: COLORS.gray500,
    lineHeight: 16,
  },
});