import React from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TargetSetting() {
  const router = useRouter();
  const [target, setTarget] = React.useState<string>("");

  const finishOnboarding = async () => {
    try {
      await AsyncStorage.setItem("hasOnboarded", "true");
      // Optionally, save the user's target
      await AsyncStorage.setItem("quitTarget", target);
      router.replace("/"); // Navigate to the main app screen
    } catch (error) {
      console.error("Error setting onboarding status:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Your Targets</Text>
      <Text style={styles.subtitle}>Define your goals to stay motivated on your journey.</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 30 days alcohol-free"
        value={target}
        onChangeText={setTarget}
      />
      <Button title="Finish" onPress={finishOnboarding} disabled={!target} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff4e6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
