import { useColorScheme } from "@/hooks/use-color-scheme";
import { AuthProvider } from "@/lib/authContext";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Drawer screenOptions={{ headerShown: false }}>
          <Drawer.Screen name="(tabs)" />
        </Drawer>

        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
