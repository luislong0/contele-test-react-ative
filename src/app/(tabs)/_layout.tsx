import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../../store";
import { MaterialIcons } from "@expo/vector-icons";

export default function TabRoutesLayout() {
  return (
    <ReduxProvider store={store}>
      <StatusBar style="dark" translucent={true} />

      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="status"
          options={{
            title: "Status",
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="list-alt" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </ReduxProvider>
  );
}