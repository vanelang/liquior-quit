import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen name="Welcome" options={{ title: "Welcome" }} />
      <Stack.Screen name="Motivation" options={{ title: "Find Your Motivation" }} />
      <Stack.Screen name="TargetSetting" options={{ title: "Set Your Targets" }} />
    </Stack>
  );
}
