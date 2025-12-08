import React from 'react';
import { Text as RNText, StyleSheet, TextStyle, TextProps as RNTextProps } from 'react-native';
import { COLORS, FONT_SIZE, FONT_WEIGHT } from '../utils/theme';

type TextVariant = 'display' | 'h1' | 'h2' | 'h3' | 'body' | 'bodySmall' | 'caption' | 'label';

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: string;
  weight?: keyof typeof FONT_WEIGHT;
  align?: 'left' | 'center' | 'right';
  style?: TextStyle;
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color = COLORS.black,
  weight,
  align,
  style,
  children,
  ...props
}) => {
  const getVariantStyle = (): TextStyle => {
    switch (variant) {
      case 'display':
        return { fontSize: FONT_SIZE.display, fontWeight: FONT_WEIGHT.bold, lineHeight: 48 };
      case 'h1':
        return { fontSize: FONT_SIZE.xxxl, fontWeight: FONT_WEIGHT.bold, lineHeight: 40 };
      case 'h2':
        return { fontSize: FONT_SIZE.xxl, fontWeight: FONT_WEIGHT.semibold, lineHeight: 32 };
      case 'h3':
        return { fontSize: FONT_SIZE.xl, fontWeight: FONT_WEIGHT.semibold, lineHeight: 28 };
      case 'body':
        return { fontSize: FONT_SIZE.md, fontWeight: FONT_WEIGHT.regular, lineHeight: 22 };
      case 'bodySmall':
        return { fontSize: FONT_SIZE.sm, fontWeight: FONT_WEIGHT.regular, lineHeight: 20 };
      case 'caption':
        return { fontSize: FONT_SIZE.xs, fontWeight: FONT_WEIGHT.regular, lineHeight: 16 };
      case 'label':
        return { fontSize: FONT_SIZE.sm, fontWeight: FONT_WEIGHT.medium, lineHeight: 18 };
      default:
        return { fontSize: FONT_SIZE.md, fontWeight: FONT_WEIGHT.regular };
    }
  };

  return (
    <RNText
      {...props}
      style={[
        getVariantStyle(),
        { color },
        weight && { fontWeight: FONT_WEIGHT[weight] },
        align && { textAlign: align },
        style,
      ]}
    >
      {children}
    </RNText>
  );
};

interface TitleProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export const Title: React.FC<TitleProps> = ({ children, style }) => (
  <Text variant="h1" style={style}>{children}</Text>
);

export const Subtitle: React.FC<TitleProps> = ({ children, style }) => (
  <Text variant="h3" color={COLORS.gray600} style={style}>{children}</Text>
);

export const Paragraph: React.FC<TitleProps> = ({ children, style }) => (
  <Text variant="body" color={COLORS.gray700} style={style}>{children}</Text>
);

export const Caption: React.FC<TitleProps> = ({ children, style }) => (
  <Text variant="caption" color={COLORS.gray500} style={style}>{children}</Text>
);
