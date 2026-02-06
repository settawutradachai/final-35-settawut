import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

/**
 * Tab Navigation 2 หน้า: แสดงข้อมูล (มีปุ่มลบที่การ์ด) | เพิ่มข้อมูล
 * ใช้ไอคอนจาก @expo/vector-icons (Ionicons)
 */
export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#16A34A",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700",
        },
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#BBF7D0",
          paddingTop: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "แสดงข้อมูล",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "เพิ่มข้อมูล",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
