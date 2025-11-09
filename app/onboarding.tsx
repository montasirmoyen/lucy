import { Colors } from '@/constants/theme';
import { saveOnboardingAnswers, setOnboardingComplete } from '@/utils/storage';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

interface Question {
  id: string;
  question: string;
  description?: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 'lucidDreamBefore',
    question: 'Have you had a lucid dream before?',
    description: 'Lucid dreaming is when you are aware that you are dreaming, which allows you to control your dreams',
    options: ['Yes', 'No', 'Not sure'],
  },
  {
    id: 'dreamGoals',
    question: 'What do you want to do in your dreams?',
    options: ['Fly', 'Fulfill desires', 'Visit a person or place', 'Seek guidance', 'Meditate'],
  },
  {
    id: 'dreamJournalBefore',
    question: 'Have you had a dream journal before?',
    description: 'Writing down what you dreamt of makes lucid dreaming easier',
    options: ['Yes', 'No'],
  },
  {
    id: 'dreamRecall',
    question: 'How often do you remember what you dreamt of?',
    options: ['Every night', 'Every week', 'Monthly', 'Few times a year', 'Almost never'],
  },
  {
    id: 'dreamType',
    question: 'What are your usual dreams like?',
    options: ['Normal', 'Uncomfortable', 'Engaging/meaningful', 'Bizarre/wild', 'Joyful/blissful'],
  },
  {
    id: 'sleepHours',
    question: 'How many hours of sleep do you get each night?',
    options: ['Less than 6', '6-7', '7-8', '8-9', '9 or more'],
  },
  {
    id: 'alarmFrequency',
    question: 'How often do you wake up with an alarm?',
    options: ['Every day', 'Often', 'Occasionally', 'Rarely', 'Never'],
  },
  {
    id: 'dedicationTime',
    question: 'How much time can you dedicate to lucid dreaming each day?',
    options: ['5 minutes or less', '10 mins', '20 mins', '30 mins', '1 hour or more'],
  },
  {
    id: 'dreamReminders',
    question: 'Do you want am-i-dreaming reminders?',
    description: 'Asking yourself if you are dreaming helps you lucid dream',
    options: ['Yes', 'No'],
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = questions[currentQuestionIndex];
  const progress = (currentQuestionIndex + 1) / questions.length;

  const handleAnswer = async (answer: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(newAnswers);

    if (currentQuestionIndex === questions.length - 1) {
      if (answer === 'Yes' && currentQuestion.id === 'dreamReminders') {
        try {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;

          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }

          if (finalStatus !== 'granted') {
            Alert.alert('Permission Required', 'Please enable notifications in your device settings to receive reminders.');
          }
        } catch (error) {
          console.error('Error requesting notification permission:', error);
        }
      }

      await saveOnboardingAnswers(newAnswers);
      await setOnboardingComplete();
      router.replace('/(tabs)/methods');
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {currentQuestionIndex + 1} of {questions.length}
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          {currentQuestion.description && (
            <Text style={styles.descriptionText}>{currentQuestion.description}</Text>
          )}

          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleAnswer(option)}
                activeOpacity={0.7}>
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.dark.tint,
    borderRadius: 2,
  },
  progressText: {
    color: Colors.dark.subtext,
    fontSize: 14,
    textAlign: 'right',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  questionContainer: {
    flex: 1,
  },
  questionText: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 16,
    lineHeight: 36,
  },
  descriptionText: {
    fontSize: 16,
    color: Colors.dark.subtext,
    marginBottom: 32,
    lineHeight: 24,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#1a1a1a',
    padding: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  optionText: {
    fontSize: 16,
    color: Colors.dark.text,
    textAlign: 'center',
  },
});

