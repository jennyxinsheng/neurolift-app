import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS } from '../utils/theme';
import { DomainKey, DOMAINS } from '../utils/theme';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'filled' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  size = 'md',
  style,
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { paddingHorizontal: SPACING.sm, paddingVertical: 2, fontSize: FONT_SIZE.xs };
      case 'lg':
        return { paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, fontSize: FONT_SIZE.md };
      default:
        return { paddingHorizontal: SPACING.sm, paddingVertical: 4, fontSize: FONT_SIZE.sm };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <View
      style={[
        styles.badge,
        { paddingHorizontal: sizeStyles.paddingHorizontal, paddingVertical: sizeStyles.paddingVertical },
        variant === 'filled' && styles.badgeFilled,
        variant === 'outline' && styles.badgeOutline,
        style,
      ]}
    >
      <Text
        style={[
          styles.badgeText,
          { fontSize: sizeStyles.fontSize },
          variant === 'filled' && styles.badgeTextFilled,
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

interface DomainBadgeProps {
  domain: DomainKey;
  size?: 'sm' | 'md' | 'lg';
  onPress?: () => void;
  style?: ViewStyle;
}

export const DomainBadge: React.FC<DomainBadgeProps> = ({
  domain,
  size = 'md',
  onPress,
  style,
}) => {
  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper onPress={onPress} activeOpacity={onPress ? 0.7 : 1} style={style}>
      <Badge label={DOMAINS[domain]} variant="outline" size={size} />
    </Wrapper>
  );
};

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  onPress,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        selected && styles.chipSelected,
        disabled && styles.chipDisabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {leftIcon && <View style={styles.chipIconLeft}>{leftIcon}</View>}
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
        {label}
      </Text>
      {rightIcon && <View style={styles.chipIconRight}>{rightIcon}</View>}
    </TouchableOpacity>
  );
};

interface ChipGroupProps {
  chips: string[];
  selectedChips: string[];
  onChipPress: (chip: string) => void;
  multiple?: boolean;
  style?: ViewStyle;
}

export const ChipGroup: React.FC<ChipGroupProps> = ({
  chips,
  selectedChips,
  onChipPress,
  multiple = false,
  style,
}) => {
  const handlePress = (chip: string) => {
    if (multiple) {
      onChipPress(chip);
    } else {
      onChipPress(chip);
    }
  };

  return (
    <View style={[styles.chipGroup, style]}>
      {chips.map((chip) => (
        <Chip
          key={chip}
          label={chip}
          selected={selectedChips.includes(chip)}
          onPress={() => handlePress(chip)}
          style={styles.chipGroupItem}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: COLORS.gray100,
    borderRadius: BORDER_RADIUS.full,
  },
  badgeFilled: {
    backgroundColor: COLORS.black,
  },
  badgeOutline: {
    backgroundColor: COLORS.transparent,
    borderWidth: 1,
    borderColor: COLORS.gray400,
  },
  badgeText: {
    color: COLORS.gray700,
    fontWeight: FONT_WEIGHT.medium,
  },
  badgeTextFilled: {
    color: COLORS.white,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    backgroundColor: COLORS.white,
  },
  chipSelected: {
    backgroundColor: COLORS.black,
    borderColor: COLORS.black,
  },
  chipDisabled: {
    opacity: 0.5,
  },
  chipText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.black,
  },
  chipTextSelected: {
    color: COLORS.white,
  },
  chipIconLeft: {
    marginRight: SPACING.xs,
  },
  chipIconRight: {
    marginLeft: SPACING.xs,
  },
  chipGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chipGroupItem: {
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
  },
});
