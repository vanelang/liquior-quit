import { Tabs } from "expo-router";
import { colors } from "./theme/_colors";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { fonts } from "./theme/_fonts";
import { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_700Bold,
  });

  useEffect(() => {
    const initializeApp = async () => {
      if (fontsLoaded) {
        try {
          // Check if user has completed onboarding
          const hasOnboarded = await AsyncStorage.getItem("hasOnboarded");

          // Hide splash screen
          await SplashScreen.hideAsync();

          // Navigate based on onboarding status
          if (hasOnboarded === "true") {
            router.replace("/");
          } else {
            router.replace("/onboarding/Welcome");
          }
        } catch (error) {
          console.error("Error initializing app:", error);
          router.replace("/onboarding/Welcome");
        }
      }
    };

    initializeApp();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.loadingText}>Loading resources...</Text>
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text.primary,
        headerTitleStyle: {
          color: colors.text.primary,
          fontFamily: fonts.bold,
        },
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          height: Platform.select({ ios: 88, android: 68 }), // Adjusted for safe area
          paddingTop: 8,
          paddingBottom: Platform.select({ ios: 28, android: 8 }), // Adjusted for safe area
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarLabelStyle: {
          fontFamily: fonts.regular,
          fontSize: 12,
          paddingBottom: Platform.select({ ios: 0, android: 4 }),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="recovery/index"
        options={{
          title: "Recovery",
          headerTitle: "Recovery Tools",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart-pulse" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings/RelapseHistory"
        options={{
          title: "History",
          headerTitle: "Relapse History",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: "Settings",
          headerTitle: "Settings",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings/SetTarget"
        options={{
          href: null,
          title: "Set Goal",
        }}
      />
      <Tabs.Screen
        name="settings/PrivacyPolicy"
        options={{
          href: null,
          title: "Privacy Policy",
        }}
      />
      <Tabs.Screen
        name="settings/TermsOfService"
        options={{
          href: null,
          title: "Terms of Service",
        }}
      />
      <Tabs.Screen
        name="settings/ConfigureBeer"
        options={{
          href: null,
          title: "Configure Drinks",
        }}
      />
      <Tabs.Screen
        name="onboarding"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    color: colors.text.primary,
    fontSize: 16,
  },
});
