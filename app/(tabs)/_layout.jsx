import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { AuthContext } from "@/lib/authContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import React, { useContext } from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user } = useContext(AuthContext);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarButton: HapticTab,
      }}>
      {/* HOME TAB */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />

      {/* EXPLORE TAB */}
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />

      {/* Create Course Tab */}
      <Tabs.Screen
        name="createcourse"
        options={{
          title: "Create",
          tabBarIcon: ({ color }) => <AntDesign name="plus" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="mylearning"
        options={{
          title: "My Learning",
          tabBarIcon: ({ color }) => <FontAwesome6 name="graduation-cap" size={24} color="black" />,
        }}
      />

      {/* ACCOUNT TAB - Hidden when not logged in */}
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => <MaterialIcons name="account-circle" size={28} color={color} />,
          href: user ? undefined : null,
        }}
      />

      {/* LOGIN TAB - Hidden when logged in */}
      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          tabBarIcon: ({ color }) => <MaterialIcons name="login" size={28} color={color} />,
          href: user ? null : undefined,
        }}
      />
    </Tabs>
  );
}
