import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../theme/colors";
import { fonts } from "../theme/fonts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

type GoalOption = {
  days: number;
  label: string;
  isPremium: boolean;
};

const goalOptions: GoalOption[] = [
  { days: 0.167, label: "4 hours", isPremium: false },
  { days: 0.333, label: "8 hours", isPremium: false },
  { days: 0.667, label: "16 hours", isPremium: false },
  { days: 1, label: "1 day", isPremium: false },
  { days: 2, label: "2 days", isPremium: false },
  { days: 3, label: "3 days", isPremium: false },
  { days: 5, label: "5 days", isPremium: false },
  { days: 7, label: "1 week", isPremium: false },
  { days: 10, label: "10 days", isPremium: false },
  { days: 14, label: "2 weeks", isPremium: false },
  { days: 21, label: "3 weeks", isPremium: true },
  { days: 30, label: "1 month", isPremium: true },
  { days: 60, label: "2 months", isPremium: true },
  { days: 90, label: "3 months", isPremium: true },
  { days: 180, label: "6 months", isPremium: true },
  { days: 365, label: "1 year", isPremium: true },
];

export default function SetTarget() {
  const router = useRouter();
  const [selectedDays, setSelectedDays] = useState<number | null>(null);
  const [currentTarget, setCurrentTarget] = useState<number | null>(null);

  useEffect(() => {
    const loadCurrentTarget = async () => {
      try {
        const target = await AsyncStorage.getItem("quitTarget");
        if (target) {
          const days = parseFloat(target);
          setCurrentTarget(days);
          setSelectedDays(days);
        }
      } catch (error) {
        console.error("Error loading target:", error);
      }
    };
    loadCurrentTarget();
  }, []);

  const handleGoalSelect = (goal: GoalOption) => {
    if (goal.isPremium) {
      Alert.alert(
        "Premium Feature",
        "Goals longer than 14 days are available in the premium version.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "View Premium",
            onPress: () => router.push("/onboarding/Premium"),
          },
        ]
      );
      return;
    }

    setSelectedDays(goal.days);
  };

  const handleConfirm = async () => {
    if (!selectedDays) return;

    try {
      await Promise.all([
        AsyncStorage.setItem("quitTarget", selectedDays.toString()),
        AsyncStorage.setItem("shouldReloadProgress", "true"),
      ]);
      router.back();
    } catch (error) {
      console.error("Error saving target:", error);
      Alert.alert("Error", "Could not save your goal. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Your Goal</Text>
      <Text style={styles.subtitle}>It is strongly recommended that you proceed step by step.</Text>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.goalsContainer}>
          {goalOptions.map((goal) => (
            <TouchableOpacity
              key={goal.days}
              style={[styles.goalOption, selectedDays === goal.days && styles.goalOptionSelected]}
              onPress={() => handleGoalSelect(goal)}
            >
              <View style={styles.goalContent}>
                <Text
                  style={[styles.goalText, selectedDays === goal.days && styles.goalTextSelected]}
                >
                  {goal.label}
                </Text>
              </View>
              <MaterialCommunityIcons
                name={
                  goal.isPremium ? "lock" : selectedDays === goal.days ? "check" : "circle-outline"
                }
                size={22}
                color={
                  goal.isPremium
                    ? colors.text.secondary
                    : selectedDays === goal.days
                    ? colors.accent
                    : colors.text.secondary
                }
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.confirmButton, !selectedDays && styles.confirmButtonDisabled]}
        onPress={handleConfirm}
        disabled={!selectedDays}
      >
        <Text style={styles.confirmButtonText}>
          {currentTarget ? "Update Goal" : "Confirm Goal"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.text.secondary,
    marginBottom: 24,
    opacity: 0.8,
  },
  scrollView: {
    flex: 1,
  },
  goalsContainer: {
    gap: 12,
    paddingBottom: 20,
  },
  goalOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  goalOptionSelected: {
    borderColor: colors.accent,
    borderWidth: 2,
  },
  goalContent: {
    flex: 1,
  },
  goalText: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.text.primary,
  },
  goalTextSelected: {
    color: colors.accent,
    fontFamily: fonts.bold,
  },
  confirmButton: {
    backgroundColor: colors.accent,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  confirmButtonDisabled: {
    opacity: 0.5,
  },
  confirmButtonText: {
    color: colors.text.primary,
    fontSize: 16,
    fontFamily: fonts.bold,
  },
});
