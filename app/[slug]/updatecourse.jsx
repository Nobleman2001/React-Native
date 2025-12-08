import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCourse, updateCourse } from "../../lib/appwriteServices";

export default function UpdateCourse() {
  const router = useRouter();
  const { slug } = useLocalSearchParams(); 

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch single course
  const fetchCourse = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCourse(slug);
      setCourse(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch course");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (slug) fetchCourse();
  }, [slug, fetchCourse]);

  // Update course handler
  const handleUpdate = async () => {
    if (!course) return;

    setUpdating(true);
    try {
      await updateCourse(course.$id, course);
      Alert.alert("Success", "Course updated successfully!");
      router.back();
      
    } catch (error) {
      Alert.alert("Error", "Failed to update course");
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <Text className="text-center mt-10">Loading...</Text>;
  }

  if (!course) {
    return <Text className="text-center mt-10">Course not found</Text>;
  }

  return (
    <SafeAreaView className="flex-1 m-5">
      <View className="mb-5">
        <TouchableOpacity className="rounded-full flex-row items-center" onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" className="bg-gray-200 p-1 rounded-full" />
        </TouchableOpacity>
      </View>

      <Text className="text-center text-2xl font-semibold mb-5">Update Course Data</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mb-5">
          <Text className="mb-3">Course Title *</Text>
          <TextInput
            className="border py-3 px-5 rounded-sm border-gray-500"
            placeholder="Enter course title"
            value={course.courseTitle}
            onChangeText={(text) => setCourse({ ...course, courseTitle: text })}
          />
        </View>

        <View className="mb-5">
          <Text className="mb-3">Course Instructor *</Text>
          <TextInput
            className="border py-3 px-5 rounded-sm border-gray-500"
            placeholder="Enter instructor name"
            value={course.courseInstructor}
            onChangeText={(text) => setCourse({ ...course, courseInstructor: text })}
          />
        </View>

        <View className="mb-5">
          <Text className="mb-3">Duration (in weeks) *</Text>
          <TextInput
            className="border py-3 px-5 rounded-sm border-gray-500"
            placeholder="e.g., 12"
            value={String(course.durationWeeks)}
            onChangeText={(text) => setCourse({ ...course, durationWeeks: Number(text) })}
            keyboardType="numeric"
          />
        </View>

        <View className="mb-5">
          <Text className="mb-3">Description *</Text>
          <TextInput
            placeholder="Enter course description"
            className="border py-3 px-5 rounded-sm border-gray-500"
            value={course.description}
            onChangeText={(text) => setCourse({ ...course, description: text })}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity
          className={`bg-purple-700 px-5 py-3 rounded text-center ${updating ? "opacity-50" : ""}`}
          disabled={updating}
          onPress={handleUpdate}>
          <Text className="text-white text-center font-semibold">{updating ? "Updating..." : "Save Changes"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
