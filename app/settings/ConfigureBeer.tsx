import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../theme/colors";
import { fonts } from "../theme/fonts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Beer = {
  id: string;
  brand: string;
  price: string;
};

export default function ConfigureBeer() {
  const router = useRouter();
  const [beers, setBeers] = useState<Beer[]>([]);

  useEffect(() => {
    loadBeers();
  }, []);

  const loadBeers = async () => {
    try {
      const savedBeers = await AsyncStorage.getItem("configuredBeers");
      if (savedBeers) {
        setBeers(JSON.parse(savedBeers));
      }
    } catch (error) {
      console.error("Error loading beers:", error);
    }
  };

  const addBeer = () => {
    setBeers([
      ...beers,
      {
        id: Date.now().toString(),
        brand: "",
        price: "",
      },
    ]);
  };

  const removeBeer = (id: string) => {
    setBeers(beers.filter((beer) => beer.id !== id));
  };

  const updateBeer = (id: string, field: keyof Beer, value: string) => {
    setBeers(
      beers.map((beer) =>
        beer.id === id
          ? { ...beer, [field]: field === "price" ? value.replace(/[^0-9.]/g, "") : value }
          : beer
      )
    );
  };

  const saveBeerConfig = async () => {
    try {
      // Validate inputs
      const isValid = beers.every((beer) => {
        return beer.brand.trim() !== "" && !isNaN(parseFloat(beer.price));
      });

      if (!isValid) {
        Alert.alert("Invalid Input", "Please fill in all fields with valid values.");
        return;
      }

      await AsyncStorage.setItem("configuredBeers", JSON.stringify(beers));
      router.back();
    } catch (error) {
      console.error("Error saving beer config:", error);
      Alert.alert("Error", "Could not save drink configuration.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configure Drinks</Text>
      <Text style={styles.subtitle}>
        Add the drinks you typically consume to track savings accurately.
      </Text>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {beers.map((beer) => (
          <View key={beer.id} style={styles.beerCard}>
            <View style={styles.beerHeader}>
              <Text style={styles.beerNumber}>Drink #{beers.indexOf(beer) + 1}</Text>
              <TouchableOpacity onPress={() => removeBeer(beer.id)}>
                <MaterialCommunityIcons name="close" size={24} color={colors.error} />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Brand name (e.g., Heineken, Corona)"
              placeholderTextColor={colors.text.secondary}
              value={beer.brand}
              onChangeText={(value) => updateBeer(beer.id, "brand", value)}
            />

            <TextInput
              style={styles.input}
              placeholder="Price per unit ($)"
              placeholderTextColor={colors.text.secondary}
              keyboardType="decimal-pad"
              value={beer.price}
              onChangeText={(value) => updateBeer(beer.id, "price", value)}
            />
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={addBeer}>
          <MaterialCommunityIcons name="plus" size={24} color={colors.text.primary} />
          <Text style={styles.addButtonText}>Add Another Drink</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity
        style={[styles.saveButton, beers.length === 0 && styles.saveButtonDisabled]}
        onPress={saveBeerConfig}
        disabled={beers.length === 0}
      >
        <Text style={styles.saveButtonText}>Save Configuration</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.text.secondary,
    marginBottom: 24,
  },
  scrollView: {
    flex: 1,
  },
  beerCard: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  beerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  beerNumber: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.text.primary,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    color: colors.text.primary,
    fontFamily: fonts.regular,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 20,
  },
  addButtonText: {
    color: colors.text.primary,
    fontSize: 16,
    fontFamily: fonts.bold,
  },
  saveButton: {
    backgroundColor: colors.accent,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: colors.text.primary,
    fontSize: 16,
    fontFamily: fonts.bold,
  },
});
