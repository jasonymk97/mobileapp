import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const GoalItem = ({ icon, iconColor, text }) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name={icon} size={16} color={iconColor} style={{ marginRight: 5 }} />
      <Text>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 5,
  },
});

export default GoalItem;
