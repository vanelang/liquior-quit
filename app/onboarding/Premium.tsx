import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../theme/colors";
import { fonts } from "../theme/fonts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

type BenefitProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  description: string;
};

const Benefit = ({ icon, title, description }: BenefitProps) => (
  <View style={styles.benefitCard}>
    <MaterialCommunityIcons name={icon} size={24} color={colors.success} />
    <View style={styles.benefitContent}>
      <Text style={styles.benefitTitle}>{title}</Text>
      <Text style={styles.benefitDescription}>{description}</Text>
    </View>
  </View>
);

export default function Premium() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Unlock Premium Recovery</Text>
        <Text style={styles.subtitle}>
          Get access to powerful tools that will help you stay on track
        </Text>

        <View style={styles.benefitsContainer}>
          <Benefit
            icon="notebook-edit"
            title="Journal Your Journey"
            description="Add personal notes to your daily check-ins (250 characters)."
          />

          <Benefit
            icon="chart-bar"
            title="Detailed Insights"
            description="See patterns in your triggers and progress over time."
          />

          <Benefit
            icon="account-group"
            title="Community Access"
            description="Connect and share experiences with others in recovery."
          />

          <Benefit
            icon="bell-ring"
            title="Custom Reminders"
            description="Set personalized check-in times that work for you."
          />

          <Benefit
            icon="wallet-plus"
            title="Money Saved Insights"
            description="Track your financial progress with detailed breakdowns."
          />

          <Benefit
            icon="cloud-upload"
            title="Cloud Backup"
            description="Keep your progress safe with automatic backups."
          />
        </View>

        <TouchableOpacity
          style={styles.compareButton}
          onPress={() => router.push("/onboarding/PremiumComparison")}
        >
          <Text style={styles.compareButtonText}>Compare Free vs Premium</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color={colors.text.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => router.push("/onboarding/PremiumComparison")}
        >
          <Text style={styles.skipButtonText}>Continue with limited version</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.bold,
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.text.secondary,
    marginBottom: 32,
  },
  benefitsContainer: {
    gap: 16,
    marginBottom: 32,
  },
  benefitCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    gap: 16,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.text.primary,
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.text.secondary,
  },
  compareButton: {
    backgroundColor: colors.accent,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 12,
  },
  compareButtonText: {
    color: colors.text.primary,
    fontSize: 16,
    fontFamily: fonts.bold,
    textAlign: "center",
  },
  skipButton: {
    paddingVertical: 16,
  },
  skipButtonText: {
    color: colors.text.secondary,
    fontSize: 15,
    fontFamily: fonts.regular,
    textAlign: "center",
  },
});
