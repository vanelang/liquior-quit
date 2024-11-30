import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../theme/_colors";
import { fonts } from "../theme/_fonts";

type TestimonialProps = {
  quote: string;
  name: string;
  duration: string;
  achievement: string;
};

const Testimonial = ({ quote, name, duration, achievement }: TestimonialProps) => (
  <View style={styles.testimonialCard}>
    <Text style={styles.testimonialQuote}>{quote}</Text>
    <View style={styles.testimonialFooter}>
      <Text style={styles.durationText}>
        {duration} • <Text style={styles.achievementText}>{achievement}</Text>
      </Text>
      <Text style={styles.nameText}>- {name}</Text>
    </View>
  </View>
);

export default function Motivation() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subtitle}>Stories from people who took the first step</Text>

        <Testimonial
          quote="The daily reflections kept me focused on why I started. This app helped me stay accountable through the tough days."
          name="Michael"
          duration="180 days sober"
          achievement="Rebuilt relationships"
        />

        <Testimonial
          quote="I learned to enjoy social events without alcohol. The community here truly understands the journey."
          name="Sarah"
          duration="1 year alcohol-free"
          achievement="Found new hobbies"
        />

        <Testimonial
          quote="Started as a 30-day break. The health benefits and savings made me commit to permanent change."
          name="David"
          duration="2 years sober"
          achievement="Saved ₹8,400"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/onboarding/Assessment")}
        >
          <Text style={styles.buttonText}>Take Addiction Assessment</Text>
        </TouchableOpacity>
      </ScrollView>
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
  scrollContent: {
    padding: 20,
    paddingTop: 16,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.text.secondary,
    marginBottom: 20,
    lineHeight: 22,
  },
  testimonialCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  testimonialQuote: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.text.primary,
    marginBottom: 12,
    lineHeight: 22,
  },
  testimonialFooter: {
    gap: 4,
  },
  durationText: {
    fontSize: 13,
    fontFamily: fonts.bold,
    color: colors.success,
  },
  achievementText: {
    color: colors.text.secondary,
    fontFamily: fonts.regular,
  },
  nameText: {
    fontSize: 13,
    fontFamily: fonts.regular,
    color: colors.text.secondary,
    opacity: 0.7,
  },
  button: {
    backgroundColor: colors.accent,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: colors.text.primary,
    fontSize: 16,
    fontFamily: fonts.bold,
    textAlign: "center",
  },
});
