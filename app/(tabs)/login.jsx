import Feather from "@expo/vector-icons/Feather";
import { Link, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../lib/authContext";

export default function Login() {
  const { signIn, user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useRouter();

  const handleLogin = async () => {
    try {
      await signIn(email, password);
    } catch (err) {
      // Convert error object to string
      setError(err.message || "An error occurred during login");
    }
  };
  useEffect(() => {
    if (user) {
      navigate.replace("/");
    }
  }, [user, navigate]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Back to home - positioned at top */}
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

      {/* Main content - centered */}
      <View className="flex-1 px-6 justify-center">
        <Text className="text-center text-3xl font-bold mb-8">Login</Text>

        <View className="mb-4">
          <Text className="mb-2 text-gray-700">Email</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 focus-within:border-blue-300"
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
            className="border border-gray-300 rounded-lg px-4 py-3 focus-within:border-blue-300"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {error && <Text className="text-red-500 mb-2">{error}</Text>}

        <TouchableOpacity className="self-end mb-6">
          <Text className="text-blue-600">Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogin} className="bg-black py-4 rounded-lg">
          <Text className="text-center text-white text-lg font-semibold">Login</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-center gap-2 my-5">
          <Text>Doesn&apos;t have any account?</Text>
          <Link href="/signup" className="border-b-2 text-blue-600 font-medium">
            Signup
          </Link>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
