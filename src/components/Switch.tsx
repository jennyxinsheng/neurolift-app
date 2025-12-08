import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ViewStyle,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT } from '../utils/theme';

interface SwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export const Switch: React.FC<SwitchProps> = ({
  value,
  onChange,
  label,
  description,
  disabled = false,
  size = 'md',
  style,
}) => {
  const translateX = useRef(new Animated.Value(value ? 1 : 0)).current;

  const sizeMap = {
    sm: { width: 40, height: 24, thumb: 18 },
    md: { width: 48, height: 28, thumb: 22 },
    lg: { width: 56, height: 32, thumb: 26 },
  };

  const dimensions = sizeMap[size];
  const travelDistance = dimensions.width - dimensions.thumb - 4;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: value ? 1 : 0,
      useNativeDriver: true,
      tension: 100,
      friction: 10,
    }).start();
  }, [value]);

  const handlePress = () => {
    if (!disabled) {
      onChange(!value);
    }
  };

  const thumbTranslateX = translateX.interpolate({
    inputRange: [0, 1],
    outputRange: [2, travelDistance + 2],
  });

  const backgroundColor = translateX.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.gray300, COLORS.black],
  });

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled}
    >
      <Animated.View
        style={[
          styles.track,
          {
            width: dimensions.width,
            height: dimensions.height,
            borderRadius: dimensions.height / 2,
            backgroundColor,
          },
          disabled && styles.trackDisabled,
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              width: dimensions.thumb,
              height: dimensions.thumb,
              borderRadius: dimensions.thumb / 2,
              transform: [{ translateX: thumbTranslateX }],
            },
            disabled && styles.thumbDisabled,
          ]}
        />
      </Animated.View>
      {(label || description) && (
        <View style={styles.labelContainer}>
          {label && (
            <Text style={[styles.label, disabled && styles.labelDisabled]}>
              {label}
            </Text>
          )}
          {description && (
            <Text style={styles.description}>{description}</Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

interface SwitchRowProps {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export const SwitchRow: React.FC<SwitchRowProps> = ({
  value,
  onChange,
  label,
  description,
  disabled = false,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.row, style]}
      onPress={() => !disabled && onChange(!value)}
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled}
    >
      <View style={styles.rowText}>
        <Text style={[styles.rowLabel, disabled && styles.labelDisabled]}>
          {label}
        </Text>
        {description && (
          <Text style={styles.rowDescription}>{description}</Text>
        )}
      </View>
      <Switch value={value} onChange={onChange} disabled={disabled} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  track: {
    justifyContent: 'center',
  },
  trackDisabled: {
    opacity: 0.5,
  },
  thumb: {
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  thumbDisabled: {
    backgroundColor: COLORS.gray100,
  },
  labelContainer: {
    marginLeft: SPACING.sm,
    flex: 1,
  },
  label: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.black,
  },
  labelDisabled: {
    color: COLORS.gray400,
  },
  description: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  rowText: {
    flex: 1,
    marginRight: SPACING.md,
  },
  rowLabel: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.black,
  },
  rowDescription: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
    marginTop: 2,
  },
});
