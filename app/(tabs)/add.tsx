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

export default function Home() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [allCars, setAllCars] = useState([]);

  useEffect(() => {
    loadCars();
  }, [allCars]);

  async function loadCars() {
    const data = await AsyncStorage.getItem("cars");
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
    };

    const newCars = [...allCars, car];
    await AsyncStorage.setItem("cars", JSON.stringify(newCars));
    setAllCars(newCars);

    // clear input
    setBrand("");
    setModel("");
    setYear("");
    setDescription("");
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>เพิ่มข้อมูลรถยนต์ 🚗</Text>

      <View style={styles.cardForm}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>ยี่ห้อรถ</Text>
          <TextInput
            style={styles.input}
            value={brand}
            onChangeText={setBrand}
            placeholder="เช่น Toyota"
            placeholderTextColor="#C1C1C1"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>รุ่นรถ</Text>
          <TextInput
            style={styles.input}
            value={model}
            onChangeText={setModel}
            placeholder="เช่น Corolla"
            placeholderTextColor="#C1C1C1"
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
            placeholderTextColor="#C1C1C1"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>รายละเอียด</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="รายละเอียดเพิ่มเติม..."
            multiline
            placeholderTextColor="#C1C1C1"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={addCar}>
          <Text style={styles.saveButtonText}>บันทึกข้อมูลรถ</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0F13",
    padding: 20,
  },

  header: {
    fontSize: 30,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 20,
    letterSpacing: 1,
  },

  cardForm: {
    backgroundColor: "#161821",
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: "#2A2D3A",
  },

  inputGroup: {
    marginBottom: 18,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#8F94FF",
    marginBottom: 6,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },

  input: {
    backgroundColor: "#0E0F13",
    borderWidth: 1.2,
    borderColor: "#2E3142",
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    color: "#FFFFFF",
  },

  textArea: {
    height: 120,
    textAlignVertical: "top",
  },

  saveButton: {
    marginTop: 20,
    backgroundColor: "#4D5BFF",
    paddingVertical: 18,
    borderRadius: 999,
    alignItems: "center",
    shadowColor: "#4D5BFF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 8,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 1,
  },
});

