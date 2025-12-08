import { AuthContext } from "@/lib/authContext";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useContext, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
  const { signUp } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    try {
      await signUp(email, password);
      
    } catch (error) {
      setError(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 pt-4 pb-6">
        <Link href="/" asChild>
          <TouchableOpacity className="flex-row items-center gap-2 self-start">
            <View className="bg-gray-100 p-2 rounded-full">
              <Feather name="arrow-left" size={20} color="black" />
            </View>
            <Text className="text-base font-medium text-gray-700">Back to home</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View className="flex-1 justify-center px-6">
        <Text className="text-center text-3xl font-bold mb-8">Sign up</Text>

        <View className="mb-4">
          <Text className="mb-2 text-gray-700">Email</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View className="mb-2">
          <Text className="mb-2 text-gray-700">Password</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        {error && <Text className="text-red-700">{error}</Text>}

        <TouchableOpacity onPress={handleLogin} className="bg-purple-700 py-4 rounded-lg mt-5">
          <Text className="text-center text-white text-lg font-semibold">Signup</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center gap-2 justify-center my-5">
          <Text className="text-center ">Already Have Account? </Text>
          <Link href="/login" className="border-b-2 text-purple-700-600 font-medium">
            Login
          </Link>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
