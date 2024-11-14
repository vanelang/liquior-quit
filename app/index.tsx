import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "./theme/colors";
import { StatusBar } from "expo-status-bar";
import { fonts } from "./theme/fonts";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Index() {
  const router = useRouter();
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  useEffect(() => {
    if (isFirstLaunch === true) {
      router.replace("/onboarding/Welcome");
    }
  }, [isFirstLaunch, router]);

  const checkFirstLaunch = async () => {
    try {
      const hasOnboarded = await AsyncStorage.getItem("hasOnboarded");
      setIsFirstLaunch(hasOnboarded !== "true");
    } catch (error) {
      console.error("Error checking onboarding status:", error);
      setIsFirstLaunch(true);
    }
  };

  if (isFirstLaunch === null) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isFirstLaunch === true) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Timer Section */}
      <View style={styles.timerSection}>
        <Text style={styles.timerLabel}>LIVE TIMER</Text>
        <View style={styles.timerGrid}>
          <View style={styles.timerItem}>
            <Text style={styles.timerValue}>0</Text>
            <Text style={styles.timerUnit}>year</Text>
          </View>
          <View style={styles.timerItem}>
            <Text style={styles.timerValue}>0</Text>
            <Text style={styles.timerUnit}>month</Text>
          </View>
          <View style={styles.timerItem}>
            <Text style={styles.timerValue}>0</Text>
            <Text style={styles.timerUnit}>day</Text>
          </View>
        </View>
        <View style={styles.timerGrid}>
          <View style={styles.timerItem}>
            <Text style={styles.timerValue}>0</Text>
            <Text style={styles.timerUnit}>hour</Text>
          </View>
          <View style={styles.timerItem}>
            <Text style={styles.timerValue}>8</Text>
            <Text style={styles.timerUnit}>minute</Text>
          </View>
          <View style={styles.timerItem}>
            <Text style={styles.timerValue}>40</Text>
            <Text style={styles.timerUnit}>second</Text>
          </View>
        </View>
      </View>

      {/* Progress Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>PROGRESS</Text>
          <TouchableOpacity>
            <Text style={styles.sectionAction}>SET GOAL →</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "6.67%" }]} />
        </View>
        <Text style={styles.progressText}>Try to reach your 2-hour goal.</Text>
      </View>

      {/* Shortcuts Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SHORTCUTS</Text>
        <View style={styles.shortcutGrid}>
          <TouchableOpacity style={styles.shortcutItem}>
            <MaterialCommunityIcons name="clock-outline" size={20} color={colors.success} />
            <View>
              <Text style={styles.shortcutLabel}>SAVED TIME</Text>
              <Text style={styles.shortcutValue}>0 hours</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shortcutItem}>
            <MaterialCommunityIcons name="lightning-bolt" size={20} color={colors.accent} />
            <View>
              <Text style={styles.shortcutLabel}>STREAK</Text>
              <Text style={styles.shortcutValue}>8 minutes</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.shortcutItem}>
          <MaterialCommunityIcons name="alert-circle" size={20} color={colors.error} />
          <View style={styles.relapseContainer}>
            <Text style={styles.shortcutLabel}>Relapse</Text>
            <Text style={styles.relapseText}>I've relapsed.</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.panicButton}>
          <MaterialCommunityIcons name="alert" size={20} color={colors.error} />
          <Text style={styles.panicButtonText}>Panic Button</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 50,
  },
  timerSection: {
    padding: 20,
    gap: 16,
  },
  timerLabel: {
    fontSize: 13,
    fontFamily: fonts.bold,
    color: colors.text.secondary,
    opacity: 0.7,
  },
  timerGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  timerItem: {
    flex: 1,
    backgroundColor: colors.card,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  timerValue: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.text.primary,
  },
  timerUnit: {
    fontSize: 13,
    fontFamily: fonts.regular,
    color: colors.text.secondary,
    marginTop: 4,
  },
  section: {
    padding: 20,
    gap: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: fonts.bold,
    color: colors.text.secondary,
    opacity: 0.7,
  },
  sectionAction: {
    fontSize: 13,
    fontFamily: fonts.bold,
    color: colors.accent,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.card,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.success,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 13,
    fontFamily: fonts.regular,
    color: colors.text.secondary,
  },
  shortcutGrid: {
    flexDirection: "row",
    gap: 12,
  },
  shortcutItem: {
    flex: 1,
    flexDirection: "row",
    gap: 12,
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  shortcutLabel: {
    fontSize: 12,
    fontFamily: fonts.bold,
    color: colors.text.secondary,
    opacity: 0.7,
  },
  shortcutValue: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.text.primary,
  },
  relapseContainer: {
    flex: 1,
  },
  relapseText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.text.primary,
  },
  panicButton: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  panicButtonText: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: colors.error,
  },
});
