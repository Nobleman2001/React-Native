// fetch all data from the appwrite Databases
import { ID } from "react-native-appwrite";
import { appwriteConfig, databases } from "../lib/appwrite";
export const getAllCourses = async () => {
  try {
    const response = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.courseCollectionID);
    return response.documents;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};
// Create a new course
export const createCourse = async (courseData) => {
  try {
    const response = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.courseCollectionID,
      ID.unique(),
      courseData
    );
    return response;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

// update the course data
export const updateCourse = async (courseId, courseData) => {
  try {
    const response = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.courseCollectionID,
      courseId,
      courseData
    );
    return response;
  } catch (error) {
    console.error("Error updateding course", error);
    throw error;
  }
};

// delete the course data
export const deleteCourse = async (courseId) => {
  try {
    const response = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.courseCollectionID,
      courseId
    );
    return response;
  } catch (error) {
    console.error("Error deleting course", error);
    throw error;
  }
};

// get single course
export const getCourse = async (courseId) => {
  try {
    const response = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.courseCollectionID,
      courseId
    );
    return response;
  } catch (error) {
    console.error("Failed to load data", error);
    throw error;
  }
};
