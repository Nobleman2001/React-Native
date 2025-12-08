import { AuthContext } from "@/lib/authContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { account } from "../../lib/appwrite";

export default function Account() {
  const { user, signOut } = useContext(AuthContext);
  const router = useRouter();

  const [expandedSection, setExpandedSection] = useState(null);
  // Form states — start EMPTY (we will fill them in useEffect)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (user) {
      const parts = user.name?.trim()?.split(" ") || [];
      setFirstName(parts[0] || "");
      setLastName(parts.slice(1).join(" ") || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
      router.replace("/login");
    }
  };

  const handleSaveProfile = async () => {
    try {
      const currentUser = await account.get();
      const fullName = `${firstName} ${lastName}`.trim();
      if (fullName !== currentUser.name) {
        await account.updateName({ name: fullName });
      }
      setFirstName("");
      setLastName("");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      return;
    }

    if (newPassword.length < 8) {
      return;
    }

    try {
      await account.updatePassword(newPassword, currentPassword);
      Alert.alert("Success", "Password changed!");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setExpandedSection(null);
    } catch (error) {
      console.error("Password error:", error);
    }
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const InfoRow = ({ icon, label, value }) => (
    <View className="flex-row items-center py-4 border-b border-gray-200 dark:border-gray-700">
      <View className="w-10">
        <MaterialIcons name={icon} size={24} color="#6B7280" />
      </View>
      <View className="flex-1">
        <Text className="text-xs text-gray-500 dark:text-gray-400">{label}</Text>
        <Text className="text-base text-gray-900 dark:text-gray-100 font-medium">{value || "Not provided"}</Text>
      </View>
    </View>
  );

  const AccordionItem = ({ icon, label, isExpanded, onPress, children }) => (
    <View className="border-b border-gray-200 dark:border-gray-700">
      <TouchableOpacity onPress={onPress} className="flex-row items-center justify-between py-4">
        <View className="flex-row items-center">
          <View className="w-10">
            <MaterialIcons name={icon} size={24} color="#6B7280" />
          </View>
          <Text className="text-base text-gray-900 dark:text-gray-100">{label}</Text>
        </View>
        <MaterialIcons name={isExpanded ? "expand-less" : "expand-more"} size={24} color="#9CA3AF" />
      </TouchableOpacity>

      {isExpanded && <View className="pb-4 px-4">{children}</View>}
    </View>
  );

  const ActionButton = ({ icon, label, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
      <View className="flex-row items-center">
        <View className="w-10">
          <MaterialIcons name={icon} size={24} color="#6B7280" />
        </View>
        <Text className="text-base text-gray-900 dark:text-gray-100">{label}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#9CA3AF" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <View className="mx-4">
        <TouchableOpacity
          className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
          onPress={() => router.replace("/")}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Header */}
        <View className="items-center py-8 border-b border-gray-200 dark:border-gray-700">
          <View className="w-24 h-24 rounded-full bg-blue-500 items-center justify-center mb-4">
            <Text className="text-white text-4xl font-bold">{user?.name?.charAt(0)?.toUpperCase() || "U"}</Text>
          </View>
          <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100">{user?.name || "User"}</Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Member since {user?.$createdAt ? new Date(user.$createdAt).toLocaleDateString() : "Recently"}
          </Text>
        </View>

        {/* Personal Info */}
        <View className="px-5 mt-6">
          <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Personal Information</Text>
          <View className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 px-4">
            <InfoRow icon="person" label="Full Name" value={user?.name} />
            <InfoRow icon="email" label="Email" value={user?.email} />
          </View>
        </View>

        {/* Account Settings */}
        <View className="px-5 mt-6">
          <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Account Settings</Text>
          <View className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 px-4">
            {/* Edit Profile */}
            <AccordionItem
              icon="edit"
              label="Edit Profile"
              isExpanded={expandedSection === "editProfile"}
              onPress={() => toggleSection("editProfile")}>
              <View className="mt-2">
                {/* First Name */}
                <View className="mb-4">
                  <Text className="text-sm text-gray-600 dark:text-gray-400 mb-2">First Name</Text>
                  <TextInput
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="First name"
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900"
                  />
                </View>

                {/* Last Name */}
                <View className="mb-4">
                  <Text className="text-sm text-gray-600 dark:text-gray-400 mb-2">Last Name</Text>
                  <TextInput
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="Last name"
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900"
                  />
                </View>

                {/* Email */}
                <View className="mb-4">
                  <Text className="text-sm text-gray-600 dark:text-gray-400 mb-2">Email</Text>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900"
                  />
                </View>

                {/* Phone */}
                <View className="mb-4">
                  <Text className="text-sm text-gray-600 dark:text-gray-400 mb-2">Phone Number</Text>
                  <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    placeholder="Phone number"
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900"
                  />
                </View>

                <View className="flex-row gap-3">
                  <TouchableOpacity
                    onPress={() => setExpandedSection(null)}
                    className="flex-1 bg-gray-200 dark:bg-gray-700 py-3 rounded-lg items-center">
                    <Text className="text-gray-900 dark:text-gray-100 font-semibold">Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleSaveProfile}
                    className="flex-1 bg-blue-500 py-3 rounded-lg items-center">
                    <Text className="text-white font-semibold">Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </AccordionItem>

            {/* Change Password */}
            <AccordionItem
              icon="lock"
              label="Change Password"
              isExpanded={expandedSection === "changePassword"}
              onPress={() => toggleSection("changePassword")}>
              <View className="mt-2">
                {/* Current Password */}
                <View className="mb-4">
                  <Text className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Password</Text>
                  <TextInput
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    secureTextEntry
                    placeholder="Current password"
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900"
                  />
                </View>

                {/* New Password */}
                <View className="mb-4">
                  <Text className="text-sm text-gray-600 dark:text-gray-400 mb-2">New Password</Text>
                  <TextInput
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry
                    placeholder="New password"
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900"
                  />
                </View>

                {/* Confirm Password */}
                <View className="mb-4">
                  <Text className="text-sm text-gray-600 dark:text-gray-400 mb-2">Confirm New Password</Text>
                  <TextInput
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    placeholder="Confirm password"
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900"
                  />
                </View>

                <View className="flex-row gap-3">
                  <TouchableOpacity
                    onPress={() => setExpandedSection(null)}
                    className="flex-1 bg-gray-200 dark:bg-gray-700 py-3 rounded-lg items-center">
                    <Text className="text-gray-900 dark:text-gray-100 font-semibold">Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleChangePassword}
                    className="flex-1 bg-blue-500 py-3 rounded-lg items-center">
                    <Text className="text-white font-semibold">Update</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </AccordionItem>

            {/* Others */}
            <ActionButton icon="notifications" label="Notifications" onPress={() => {}} />
            <ActionButton icon="privacy-tip" label="Privacy Settings" onPress={() => {}} />
          </View>
        </View>

        <View className='mx-5 my-5'>
          <TouchableOpacity>
            <Text onPress={()=>router.replace('/dashboard')} className='text-lg font-bold '>Dashboard</Text>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <View className="px-5 mt-8 mb-8">
          <TouchableOpacity onPress={handleLogout} className="bg-red-500 py-4 rounded-lg items-center">
            <Text className="text-white font-semibold">Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
