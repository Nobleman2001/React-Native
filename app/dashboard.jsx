import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { deleteCourse, getAllCourses } from "../lib/appwriteServices";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

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

  useEffect(() => {
    fetchCourses();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCourses();
    setRefreshing(false);
  };
  const handleDelete = async (courseId) => {
    Alert.alert("Delete Course", "Are you sure you want to delete this course?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteCourse(courseId);
            setCourses((prev) => prev.filter((course) => course.$id !== courseId));
          } catch (error) {
            console.error("Error delete course", error);
            Alert.alert("Error", "Failed to delete course");
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 m-5">
      <View className="mb-5">
        <TouchableOpacity className="rounded-full flex-row items-center" onPress={() => router.replace("/")}>
          <Ionicons name="chevron-back" size={24} color="black" className="bg-gray-200 p-1 rounded-full" />
        </TouchableOpacity>
      </View>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#7c3aed"]} />}
        showsVerticalScrollIndicator={false}>
        <Text className="text-2xl font-bold mb-4">Udemy</Text>

        {loading && <Text className="text-center">Loading courses...</Text>}

        {!loading && courses.length === 0 && <Text>No courses found</Text>}

        <View>
          {!loading &&
            courses.map((course) => (
              <View key={course.$id} className="mb-4 p-4 rounded-lg bg-purple-100 border border-purple-400 ">
                <Text className="text-lg font-semibold mb-2">{course.courseTitle}</Text>
                <Text className="text-gray-600 mb-2">{course.description}</Text>
                <Text className="mb-2">Duration: {course.durationWeeks} weeks</Text>
                <Text>Instructor: {course.courseInstructor}</Text>
                <View className="my-5">
                  <TouchableOpacity className="flex-row gap-4 items-center">
                    <Text
                      onPress={() => router.push(`/${course.$id}/updatecourse`)}
                      className="bg-green-700 px-5 py-2 text-white">
                      Edit
                    </Text>

                    <Text onPress={() => handleDelete(course.$id)} className="bg-red-700 px-5 py-2 text-white">
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
