import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, FONT_WEIGHT } from '../utils/theme';
import { ButtonVariant, ButtonSize } from '../types';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: BORDER_RADIUS.lg,
    };

    const sizeStyles: Record<ButtonSize, ViewStyle> = {
      sm: { paddingVertical: SPACING.sm, paddingHorizontal: SPACING.md },
      md: { paddingVertical: SPACING.md, paddingHorizontal: SPACING.lg },
      lg: { paddingVertical: SPACING.lg, paddingHorizontal: SPACING.xl },
    };

    const variantStyles: Record<ButtonVariant, ViewStyle> = {
      primary: { backgroundColor: COLORS.black },
      secondary: { backgroundColor: COLORS.gray800 },
      outline: { backgroundColor: COLORS.transparent, borderWidth: 1, borderColor: COLORS.black },
      ghost: { backgroundColor: COLORS.transparent },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...(fullWidth && { width: '100%' }),
      ...(disabled && { opacity: 0.5 }),
    };
  };

  const getTextStyle = (): TextStyle => {
    const sizeStyles: Record<ButtonSize, TextStyle> = {
      sm: { fontSize: FONT_SIZE.sm },
      md: { fontSize: FONT_SIZE.md },
      lg: { fontSize: FONT_SIZE.lg },
    };

    const variantStyles: Record<ButtonVariant, TextStyle> = {
      primary: { color: COLORS.white },
      secondary: { color: COLORS.white },
      outline: { color: COLORS.black },
      ghost: { color: COLORS.black },
    };

    return {
      fontWeight: FONT_WEIGHT.semibold,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[getButtonStyle(), style]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' || variant === 'secondary' ? COLORS.white : COLORS.black}
          size="small"
        />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text style={[getTextStyle(), leftIcon && { marginLeft: SPACING.sm }, rightIcon && { marginRight: SPACING.sm }, textStyle]}>
            {title}
          </Text>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  );
};
