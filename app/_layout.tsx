import { Stack } from "expo-router";
import { colors } from "./theme/colors";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { fonts } from "./theme/fonts";
import { useEffect } from "react";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      // Hide splash screen once fonts are loaded
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text.primary,
        headerTitleStyle: {
          color: colors.text.primary,
          fontFamily: fonts.bold,
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen
        name="settings/SetTarget"
        options={{
          title: "Set Goal",
          headerBackTitle: "Back",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="settings/index"
        options={{
          title: "Settings",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="settings/Premium"
        options={{
          title: "Premium Features",
          headerBackTitle: "Back",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="settings/PremiumComparison"
        options={{
          title: "Compare Plans",
          headerBackTitle: "Back",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="settings/PrivacyPolicy"
        options={{
          title: "Privacy Policy",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="settings/TermsOfService"
        options={{
          title: "Terms of Service",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="settings/ConfigureBeer"
        options={{
          title: "Configure Drinks",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
}
