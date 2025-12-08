import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE } from '../utils/theme';

interface VideoPlayerProps {
  source: string | { uri: string };
  poster?: string;
  style?: ViewStyle;
  autoPlay?: boolean;
  showControls?: boolean;
  resizeMode?: ResizeMode;
  onLoad?: () => void;
  onError?: (error: string) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  source,
  poster,
  style,
  autoPlay = false,
  showControls = true,
  resizeMode = ResizeMode.CONTAIN,
  onLoad,
  onError,
}) => {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isLoading, setIsLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [showOverlay, setShowOverlay] = useState(!autoPlay);

  const videoSource = typeof source === 'string' ? { uri: source } : source;

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setIsLoading(false);
      setDuration(status.durationMillis || 0);
      setPosition(status.positionMillis || 0);
      setIsPlaying(status.isPlaying);
      if (status.didJustFinish) {
        setShowOverlay(true);
      }
    }
  };

  const togglePlayPause = async () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      setShowOverlay(false);
      await videoRef.current.playAsync();
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = (error: string) => {
    setIsLoading(false);
    onError?.(error);
  };

  const progress = duration > 0 ? (position / duration) * 100 : 0;

  return (
    <View style={[styles.container, style]}>
      <Video
        ref={videoRef}
        source={videoSource}
        posterSource={poster ? { uri: poster } : undefined}
        usePoster={!!poster}
        posterStyle={styles.poster}
        style={styles.video}
        resizeMode={resizeMode}
        shouldPlay={autoPlay}
        isLooping={false}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        onLoad={handleLoad}
        onError={(e) => handleError(e || 'Unknown error')}
      />

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={COLORS.white} />
        </View>
      )}

      {showControls && (
        <TouchableOpacity
          style={styles.controlsOverlay}
          activeOpacity={1}
          onPress={togglePlayPause}
        >
          {(showOverlay || !isPlaying) && (
            <View style={styles.playButton}>
              {isPlaying ? (
                <View style={styles.pauseIcon}>
                  <View style={styles.pauseBar} />
                  <View style={styles.pauseBar} />
                </View>
              ) : (
                <View style={styles.playIcon} />
              )}
            </View>
          )}

          <View style={styles.timeBar}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.timeText}>
              {formatTime(position)} / {formatTime(duration)}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

interface VideoThumbnailProps {
  source: string;
  poster?: string;
  duration?: number;
  onPress?: () => void;
  style?: ViewStyle;
}

export const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  source,
  poster,
  duration,
  onPress,
  style,
}) => {
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <TouchableOpacity
      style={[styles.thumbnail, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.thumbnailImage}>
        {poster && (
          <Video
            source={{ uri: source }}
            posterSource={{ uri: poster }}
            usePoster
            style={styles.thumbnailVideo}
            resizeMode={ResizeMode.COVER}
            shouldPlay={false}
          />
        )}
      </View>
      <View style={styles.thumbnailPlayButton}>
        <View style={styles.thumbnailPlayIcon} />
      </View>
      {duration !== undefined && (
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{formatDuration(duration)}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: COLORS.black,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
  },
  video: {
    flex: 1,
  },
  poster: {
    flex: 1,
    resizeMode: 'cover',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  controlsOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    width: 0,
    height: 0,
    borderLeftWidth: 18,
    borderTopWidth: 12,
    borderBottomWidth: 12,
    borderLeftColor: COLORS.white,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    marginLeft: 4,
  },
  pauseIcon: {
    flexDirection: 'row',
    gap: 6,
  },
  pauseBar: {
    width: 6,
    height: 24,
    backgroundColor: COLORS.white,
    borderRadius: 2,
  },
  timeBar: {
    position: 'absolute',
    bottom: SPACING.sm,
    left: SPACING.sm,
    right: SPACING.sm,
  },
  progressBar: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 1.5,
    marginBottom: SPACING.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 1.5,
  },
  timeText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.white,
    textAlign: 'right',
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: COLORS.gray900,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  thumbnailImage: {
    flex: 1,
  },
  thumbnailVideo: {
    flex: 1,
  },
  thumbnailPlayButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 48,
    height: 48,
    marginLeft: -24,
    marginTop: -24,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailPlayIcon: {
    width: 0,
    height: 0,
    borderLeftWidth: 14,
    borderTopWidth: 9,
    borderBottomWidth: 9,
    borderLeftColor: COLORS.white,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    marginLeft: 3,
  },
  durationBadge: {
    position: 'absolute',
    bottom: SPACING.sm,
    right: SPACING.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  durationText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.white,
  },
});
