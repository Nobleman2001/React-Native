import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAllCourses } from "../../lib/appwriteServices";

export default function TabTwoScreen() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch courses on component mount
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await getAllCourses();
      setCourses(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch courses. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Pull to refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCourses();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-gray-50 to-purple-50">
      <ScrollView
        className="flex-1"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#7c3aed"]} />}
        showsVerticalScrollIndicator={false}>
        {/* Header with Icon */}
        <View className="items-center pt-8 pb-6 px-6">
          <Text className="text-3xl font-bold ">Our Courses</Text>
        </View>

        {/* Courses Section */}
        <View className="px-6 pb-6">
          {loading ? (
            // Loading State
            <View className="items-center justify-center py-20">
              <ActivityIndicator size="large" color="#7c3aed" />
              <Text className="text-gray-600 mt-4 text-base font-medium">Loading courses...</Text>
            </View>
          ) : courses.length === 0 ? (
            // Empty State
            <View className="items-center justify-center py-20 bg-white rounded-3xl shadow-sm">
              <Text className="text-6xl mb-4">📚</Text>
              <Text className="text-gray-700 text-center text-xl font-bold mb-2">No courses available yet</Text>
              <Text className="text-gray-500 text-center">Check back soon for new courses!</Text>
            </View>
          ) : (
            // Courses List
            <View className="gap-5">
              {courses.map((course, index) => (
                <TouchableOpacity
                  key={course.$id}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-50"
                  activeOpacity={0.8}
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 12,
                    elevation: 5,
                  }}>
                  {/* Category Badge */}
                  {course.category && (
                    <View className="absolute top-5 right-5 z-10">
                      <View className="bg-purple-600 px-4 py-2 rounded-full shadow-md">
                        <Text className="text-white text-xs font-bold tracking-wide">{course.category}</Text>
                      </View>
                    </View>
                  )}

                  {/* Card Content */}
                  <View className="p-6">
                    {/* Title */}
                    <Text className="text-2xl font-bold text-gray-900 mb-3 pr-28 leading-tight">
                      {course.courseTitle}
                    </Text>
                    <Text>{course.$id}</Text>

                    {/* Description */}
                    {course.description && (
                      <Text className="text-sm text-gray-600 mb-5 leading-relaxed" numberOfLines={2}>
                        {course.description}
                      </Text>
                    )}

                    {/* Info Grid */}
                    <View className="gap-3">
                      {/* Instructor */}
                      {course.courseInstructor && (
                        <View className="flex-row items-center gap-3 bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-2xl">
                          <View className="bg-white w-12 h-12 rounded-xl items-center justify-center shadow-sm">
                            <Feather name="user" size={24} color="black" />
                          </View>
                          <View className="flex-1">
                            <Text className="text-xs text-purple-600 font-semibold mb-1">INSTRUCTOR</Text>
                            <Text className="text-sm font-bold text-gray-900">{course.courseInstructor}</Text>
                          </View>
                        </View>
                      )}

                      {/* Duration and Fee Row */}
                      <View className="flex-row gap-3">
                        {/* Duration */}
                        {course.durationWeeks && (
                          <View className="flex-1 bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-2xl">
                            <View className="flex-row items-center gap-2 mb-2">
                              <View className="bg-white w-12 h-12 rounded-xl items-center shadow-sm justify-center">
                                <Ionicons name="time-outline" size={24} color="black" />
                              </View>
                              <View className="flex-col gap-1 px-1">
                                <Text className="text-purple-600 text-sm font-bold">Duration</Text>
                                <Text className="text-sm font-bold text-gray-900">{course.durationWeeks} weeks </Text>
                              </View>
                            </View>
                          </View>
                        )}

                        {/* Fee */}
                        {course.courseFee && (
                          <View className="flex-1 bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-2xl">
                            <View className="flex-row items-center gap-2 mb-2">
                              <View className="bg-white w-8 h-8 rounded-lg items-center justify-center">
                                <Text className="text-base">💳</Text>
                              </View>
                              <Text className="text-xs text-green-600 font-semibold">FEE</Text>
                            </View>
                            <Text className="text-sm font-bold text-gray-900">৳{course.courseFee}</Text>
                          </View>
                        )}
                      </View>

                      {/* Ratings */}
                      {course.ratings && (
                        <View className="flex-row items-center gap-3 bg-gradient-to-r from-amber-50 to-yellow-100 p-4 rounded-2xl">
                          <View className="bg-white w-12 h-12 rounded-xl items-center justify-center shadow-sm">
                            <Text className="text-xl">⭐</Text>
                          </View>
                          <View className="flex-1">
                            <Text className="text-xs text-amber-600 font-semibold mb-1">STUDENTS ENROLLED</Text>
                            <Text className="text-sm font-bold text-gray-900">{course.ratings}+ students</Text>
                          </View>
                        </View>
                      )}
                    </View>

                    {/* CTA Button */}
                    <TouchableOpacity
                      className="bg-purple-600 mt-5 py-4 rounded-2xl items-center justify-center shadow-lg"
                      activeOpacity={0.8}>
                      <Text className="text-white font-bold text-base">Start Learning →</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
