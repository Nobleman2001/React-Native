import { AuthContext } from "@/lib/authContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Cart() {
  const { cartItems, handleCartItemDelete } = useContext(AuthContext);
  const router = useRouter();

  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

  // Handle empty cart
  if (cartItems.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 justify-center items-center px-6">
          <View className="w-32 h-32 bg-purple-100 rounded-full items-center justify-center mb-6">
            <Ionicons name="cart-outline" size={64} color="#7c3aed" />
          </View>
          <Text className="text-3xl font-bold text-gray-800 mb-3">Your cart is empty</Text>
          <Text className="text-base text-gray-500 text-center mb-8 px-4">
            Looks like you haven&apos;t added any courses yet. Start exploring!
          </Text>
          <TouchableOpacity 
            onPress={() => router.replace("/explore")}
            className="bg-purple-600 rounded-xl px-8 py-4 shadow-lg active:bg-purple-700"
          >
            <Text className="text-white font-semibold text-lg">Browse Courses</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 pt-2 pb-4 bg-white border-b border-gray-100">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity
            className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-4"
            onPress={() => router.replace("/")}
          >
            <Ionicons name="chevron-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-800 flex-1">Shopping Cart</Text>
          <View className="bg-purple-600 rounded-full w-8 h-8 items-center justify-center">
            <Text className="text-white font-bold text-sm">{cartItems.length}</Text>
          </View>
        </View>
      </View>

      {/* Cart Items */}
      <ScrollView className="flex-1 px-6 pt-4">
        {cartItems.map((item, index) => (
          <View
            key={index}
            className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100"
          >
            <View className="flex-row items-start mb-3">
              <View className="w-16 h-16 bg-purple-100 rounded-xl items-center justify-center mr-4">
                <Ionicons name="book-outline" size={28} color="#7c3aed" />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-800 mb-1" numberOfLines={2}>
                  {item.courseTitle}
                </Text>
                <Text className="text-sm text-gray-600 mb-2">
                  by {item.courseInstructor}
                </Text>
                <View className="flex-row items-center ">
                  <Ionicons name="time-outline" size={16} color="#9333ea" />
                  <Text className="text-sm text-purple-600 font-medium ml-1">
                    {item.durationWeeks} weeks
                  </Text>
                  <Text className='text-purple-600 ms-5 font-bold text-sm'>Price: {item.price} BDT </Text>
                </View>
              </View>
              <TouchableOpacity className="p-2">
                <Ionicons onPress={()=>handleCartItemDelete(item.$id)} name="trash-outline" size={22} color="#ef4444" />
              </TouchableOpacity>
            </View>   
          </View>
        ))}
        
        {/* Add some bottom padding */}
        <View className="h-32" />
      </ScrollView>

      {/* Bottom Checkout Section */}
      <View className="bg-white border-t border-gray-200 px-6 py-6 shadow-2xl">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-sm text-gray-500 mb-1">Total Amount</Text>
            <Text className="text-3xl font-bold text-gray-800">BDT {total.toFixed(2)}</Text>
          </View>
          <View className="bg-purple-50 rounded-xl px-4 py-2">
            <Text className="text-xs text-purple-600 font-medium mb-1">You save</Text>
            <Text className="text-lg font-bold text-purple-600">$0.00</Text>
          </View>
        </View>
        
        <TouchableOpacity className="bg-purple-600 rounded-xl py-4 items-center shadow-lg active:bg-purple-700">
          <View className="flex-row items-center">
            <Text className="text-white font-bold text-lg mr-2">Proceed to Checkout</Text>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}