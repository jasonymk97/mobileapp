import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>About Budget Manager</Text>
      <Text style={styles.text}>This app helps you manage your budget by tracking your expenses.</Text>
      <Text style={styles.text}>Open Source Licenses:</Text>
      <Text style={styles.text}>1. React Native</Text>
      <Text style={styles.text}>2. Axios</Text>
      {/* Add other licenses here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
});
