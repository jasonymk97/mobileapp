import React from 'react';
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";

export default function Layout({ children }) {
  return (
    //  Fix extra space for StatusBar in the Top side
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <StatusBar style="auto" />
      <View style={styles.container}>{children}</View>
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
});