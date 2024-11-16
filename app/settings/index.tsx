import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../theme/colors";
import { fonts } from "../theme/fonts";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type SettingItemProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  onPress: () => void;
  showBadge?: boolean;
};

const SettingItem = ({ icon, title, onPress, showBadge }: SettingItemProps) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <View style={styles.settingItemLeft}>
      <MaterialCommunityIcons name={icon} size={22} color={colors.text.primary} />
      <Text style={styles.settingItemText}>{title}</Text>
    </View>
    <View style={styles.settingItemRight}>
      {showBadge && (
        <View style={styles.plusBadge}>
          <Text style={styles.plusText}>PLUS</Text>
        </View>
      )}
      <MaterialCommunityIcons name="chevron-right" size={22} color={colors.text.secondary} />
    </View>
  </TouchableOpacity>
);

export default function Settings() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PREFERENCES</Text>
        <SettingItem
          icon="target"
          title="Set Goal"
          onPress={() => router.push("/settings/SetTarget")}
        />
        <SettingItem
          icon="beer"
          title="Configure Drinks"
          onPress={() => router.push("/settings/ConfigureBeer")}
        />
        <SettingItem
          icon="history"
          title="Relapse History"
          onPress={() => router.push("/settings/RelapseHistory")}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PREMIUM</Text>
        <SettingItem
          icon="star"
          title="Get Premium Features"
          onPress={() => router.push("/onboarding/Premium")}
          showBadge
        />
        <SettingItem icon="restore" title="Restore Purchase" onPress={() => {}} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ABOUT</Text>
        <SettingItem
          icon="shield-check-outline"
          title="Privacy Policy"
          onPress={() => router.push("/settings/PrivacyPolicy")}
        />
        <SettingItem
          icon="file-document-outline"
          title="Terms of Service"
          onPress={() => router.push("/settings/TermsOfService")}
        />
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: fonts.bold,
    color: colors.text.secondary,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingItemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  settingItemText: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.text.primary,
  },
  plusBadge: {
    backgroundColor: colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  plusText: {
    fontSize: 10,
    fontFamily: fonts.bold,
    color: colors.text.primary,
  },
  versionContainer: {
    padding: 20,
    alignItems: "center",
  },
  versionText: {
    fontSize: 13,
    fontFamily: fonts.regular,
    color: colors.text.secondary,
  },
});
