import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT } from '../utils/theme';

export interface TabItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
}

interface TabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (key: string) => void;
  style?: ViewStyle;
}

export const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTab,
  onTabPress,
  style,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: Math.max(insets.bottom, SPACING.sm) },
        style,
      ]}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => onTabPress(tab.key)}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              {isActive && tab.activeIcon ? tab.activeIcon : tab.icon}
            </View>
            <Text
              style={[
                styles.label,
                isActive && styles.labelActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

interface SegmentedTabsProps {
  tabs: string[];
  activeIndex: number;
  onTabPress: (index: number) => void;
  style?: ViewStyle;
}

export const SegmentedTabs: React.FC<SegmentedTabsProps> = ({
  tabs,
  activeIndex,
  onTabPress,
  style,
}) => {
  return (
    <View style={[styles.segmentedContainer, style]}>
      {tabs.map((tab, index) => {
        const isActive = activeIndex === index;
        return (
          <TouchableOpacity
            key={tab}
            style={[
              styles.segmentedTab,
              isActive && styles.segmentedTabActive,
            ]}
            onPress={() => onTabPress(index)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.segmentedLabel,
                isActive && styles.segmentedLabelActive,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    paddingTop: SPACING.sm,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xs,
  },
  iconContainer: {
    marginBottom: SPACING.xs,
  },
  label: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
    fontWeight: FONT_WEIGHT.medium,
  },
  labelActive: {
    color: COLORS.black,
    fontWeight: FONT_WEIGHT.semibold,
  },
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.gray100,
    borderRadius: 8,
    padding: 4,
  },
  segmentedTab: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    borderRadius: 6,
  },
  segmentedTabActive: {
    backgroundColor: COLORS.white,
  },
  segmentedLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
    fontWeight: FONT_WEIGHT.medium,
  },
  segmentedLabelActive: {
    color: COLORS.black,
    fontWeight: FONT_WEIGHT.semibold,
  },
});
