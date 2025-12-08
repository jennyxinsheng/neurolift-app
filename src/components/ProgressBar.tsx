import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS } from '../utils/theme';

interface ProgressBarProps {
  progress: number;
  height?: number;
  showPercentage?: boolean;
  label?: string;
  style?: ViewStyle;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  showPercentage = false,
  label,
  style,
}) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <View style={[styles.container, style]}>
      {(label || showPercentage) && (
        <View style={styles.header}>
          {label && <Text style={styles.label}>{label}</Text>}
          {showPercentage && (
            <Text style={styles.percentage}>{Math.round(clampedProgress)}%</Text>
          )}
        </View>
      )}
      <View style={[styles.track, { height, borderRadius: height / 2 }]}>
        <View
          style={[
            styles.fill,
            {
              width: `${clampedProgress}%`,
              height,
              borderRadius: height / 2,
            },
          ]}
        />
      </View>
    </View>
  );
};

interface ProgressCircleProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  showPercentage?: boolean;
  label?: string;
  style?: ViewStyle;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  progress,
  size = 100,
  strokeWidth = 8,
  showPercentage = true,
  label,
  style,
}) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (clampedProgress / 100) * circumference;

  return (
    <View style={[styles.circleContainer, { width: size, height: size }, style]}>
      <View style={styles.circleBackground}>
        <View
          style={[
            styles.circleTrack,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: strokeWidth,
            },
          ]}
        />
        <View
          style={[
            styles.circleFill,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: strokeWidth,
              borderColor: COLORS.black,
              transform: [{ rotate: '-90deg' }],
            },
          ]}
        />
      </View>
      <View style={styles.circleContent}>
        {showPercentage && (
          <Text style={styles.circlePercentage}>{Math.round(clampedProgress)}%</Text>
        )}
        {label && <Text style={styles.circleLabel}>{label}</Text>}
      </View>
    </View>
  );
};

interface ProgressStepsProps {
  steps: string[];
  currentStep: number;
  style?: ViewStyle;
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({
  steps,
  currentStep,
  style,
}) => {
  return (
    <View style={[styles.stepsContainer, style]}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <View key={index} style={styles.stepWrapper}>
            <View style={styles.stepRow}>
              <View
                style={[
                  styles.stepCircle,
                  isCompleted && styles.stepCircleCompleted,
                  isCurrent && styles.stepCircleCurrent,
                ]}
              >
                {isCompleted ? (
                  <Text style={styles.stepCheck}>✓</Text>
                ) : (
                  <Text
                    style={[
                      styles.stepNumber,
                      (isCompleted || isCurrent) && styles.stepNumberActive,
                    ]}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              {!isLast && (
                <View
                  style={[
                    styles.stepLine,
                    isCompleted && styles.stepLineCompleted,
                  ]}
                />
              )}
            </View>
            <Text
              style={[
                styles.stepLabel,
                (isCompleted || isCurrent) && styles.stepLabelActive,
              ]}
              numberOfLines={2}
            >
              {step}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.black,
  },
  percentage: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.black,
  },
  track: {
    width: '100%',
    backgroundColor: COLORS.gray200,
    overflow: 'hidden',
  },
  fill: {
    backgroundColor: COLORS.black,
  },
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleBackground: {
    position: 'absolute',
  },
  circleTrack: {
    position: 'absolute',
    borderColor: COLORS.gray200,
  },
  circleFill: {
    position: 'absolute',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  circleContent: {
    alignItems: 'center',
  },
  circlePercentage: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
  },
  circleLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
    marginTop: 2,
  },
  stepsContainer: {
    flexDirection: 'row',
  },
  stepWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.gray300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  stepCircleCompleted: {
    backgroundColor: COLORS.black,
    borderColor: COLORS.black,
  },
  stepCircleCurrent: {
    borderColor: COLORS.black,
  },
  stepCheck: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.white,
    fontWeight: FONT_WEIGHT.bold,
  },
  stepNumber: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray400,
    fontWeight: FONT_WEIGHT.semibold,
  },
  stepNumberActive: {
    color: COLORS.black,
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: COLORS.gray300,
    marginHorizontal: SPACING.xs,
  },
  stepLineCompleted: {
    backgroundColor: COLORS.black,
  },
  stepLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray400,
    textAlign: 'center',
    marginTop: SPACING.xs,
    paddingHorizontal: SPACING.xs,
  },
  stepLabelActive: {
    color: COLORS.black,
    fontWeight: FONT_WEIGHT.medium,
  },
});
