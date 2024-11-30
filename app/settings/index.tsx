import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../theme/_colors";
import { fonts } from "../theme/_fonts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SettingItemProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  onPress: () => void;
  showBadge?: boolean;
  textColor?: string;
};

const SettingItem = ({ icon, title, onPress, showBadge, textColor }: SettingItemProps) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <View style={styles.settingItemLeft}>
      <MaterialCommunityIcons name={icon} size={22} color={textColor || colors.text.primary} />
      <Text style={[styles.settingItemText, textColor && { color: textColor }]}>{title}</Text>
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

  const handleResetOnboarding = () => {
    Alert.alert(
      "Reset Onboarding",
      "This will reset the app to its initial state. You'll need to go through the onboarding process again. Are you sure?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              router.replace("/onboarding/Welcome");
            } catch (error) {
              console.error("Error resetting app:", error);
              Alert.alert("Error", "Could not reset the app. Please try again.");
            }
          },
        },
      ]
    );
  };

  const handleResetApp = () => {
    Alert.alert(
      "Reset App",
      "This will delete all your data and reset the app to its initial state. This action cannot be undone. Are you sure?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            try {
              // Clear all stored data
              await Promise.all([
                AsyncStorage.removeItem("sobrietyStartDate"),
                AsyncStorage.removeItem("quitTarget"),
                AsyncStorage.removeItem("relapseHistory"),
                AsyncStorage.removeItem("configuredBeers"),
                AsyncStorage.removeItem("totalSpent"),
                AsyncStorage.removeItem("hasOnboarded"),
                AsyncStorage.removeItem("addictionLevel"),
                AsyncStorage.removeItem("shouldReloadProgress"),
              ]);

              // Set a new start date
              const now = new Date();
              await AsyncStorage.setItem("sobrietyStartDate", now.toISOString());

              // Navigate to home screen
              router.replace("/");
            } catch (error) {
              console.error("Error resetting app:", error);
              Alert.alert("Error", "Could not reset the app. Please try again.");
            }
          },
        },
      ]
    );
  };

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
        <SettingItem
          icon="refresh"
          title="Reset Onboarding"
          onPress={handleResetOnboarding}
          textColor={colors.error}
        />
        <SettingItem
          icon="delete-outline"
          title="Reset App"
          onPress={handleResetApp}
          textColor={colors.error}
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
