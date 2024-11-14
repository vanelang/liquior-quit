import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "./theme/colors";
import { StatusBar } from "expo-status-bar";
import { fonts } from "./theme/fonts";

export default function Index() {
  const router = useRouter();
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  const checkFirstLaunch = async () => {
    try {
      const hasOnboarded = await AsyncStorage.getItem("hasOnboarded");
      setIsFirstLaunch(hasOnboarded !== "true");
    } catch (error) {
      console.error("Error checking onboarding status:", error);
      setIsFirstLaunch(true);
    }
  };

  const resetOnboarding = async () => {
    try {
      await AsyncStorage.multiRemove(["hasOnboarded", "addictionLevel", "quitTarget"]);
      router.replace("/onboarding/Welcome");
    } catch (error) {
      console.error("Error resetting onboarding:", error);
    }
  };

  if (isFirstLaunch === null) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome back!</Text>
      <TouchableOpacity style={styles.resetButton} onPress={resetOnboarding}>
        <Text style={styles.resetButtonText}>Reset Onboarding</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    gap: 20,
  },
  text: {
    color: colors.text.primary,
    fontSize: 18,
    fontFamily: fonts.regular,
  },
  resetButton: {
    backgroundColor: colors.card,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  resetButtonText: {
    color: colors.text.secondary,
    fontSize: 14,
    fontFamily: fonts.regular,
  },
});
