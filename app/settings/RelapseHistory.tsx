import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { colors } from "../theme/colors";
import { fonts } from "../theme/fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type RelapseRecord = {
  date: string;
  timestamp: number;
};

export default function RelapseHistory() {
  const [relapses, setRelapses] = useState<RelapseRecord[]>([]);

  useEffect(() => {
    loadRelapseHistory();
  }, []);

  const loadRelapseHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("relapseHistory");
      if (history) {
        const parsedHistory = JSON.parse(history);
        // Sort by most recent first
        parsedHistory.sort((a: RelapseRecord, b: RelapseRecord) => b.timestamp - a.timestamp);
        setRelapses(parsedHistory);
      }
    } catch (error) {
      console.error("Error loading relapse history:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStreakBetweenRelapses = (currentIndex: number) => {
    if (currentIndex === relapses.length - 1) {
      return "First record";
    }

    const currentRelapse = new Date(relapses[currentIndex].date);
    const previousRelapse = new Date(relapses[currentIndex + 1].date);
    const diffTime = Math.abs(currentRelapse.getTime() - previousRelapse.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return `${diffDays} day${diffDays !== 1 ? "s" : ""} streak`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Relapse History</Text>
        <Text style={styles.subtitle}>
          Track your journey and learn from past experiences. Each setback is a step toward lasting
          recovery.
        </Text>
      </View>

      {relapses.length === 0 ? (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons name="history" size={48} color={colors.text.secondary} />
          <Text style={styles.emptyStateText}>No relapse history yet</Text>
          <Text style={styles.emptyStateSubtext}>
            Stay strong! Your recovery journey is just beginning.
          </Text>
        </View>
      ) : (
        <View style={styles.timelineContainer}>
          {relapses.map((relapse, index) => (
            <View key={relapse.timestamp} style={styles.timelineItem}>
              <View style={styles.timelineLine} />
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineDate}>{formatDate(relapse.date)}</Text>
                <Text style={styles.timelineStreak}>{getStreakBetweenRelapses(index)}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    paddingBottom: 0,
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
    lineHeight: 22,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    gap: 12,
  },
  emptyStateText: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.text.primary,
  },
  emptyStateSubtext: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.text.secondary,
    textAlign: "center",
  },
  timelineContainer: {
    padding: 20,
  },
  timelineItem: {
    flexDirection: "row",
    minHeight: 80,
    position: "relative",
  },
  timelineLine: {
    position: "absolute",
    left: 4,
    top: 24,
    bottom: 0,
    width: 2,
    backgroundColor: colors.border,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.error,
    marginTop: 6,
  },
  timelineContent: {
    flex: 1,
    marginLeft: 20,
    marginBottom: 20,
  },
  timelineDate: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.text.primary,
    marginBottom: 4,
  },
  timelineStreak: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.text.secondary,
  },
});
