import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from "./context/theme";
import * as SplashScreen from 'expo-splash-screen';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabStack from './navigation/MainTabStack';
import AuthStack from './navigation/AuthStack';
import Toast from 'react-native-toast-message';
import TransactionInfoScreen from './screens/TransactionInfoScreen';

const Stack = createStackNavigator();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // State to track login status
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onReadyApp = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null; // Return null or a loading spinner while the app is not ready
  }

  return (
    <NavigationContainer onReady={onReadyApp}>
      <ThemeProvider>
        <Stack.Navigator>
            <>
              <Stack.Screen
                name="Main"
                component={MainTabStack}
                options={{ headerShown: false }} />
              <Stack.Screen
                name="TransactionInfoScreen"
                component={TransactionInfoScreen}
                options={{ title: 'Transaction Info' }} />
            </>
            <>
              <Stack.Screen
                name="Auth"
                component={AuthStack}
                options={{ headerShown: false }}
              />
            </>
        </Stack.Navigator>
      </ThemeProvider>
      {/* Global Toast */}
      <Toast />
    </NavigationContainer>
  );
}
