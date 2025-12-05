import {Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  return (
    <SafeAreaView className="items-center justify-center px-6">
      <View className="items-center  py-10">
        <Text className="text-2xl font-bold text-gray-800 text-center">Explore the best E-learning platform.</Text>
        <Text className="text-base text-gray-500 text-center px-4 leading-relaxed">
          Discover skills, grow your career, and unlock endless opportunities with expert-led courses created for
          curious minds.
        </Text>
      </View>

      {/* Courses */}
      <View>
        <Text>Our Courses</Text>
      </View>
    </SafeAreaView>
  );
}
