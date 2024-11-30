import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { colors } from "../theme/_colors";
import { fonts } from "../theme/_fonts";

export default function TermsOfService() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Terms of Service</Text>
        <Text style={styles.lastUpdated}>Last updated: March 15, 2024</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.text}>
            By accessing and using this application, you accept and agree to be bound by the terms
            and provision of this agreement.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. App Usage</Text>
          <Text style={styles.text}>
            This app is designed to help track and support your sobriety journey. However, it is not
            a substitute for professional medical advice, diagnosis, or treatment.
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={styles.bulletPoint}>
              • You must be at least 18 years old to use this app
            </Text>
            <Text style={styles.bulletPoint}>
              • You are responsible for maintaining account security
            </Text>
            <Text style={styles.bulletPoint}>
              • Do not use this app while operating vehicles or machinery
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Premium Features</Text>
          <Text style={styles.text}>
            Some features require a premium subscription. By purchasing a subscription, you agree
            to:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={styles.bulletPoint}>• Recurring billing unless cancelled</Text>
            <Text style={styles.bulletPoint}>• Subscription terms and conditions</Text>
            <Text style={styles.bulletPoint}>• Our refund policy</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. User Content</Text>
          <Text style={styles.text}>
            You retain ownership of content you create in the app. By submitting content, you grant
            us a license to use, store, and share your content in accordance with your privacy
            settings.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Medical Disclaimer</Text>
          <Text style={styles.text}>
            This app is not intended to provide medical advice. Consult qualified healthcare
            providers regarding medical conditions. If you're experiencing severe withdrawal
            symptoms, seek immediate medical attention.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Limitation of Liability</Text>
          <Text style={styles.text}>
            We are not liable for any damages arising from your use of the service. The app is
            provided "as is" without any warranty.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Changes to Terms</Text>
          <Text style={styles.text}>
            We reserve the right to modify these terms at any time. Continued use of the app after
            changes constitutes acceptance of new terms.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Contact Information</Text>
          <Text style={styles.text}>
            For questions about these Terms, please contact us at: legal@sobrietyapp.com
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
