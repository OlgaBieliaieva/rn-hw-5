import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import StackNavigator from "./navigation/StackNavigator";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
  useEffect(() => {
    if (!fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#FF6C00" />;
  }

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
