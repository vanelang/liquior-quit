import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../theme/colors";
import { fonts } from "../theme/fonts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AVERAGE_ADDICTION_LEVEL = 45; // This would normally come from your backend

export default function AssessmentResult() {
  const router = useRouter();
  const [addictionLevel, setAddictionLevel] = React.useState<number>(0);

  React.useEffect(() => {
    // Simulate loading the addiction level
    const loadResult = async () => {
      const level = await AsyncStorage.getItem("addictionLevel");
      setAddictionLevel(Number(level) || 0);
    };
    loadResult();
  }, []);

  const getSeverityText = (level: number) => {
    if (level < 30) return "mild";
    if (level < 60) return "moderate";
    return "serious";
  };

  const getRecoveryDays = (level: number) => {
    if (level < 30) return "90-120";
    if (level < 60) return "150-180";
    return "200+";
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Percentage Display */}
        <Text style={styles.percentageText}>{addictionLevel}%</Text>

        <Text style={styles.resultText}>
          Your alcohol addiction level is {getSeverityText(addictionLevel)}. Please take an action
          immediately.*
        </Text>
        <Text style={styles.disclaimer}>* This is only an estimate.</Text>

        {/* Comparison Graph */}
        <View style={styles.graphContainer}>
          <View style={styles.barContainer}>
            <View style={styles.barLabel}>
              <Text style={styles.barLabelText}>Average</Text>
              <MaterialCommunityIcons
                name="emoticon-neutral"
                size={24}
                color={colors.text.secondary}
              />
            </View>
            <View style={[styles.bar, { width: `${AVERAGE_ADDICTION_LEVEL}%` }]} />
          </View>

          <View style={styles.barContainer}>
            <View style={styles.barLabel}>
              <Text style={styles.barLabelText}>You</Text>
              <MaterialCommunityIcons
                name={addictionLevel > AVERAGE_ADDICTION_LEVEL ? "emoticon-sad" : "emoticon-happy"}
                size={24}
                color={colors.text.secondary}
              />
            </View>
            <View style={[styles.bar, styles.yourBar, { width: `${addictionLevel}%` }]} />
          </View>
        </View>

        <Text style={styles.recoveryText}>
          It may take more than {getRecoveryDays(addictionLevel)} days for you to recover
          completely.
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => router.replace("/")}>
          <Text style={styles.buttonText}>I want to quit my addiction</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.accent,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  percentageText: {
    fontSize: 64,
    fontFamily: fonts.bold,
    color: colors.text.primary,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.text.primary,
    textAlign: "center",
    marginBottom: 8,
  },
  disclaimer: {
    fontSize: 13,
    fontFamily: fonts.regular,
    color: colors.text.primary,
    opacity: 0.7,
    marginBottom: 40,
  },
  graphContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 40,
    gap: 24,
  },
  barContainer: {
    width: "100%",
  },
  barLabel: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  barLabelText: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.text.primary,
  },
  bar: {
    height: 40,
    backgroundColor: "#8B0000",
    borderRadius: 6,
    opacity: 0.3,
  },
  yourBar: {
    opacity: 1,
  },
  recoveryText: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.text.primary,
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    width: "100%",
  },
  buttonText: {
    color: colors.accent,
    fontSize: 16,
    fontFamily: fonts.bold,
    textAlign: "center",
  },
});
