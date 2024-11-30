import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../theme/_colors";
import { fonts } from "../theme/_fonts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default function Welcome() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Your Path to{"\n"}Freedom</Text>
          <Text style={styles.subtitle}>
            You've already taken the first brave step. We're here to support you on your journey to
            a healthier, alcohol-free life.
          </Text>
        </View>

        <View style={styles.benefitsContainer}>
          <View style={styles.benefitItem}>
            <MaterialCommunityIcons
              name="shield-check"
              size={22}
              color={colors.success}
              style={styles.icon}
            />
            <Text style={styles.benefitText}>Private & Anonymous</Text>
          </View>

          <View style={styles.benefitItem}>
            <MaterialCommunityIcons
              name="heart"
              size={22}
              color={colors.success}
              style={styles.icon}
            />
            <Text style={styles.benefitText}>24/7 Support System</Text>
          </View>

          <View style={styles.benefitItem}>
            <MaterialCommunityIcons
              name="chart-line"
              size={22}
              color={colors.success}
              style={styles.icon}
            />
            <Text style={styles.benefitText}>Track Your Progress</Text>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.supportText}>"Every journey begins with a single step"</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/onboarding/Motivation")}
          >
            <Text style={styles.buttonText}>Start Recovery Journey</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.select({
      ios: 40,
      android: 60, // Increased top padding for Android
    }),
  },
  headerContainer: {
    marginBottom: Platform.select({
      ios: 40,
      android: 48, // Increased margin for Android
    }),
  },
  title: {
    fontSize: Platform.select({
      ios: 36,
      android: 34, // Slightly smaller on Android for better rendering
    }),
    fontFamily: fonts.bold,
    color: colors.text.primary,
    marginBottom: Platform.select({
      ios: 16,
      android: 20,
    }),
    lineHeight: Platform.select({
      ios: 44,
      android: 42,
    }),
  },
  subtitle: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.text.secondary,
    lineHeight: Platform.select({
      ios: 22,
      android: 24, // Increased line height for Android
    }),
    opacity: 0.8,
  },
  benefitsContainer: {
    gap: Platform.select({
      ios: 12,
      android: 16, // Increased gap for Android
    }),
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    paddingVertical: Platform.select({
      ios: 14,
      android: 16,
    }),
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  icon: {
    marginRight: 12,
  },
  benefitText: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.text.primary,
  },
  bottomContainer: {
    position: "absolute",
    bottom: Platform.select({
      ios: 34,
      android: 40, // Increased bottom padding for Android
    }),
    left: 20,
    right: 20,
    gap: Platform.select({
      ios: 16,
      android: 20,
    }),
  },
  supportText: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.text.secondary,
    textAlign: "center",
    opacity: 0.7,
  },
  button: {
    backgroundColor: colors.accent,
    paddingVertical: Platform.select({
      ios: 16,
      android: 18, // Increased padding for Android
    }),
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: colors.text.primary,
    fontSize: Platform.select({
      ios: 16,
      android: 16,
    }),
    fontFamily: fonts.bold,
  },
});
