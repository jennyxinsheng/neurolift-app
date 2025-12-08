import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { PostDetailRouteProp } from '../navigation/types';
import {
  Screen,
  Title,
  Paragraph,
  Card,
  CardContent,
  Avatar,
  Row,
  Spacer,
} from '../components';
import { COLORS, SPACING, FONT_SIZE } from '../utils/theme';

export default function PostDetailScreen() {
  const route = useRoute<PostDetailRouteProp>();
  const { postId } = route.params;

  return (
    <Screen backgroundColor={COLORS.white}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            <Row gap={SPACING.sm} style={styles.header}>
              <Avatar name="Sarah Johnson" size="md" />
              <View>
                <Paragraph style={styles.userName}>Sarah Johnson</Paragraph>
                <Paragraph style={styles.timestamp}>2 hours ago</Paragraph>
              </View>
            </Row>
            
            <Spacer size={SPACING.lg} />
            
            <Title style={styles.title}>Gratitude Practice Complete!</Title>
            <Paragraph style={styles.postContent}>
              Just completed my morning gratitude practice. Feeling so much more centered and appreciative of the small things today! 🙏
            </Paragraph>
            
            <Spacer size={SPACING.lg} />
            
            <Card variant="flat">
              <CardContent>
                <Paragraph style={styles.commentTitle}>Comments</Paragraph>
                <Spacer size={SPACING.sm} />
                <Paragraph style={styles.comment}>Great job! Keep it up!</Paragraph>
              </CardContent>
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SPACING.lg,
  },
  header: {
    alignItems: 'center',
  },
  userName: {
    fontWeight: '600',
    fontSize: FONT_SIZE.md,
  },
  timestamp: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    marginBottom: SPACING.sm,
  },
  postContent: {
    fontSize: FONT_SIZE.md,
    lineHeight: 22,
    color: COLORS.gray700,
  },
  commentTitle: {
    fontWeight: '600',
    fontSize: FONT_SIZE.md,
  },
  comment: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray600,
  },
});