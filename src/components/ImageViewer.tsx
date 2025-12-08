import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  FlatList,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, SPACING, BORDER_RADIUS } from '../utils/theme';

interface ImageViewerProps {
  source: ImageSourcePropType | string;
  style?: ViewStyle;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
  enableFullScreen?: boolean;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
  source,
  style,
  resizeMode = 'cover',
  enableFullScreen = true,
}) => {
  const [fullScreenVisible, setFullScreenVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const imageSource = typeof source === 'string' ? { uri: source } : source;

  return (
    <>
      <TouchableOpacity
        activeOpacity={enableFullScreen ? 0.9 : 1}
        onPress={() => enableFullScreen && setFullScreenVisible(true)}
        disabled={!enableFullScreen}
      >
        <Image source={imageSource} style={[styles.image, style]} resizeMode={resizeMode} />
      </TouchableOpacity>

      {enableFullScreen && (
        <Modal visible={fullScreenVisible} transparent animationType="fade">
          <View style={[styles.fullScreenContainer, { paddingTop: insets.top }]}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setFullScreenVisible(false)}
            >
              <View style={styles.closeIcon}>
                <View style={[styles.closeLine, styles.closeLineLeft]} />
                <View style={[styles.closeLine, styles.closeLineRight]} />
              </View>
            </TouchableOpacity>
            <Image
              source={imageSource}
              style={styles.fullScreenImage}
              resizeMode="contain"
            />
          </View>
        </Modal>
      )}
    </>
  );
};

interface ImageGalleryProps {
  images: (ImageSourcePropType | string)[];
  columns?: number;
  spacing?: number;
  style?: ViewStyle;
  imageStyle?: ViewStyle;
  enableFullScreen?: boolean;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  columns = 3,
  spacing = SPACING.xs,
  style,
  imageStyle,
  enableFullScreen = true,
}) => {
  const [fullScreenVisible, setFullScreenVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const insets = useSafeAreaInsets();
  const { width } = Dimensions.get('window');

  const imageSize = (width - SPACING.md * 2 - spacing * (columns - 1)) / columns;

  const openFullScreen = (index: number) => {
    setSelectedIndex(index);
    setFullScreenVisible(true);
  };

  const renderGalleryItem = ({ item, index }: { item: ImageSourcePropType | string; index: number }) => {
    const imageSource = typeof item === 'string' ? { uri: item } : item;
    const isLastInRow = (index + 1) % columns !== 0;

    return (
      <TouchableOpacity
        activeOpacity={enableFullScreen ? 0.9 : 1}
        onPress={() => enableFullScreen && openFullScreen(index)}
        disabled={!enableFullScreen}
        style={{ marginRight: isLastInRow ? spacing : 0, marginBottom: spacing }}
      >
        <Image
          source={imageSource}
          style={[{ width: imageSize, height: imageSize, borderRadius: BORDER_RADIUS.md }, imageStyle]}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  const renderFullScreenItem = ({ item }: { item: ImageSourcePropType | string }) => {
    const imageSource = typeof item === 'string' ? { uri: item } : item;
    return (
      <View style={{ width, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={imageSource} style={styles.fullScreenImage} resizeMode="contain" />
      </View>
    );
  };

  return (
    <>
      <FlatList
        data={images}
        renderItem={renderGalleryItem}
        keyExtractor={(_, index) => index.toString()}
        numColumns={columns}
        scrollEnabled={false}
        style={style}
      />

      {enableFullScreen && (
        <Modal visible={fullScreenVisible} transparent animationType="fade">
          <View style={[styles.fullScreenContainer, { paddingTop: insets.top }]}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setFullScreenVisible(false)}
            >
              <View style={styles.closeIcon}>
                <View style={[styles.closeLine, styles.closeLineLeft]} />
                <View style={[styles.closeLine, styles.closeLineRight]} />
              </View>
            </TouchableOpacity>
            <FlatList
              data={images}
              renderItem={renderFullScreenItem}
              keyExtractor={(_, index) => index.toString()}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              initialScrollIndex={selectedIndex}
              getItemLayout={(_, index) => ({
                length: width,
                offset: width * index,
                index,
              })}
            />
          </View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.gray100,
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: SPACING.md,
    zIndex: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeLine: {
    position: 'absolute',
    width: 24,
    height: 2,
    backgroundColor: COLORS.white,
  },
  closeLineLeft: {
    transform: [{ rotate: '45deg' }],
  },
  closeLineRight: {
    transform: [{ rotate: '-45deg' }],
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
});
