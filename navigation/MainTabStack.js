import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import { useTheme } from '../context/theme';
import CommonStyles from '../style/CommonStyles';
const Tab = createBottomTabNavigator();

export default function MainTabStack() {
    const { theme } = useTheme();
    return (
        <Tab.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: CommonStyles.colorStyles[theme.color],
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: CommonStyles.textSizeStyles[theme.textSize].fontSize,
                },
                tabBarActiveTintColor: CommonStyles.colorStyles[theme.color], // Active tab color
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="About"
                component={AboutScreen}
                options={{
                    tabBarLabel: 'About',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="book" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Analytics"
                component={AnalyticsScreen}
                options={{
                    tabBarLabel: 'Analytics',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="analytics" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings-sharp" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}