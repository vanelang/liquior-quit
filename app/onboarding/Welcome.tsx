import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Welcome() {
  const router = useRouter();

  const navigateToMotivation = () => {
    router.push("/onboarding/Motivation");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Your Journey</Text>
      <Text style={styles.subtitle}>
        We're here to help you quit alcohol and lead a healthier life.
      </Text>
      <Button title="Get Started" onPress={navigateToMotivation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f8ff",
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
