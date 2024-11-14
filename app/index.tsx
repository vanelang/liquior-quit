import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const router = useRouter();
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if it's the first launch
    const checkFirstLaunch = async () => {
      try {
        const hasOnboarded = await AsyncStorage.getItem("hasOnboarded");
        setIsFirstLaunch(hasOnboarded !== "true");
      } catch (error) {
        console.error("Error checking onboarding status:", error);
        setIsFirstLaunch(true); // Default to true in case of error
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
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Welcome back! Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
