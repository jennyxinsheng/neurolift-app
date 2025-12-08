import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, SPACING } from '../utils/theme';

interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padded?: boolean;
  safeArea?: boolean | 'top' | 'bottom' | 'horizontal';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  style,
  padded = true,
  safeArea = false,
}) => {
  const insets = useSafeAreaInsets();

  const getSafeAreaPadding = (): ViewStyle => {
    if (!safeArea) return {};
    if (safeArea === true) {
      return {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      };
    }
    if (safeArea === 'top') return { paddingTop: insets.top };
    if (safeArea === 'bottom') return { paddingBottom: insets.bottom };
    if (safeArea === 'horizontal') {
      return { paddingLeft: insets.left, paddingRight: insets.right };
    }
    return {};
  };

  return (
    <View
      style={[
        styles.container,
        padded && styles.padded,
        getSafeAreaPadding(),
        style,
      ]}
    >
      {children}
    </View>
  );
};

interface ScreenProps {
  children: React.ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  style,
  backgroundColor = COLORS.white,
}) => {
  return (
    <View
      style={[
        styles.screen,
        {
          backgroundColor,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

interface RowProps {
  children: React.ReactNode;
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  gap?: number;
  wrap?: boolean;
  style?: ViewStyle;
}

export const Row: React.FC<RowProps> = ({
  children,
  align = 'center',
  justify = 'flex-start',
  gap = 0,
  wrap = false,
  style,
}) => {
  return (
    <View
      style={[
        styles.row,
        {
          alignItems: align,
          justifyContent: justify,
          gap,
          flexWrap: wrap ? 'wrap' : 'nowrap',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

interface ColumnProps {
  children: React.ReactNode;
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  gap?: number;
  style?: ViewStyle;
}

export const Column: React.FC<ColumnProps> = ({
  children,
  align = 'stretch',
  justify = 'flex-start',
  gap = 0,
  style,
}) => {
  return (
    <View
      style={[
        styles.column,
        {
          alignItems: align,
          justifyContent: justify,
          gap,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

interface CenterProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Center: React.FC<CenterProps> = ({ children, style }) => {
  return <View style={[styles.center, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  padded: {
    paddingHorizontal: SPACING.md,
  },
  screen: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
