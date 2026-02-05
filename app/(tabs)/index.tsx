import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Car = {
  brand: string;
  model: string;
  year: string;
  description: string;
};

export default function ListScreen() {
  const [allCars, setAllCars] = useState<Car[]>([]);

  useEffect(() => {
    loadCars();
  }, [allCars]);

  async function loadCars() {
    const data = await AsyncStorage.getItem("cars");
    if (data) {
      setAllCars(JSON.parse(data));
    }
  }

  async function removeCar(index: number) {
    const newCars = allCars.filter((_, i) => i !== index);
    setAllCars(newCars);
    await AsyncStorage.setItem("cars", JSON.stringify(newCars));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>🚘 รายการรถทั้งหมด</Text>

      <FlatList
        data={allCars}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Text style={styles.brand}>{item.brand}</Text>
            <Text style={styles.year}>{item.year}</Text>
            <Text style={styles.model}>{item.model}</Text>
            <Text style={styles.description}>{item.description}</Text>

            <TouchableOpacity onPress={() => removeCar(index)}>
              <Text style={styles.deleteText}>ลบรายการ</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>ยังไม่มีข้อมูลรถ 🚗</Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0E0F13",
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 20,
    letterSpacing: 1,
  },

  card: {
    backgroundColor: "#161821",
    padding: 20,
    borderRadius: 22,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#2A2D3A",
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  brand: {
    fontSize: 18,
    fontWeight: "800",
    color: "#4D5BFF",
    letterSpacing: 0.5,
  },

  year: {
    fontSize: 14,
    fontWeight: "700",
    color: "#A0A4FF",
  },

  model: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 6,
  },

  description: {
    color: "#B5B7C5",
    marginTop: 8,
    lineHeight: 20,
  },

  deleteText: {
    color: "#FF5C5C",
    marginTop: 14,
    fontWeight: "700",
    textAlign: "right",
  },

  empty: {
    textAlign: "center",
    color: "#777",
    marginTop: 60,
    fontSize: 16,
  },
});
