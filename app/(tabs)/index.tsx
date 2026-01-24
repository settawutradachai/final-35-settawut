import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";

export default function ListScreen() {
  const [items, setItems] = useState([]);
  const navigation = useNavigation();

  const loadData = async () => {
    try {
      const data = await AsyncStorage.getItem("snack");
      setItems(data ? JSON.parse(data) : []);
    } catch (e) {
      console.log(e);
    }
  };

  // ดึงข้อมูลใหม่ทุกครั้งที่สลับหน้ามาเจอกัน
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadData);
    return unsubscribe;
  }, [navigation]);

  // ฟังก์ชันลบข้อมูล
  const deleteItem = async (id) => {
    const filtered = items.filter((it) => it.id !== id);
    setItems(filtered);
    await AsyncStorage.setItem("snack", JSON.stringify(filtered));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>รายการทั้งหมด</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.snackName}</Text>
              <Text style={styles.cardPrice}>฿{item.snackPrice}</Text>
            </View>
            <Text style={styles.cardDes}>{item.snackDes}</Text>
            <TouchableOpacity onPress={() => deleteItem(item.id)}>
              <Text style={styles.deleteText}>ลบรายการ</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>ไม่มีข้อมูล</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#333",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  cardDes: {
    color: "#666",
    marginTop: 5,
  },
  deleteText: {
    color: "#FF5252",
    marginTop: 10,
    fontWeight: "600",
    textAlign: "right",
  },
  empty: { 
    textAlign: "center", 
    color: "#999", 
    marginTop: 50 },
});
