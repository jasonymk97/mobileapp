import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const DescriptionSection = ({ title, iconColor, children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="account-balance-wallet" size={24} color={iconColor} style={{ marginRight: 5 }} />
        <Text style={styles.title}>{title}</Text>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
});

export default DescriptionSection;
