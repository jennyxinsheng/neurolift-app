import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS } from '../utils/theme';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
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

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => !disabled && onChange(!checked)}
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled}
    >
      <View
        style={[
          styles.checkbox,
          {
            width: dimension,
            height: dimension,
            borderRadius: BORDER_RADIUS.sm,
          },
          checked && styles.checkboxChecked,
          disabled && styles.checkboxDisabled,
        ]}
      >
        {checked && (
          <View style={styles.checkmark}>
            <View style={[styles.checkmarkShort, { width: dimension * 0.25 }]} />
            <View style={[styles.checkmarkLong, { width: dimension * 0.5 }]} />
          </View>
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

interface CheckboxGroupProps {
  options: { value: string; label: string; description?: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  selected,
  onChange,
  disabled = false,
  style,
}) => {
  const handleChange = (value: string, checked: boolean) => {
    if (checked) {
      onChange([...selected, value]);
    } else {
      onChange(selected.filter((v) => v !== value));
    }
  };

  return (
    <View style={style}>
      {options.map((option, index) => (
        <Checkbox
          key={option.value}
          checked={selected.includes(option.value)}
          onChange={(checked) => handleChange(option.value, checked)}
          label={option.label}
          description={option.description}
          disabled={disabled}
          style={index < options.length - 1 ? { marginBottom: SPACING.md } : undefined}
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
  checkbox: {
    borderWidth: 2,
    borderColor: COLORS.gray400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.black,
    borderColor: COLORS.black,
  },
  checkboxDisabled: {
    backgroundColor: COLORS.gray200,
    borderColor: COLORS.gray300,
  },
  checkmark: {
    position: 'relative',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkShort: {
    position: 'absolute',
    height: 2,
    backgroundColor: COLORS.white,
    transform: [{ rotate: '45deg' }],
    left: 3,
    top: 7,
  },
  checkmarkLong: {
    position: 'absolute',
    height: 2,
    backgroundColor: COLORS.white,
    transform: [{ rotate: '-45deg' }],
    right: 2,
    top: 5,
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
});
