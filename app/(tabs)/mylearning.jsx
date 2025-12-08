import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const courses = [
  {
    title: "Machine learning",
    courseDuration: "6 Months",
    courseFee: 6000,
    courseInstructor: "Jesmin Chakma",
    ratings: 1000,
    category: "Best Seller",
  },
  {
    title: "Data Structure and Algorithm",
    courseDuration: "6 Months",
    courseFee: 4000,
    courseInstructor: "Jihad Islam",
    ratings: 500,
    category: "Best Seller",
  },
  {
    title: "Cyber Security",
    courseDuration: "6 Months",
    courseFee: 5000,
    courseInstructor: "Afique Islam",
    ratings: 300,
    category: "Best Seller",
  },
];

export default function MyLearning() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="mx-4 my-5">
          {/* Header */}
          <View className="mb-8">
            <Text className="text-3xl font-bold text-gray-800 mb-2" style={{ fontFamily: "Poppins" }}>
              My Learning
            </Text>
            <Text className="text-base text-gray-600">Your enrolled courses</Text>
          </View>

          {/* Course Cards */}
          <View className="gap-5 mb-6">
            {courses.map((course, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                  activeOpacity={0.7}>
                  {/* Category Badge */}
                  <View className="absolute top-4 right-4 bg-purple-600 px-3 py-1.5 rounded-full z-10">
                    <Text className="text-white text-xs font-semibold">{course.category}</Text>
                  </View>

                  {/* Card Content */}
                  <View className="p-5">
                    {/* Title */}
                    <Text className="text-xl font-bold text-gray-800 mb-4 pr-24">{course.title}</Text>

                    {/* Info Sections */}
                    <View className="gap-3 mb-5">
                      {/* Instructor */}
                      <View className="flex-row items-center gap-3 bg-purple-50 p-3 rounded-xl">
                        <View className="bg-purple-200 w-10 h-10 rounded-lg items-center justify-center">
                          <Feather name="user" size={24} color="black" />
                        </View>
                        <View className="flex-1">
                          <Text className="text-xs text-gray-500">Instructor</Text>
                          <Text className="text-sm font-semibold text-gray-800">{course.courseInstructor}</Text>
                        </View>
                      </View>

                      {/* Duration and Fee Row */}
                      <View className="flex-row gap-3">
                        {/* Duration */}
                        <View className="flex-1 flex-row items-center gap-3 bg-blue-50 p-3 rounded-xl">
                          <View className="bg-blue-200 w-10 h-10 rounded-lg items-center justify-center">
                            <MaterialCommunityIcons name="clock-time-five-outline" size={24} color="black" />
                          </View>
                          <View className="flex-1">
                            <Text className="text-xs text-gray-500">Duration</Text>
                            <Text className="text-sm font-semibold text-gray-800">{course.courseDuration}</Text>
                          </View>
                        </View>

                        {/* Fee */}
                        <View className="flex-1 flex-row items-center gap-3 bg-green-50 p-3 rounded-xl">
                          <View className="bg-green-200 w-10 h-10 rounded-lg items-center justify-center">
                            <Text className="text-green-700 font-bold">💰</Text>
                          </View>
                          <View className="flex-1">
                            <Text className="text-xs text-gray-500">Fee</Text>
                            <Text className="text-sm font-semibold text-gray-800">৳{course.courseFee}</Text>
                          </View>
                        </View>
                      </View>

                      {/* Ratings */}
                      <View className="flex-row items-center gap-3 bg-yellow-50 p-3 rounded-xl">
                        <View className="bg-yellow-200 w-10 h-10 rounded-lg items-center justify-center">
                          <EvilIcons name="star" size={24} color="black" />
                        </View>
                        <View className="flex-1">
                          <Text className="text-xs text-gray-500">Students Enrolled</Text>
                          <Text className="text-sm font-semibold text-gray-800">{course.ratings}+ students</Text>
                        </View>
                      </View>
                    </View>

                    {/* Action Button */}
                    <TouchableOpacity className="bg-purple-600 py-3.5 rounded-xl items-center justify-center">
                      <Text className="text-white font-bold text-base">Continue Learning →</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
