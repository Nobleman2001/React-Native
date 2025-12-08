import React from "react";
import { FlatList, Text, View } from "react-native";

const demoCourses = [
  {
    title: "Machine Learning",
    courseDescription: "Hello Machine Learning",
    courseFee: 6000,
  },
  {
    title: "Artificial Intelligence",
    courseDescription: "Hello Artificial Intelligence",
    courseFee: 5000,
  },
  {
    title: "Cyber Security",
    courseDescription: "Hello Cyber Security",
    courseFee: 6000,
  },
];

export default function Recommend() {
  return (
    <View className="mx-5 mt-4">
      <Text className="text-2xl font-semibold mb-3">
        Recommended for <Text className="text-purple-600">you</Text>
      </Text>

      <FlatList
        data={demoCourses}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="w-64 mr-4 border bg-purple-500 border-gray-300 rounded-xl p-4 ">
            <Text className="text-lg font-semibold mb-1 text-white">{item.title}</Text>
            <Text className="text-white mb-2">{item.courseDescription}</Text>
            <Text className="text-white font-bold">৳ {item.courseFee}</Text>
          </View>
        )}
      />
    </View>
  );
}
