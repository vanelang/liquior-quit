import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "./theme/colors";
import { StatusBar } from "expo-status-bar";
import { fonts } from "./theme/fonts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { calculateTimeDifference, calculateProgress, formatTimeValue } from "./utils/timeUtils";
import { useFocusEffect } from "@react-navigation/native";

export default function Index() {
  const router = useRouter();
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [targetDays, setTargetDays] = useState<number>(0);
  const [timePassed, setTimePassed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldReload, setShouldReload] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await checkFirstLaunch();
        if (!isFirstLaunch) {
          await loadUserData();
        }
      } catch (error) {
        console.error("Error initializing app:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, [shouldReload]);

  useFocusEffect(
    useCallback(() => {
      const checkForUpdates = async () => {
        const shouldReloadProgress = await AsyncStorage.getItem("shouldReloadProgress");
        if (shouldReloadProgress === "true") {
          setShouldReload((prev) => !prev);
          await AsyncStorage.removeItem("shouldReloadProgress");
        }
      };

      checkForUpdates();
    }, [])
  );

  useEffect(() => {
    if (startDate) {
      const timer = setInterval(() => {
        const timeData = calculateTimeDifference(startDate);
        setTimePassed(timeData);
        if (targetDays > 0) {
          setProgress(calculateProgress(startDate, targetDays));
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [startDate, targetDays]);

  const loadUserData = async () => {
    try {
      const [storedStartDate, storedTarget] = await Promise.all([
        AsyncStorage.getItem("sobrietyStartDate"),
        AsyncStorage.getItem("quitTarget"),
      ]);

      if (storedStartDate) {
        setStartDate(new Date(storedStartDate));
      } else {
        const now = new Date();
        await AsyncStorage.setItem("sobrietyStartDate", now.toISOString());
        setStartDate(now);
      }

      if (storedTarget) {
        setTargetDays(parseFloat(storedTarget));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const checkFirstLaunch = async () => {
    try {
      const hasOnboarded = await AsyncStorage.getItem("hasOnboarded");
      setIsFirstLaunch(hasOnboarded !== "true");
    } catch (error) {
      console.error("Error checking onboarding status:", error);
      setIsFirstLaunch(true);
    }
  };

  const handleRelapse = async () => {
    try {
      const now = new Date();
      await AsyncStorage.setItem("sobrietyStartDate", now.toISOString());
      setStartDate(now);

      // Reset progress
      setTimePassed({
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
      setProgress(0);

      Alert.alert(
        "Streak Reset",
        "Don't give up! Every new start is a step forward. You can do this.",
        [{ text: "OK" }]
      );
    } catch (error) {
      console.error("Error handling relapse:", error);
      Alert.alert("Error", "Could not record relapse. Please try again.");
    }
  };

  // Helper function to format target display
  const formatTargetDisplay = (days: number) => {
    if (days < 1) {
      return `${Math.round(days * 24)}-hour`;
    }
    return `${days}-day`;
  };

  if (isLoading || isFirstLaunch === null) {
    return (
      <SafeAreaView style={[styles.container, styles.loadingContainer]}>
        <StatusBar style="light" />
        <MaterialCommunityIcons
          name="timer-sand"
          size={40}
          color={colors.accent}
          style={styles.loadingIcon}
        />
      </SafeAreaView>
    );
  }

  if (isFirstLaunch === true) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Top Stats Bar */}
      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <MaterialCommunityIcons name="leaf" size={16} color={colors.success} />
          <Text style={styles.statValue}>{progress.toFixed(0)}%</Text>
        </View>
        <View style={styles.statItem}>
          <MaterialCommunityIcons name="fire" size={16} color={colors.error} />
          <Text style={styles.statValue}>{timePassed.days}d</Text>
        </View>
        <View style={styles.statItem}>
          <MaterialCommunityIcons name="water" size={16} color={colors.accent} />
          <Text style={styles.statValue}>{(timePassed.days * 10).toFixed(0)}</Text>
        </View>
        <TouchableOpacity style={styles.statItem} onPress={() => router.push("/settings")}>
          <MaterialCommunityIcons name="cog" size={16} color={colors.text.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Timer Section */}
        <View style={styles.timerSection}>
          <Text style={styles.timerLabel}>LIVE TIMER</Text>
          <View style={styles.timerGrid}>
            <View style={styles.timerItem}>
              <Text style={styles.timerValue}>{timePassed.years}</Text>
              <Text style={styles.timerUnit}>year</Text>
            </View>
            <View style={styles.timerItem}>
              <Text style={styles.timerValue}>{timePassed.months}</Text>
              <Text style={styles.timerUnit}>month</Text>
            </View>
            <View style={styles.timerItem}>
              <Text style={styles.timerValue}>{timePassed.days}</Text>
              <Text style={styles.timerUnit}>day</Text>
            </View>
          </View>
          <View style={styles.timerGrid}>
            <View style={styles.timerItem}>
              <Text style={styles.timerValue}>{formatTimeValue(timePassed.hours)}</Text>
              <Text style={styles.timerUnit}>hour</Text>
            </View>
            <View style={styles.timerItem}>
              <Text style={styles.timerValue}>{formatTimeValue(timePassed.minutes)}</Text>
              <Text style={styles.timerUnit}>minute</Text>
            </View>
            <View style={styles.timerItem}>
              <Text style={styles.timerValue}>{formatTimeValue(timePassed.seconds)}</Text>
              <Text style={styles.timerUnit}>second</Text>
            </View>
          </View>
        </View>

        {/* Progress Section */}
        <View style={styles.section}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>
              Try to reach your {formatTargetDisplay(targetDays)} goal
            </Text>
            <Text style={styles.progressPercentage}>{progress.toFixed(0)}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <View style={styles.progressFooter}>
            <Text style={styles.progressMotivation}>
              {progress < 25
                ? "Every small step counts!"
                : progress < 50
                ? "You're building momentum!"
                : progress < 75
                ? "More than halfway there!"
                : progress < 100
                ? "The finish line is in sight!"
                : "You did it! Amazing work!"}
            </Text>
            <TouchableOpacity onPress={() => router.push("/settings/SetTarget")}>
              <Text style={styles.sectionAction}>SET GOAL →</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Shortcuts Section */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>SHORTCUTS</Text>
          <View style={styles.shortcutGrid}>
            <TouchableOpacity style={styles.shortcutItem}>
              <MaterialCommunityIcons name="wallet" size={20} color={colors.success} />
              <View>
                <Text style={styles.shortcutLabel}>SAVED MONEY</Text>
                <Text style={styles.shortcutValue}>${(timePassed.days * 15).toFixed(0)}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shortcutItem}>
              <MaterialCommunityIcons name="lightning-bolt" size={20} color={colors.accent} />
              <View>
                <Text style={styles.shortcutLabel}>STREAK</Text>
                <Text style={styles.shortcutValue}>{timePassed.days} days</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Relapse Button */}
          <TouchableOpacity
            style={styles.shortcutItem}
            onPress={() => {
              Alert.alert(
                "Record Relapse",
                "Are you sure you want to record a relapse? This will reset your streak timer.",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Yes, Reset",
                    onPress: handleRelapse,
                    style: "destructive",
                  },
                ]
              );
            }}
          >
            <MaterialCommunityIcons name="alert-circle" size={20} color={colors.error} />
            <View style={styles.relapseContainer}>
              <Text style={styles.shortcutLabel}>Relapse</Text>
              <Text style={styles.relapseText}>Record a relapse</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  timerSection: {
    padding: 20,
    paddingTop: 16,
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
    gap: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
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
    height: 12,
    backgroundColor: "#FFFFFF15",
    borderRadius: 6,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 6,
  },
  progressText: {
    fontSize: 13,
    fontFamily: fonts.regular,
    color: colors.text.secondary,
    marginTop: 8,
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
  lastSection: {
    paddingBottom: 34,
  },
  statsBar: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  statValue: {
    color: colors.text.primary,
    fontSize: 13,
    fontFamily: fonts.regular,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingIcon: {
    opacity: 0.8,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 13,
    fontFamily: fonts.regular,
    color: colors.text.secondary,
  },
  progressPercentage: {
    fontSize: 15,
    fontFamily: fonts.bold,
    color: colors.success,
  },
  progressFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  progressMotivation: {
    fontSize: 13,
    fontFamily: fonts.regular,
    color: colors.text.secondary,
    fontStyle: "italic",
  },
});
