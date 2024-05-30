import React from 'react';
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, ImageBackground } from "react-native";
import backgroundImage from '../assets/photos/bg.png';

export default function Layout({ children, containerStyle, isBackgroundImage = false }) {
  return (
    //  Fix extra space for StatusBar in the Top side
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <StatusBar style="auto" />
      {isBackgroundImage ?
        <ImageBackground style={[styles.imageContainer, containerStyle]} source={backgroundImage}>{children}
        </ImageBackground> :
        <View style={[styles.container, containerStyle]}>{children}
        </View>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#d5dde8",
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  imageContainer: {
    flex: 1,
    ...StyleSheet.absoluteFillObject, // Ensures the image covers the entire screen
  }
});