import { Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
  DrawerActions,
  useNavigationContainerRef,
} from "@react-navigation/native";

export default function HomeScreen() {
  const navigationRef = useNavigationContainerRef();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-white flex-row items-center justify-between px-4 py-3">

        <TouchableOpacity
          onPress={() => navigationRef.dispatch(DrawerActions.toggleDrawer())}
        >
          <Ionicons name="menu" size={28} color="black" />
        </TouchableOpacity>

        {/* LOGO */}
        <Image
          source={require("../../assets/images/logo.png")}
          className="w-10 h-10"
          resizeMode="contain"
        />

        {/* CART + WISHLIST */}
        <View className="flex-row gap-4">
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name="cart-outline" size={24} />
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}
