import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '../components/Layout';
import LicenseList from '../components/about/LicenseList';
import { MaterialIcons } from '@expo/vector-icons';

export default function AboutScreen() {
  return (
    <Layout>
      <View style={styles.description}>
        <View style={{ flexDirection: 'row', marginBottom: 20}}>
          <MaterialIcons name="account-balance-wallet" size={24} color="purple" style={{marginRight: 5}}/>
          <Text style={styles.subtitle}>Budget Management App</Text>
        </View>

        <View style={styles.goals}>
        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
          <MaterialIcons name="attach-money" size={16} color="green" style={{ marginRight: 5 }} />
          <Text>
            Helps users track 💸 and manage their finances 📊
          </Text>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
          <MaterialIcons name="trending-up" size={16} color="blue" style={{ marginRight: 5 }} />
          <Text>
            Provides insights 📈 into spending habits and trends 📉
          </Text>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
          <MaterialIcons name="account-balance" size={16} color="orange" style={{ marginRight: 5 }} />
          <Text>
            Offers tools for saving 💰and reaching financial goals 🎯
          </Text>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
          <MaterialIcons name="explore" size={16} color="purple" style={{ marginRight: 5 }} />
          <Text>
            Simple 🔍 and intuitive interface for easy navigation 💡
          </Text>
        </View>
        </View>

      </View>
      <LicenseList />
    </Layout>
  );
}

const styles = StyleSheet.create({
  description: {
    marginTop: 20,
  },
  goals: {
    backgroundColor: '#f9f9f9',
    padding: 8,
    borderRadius: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#db5a74',
  },
});
