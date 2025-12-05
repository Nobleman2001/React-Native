import { Text, View } from "react-native";
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
    courseInstructor: "Jihad  Islam",
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
    <SafeAreaView className="my-5">
      <View className="mx-4">
        <Text className="my-5 text-2xl font-bold text-center" style={{ fontFamily: "Poppins" }}>
          My Learning
        </Text>
        <Text className="text-xl">Your enrolled course are...</Text>

        <View className='flex-col gap-4'>
          {courses.map((course, index) => {
            return (
              <View key={index} className='border border-gray-300 py-5 px-5'>
                <Text>{course.title}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}
