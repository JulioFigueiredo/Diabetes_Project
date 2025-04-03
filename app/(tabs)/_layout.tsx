import { PaperProvider } from "react-native-paper";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <PaperProvider>
      <Tabs
        screenOptions={{
          tabBarStyle: { backgroundColor: "#62B6CB" },
          tabBarActiveTintColor: "#FFF",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Registrar",
            tabBarIcon: ({ color }) => <MaterialIcons name="edit" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: "Histórico",
            tabBarIcon: ({ color }) => <MaterialIcons name="history" size={24} color={color} />,
          }}
        />
      </Tabs>
    </PaperProvider>
  );
}
