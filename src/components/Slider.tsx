import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Animated,
  ViewStyle,
  LayoutChangeEvent,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS } from '../utils/theme';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  showValue?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true,
  disabled = false,
  style,
}) => {
  const [trackWidth, setTrackWidth] = useState(0);
  const panX = useRef(new Animated.Value(0)).current;

  const getPositionFromValue = (val: number): number => {
    const percentage = (val - min) / (max - min);
    return percentage * trackWidth;
  };

  const getValueFromPosition = (position: number): number => {
    const percentage = Math.max(0, Math.min(1, position / trackWidth));
    const rawValue = min + percentage * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.max(min, Math.min(max, steppedValue));
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: () => {
        panX.setOffset(getPositionFromValue(value));
        panX.setValue(0);
      },
      onPanResponderMove: (_, gestureState) => {
        const newPosition = getPositionFromValue(value) + gestureState.dx;
        const clampedPosition = Math.max(0, Math.min(trackWidth, newPosition));
        panX.setValue(clampedPosition - getPositionFromValue(value));
      },
      onPanResponderRelease: (_, gestureState) => {
        panX.flattenOffset();
        const finalPosition = getPositionFromValue(value) + gestureState.dx;
        const newValue = getValueFromPosition(finalPosition);
        onChange(newValue);
        panX.setValue(getPositionFromValue(newValue));
      },
    })
  ).current;

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setTrackWidth(width - 24);
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <View style={[styles.container, style]}>
      {(label || showValue) && (
        <View style={styles.header}>
          {label && <Text style={styles.label}>{label}</Text>}
          {showValue && <Text style={styles.value}>{value}</Text>}
        </View>
      )}
      <View style={styles.trackContainer} onLayout={handleLayout}>
        <View style={styles.track}>
          <View style={[styles.trackFill, { width: `${percentage}%` }]} />
        </View>
        <View
          {...panResponder.panHandlers}
          style={[
            styles.thumb,
            { left: `${percentage}%`, marginLeft: -12 },
            disabled && styles.thumbDisabled,
          ]}
        />
      </View>
      <View style={styles.labels}>
        <Text style={styles.minMax}>{min}</Text>
        <Text style={styles.minMax}>{max}</Text>
      </View>
    </View>
  );
};

interface RangeSliderProps {
  values: [number, number];
  onChange: (values: [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  values,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  disabled = false,
  style,
}) => {
  const [trackWidth, setTrackWidth] = useState(0);

  const getPercentage = (val: number): number => {
    return ((val - min) / (max - min)) * 100;
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setTrackWidth(width - 24);
  };

  const leftPercentage = getPercentage(values[0]);
  const rightPercentage = getPercentage(values[1]);

  return (
    <View style={[styles.container, style]}>
      {label && (
        <View style={styles.header}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>
            {values[0]} - {values[1]}
          </Text>
        </View>
      )}
      <View style={styles.trackContainer} onLayout={handleLayout}>
        <View style={styles.track}>
          <View
            style={[
              styles.trackFillRange,
              {
                left: `${leftPercentage}%`,
                width: `${rightPercentage - leftPercentage}%`,
              },
            ]}
          />
        </View>
        <View
          style={[
            styles.thumb,
            { left: `${leftPercentage}%`, marginLeft: -12 },
            disabled && styles.thumbDisabled,
          ]}
        />
        <View
          style={[
            styles.thumb,
            { left: `${rightPercentage}%`, marginLeft: -12 },
            disabled && styles.thumbDisabled,
          ]}
        />
      </View>
      <View style={styles.labels}>
        <Text style={styles.minMax}>{min}</Text>
        <Text style={styles.minMax}>{max}</Text>
      </View>
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
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.black,
  },
  value: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.black,
  },
  trackContainer: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  track: {
    height: 4,
    backgroundColor: COLORS.gray200,
    borderRadius: 2,
  },
  trackFill: {
    position: 'absolute',
    height: '100%',
    backgroundColor: COLORS.black,
    borderRadius: 2,
  },
  trackFillRange: {
    position: 'absolute',
    height: '100%',
    backgroundColor: COLORS.black,
    borderRadius: 2,
  },
  thumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.black,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbDisabled: {
    borderColor: COLORS.gray400,
    backgroundColor: COLORS.gray100,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.xs,
  },
  minMax: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
  },
});
