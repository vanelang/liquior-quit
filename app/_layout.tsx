import { Stack } from "expo-router";
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
import { useRouter, useSegments } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
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

  // Hide tab bar when in onboarding flow
  const isOnboarding = segments[0] === "onboarding";

  if (isOnboarding) {
    return (
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="onboarding" />
      </Stack>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        headerTintColor: colors.text.primary,
        headerTitleStyle: {
          color: colors.text.primary,
          fontFamily: fonts.bold,
        },
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          height: Platform.select({ ios: 88, android: 68 }),
          paddingTop: 8,
          paddingBottom: Platform.select({ ios: 28, android: 8 }),
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
      <Tab.Screen
        name="index"
        component={require("./index").default}
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="recovery"
        component={require("./recovery/index").default}
        options={{
          title: "Recovery",
          headerTitle: "Recovery Tools",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart-pulse" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="history"
        component={require("./settings/RelapseHistory").default}
        options={{
          title: "History",
          headerTitle: "Relapse History",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="settings"
        component={require("./settings/index").default}
        options={{
          title: "Settings",
          headerTitle: "Settings",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
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
