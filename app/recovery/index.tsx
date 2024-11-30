import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from "react-native";
import { colors } from "../theme/_colors";
import { fonts } from "../theme/_fonts";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type RecoveryToolProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  description: string;
  isPremium?: boolean;
  onPress: () => void;
};

const RecoveryTool = ({ icon, title, description, isPremium, onPress }: RecoveryToolProps) => (
  <TouchableOpacity style={styles.toolCard} onPress={onPress}>
    <View style={styles.toolHeader}>
      <MaterialCommunityIcons name={icon} size={24} color={colors.accent} />
      {isPremium && (
        <View style={styles.premiumBadge}>
          <Text style={styles.premiumText}>PLUS</Text>
        </View>
      )}
    </View>
    <Text style={styles.toolTitle}>{title}</Text>
    <Text style={styles.toolDescription}>{description}</Text>
  </TouchableOpacity>
);

export default function Recovery() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.subtitle}>
        Access tools and resources to support your recovery journey
      </Text>

      <View style={styles.toolsGrid}>
        <RecoveryTool
          icon="meditation"
          title="Mindfulness"
          description="Practice mindfulness exercises to manage cravings"
          isPremium
          onPress={() => {}}
        />
        <RecoveryTool
          icon="notebook"
          title="Journal"
          description="Write about your thoughts and feelings"
          isPremium
          onPress={() => {}}
        />
        <RecoveryTool
          icon="phone"
          title="Helpline"
          description="Connect with support services"
          onPress={() => {}}
        />
        <RecoveryTool
          icon="chart-line"
          title="Progress"
          description="Track your recovery milestones"
          onPress={() => {}}
        />
        <RecoveryTool
          icon="account-group"
          title="Community"
          description="Connect with others in recovery"
          isPremium
          onPress={() => {}}
        />
        <RecoveryTool
          icon="book-open-variant"
          title="Resources"
          description="Access recovery reading materials"
          onPress={() => {}}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.text.secondary,
    marginBottom: 24,
    lineHeight: 22,
  },
  toolsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  toolCard: {
    width: "48%",
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flex: 1,
    minHeight: 140,
  },
  toolHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  toolTitle: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.text.primary,
    marginBottom: 8,
  },
  toolDescription: {
    fontSize: 13,
    fontFamily: fonts.regular,
    color: colors.text.secondary,
    lineHeight: 18,
  },
  premiumBadge: {
    backgroundColor: colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  premiumText: {
    fontSize: 10,
    fontFamily: fonts.bold,
    color: colors.text.primary,
  },
});
