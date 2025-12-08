import React from 'react';
import { View, Image, Text, StyleSheet, ViewStyle, ImageSourcePropType } from 'react-native';
import { COLORS, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS } from '../utils/theme';

interface AvatarProps {
  source?: ImageSourcePropType | null;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  size = 'md',
  style,
}) => {
  const sizeMap = {
    xs: 24,
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96,
  };

  const fontSizeMap = {
    xs: FONT_SIZE.xs,
    sm: FONT_SIZE.sm,
    md: FONT_SIZE.lg,
    lg: FONT_SIZE.xxl,
    xl: FONT_SIZE.xxxl,
  };

  const dimension = sizeMap[size];

  const getInitials = (name: string): string => {
    const words = name.trim().split(' ');
    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const containerStyle: ViewStyle = {
    width: dimension,
    height: dimension,
    borderRadius: dimension / 2,
    backgroundColor: COLORS.gray200,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  };

  if (source) {
    return (
      <View style={[containerStyle, style]}>
        <Image
          source={source}
          style={{ width: dimension, height: dimension }}
          resizeMode="cover"
        />
      </View>
    );
  }

  return (
    <View style={[containerStyle, style]}>
      <Text
        style={{
          fontSize: fontSizeMap[size],
          fontWeight: FONT_WEIGHT.semibold,
          color: COLORS.gray600,
        }}
      >
        {name ? getInitials(name) : '?'}
      </Text>
    </View>
  );
};

interface AvatarGroupProps {
  avatars: Array<{ source?: ImageSourcePropType | null; name?: string }>;
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  style?: ViewStyle;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = 4,
  size = 'sm',
  style,
}) => {
  const sizeMap = {
    xs: 24,
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96,
  };

  const dimension = sizeMap[size];
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  return (
    <View style={[styles.avatarGroup, style]}>
      {visibleAvatars.map((avatar, index) => (
        <View
          key={index}
          style={[
            styles.avatarWrapper,
            { marginLeft: index > 0 ? -dimension / 3 : 0, zIndex: visibleAvatars.length - index },
          ]}
        >
          <Avatar source={avatar.source} name={avatar.name} size={size} />
        </View>
      ))}
      {remainingCount > 0 && (
        <View
          style={[
            styles.avatarWrapper,
            styles.remainingBadge,
            {
              marginLeft: -dimension / 3,
              width: dimension,
              height: dimension,
              borderRadius: dimension / 2,
            },
          ]}
        >
          <Text style={styles.remainingText}>+{remainingCount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: BORDER_RADIUS.full,
  },
  remainingBadge: {
    backgroundColor: COLORS.gray300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  remainingText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.gray700,
  },
});
