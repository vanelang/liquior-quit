import { Stack } from "expo-router";
import { colors } from "../theme/colors";
import { fonts } from "../theme/fonts";

export default function OnboardingLayout() {
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
      <Stack.Screen name="Welcome" options={{ headerShown: false }} />
      <Stack.Screen
        name="Motivation"
        options={{
          title: "Find Your Motivation",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="Assessment"
        options={{
          title: "Addiction Assessment",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="AssessmentResult"
        options={{
          title: "Your Results",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Premium"
        options={{
          title: "Premium Features",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PremiumComparison"
        options={{
          title: "Compare Plans",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
