import { AuthContext } from "@/lib/authContext";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigationContainerRef } from "@react-navigation/native";
import { useContext } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Discount from '../../components/ui/Discount'
import Learning from '../../components/ui/Learning'

export default function HomeScreen() {
  const navigationRef = useNavigationContainerRef();
  const { user } = useContext(AuthContext);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-white flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => navigationRef.dispatch(DrawerActions.toggleDrawer())}>
          <Ionicons name="menu" size={28} color="black" />
        </TouchableOpacity>

        {/* LOGO */}
        <Image source={require("../../assets/images/logo.png")} className="w-10 h-10" resizeMode="contain" />

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

      

      {/* This is the user welcome information */}
      <View className="mx-4 my-5">
        <Text style={{ fontFamily: "Poppins" }} className="text-xl">
          Hi, Welcome{" "}
          <Text style={{ fontFamily: "Poppins" }} className="text-purple-700 font-bold">
            {user?.name}
          </Text>
        </Text>
      </View>
      {/* This is search bar */}
      <View className="border mx-4 my-5 py-3 px-4 rounded-md border-gray-400 flex-row items-center gap-5" >
        <EvilIcons name="search" size={24} color="black" /><TextInput placeholder="Search..."  className=""/>
      </View>
      {/* Discount section */}
      <Discount/>

      {/* Learning progress section */}
      <Learning/>
    </SafeAreaView>
  );
}
