import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '../navigation/types';
import { 
  Screen,
  Title,
  Subtitle,
  Paragraph,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Badge,
  Spacer,
  Row
} from '../components';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '../utils/theme';

// Mock data for posts
const MOCK_POSTS = [
  {
    id: '1',
    user: {
      name: 'Sarah Johnson',
      avatar: null,
    },
    type: 'exercise',
    exercise: {
      name: 'Gratitude Journaling',
      domain: 'Kindness',
      duration: '5 min',
    },
    content: 'Just completed my morning gratitude practice. Feeling so much more centered and appreciative of the small things today! 🙏',
    image: null,
    likes: 24,
    comments: 5,
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    user: {
      name: 'Michael Chen',
      avatar: null,
    },
    type: 'insight',
    content: 'Week 3 of consistent meditation practice. The difference in my focus and emotional regulation is incredible. Started with just 5 minutes, now doing 20!',
    likes: 42,
    comments: 8,
    timestamp: '4 hours ago',
  },
  {
    id: '3',
    user: {
      name: 'Emma Davis',
      avatar: null,
    },
    type: 'education',
    title: 'Did you know?',
    content: 'Research shows that practicing gratitude for just 5 minutes a day can increase happiness levels by 25% over 10 weeks.',
    likes: 67,
    comments: 12,
    timestamp: '6 hours ago',
  },
  {
    id: '4',
    user: {
      name: 'Alex Thompson',
      avatar: null,
    },
    type: 'exercise',
    exercise: {
      name: 'Random Act of Kindness',
      domain: 'Kindness',
      duration: '10 min',
    },
    content: 'Bought coffee for the person behind me in line today. Their smile made my whole day! Small acts really do make a difference.',
    likes: 89,
    comments: 15,
    timestamp: '8 hours ago',
  },
];

export default function HomeScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState(MOCK_POSTS);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate fetching new posts
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handlePostPress = (postId: string) => {
    navigation.navigate('PostDetail', { postId });
  };

  const renderPost = (post: typeof MOCK_POSTS[0]) => {
    return (
      <TouchableOpacity 
        key={post.id}
        onPress={() => handlePostPress(post.id)}
        activeOpacity={0.9}
      >
        <Card variant="flat" style={styles.postCard}>
          <CardContent>
            {/* User Header */}
            <Row gap={SPACING.sm} style={styles.postHeader}>
              <Avatar name={post.user.name} size="md" />
              <View style={styles.headerInfo}>
                <Paragraph style={styles.userName}>{post.user.name}</Paragraph>
                <Paragraph style={styles.timestamp}>{post.timestamp}</Paragraph>
              </View>
            </Row>

            {/* Exercise Badge if applicable */}
            {post.type === 'exercise' && post.exercise && (
              <View style={styles.exerciseContainer}>
                <Badge label={post.exercise.domain} variant="outline" />
                <Spacer size={SPACING.xs} />
                <Subtitle style={styles.exerciseName}>{post.exercise.name}</Subtitle>
                <Paragraph style={styles.exerciseDuration}>{post.exercise.duration}</Paragraph>
              </View>
            )}

            {/* Education Title if applicable */}
            {post.type === 'education' && post.title && (
              <View style={styles.educationHeader}>
                <Badge label="Education" variant="filled" />
                <Spacer size={SPACING.sm} />
                <Subtitle style={styles.educationTitle}>{post.title}</Subtitle>
              </View>
            )}

            {/* Post Content */}
            <Paragraph style={styles.postContent}>{post.content}</Paragraph>

            {/* Engagement Stats */}
            <View style={styles.engagementContainer}>
              <Row gap={SPACING.lg}>
                <TouchableOpacity style={styles.engagementButton}>
                  <Paragraph style={styles.engagementIcon}>♡</Paragraph>
                  <Paragraph style={styles.engagementCount}>{post.likes}</Paragraph>
                </TouchableOpacity>
                <TouchableOpacity style={styles.engagementButton}>
                  <Paragraph style={styles.engagementIcon}>💬</Paragraph>
                  <Paragraph style={styles.engagementCount}>{post.comments}</Paragraph>
                </TouchableOpacity>
                <TouchableOpacity style={styles.engagementButton}>
                  <Paragraph style={styles.engagementIcon}>↗</Paragraph>
                  <Paragraph style={styles.engagementText}>Share</Paragraph>
                </TouchableOpacity>
              </Row>
            </View>
          </CardContent>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <Screen backgroundColor={COLORS.gray100}>
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* Feed */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={COLORS.black}
            />
          }
        >
          {/* Welcome Message */}
          <Card variant="elevated" style={styles.welcomeCard}>
            <CardContent>
              <Subtitle>Good morning! 🌅</Subtitle>
              <Spacer size={SPACING.xs} />
              <Paragraph style={styles.welcomeText}>
                You have 3 exercises scheduled for today. Ready to build your psychological fitness?
              </Paragraph>
            </CardContent>
          </Card>

          {/* Posts */}
          {posts.map(renderPost)}

          <Spacer size={SPACING.xxl} />
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: 60, // Account for status bar + some padding
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  headerTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
  },
  notificationButton: {
    padding: SPACING.xs,
  },
  notificationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIconText: {
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    // No additional padding needed, SafeAreaView handles it
  },
  welcomeCard: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  welcomeText: {
    color: COLORS.gray600,
    fontSize: FONT_SIZE.sm,
  },
  postCard: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  postHeader: {
    marginBottom: SPACING.md,
  },
  headerInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: '600',
    fontSize: FONT_SIZE.md,
    color: COLORS.black,
  },
  timestamp: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
    marginTop: 2,
  },
  exerciseContainer: {
    marginBottom: SPACING.md,
  },
  exerciseName: {
    fontSize: FONT_SIZE.md,
    color: COLORS.black,
    marginTop: SPACING.xs,
  },
  exerciseDuration: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
    marginTop: 2,
  },
  educationHeader: {
    marginBottom: SPACING.md,
  },
  educationTitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.black,
  },
  postContent: {
    fontSize: FONT_SIZE.md,
    lineHeight: 22,
    color: COLORS.gray700,
    marginBottom: SPACING.md,
  },
  engagementContainer: {
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  engagementButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  engagementIcon: {
    fontSize: 16,
  },
  engagementCount: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray600,
  },
  engagementText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray600,
  },
});