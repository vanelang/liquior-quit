import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { colors } from "../theme/colors";
import { fonts } from "../theme/fonts";

export default function PrivacyPolicy() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.lastUpdated}>Last updated: March 15, 2024</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Information We Collect</Text>
          <Text style={styles.text}>
            We collect minimal personal information to provide you with the best possible sobriety
            tracking experience:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={styles.bulletPoint}>• Sobriety start date</Text>
            <Text style={styles.bulletPoint}>• Goal settings and progress</Text>
            <Text style={styles.bulletPoint}>• Usage statistics and preferences</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
          <Text style={styles.text}>Your information is used solely to:</Text>
          <View style={styles.bulletPoints}>
            <Text style={styles.bulletPoint}>• Track your sobriety progress</Text>
            <Text style={styles.bulletPoint}>• Provide personalized goal recommendations</Text>
            <Text style={styles.bulletPoint}>• Improve app functionality and user experience</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Data Storage and Security</Text>
          <Text style={styles.text}>
            All your data is stored locally on your device. If you choose to use our cloud backup
            feature (Premium), data is encrypted and stored securely on our servers using
            industry-standard encryption protocols.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Data Sharing</Text>
          <Text style={styles.text}>
            We do not sell, trade, or share your personal information with third parties. Your
            journey is private and confidential.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Your Rights</Text>
          <Text style={styles.text}>You have the right to:</Text>
          <View style={styles.bulletPoints}>
            <Text style={styles.bulletPoint}>• Access your personal data</Text>
            <Text style={styles.bulletPoint}>• Delete your account and data</Text>
            <Text style={styles.bulletPoint}>• Export your progress data</Text>
            <Text style={styles.bulletPoint}>• Opt-out of non-essential data collection</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Contact Us</Text>
          <Text style={styles.text}>
            If you have any questions about this Privacy Policy, please contact us at:
            privacy@sobrietyapp.com
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.text.primary,
    marginBottom: 8,
  },
  lastUpdated: {
    fontSize: 13,
    fontFamily: fonts.regular,
    color: colors.text.secondary,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.text.primary,
    marginBottom: 12,
  },
  text: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.text.primary,
    lineHeight: 22,
    marginBottom: 12,
  },
  bulletPoints: {
    paddingLeft: 8,
  },
  bulletPoint: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.text.primary,
    lineHeight: 24,
  },
});
