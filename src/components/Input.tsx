import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, FONT_WEIGHT } from '../utils/theme';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  disabled = false,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getInputContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: BORDER_RADIUS.lg,
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.sm,
      backgroundColor: COLORS.white,
    };

    if (error) {
      return { ...baseStyle, borderColor: COLORS.gray800 };
    }
    if (isFocused) {
      return { ...baseStyle, borderColor: COLORS.black, borderWidth: 2 };
    }
    if (disabled) {
      return { ...baseStyle, borderColor: COLORS.gray200, backgroundColor: COLORS.gray100 };
    }
    return { ...baseStyle, borderColor: COLORS.gray300 };
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={getInputContainerStyle()}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          {...textInputProps}
          style={[
            styles.input,
            leftIcon && { paddingLeft: SPACING.sm },
            rightIcon && { paddingRight: SPACING.sm },
            disabled && { color: COLORS.gray400 },
            inputStyle,
          ]}
          placeholderTextColor={COLORS.gray400}
          editable={!disabled}
          onFocus={(e) => {
            setIsFocused(true);
            textInputProps.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            textInputProps.onBlur?.(e);
          }}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      {hint && !error && <Text style={styles.hint}>{hint}</Text>}
    </View>
  );
};

interface TextAreaProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  hint?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  minHeight?: number;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  hint,
  containerStyle,
  inputStyle,
  minHeight = 100,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.textAreaContainer,
          isFocused && styles.textAreaFocused,
          error && styles.textAreaError,
          { minHeight },
        ]}
      >
        <TextInput
          {...textInputProps}
          style={[styles.textArea, inputStyle]}
          multiline
          textAlignVertical="top"
          placeholderTextColor={COLORS.gray400}
          onFocus={(e) => {
            setIsFocused(true);
            textInputProps.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            textInputProps.onBlur?.(e);
          }}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      {hint && !error && <Text style={styles.hint}>{hint}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.black,
    marginBottom: SPACING.xs,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    color: COLORS.black,
    paddingVertical: SPACING.xs,
  },
  leftIcon: {
    marginRight: SPACING.sm,
  },
  rightIcon: {
    marginLeft: SPACING.sm,
  },
  error: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray800,
    marginTop: SPACING.xs,
  },
  hint: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
    marginTop: SPACING.xs,
  },
  textAreaContainer: {
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    backgroundColor: COLORS.white,
  },
  textAreaFocused: {
    borderColor: COLORS.black,
    borderWidth: 2,
  },
  textAreaError: {
    borderColor: COLORS.gray800,
  },
  textArea: {
    fontSize: FONT_SIZE.md,
    color: COLORS.black,
    padding: 0,
  },
});
