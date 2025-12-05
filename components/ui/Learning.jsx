import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Learning() {
  const progress = 0.6; 

  return (
    <View style={styles.card} className="my-5">
      <Text style={styles.title}>Continues Learning</Text>
      <Text style={styles.courseName}>Learn Figma for UI/UX Design</Text>
      <Text style={styles.lectures}>95 Lectures</Text>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
      </View>
      <View className="my-5">
        <TouchableOpacity className="flex-row items-center">
          <Text className="bg-purple-500 text-white px-5 py-3 rounded-lg">Resume</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  title: {
    color: "#4B0082",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  courseName: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 5,
  },
  lectures: {
    color: "#666",
    marginBottom: 10,
  },
  progressBarContainer: {
    height: 10,
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 5,
  },
});
