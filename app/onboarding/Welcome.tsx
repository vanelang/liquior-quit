import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../theme/colors";
import { fonts } from "../theme/fonts";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
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
    </View>
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
    paddingTop: 50,
  },
  headerContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontFamily: fonts.bold,
    color: colors.text.primary,
    marginBottom: 16,
    lineHeight: 44,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.text.secondary,
    lineHeight: 22,
    opacity: 0.8,
  },
  benefitsContainer: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    paddingVertical: 14,
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
    bottom: 34,
    left: 20,
    right: 20,
    gap: 16,
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
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: colors.text.primary,
    fontSize: 16,
    fontFamily: fonts.bold,
  },
});
