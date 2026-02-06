import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CarCard } from "../../components/CarCard";
import type { Car } from "../../types/car";
import { ASYNC_STORAGE_CARS_KEY } from "../../types/car";


export default function ListScreen() {
  const [allCars, setAllCars] = useState<Car[]>([]);

  useEffect(() => {
    loadCars();
  }, [allCars]);

  async function loadCars() {
    const data = await AsyncStorage.getItem(ASYNC_STORAGE_CARS_KEY);
    if (data) {
      setAllCars(JSON.parse(data));
    }
  }

  async function removeCar(index: number) {
    const newCars = allCars.filter((_, i) => i !== index);
    setAllCars(newCars);
    await AsyncStorage.setItem(ASYNC_STORAGE_CARS_KEY, JSON.stringify(newCars));
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Ionicons name="list" size={28} color="#16A34A" />
        <Text style={styles.headerTitle}>รายการรถทั้งหมด</Text>
      </View>

      <FlatList
        data={allCars}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <CarCard item={item} onDelete={() => removeCar(index)} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Ionicons name="car-sport-outline" size={56} color="#3A3D4A" />
            <Text style={styles.empty}>ยังไม่มีข้อมูลรถ</Text>
            <Text style={styles.emptyHint}>ไปที่แท็บ "เพิ่ม" เพื่อบันทึกรถ</Text>
          </View>
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
    backgroundColor: "#F9FAFB",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#14532D",
    letterSpacing: 1,
  },
  emptyWrap: {
    alignItems: "center",
    marginTop: 60,
  },
  empty: {
    textAlign: "center",
    color: "#4B5563",
    marginTop: 16,
    fontSize: 17,
    fontWeight: "600",
  },
  emptyHint: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 6,
    fontSize: 14,
  },
});
