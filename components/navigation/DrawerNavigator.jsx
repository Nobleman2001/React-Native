import { AuthContext } from "@/lib/authContext";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function DrawerNavigator(props) {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const menuItems = [
    { label: "Home", icon: "home-outline", route: "/(tabs)" },
    { label: "Dashboard", icon: "grid-outline", route: "/dashboard" },
    { label: "About", icon: "information-circle-outline", route: "/about" },
    { label: "Become an Instructor", icon: "school-outline", route: "/becomeaninstructor"},
  ];

  return (
    <View className="flex-1 bg-white">
      {/* Header Section */}
      <View className="bg-purple-700 px-6 py-10 pt-16">
        <View className="flex-row items-center gap-3">
          <View className="w-16 h-16 rounded-full bg-white items-center justify-center">
            <Ionicons name="person" size={32} color="#7c3aed" />
          </View>
          <View>
            <Text className="text-white text-lg font-bold">{user?.name || "Guest"}</Text>
            <Text className="text-purple-200 text-sm">{user?.email || "guest@example.com"}</Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <DrawerContentScrollView {...props} className="flex-1">
        <View className="py-4">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center px-6 py-4 active:bg-gray-100"
              onPress={() => {
                router.push(item.route);
                props.navigation.closeDrawer();
              }}>
              <Ionicons name={item.icon} size={24} color="#7c3aed" />
              <Text className="ml-4 text-base text-gray-800">{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </DrawerContentScrollView>

      {/* Footer Section */}
      <View className="border-t border-gray-200 p-6">
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => {
            // Handle logout
            props.navigation.closeDrawer();
          }}>
          <Ionicons name="log-out-outline" size={24} color="#ef4444" />
          <Text className="ml-4 text-base text-red-500">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
