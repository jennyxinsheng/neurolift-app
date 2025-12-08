import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AuthStackNavigationProp } from '../../navigation/types';
import { Button, Title, Paragraph, Spacer, Screen, Divider } from '../../components';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '../../utils/theme';

export default function LoginScreen() {
  const navigation = useNavigation<AuthStackNavigationProp>();

  const handleAppleSignIn = () => {
    // TODO: Implement Apple Sign In
    console.log('Apple Sign In');
    // For now, navigate to assessment
    navigation.navigate('Assessment');
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google Sign In
    console.log('Google Sign In');
    // For now, navigate to assessment
    navigation.navigate('Assessment');
  };

  return (
    <Screen backgroundColor={COLORS.white}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.headerContainer}>
            <Title style={styles.title}>Welcome back</Title>
            <Spacer size={SPACING.sm} />
            <Paragraph style={styles.subtitle}>
              Sign in to continue your psychological fitness journey
            </Paragraph>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.socialButton} onPress={handleAppleSignIn}>
              <View style={styles.iconContainer}>
                <Paragraph style={styles.icon}>🍎</Paragraph>
              </View>
              <Paragraph style={styles.socialButtonText}>Sign in with Apple</Paragraph>
            </TouchableOpacity>

            <Spacer size={SPACING.md} />

            <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignIn}>
              <View style={styles.iconContainer}>
                <Paragraph style={styles.icon}>G</Paragraph>
              </View>
              <Paragraph style={styles.socialButtonText}>Sign in with Google</Paragraph>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Paragraph style={styles.dividerText}>or</Paragraph>
              <View style={styles.dividerLine} />
            </View>

            <Button
              title="Continue as Guest"
              onPress={() => navigation.navigate('Assessment')}
              variant="outline"
              style={styles.guestButton}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Paragraph style={styles.footerText}>
            New to NeuroLift?{' '}
            <Paragraph style={styles.linkText}>Create an account</Paragraph>
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
  headerContainer: {
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
  buttonsContainer: {
    width: '100%',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.black,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
  },
  iconContainer: {
    marginRight: SPACING.sm,
  },
  icon: {
    fontSize: FONT_SIZE.xl,
    color: COLORS.white,
  },
  socialButtonText: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.white,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.gray300,
  },
  dividerText: {
    paddingHorizontal: SPACING.md,
    color: COLORS.gray500,
    fontSize: FONT_SIZE.sm,
  },
  guestButton: {
    width: '100%',
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    alignItems: 'center',
  },
  footerText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray600,
  },
  linkText: {
    color: COLORS.black,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});