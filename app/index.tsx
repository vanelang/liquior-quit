import { Text, View, StyleSheet } from "react-native";
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
    const checkFirstLaunch = async () => {
      try {
        const hasOnboarded = await AsyncStorage.getItem("hasOnboarded");
        setIsFirstLaunch(hasOnboarded !== "true");
      } catch (error) {
        console.error("Error checking onboarding status:", error);
        setIsFirstLaunch(true);
      }
    };
    checkFirstLaunch();
  }, []);

  useEffect(() => {
    if (isFirstLaunch === true) {
      router.replace("/onboarding/Welcome");
    }
  }, [isFirstLaunch]);

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  text: {
    color: colors.text.primary,
    fontSize: 18,
    fontFamily: fonts.regular,
  },
});
