import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { 
  Button, 
  Title, 
  Subtitle,
  Paragraph, 
  Spacer, 
  Screen, 
  ProgressSteps,
  Slider,
  Card,
  CardContent
} from '../../components';
import { COLORS, SPACING, FONT_SIZE } from '../../utils/theme';

const ASSESSMENT_DOMAINS = [
  {
    id: 'positive_emotion',
    title: 'Positive Emotion',
    description: 'How often do you experience joy, gratitude, and contentment?',
    questions: [
      'I frequently feel happy and content',
      'I find joy in everyday activities',
      'I feel grateful for what I have',
    ],
  },
  {
    id: 'engagement',
    title: 'Engagement',
    description: 'How absorbed and engaged are you in your daily activities?',
    questions: [
      'I lose track of time when doing things I enjoy',
      'I feel fully absorbed in my work or hobbies',
      'I am enthusiastic about my activities',
    ],
  },
  {
    id: 'relationships',
    title: 'Relationships',
    description: 'How satisfied are you with your personal relationships?',
    questions: [
      'I have satisfying relationships with others',
      'I feel loved and supported',
      'I actively maintain my relationships',
    ],
  },
  {
    id: 'meaning',
    title: 'Meaning',
    description: 'Do you feel your life has purpose and meaning?',
    questions: [
      'My life has a clear sense of purpose',
      'I make a difference in the world',
      'What I do matters to others',
    ],
  },
  {
    id: 'accomplishment',
    title: 'Accomplishment',
    description: 'How satisfied are you with your achievements?',
    questions: [
      'I accomplish the goals I set for myself',
      'I am proud of my achievements',
      'I persist even when things are difficult',
    ],
  },
];

export default function AssessmentScreen() {
  const navigation = useNavigation<any>();
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<{ [key: string]: number[] }>({});

  const currentDomain = ASSESSMENT_DOMAINS[currentStep];
  const isLastStep = currentStep === ASSESSMENT_DOMAINS.length - 1;

  const handleScoreChange = (questionIndex: number, value: number) => {
    setScores((prev) => ({
      ...prev,
      [currentDomain.id]: {
        ...(prev[currentDomain.id] || {}),
        [questionIndex]: value,
      },
    }));
  };

  const handleNext = () => {
    if (isLastStep) {
      // Save assessment scores and navigate to main app
      console.log('Assessment complete:', scores);
      // Update auth state to show main app
      // @ts-ignore
      if (global.setIsAuthenticated) {
        // @ts-ignore
        global.setIsAuthenticated(true);
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getCurrentScore = (questionIndex: number): number => {
    return scores[currentDomain.id]?.[questionIndex] || 50;
  };

  return (
    <Screen backgroundColor={COLORS.gray100}>
      <SafeAreaView style={styles.container}>
        <View style={styles.progressContainer}>
          <ProgressSteps
            steps={ASSESSMENT_DOMAINS.map(d => d.title)}
            currentStep={currentStep}
          />
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerContainer}>
            <Title style={styles.title}>{currentDomain.title}</Title>
            <Spacer size={SPACING.sm} />
            <Paragraph style={styles.description}>
              {currentDomain.description}
            </Paragraph>
          </View>

          <View style={styles.questionsContainer}>
            {currentDomain.questions.map((question, index) => (
              <Card key={index} variant="flat" style={styles.questionCard}>
                <CardContent>
                  <Paragraph style={styles.question}>{question}</Paragraph>
                  <Spacer size={SPACING.md} />
                  <Slider
                    value={getCurrentScore(index)}
                    onChange={(value) => handleScoreChange(index, value)}
                    min={0}
                    max={100}
                    label=""
                  />
                  <View style={styles.scaleLabels}>
                    <Paragraph style={styles.scaleLabel}>Strongly Disagree</Paragraph>
                    <Paragraph style={styles.scaleLabel}>Strongly Agree</Paragraph>
                  </View>
                </CardContent>
              </Card>
            ))}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.buttonContainer}>
            {currentStep > 0 && (
              <Button
                title="Back"
                onPress={handleBack}
                variant="outline"
                style={styles.backButton}
              />
            )}
            <Button
              title={isLastStep ? 'Complete' : 'Next'}
              onPress={handleNext}
              variant="primary"
              style={styles.nextButton}
            />
          </View>
        </View>
      </SafeAreaView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  headerContainer: {
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZE.xxl,
    color: COLORS.black,
  },
  description: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray600,
    lineHeight: 22,
  },
  questionsContainer: {
    gap: SPACING.md,
  },
  questionCard: {
    marginBottom: SPACING.md,
  },
  question: {
    fontSize: FONT_SIZE.md,
    color: COLORS.black,
    fontWeight: '500',
  },
  scaleLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.xs,
  },
  scaleLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  backButton: {
    flex: 1,
  },
  nextButton: {
    flex: 2,
  },
});