import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Motivation() {
  const router = useRouter();

  const navigateToTargetSetting = () => {
    router.push("/onboarding/TargetSetting");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Your Motivation</Text>
      <Text style={styles.subtitle}>
        Understanding your reasons to quit can strengthen your resolve.
      </Text>
      <Button title="Next" onPress={navigateToTargetSetting} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#e6f7ff",
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
});
