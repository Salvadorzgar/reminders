import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Colors } from "@/constants/Colors";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: Colors.mainColor }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "To do",
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                    headerShown: false,
                }}    
            />
            <Tabs.Screen
                name="completed"
                options={{
                    title: "Completed",
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                    headerShown: false,
                }}
            />
        </Tabs>
    )
}