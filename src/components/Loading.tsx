import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text, ViewStyle } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT } from '../utils/theme';

interface LoadingProps {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
  fullScreen?: boolean;
  overlay?: boolean;
  style?: ViewStyle;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'large',
  color = COLORS.black,
  text,
  fullScreen = false,
  overlay = false,
  style,
}) => {
  if (fullScreen || overlay) {
    return (
      <View style={[styles.fullScreen, overlay && styles.overlay, style]}>
        <View style={styles.loadingBox}>
          <ActivityIndicator size={size} color={color} />
          {text && <Text style={styles.loadingText}>{text}</Text>}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 4,
  style,
}) => {
  return (
    <View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
        },
        style,
      ]}
    />
  );
};

interface SkeletonGroupProps {
  count?: number;
  height?: number;
  spacing?: number;
  style?: ViewStyle;
}

export const SkeletonGroup: React.FC<SkeletonGroupProps> = ({
  count = 3,
  height = 20,
  spacing = SPACING.sm,
  style,
}) => {
  return (
    <View style={style}>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={index}
          height={height}
          style={{ marginBottom: index < count - 1 ? spacing : 0 }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  fullScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 1000,
  },
  loadingBox: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  loadingText: {
    marginTop: SPACING.md,
    fontSize: FONT_SIZE.md,
    color: COLORS.gray600,
    fontWeight: FONT_WEIGHT.medium,
  },
  text: {
    marginTop: SPACING.sm,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
  },
  skeleton: {
    backgroundColor: COLORS.gray200,
  },
});
