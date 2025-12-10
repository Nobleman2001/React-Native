import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import course_image from "../assets/courseInstructor/Course.png";
import courseInstructor from "../assets/courseInstructor/course_instructor.avif";
import inspire_image from "../assets/courseInstructor/creativity.png";
import curriculum_Image from "../assets/courseInstructor/curriculum.jpg";
import reward_image from "../assets/courseInstructor/rewards.png";
import learn_image from "../assets/courseInstructor/teachings.png";
import video_image from "../assets/courseInstructor/Video.jpeg";

// reasons data
const reasons = [
  {
    title: "Teach your way",
    des: "Publish the course you want, in the way you want, and always have control of your own content.",
    img: learn_image,
  },
  {
    title: "Inspire learners",
    des: "Teach what you know and help learners explore their interests, gain new skills, and advance their careers.",
    img: inspire_image,
  },
  {
    title: "Get rewarded",
    des: "Expand your professional network, build your expertise, and earn money on each paid enrollment.",
    img: reward_image,
  },
];

// statistic Data

const statistics = [
  {
    title: "80M",
    category: "Students",
  },
  {
    title: "75+",
    category: "Languages",
  },
  {
    title: "1.1B",
    category: "Enrollments",
  },
  {
    title: "180+",
    category: "Countries",
  },
  {
    title: "17,200+",
    category: "Enterprise Customers",
  },
];

// Accordian Data
const accordions = [
  {
    title: "Record your video",
    img: video_image,
  },
  {
    title: "Launch your course",
    img: course_image,
  },
];

export default function BecomeAnInstructor() {
  const router = useRouter();
  const [openId, setOpenId] = useState(null);

  // handler function for handle accordian
  const handleAccordion = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <SafeAreaView className="">
      {/* Top View */}
      <ScrollView>
        <View className="flex-row items-center  ">
          <TouchableOpacity
            className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
            onPress={() => router.replace("/")}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="mx-5 text-2xl">Become an Instructor</Text>
        </View>

        {/* Banner View */}
        <View className="my-10 items-center">
          <Image source={courseInstructor} className="w-full h-[350px]" resizeMode="cover" />
        </View>

        {/*  */}
        <View className="mx-5">
          <Text className="text-3xl font-semibold mb-4">Come tech with us</Text>
          <Text className="text-xl text-gray-700 font-light mb-5">
            Become an instructor and change lives - including your own
          </Text>
          <TouchableOpacity className="flex-row items-center justify-center rounded-md bg-purple-700 ">
            <Text className="text-white py-4 font-semibold">Get Started</Text>
          </TouchableOpacity>
        </View>

        {/* Reason to start */}
        <View className="mx-5 my-20">
          <Text className="text-2xl text-center mb-10 font-semibold">So many reasons to start</Text>
          <View className="flex-col gap-10">
            {reasons.map((reason, index) => (
              <View key={index} className="flex-col items-center justify-center gap-8">
                <Image source={reason.img} className="w-[100px] h-[100px]" resizeMode="cover" />
                <View className="flex-col gap-3">
                  <Text className="text-center font-semibold text-lg">{reason.title}</Text>
                  <Text className="w-[300px] text-center text-gray-700 font-light">{reason.des}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Statistic */}
        <View className="flex-row  gap-20 flex-wrap items-center justify-center bg-purple-700 px-5 py-10 ">
          {statistics.map((statistic, index) => (
            <View key={index} className="">
              <Text className="text-4xl text-white">{statistic.title}</Text>
              <Text className="text-white">{statistic.category}</Text>
            </View>
          ))}
        </View>

        {/* How to begin  */}
        <View className="mx-5">
          <Text className="text-center my-10 text-3xl font-semibold">How to begin</Text>
          <View className="border border-gray-400 mb-5"></View>
          <View>
            <Text className="text-xl font-semibold ">Plan your curriculum</Text>
            <Image source={curriculum_Image} className="w-full h-[200px] my-10 rounded-md" resizeMode="cover" />
            <Text className="text-wrap text-md font-light text-gray-700">
              You start with your passion and knowledge. Then choose a promising topic with the help of our Marketplace
              insights tool. The way that you teach - what you bring to it - it up to you.
            </Text>
          </View>
        </View>

        {/* How we help you */}
        <View className="mx-5 my-10">
          <Text className="text-xl font-semibold mb-3">How we help you</Text>
          <Text className="font-light text-gray-700">
            We offer plenty of resources on how to create your first course. And, our instructor dashboard and
            curriculum pages help keep you organized.
          </Text>
        </View>

        {/* Accordian */}

        <View className="mx-5">
          {accordions.map((accordion, index) => (
            <View key={index} className="mb-4">
              <TouchableOpacity
                onPress={() => handleAccordion(index)}
                className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold">{accordion.title}</Text>

                <MaterialIcons
                  name={openId === index ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>

              {openId === index && (
                <Image source={accordion.img} resizeMode="cover" className="w-full h-[200px] mt-3 rounded-lg" />
              )}
            </View>
          ))}
        </View>

        {/* Become an instructor  */}
        <View className=" flex-col items-center justify-center my-10 bg-gray-200 px-5 py-10">
          <Text className="mb-5 text-2xl font-semibold">Become an instructor today</Text>
          <Text className="text-gray-700 font-light text-lg">
            Join one of the world&apos;s largest learning marketplaces
          </Text>
          <TouchableOpacity className="w-full rounded-md bg-purple-700 mt-8">
            <Text className="text-white py-4 text-center font-semibold ">Get Started</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
