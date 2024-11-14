import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../theme/colors";
import { fonts } from "../theme/fonts";

type TestimonialProps = {
  quote: string;
  author: string;
  days?: string;
};

const Testimonial = ({ quote, author, days }: TestimonialProps) => (
  <View style={styles.testimonialCard}>
    <Text style={styles.testimonialQuote}>{quote}</Text>
    {days && <Text style={styles.daysText}>{days}</Text>}
    <Text style={styles.testimonialAuthor}>- {author}</Text>
  </View>
);

export default function Motivation() {
  const router = useRouter();

  const navigateToTargetSetting = () => {
    router.push("/onboarding/TargetSetting");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Find Your Motivation</Text>
        <Text style={styles.subtitle}>See how others have transformed their lives</Text>

        <Testimonial
          quote="I feel completely free now. I started to enjoy my life."
          author="Robert"
        />

        <Testimonial
          quote="Before, my streaks lasted a maximum of 5 days. Today is my 90th day, feel amazing."
          author="Gareth"
          days="90 days"
        />

        <Testimonial quote="I felt free after the first 21 days." author="Louis" days="21 days" />

        <TouchableOpacity style={styles.button} onPress={navigateToTargetSetting}>
          <Text style={styles.buttonText}>Start My Journey</Text>
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
    paddingTop: 40,
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
  testimonialCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  testimonialQuote: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.text.primary,
    marginBottom: 10,
    lineHeight: 24,
  },
  testimonialAuthor: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.text.secondary,
    textAlign: "right",
  },
  daysText: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: colors.success,
    marginBottom: 5,
  },
  button: {
    backgroundColor: colors.accent,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 40,
  },
  buttonText: {
    color: colors.text.primary,
    fontSize: 18,
    fontFamily: fonts.bold,
    textAlign: "center",
  },
});
