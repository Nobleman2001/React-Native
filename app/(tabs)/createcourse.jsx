import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createCourse } from "../../lib/appwriteServices";

export default function CreateCourse() {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseInstructor, setCourseInstructor] = useState("");
  const [durationWeeks, setDurationWeeks] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateCourse = async () => {
    // Validate inputs
    if (!courseTitle.trim()) {
      Alert.alert("Error", "Please enter a course title");
      return;
    }
    if (!courseInstructor.trim()) {
      Alert.alert("Error", "Please enter an instructor name");
      return;
    }
    if (!durationWeeks.trim()) {
      Alert.alert("Error", "Please enter the duration in weeks");
      return;
    }

    // Validate that duration is a valid number
    const weeksNum = parseInt(durationWeeks.trim());
    if (isNaN(weeksNum) || weeksNum <= 0) {
      Alert.alert("Error", "Please enter a valid number of weeks");
      return;
    }

    if (!description.trim()) {
      Alert.alert("Error", "Please enter a description");
      return;
    }

    // Create course object
    const courseData = {
      courseTitle: courseTitle.trim(),
      courseInstructor: courseInstructor.trim(),
      durationWeeks: weeksNum, 
      description: description.trim(),
  
    };

    try {
      await createCourse(courseData);
      Alert.alert("Success", "Course created successfully!");

      // Reset form
      setCourseTitle("");
      setCourseInstructor("");
      setDurationWeeks("");
      setDescription("");
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to create course");
    }
  };

  return (
    <SafeAreaView>
      <ScrollView className="mx-5 my-5">
        <Text className="text-center text-2xl font-semibold mb-10">Create New Course</Text>

        <View className="mb-5">
          <Text className="mb-3">Course Title *</Text>
          <TextInput
            className="border py-3 px-5 rounded-sm border-gray-500"
            placeholder="Enter course title"
            value={courseTitle}
            onChangeText={setCourseTitle}
          />
        </View>

        <View className="mb-5">
          <Text className="mb-3">Course Instructor *</Text>
          <TextInput
            className="border py-3 px-5 rounded-sm border-gray-500"
            placeholder="Enter instructor name"
            value={courseInstructor}
            onChangeText={setCourseInstructor}
          />
        </View>

        <View className="mb-5">
          <Text className="mb-3">Duration (in weeks) *</Text>
          <TextInput
            className="border py-3 px-5 rounded-sm border-gray-500"
            placeholder="e.g., 12"
            value={durationWeeks}
            onChangeText={setDurationWeeks}
            keyboardType="numeric"
          />
        </View>

        <View className="mb-5">
          <Text className="mb-3">Description *</Text>
          <TextInput
            placeholder="Enter course description"
            className="border py-3 px-5 rounded-sm border-gray-500"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity onPress={handleCreateCourse}>
          <Text className="bg-purple-700 py-5 text-center text-white">Create Course</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
