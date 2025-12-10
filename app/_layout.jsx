import { useColorScheme } from "@/hooks/use-color-scheme";
import { AuthProvider } from "@/lib/authContext";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../global.css";
import DrawerNavigator from '../components/navigation/DrawerNavigator';


export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Drawer
          drawerContent={(props) => <DrawerNavigator {...props} />}
          screenOptions={{
            headerShown: false,
            drawerType: "front",
            overlayColor: "rgba(0, 0, 0, 0.5)",
            drawerStyle: {
              width: 280,
            },
          }}>
          <Drawer.Screen name="(tabs)" options={{ drawerLabel: "Home" }} />
          <Drawer.Screen name="dashboard" options={{ drawerLabel: "Dashboard" }} />
        </Drawer>

        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}