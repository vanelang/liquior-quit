import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../theme/colors";
import { fonts } from "../theme/fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Question = {
  id: number;
  text: string;
  options: string[];
  scores: number[];
};

const questions: Question[] = [
  {
    id: 1,
    text: "When did you start drinking regularly?",
    options: ["Less than a year ago", "1-3 years ago", "3-5 years ago", "More than 5 years ago"],
    scores: [1, 2, 3, 4],
  },
  {
    id: 2,
    text: "How often do you drink alcohol?",
    options: ["Once or twice a month", "1-2 times a week", "3-4 times a week", "Almost every day"],
    scores: [1, 2, 3, 4],
  },
  {
    id: 3,
    text: "What triggers your urge to drink?",
    options: ["Social events only", "When stressed", "When bored/lonely", "Multiple situations"],
    scores: [1, 2, 3, 4],
  },
  {
    id: 4,
    text: "Have you tried to quit or reduce drinking before?",
    options: ["Never tried", "Once", "2-3 times", "Multiple times"],
    scores: [1, 2, 3, 4],
  },
  {
    id: 5,
    text: "How much do you typically drink in one session?",
    options: ["1-2 drinks", "3-4 drinks", "5-6 drinks", "More than 6 drinks"],
    scores: [1, 2, 3, 4],
  },
];

export default function Assessment() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAnswer = async (score: number, index: number) => {
    if (isProcessing) return;

    setIsProcessing(true);
    setSelectedOption(index);

    // Wait for 500ms to show the selection before moving to next question
    setTimeout(async () => {
      const newAnswers = [...answers, score];
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        // Calculate addiction level
        const totalScore = newAnswers.reduce((a, b) => a + b, 0);
        const maxScore = questions.length * 4;
        const percentage = Math.round((totalScore / maxScore) * 100);

        try {
          await AsyncStorage.setItem("addictionLevel", percentage.toString());
          router.push("/onboarding/AssessmentResult");
        } catch (error) {
          console.error("Error saving assessment:", error);
        }
      }
      setIsProcessing(false);
    }, 500); // Increased delay to 500ms for better visibility
  };

  const question = questions[currentQuestion];

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${((currentQuestion + 1) / questions.length) * 100}%` },
          ]}
        />
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionNumber}>
          Question {currentQuestion + 1} of {questions.length}
        </Text>
        <Text style={styles.questionText}>{question.text}</Text>
      </View>

      <ScrollView style={styles.optionsContainer} showsVerticalScrollIndicator={false}>
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.optionButton, selectedOption === index && styles.optionButtonSelected]}
            onPress={() => handleAnswer(question.scores[index], index)}
            disabled={isProcessing}
          >
            <Text
              style={[styles.optionText, selectedOption === index && styles.optionTextSelected]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.card,
    width: "100%",
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.accent,
    borderRadius: 2,
  },
  questionContainer: {
    padding: 20,
    paddingTop: 40,
  },
  questionNumber: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  questionText: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.text.primary,
    lineHeight: 32,
  },
  optionsContainer: {
    flex: 1,
    padding: 20,
  },
  optionButton: {
    backgroundColor: colors.card,
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionButtonSelected: {
    borderColor: colors.accent,
    borderWidth: 2,
    backgroundColor: colors.card,
  },
  optionText: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.text.primary,
    textAlign: "left",
  },
  optionTextSelected: {
    color: colors.accent,
    fontFamily: fonts.bold,
  },
});
