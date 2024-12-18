import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../theme/_colors";
import { fonts } from "../theme/_fonts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

type FeatureRowProps = {
  feature: string;
  isAvailable: {
    basic: boolean;
    premium: boolean;
  };
};

const FeatureRow = ({ feature, isAvailable }: FeatureRowProps) => (
  <View style={styles.featureRow}>
    <Text style={styles.featureText}>{feature}</Text>
    <View style={styles.availabilityContainer}>
      <MaterialCommunityIcons
        name={isAvailable.basic ? "check" : "lock"}
        size={20}
        color={isAvailable.basic ? colors.success : colors.text.secondary}
      />
      <MaterialCommunityIcons name="check" size={20} color={colors.success} />
    </View>
  </View>
);

export default function PremiumComparison() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      Alert.alert(
        "Coming Soon",
        "In-app purchases will be available in the next update. For now, you can try the free version.",
        [
          {
            text: "Try Free Version",
            onPress: async () => {
              await AsyncStorage.setItem("hasOnboarded", "true");
              router.replace("/");
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const originalPrice = 199.99;
  const discountPercentage = 20;
  const discountedPrice = 159.99;

  const features = [
    {
      feature: "Daily Sobriety Check-in",
      isAvailable: { basic: true, premium: true },
    },
    {
      feature: "Basic Progress Stats",
      isAvailable: { basic: true, premium: true },
    },
    {
      feature: "Milestone Celebrations",
      isAvailable: { basic: true, premium: true },
    },
    {
      feature: "Journey Journaling",
      isAvailable: { basic: false, premium: true },
    },
    {
      feature: "Custom Check-in Times",
      isAvailable: { basic: false, premium: true },
    },
    {
      feature: "Trigger Pattern Analysis",
      isAvailable: { basic: false, premium: true },
    },
    {
      feature: "Community Discussion Access",
      isAvailable: { basic: false, premium: true },
    },
    {
      feature: "Detailed Money Savings",
      isAvailable: { basic: false, premium: true },
    },
    {
      feature: "Cloud Data Backup",
      isAvailable: { basic: false, premium: true },
    },
    {
      feature: "Ad-Free Experience",
      isAvailable: { basic: false, premium: true },
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Choose Your Plan</Text>
        </View>

        <View style={styles.tableHeader}>
          <View style={styles.featureColumn} />
          <View style={styles.planColumns}>
            <View style={styles.planColumn}>
              <Text style={styles.planText}>Basic</Text>
            </View>
            <View style={styles.planColumn}>
              <Text style={styles.planText}>Plus</Text>
            </View>
          </View>
        </View>

        <View style={styles.featuresContainer}>
          {features.map((item, index) => (
            <FeatureRow key={index} feature={item.feature} isAvailable={item.isAvailable} />
          ))}
        </View>

        <View style={styles.pricingCard}>
          <View style={styles.pricingHeader}>
            <Text style={styles.pricingTitle}>Plus Plan Includes</Text>
            <Text style={styles.pricingSubtitle}>Everything in Basic, and Plus plan.</Text>
          </View>

          <View style={styles.priceContainer}>
            <View style={styles.priceWrapper}>
              <Text style={styles.originalPrice}>₹{originalPrice.toFixed(2)}</Text>
              <Text style={styles.priceAmount}>
                ₹{discountedPrice.toFixed(2)}
                <Text style={styles.priceUnit}>/month</Text>
              </Text>
            </View>
            <View style={styles.savingBadge}>
              <Text style={styles.savingText}>Save {discountPercentage}%</Text>
            </View>
          </View>

          <Text style={styles.trialText}>Start with 7 days free trial</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.startTrialButton, isLoading && styles.buttonDisabled]}
          onPress={handlePurchase}
          disabled={isLoading}
        >
          <Text style={styles.startTrialText}>
            {isLoading ? "Processing..." : "Start 7-Day Free Trial"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.skipButton}
          onPress={async () => {
            await AsyncStorage.setItem("hasOnboarded", "true");
            router.replace("/");
          }}
          disabled={isLoading}
        >
          <Text style={styles.skipButtonText}>Continue with limited version</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.bold,
    color: colors.text.primary,
    marginBottom: 24,
  },
  tableHeader: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 12,
  },
  featureColumn: {
    flex: 1,
  },
  planColumns: {
    flexDirection: "row",
    width: 140,
    gap: 32,
    justifyContent: "flex-end",
  },
  planColumn: {
    alignItems: "center",
    width: 54,
  },
  planText: {
    fontSize: 13,
    fontFamily: fonts.bold,
    color: colors.text.primary,
  },
  featuresContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
  },
  featureText: {
    flex: 1,
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.text.primary,
  },
  availabilityContainer: {
    flexDirection: "row",
    gap: 32,
    width: 140,
    justifyContent: "flex-end",
  },
  pricingCard: {
    margin: 20,
    padding: 20,
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  pricingHeader: {
    marginBottom: 16,
  },
  pricingTitle: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.text.primary,
    marginBottom: 4,
  },
  pricingSubtitle: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.text.secondary,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  priceWrapper: {
    alignItems: "flex-start",
  },
  originalPrice: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.text.secondary,
    textDecorationLine: "line-through",
    marginBottom: 4,
  },
  priceAmount: {
    fontSize: 32,
    fontFamily: fonts.bold,
    color: colors.text.primary,
  },
  priceUnit: {
    fontSize: 16,
    color: colors.text.secondary,
    fontFamily: fonts.regular,
  },
  savingBadge: {
    backgroundColor: colors.accent,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  savingText: {
    fontSize: 13,
    fontFamily: fonts.bold,
    color: colors.text.primary,
  },
  trialText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.success,
  },
  bottomContainer: {
    padding: 20,
    paddingBottom: 34,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  startTrialButton: {
    backgroundColor: colors.accent,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  startTrialText: {
    color: colors.text.primary,
    fontSize: 16,
    fontFamily: fonts.bold,
  },
  skipButton: {
    paddingVertical: 8,
  },
  skipButtonText: {
    color: colors.text.secondary,
    fontSize: 15,
    fontFamily: fonts.regular,
    textAlign: "center",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});
