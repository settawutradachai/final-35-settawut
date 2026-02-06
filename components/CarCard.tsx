import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Car } from "../types/car";

type CarCardProps = {
  item: Car;
  onDelete?: () => void;
  showDeleteButton?: boolean;
};

export function CarCard({
  item,
  onDelete,
  showDeleteButton = true,
}: CarCardProps) {
  const hasImage = item.imageUrl && item.imageUrl.trim().length > 0;

  return (
    <View style={styles.card}>
      {hasImage ? (
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Ionicons name="car-sport-outline" size={48} color="#16A34A" />
        </View>
      )}
      <View style={styles.body}>
        <Text style={styles.brand}>{item.brand}</Text>
        <Text style={styles.year}>{item.year}</Text>
        <Text style={styles.model}>{item.model}</Text>
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Ionicons name="trash-outline" size={20} color="#FF5C5C" />
            <Text style={styles.deleteText}>ลบรายการ</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#BBF7D0",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 160,
    backgroundColor: "#E5F9ED",
  },
  imagePlaceholder: {
    width: "100%",
    height: 160,
    backgroundColor: "#DCFCE7",
    justifyContent: "center",
    alignItems: "center",
  },
  body: { padding: 20 },
  brand: {
    fontSize: 18,
    fontWeight: "800",
    color: "#16A34A",
    letterSpacing: 0.5,
  },
  year: {
    fontSize: 14,
    fontWeight: "700",
    color: "#22C55E",
    marginTop: 2,
  },
  model: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginTop: 6,
  },
  description: {
    color: "#4B5563",
    marginTop: 8,
    lineHeight: 20,
    fontSize: 14,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginTop: 14,
    gap: 6,
  },
  deleteText: {
    color: "#FF5C5C",
    fontWeight: "700",
    fontSize: 14,
  },
});
