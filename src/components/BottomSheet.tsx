import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  PanResponder,
  Dimensions,
  ViewStyle,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS } from '../utils/theme';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  height?: number | 'auto';
  showHandle?: boolean;
  scrollable?: boolean;
  style?: ViewStyle;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  title,
  children,
  height = 'auto',
  showHandle = true,
  scrollable = false,
  style,
}) => {
  const { height: screenHeight } = Dimensions.get('window');
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;

  const sheetHeight = height === 'auto' ? undefined : height;
  const maxHeight = screenHeight * 0.9 - insets.top;

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          slideAnim.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100 || gestureState.vy > 0.5) {
          onClose();
        } else {
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
            tension: 65,
            friction: 11,
          }).start();
        }
      },
    })
  ).current;

  const ContentWrapper = scrollable ? ScrollView : View;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.container,
                {
                  transform: [{ translateY: slideAnim }],
                  maxHeight,
                  height: sheetHeight,
                  paddingBottom: insets.bottom + SPACING.md,
                },
                style,
              ]}
            >
              {showHandle && (
                <View {...panResponder.panHandlers} style={styles.handleContainer}>
                  <View style={styles.handle} />
                </View>
              )}
              
              {title && (
                <View style={styles.header}>
                  <Text style={styles.title}>{title}</Text>
                </View>
              )}
              
              <ContentWrapper
                style={styles.content}
                showsVerticalScrollIndicator={false}
              >
                {children}
              </ContentWrapper>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

interface ActionSheetOption {
  label: string;
  onPress: () => void;
  destructive?: boolean;
}

interface ActionSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  options: ActionSheetOption[];
  cancelLabel?: string;
}

export const ActionSheet: React.FC<ActionSheetProps> = ({
  visible,
  onClose,
  title,
  message,
  options,
  cancelLabel = 'Cancel',
}) => {
  const insets = useSafeAreaInsets();

  return (
    <BottomSheet visible={visible} onClose={onClose} showHandle={false}>
      <View style={styles.actionSheetContent}>
        {(title || message) && (
          <View style={styles.actionSheetHeader}>
            {title && <Text style={styles.actionSheetTitle}>{title}</Text>}
            {message && <Text style={styles.actionSheetMessage}>{message}</Text>}
          </View>
        )}
        
        <View style={styles.optionsContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                index < options.length - 1 && styles.optionBorder,
              ]}
              onPress={() => {
                option.onPress();
                onClose();
              }}
            >
              <Text
                style={[
                  styles.optionText,
                  option.destructive && styles.destructiveText,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={onClose}
        >
          <Text style={styles.cancelText}>{cancelLabel}</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: COLORS.gray300,
    borderRadius: 2,
  },
  header: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.black,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
  },
  actionSheetContent: {
    paddingHorizontal: 0,
  },
  actionSheetHeader: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
    alignItems: 'center',
  },
  actionSheetTitle: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.gray500,
    marginBottom: SPACING.xs,
  },
  actionSheetMessage: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
    textAlign: 'center',
  },
  optionsContainer: {
    backgroundColor: COLORS.gray100,
    borderRadius: BORDER_RADIUS.lg,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    overflow: 'hidden',
  },
  optionButton: {
    paddingVertical: SPACING.md,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  optionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  optionText: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.black,
  },
  destructiveText: {
    color: COLORS.gray800,
    fontWeight: FONT_WEIGHT.semibold,
  },
  cancelButton: {
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.md,
    marginHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.black,
  },
});
