import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { useTheme } from '../context/theme';
import CommonStyles from '../style/CommonStyles';

const Stack = createStackNavigator();

export default function AuthStack() {
    const { theme } = useTheme();
    return (
        <Stack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: CommonStyles.colorStyles[theme.color],
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: CommonStyles.textSizeStyles[theme.textSize].fontSize,
            },
        }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
}