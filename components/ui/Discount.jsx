import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Discount() {
  return (
    <View className="mx-4 my-5">
      <View style={{ fontFamily: "Poppins" }} className="border bg-purple-500 border-purple-300 rounded-lg py-5 px-5">
        <Text className="text-white mb-2 text-2xl font-bold">
          Get <Text className="font-extrabold">50%</Text> Discount on Every Course
        </Text>
        <Text className="text-white text-lg mb-2">Limited Offer</Text>
        <TouchableOpacity className="flex-row items-center">
          <Text className="font-bold  border border-white px-4 py-2 bg-white text-black rounded-lg">Get Offer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
