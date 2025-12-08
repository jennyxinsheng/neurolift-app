import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal as RNModal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewStyle,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS } from '../utils/theme';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'full';
  style?: ViewStyle;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  showCloseButton = true,
  size = 'md',
  style,
}) => {
  const { width, height } = Dimensions.get('window');
  const insets = useSafeAreaInsets();

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'sm':
        return { width: width * 0.8, maxHeight: height * 0.5 };
      case 'md':
        return { width: width * 0.9, maxHeight: height * 0.7 };
      case 'lg':
        return { width: width * 0.95, maxHeight: height * 0.85 };
      case 'full':
        return {
          width: width,
          height: height,
          borderRadius: 0,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        };
      default:
        return { width: width * 0.9, maxHeight: height * 0.7 };
    }
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={size !== 'full' ? onClose : undefined}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={[styles.container, getSizeStyle(), style]}>
              {(title || showCloseButton) && (
                <View style={styles.header}>
                  <Text style={styles.title}>{title || ''}</Text>
                  {showCloseButton && (
                    <TouchableOpacity
                      onPress={onClose}
                      style={styles.closeButton}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Text style={styles.closeText}>×</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              <View style={styles.content}>{children}</View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

interface AlertModalProps {
  visible: boolean;
  title: string;
  message: string;
  primaryAction: {
    label: string;
    onPress: () => void;
  };
  secondaryAction?: {
    label: string;
    onPress: () => void;
  };
}

export const AlertModal: React.FC<AlertModalProps> = ({
  visible,
  title,
  message,
  primaryAction,
  secondaryAction,
}) => {
  return (
    <RNModal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <Text style={styles.alertTitle}>{title}</Text>
          <Text style={styles.alertMessage}>{message}</Text>
          <View style={styles.alertActions}>
            {secondaryAction && (
              <TouchableOpacity
                style={[styles.alertButton, styles.secondaryButton]}
                onPress={secondaryAction.onPress}
              >
                <Text style={styles.secondaryButtonText}>
                  {secondaryAction.label}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[
                styles.alertButton,
                styles.primaryButton,
                !secondaryAction && { flex: 1 },
              ]}
              onPress={primaryAction.onPress}
            >
              <Text style={styles.primaryButtonText}>{primaryAction.label}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.black,
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 28,
    color: COLORS.gray500,
    lineHeight: 28,
  },
  content: {
    padding: SPACING.md,
  },
  alertContainer: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    width: '85%',
    maxWidth: 340,
  },
  alertTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  alertMessage: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray600,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    lineHeight: 22,
  },
  alertActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  alertButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: COLORS.black,
  },
  secondaryButton: {
    backgroundColor: COLORS.gray100,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
  },
  secondaryButtonText: {
    color: COLORS.black,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
  },
});
