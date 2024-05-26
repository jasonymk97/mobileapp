import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from "../context/theme";

export default function SettingsScreen() {
  const { isLargeText, setIsLargeText } = useTheme();

  const toggleFontSize = async () => {
    await AsyncStorage.setItem("isLargeText", JSON.stringify(!isLargeText));
    setIsLargeText(!isLargeText);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <View style={styles.setting}>
        <Text style={styles.text}>Large Font</Text>
        <Switch value={isLargeText} onValueChange={toggleFontSize} />
      </View>
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
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
  },
});
