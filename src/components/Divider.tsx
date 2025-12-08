import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT } from '../utils/theme';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  thickness?: number;
  color?: string;
  style?: ViewStyle;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  thickness = 1,
  color = COLORS.gray200,
  style,
}) => {
  return (
    <View
      style={[
        orientation === 'horizontal'
          ? { height: thickness, width: '100%' }
          : { width: thickness, height: '100%' },
        { backgroundColor: color },
        style,
      ]}
    />
  );
};

interface DividerWithTextProps {
  text: string;
  color?: string;
  textColor?: string;
  style?: ViewStyle;
}

export const DividerWithText: React.FC<DividerWithTextProps> = ({
  text,
  color = COLORS.gray200,
  textColor = COLORS.gray500,
  style,
}) => {
  return (
    <View style={[styles.dividerWithTextContainer, style]}>
      <View style={[styles.dividerLine, { backgroundColor: color }]} />
      <Text style={[styles.dividerText, { color: textColor }]}>{text}</Text>
      <View style={[styles.dividerLine, { backgroundColor: color }]} />
    </View>
  );
};

interface SpacerProps {
  size?: number;
  horizontal?: boolean;
}

export const Spacer: React.FC<SpacerProps> = ({
  size = SPACING.md,
  horizontal = false,
}) => {
  return (
    <View
      style={horizontal ? { width: size } : { height: size }}
    />
  );
};

interface ListItemProps {
  title: string;
  subtitle?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  onPress?: () => void;
  showDivider?: boolean;
  style?: ViewStyle;
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  leftContent,
  rightContent,
  onPress,
  showDivider = true,
  style,
}) => {
  const Wrapper = onPress ? require('react-native').TouchableOpacity : View;

  return (
    <>
      <Wrapper
        style={[styles.listItem, style]}
        onPress={onPress}
        activeOpacity={onPress ? 0.7 : 1}
      >
        {leftContent && <View style={styles.listItemLeft}>{leftContent}</View>}
        <View style={styles.listItemContent}>
          <Text style={styles.listItemTitle}>{title}</Text>
          {subtitle && <Text style={styles.listItemSubtitle}>{subtitle}</Text>}
        </View>
        {rightContent && <View style={styles.listItemRight}>{rightContent}</View>}
      </Wrapper>
      {showDivider && <Divider style={{ marginLeft: leftContent ? 56 : 0 }} />}
    </>
  );
};

const styles = StyleSheet.create({
  dividerWithTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: SPACING.md,
    fontSize: FONT_SIZE.sm,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  listItemLeft: {
    marginRight: SPACING.md,
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.black,
  },
  listItemSubtitle: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
    marginTop: 2,
  },
  listItemRight: {
    marginLeft: SPACING.md,
  },
});
