import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ASYNC_STORAGE_CARS_KEY } from "../../types/car";

export default function AddScreen() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [allCars, setAllCars] = useState<any[]>([]);

  useEffect(() => {
    loadCars();
  }, [allCars]);

  async function loadCars() {
    const data = await AsyncStorage.getItem(ASYNC_STORAGE_CARS_KEY);
    if (data) {
      setAllCars(JSON.parse(data));
    }
  }

  async function addCar() {
    const car = {
      brand,
      model,
      year,
      description,
      imageUrl: imageUrl.trim(),
    };

    const newList = [...allCars, car];
    await AsyncStorage.setItem(ASYNC_STORAGE_CARS_KEY, JSON.stringify(newList));
    setAllCars(newList);

    setBrand("");
    setModel("");
    setYear("");
    setDescription("");
    setImageUrl("");
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>บันทึกข้อมูลรถยนต์ 🚗</Text>

      <View style={styles.cardForm}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>ยี่ห้อรถ</Text>
          <TextInput
            style={styles.input}
            value={brand}
            onChangeText={setBrand}
            placeholder="เช่น Toyota"
            placeholderTextColor="#9AA6B2"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>รุ่นรถ</Text>
          <TextInput
            style={styles.input}
            value={model}
            onChangeText={setModel}
            placeholder="เช่น Corolla"
            placeholderTextColor="#9AA6B2"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>ปีผลิต</Text>
          <TextInput
            style={styles.input}
            value={year}
            onChangeText={setYear}
            placeholder="เช่น 2022"
            keyboardType="numeric"
            placeholderTextColor="#9AA6B2"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>ลิงก์ภาพรถ (URL)</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={setImageUrl}
            placeholder="https://..."
            autoCapitalize="none"
            placeholderTextColor="#9AA6B2"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>รายละเอียดเพิ่มเติม</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="สี, สภาพ, หมายเหตุ ฯลฯ"
            placeholderTextColor="#9AA6B2"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={addCar}>
          <Text style={styles.saveButtonText}>บันทึกรถยนต์</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
    padding: 20,
  },

  header: {
    fontSize: 28,
    fontWeight: "900",
    color: "#14532D",
    marginBottom: 20,
    letterSpacing: 1,
  },

  cardForm: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 22,
    shadowColor: "#16A34A",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },

  inputGroup: {
    marginBottom: 16,
  },

  label: {
    fontSize: 13,
    fontWeight: "800",
    color: "#15803D",
    marginBottom: 6,
    letterSpacing: 0.6,
  },

  input: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1.2,
    borderColor: "#BBF7D0",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1E293B",
  },

  saveButton: {
    marginTop: 22,
    backgroundColor: "#16A34A",
    paddingVertical: 18,
    borderRadius: 999,
    alignItems: "center",
    shadowColor: "#16A34A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 6,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 1,
  },
});
