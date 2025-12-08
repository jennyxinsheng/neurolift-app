import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT } from '../utils/theme';

interface RadioProps {
  selected: boolean;
  onChange: () => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export const Radio: React.FC<RadioProps> = ({
  selected,
  onChange,
  label,
  description,
  disabled = false,
  size = 'md',
  style,
}) => {
  const sizeMap = {
    sm: 18,
    md: 22,
    lg: 26,
  };

  const dimension = sizeMap[size];
  const innerSize = dimension * 0.5;

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => !disabled && onChange()}
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled}
    >
      <View
        style={[
          styles.radio,
          {
            width: dimension,
            height: dimension,
            borderRadius: dimension / 2,
          },
          selected && styles.radioSelected,
          disabled && styles.radioDisabled,
        ]}
      >
        {selected && (
          <View
            style={[
              styles.radioInner,
              {
                width: innerSize,
                height: innerSize,
                borderRadius: innerSize / 2,
              },
              disabled && styles.radioInnerDisabled,
            ]}
          />
        )}
      </View>
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

interface RadioGroupProps {
  options: { value: string; label: string; description?: string }[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  horizontal?: boolean;
  style?: ViewStyle;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  disabled = false,
  horizontal = false,
  style,
}) => {
  return (
    <View style={[horizontal ? styles.horizontalGroup : undefined, style]}>
      {options.map((option, index) => (
        <Radio
          key={option.value}
          selected={value === option.value}
          onChange={() => onChange(option.value)}
          label={option.label}
          description={option.description}
          disabled={disabled}
          style={
            horizontal
              ? index < options.length - 1
                ? { marginRight: SPACING.lg }
                : undefined
              : index < options.length - 1
              ? { marginBottom: SPACING.md }
              : undefined
          }
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  radio: {
    borderWidth: 2,
    borderColor: COLORS.gray400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: COLORS.black,
  },
  radioDisabled: {
    borderColor: COLORS.gray300,
  },
  radioInner: {
    backgroundColor: COLORS.black,
  },
  radioInnerDisabled: {
    backgroundColor: COLORS.gray400,
  },
  labelContainer: {
    flex: 1,
    marginLeft: SPACING.sm,
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
  horizontalGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
