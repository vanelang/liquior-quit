import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../theme/colors";
import { fonts } from "../theme/fonts";

export default function TargetSetting() {
  const router = useRouter();
  const [target, setTarget] = React.useState<string>("");

  const finishOnboarding = async () => {
    try {
      await AsyncStorage.setItem("hasOnboarded", "true");
      await AsyncStorage.setItem("quitTarget", target);
      router.replace("/");
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
        placeholderTextColor={colors.text.secondary}
        value={target}
        onChangeText={setTarget}
      />
      <TouchableOpacity
        style={[styles.button, !target && styles.buttonDisabled]}
        onPress={finishOnboarding}
        disabled={!target}
      >
        <Text style={styles.buttonText}>Finish</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.bold,
    color: colors.text.primary,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.text.secondary,
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
    color: colors.text.primary,
    backgroundColor: colors.card,
    fontFamily: fonts.regular,
  },
  button: {
    backgroundColor: colors.accent,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: "100%",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: colors.text.primary,
    fontSize: 18,
    fontFamily: fonts.bold,
    textAlign: "center",
  },
});
