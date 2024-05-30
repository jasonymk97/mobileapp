import React from 'react';
import { View, StyleSheet } from 'react-native';
import Layout from '../components/Layout';
import LicenseList from '../components/about/LicenseList';
import DescriptionSection from '../components/about/DescriptionSection';
import GoalItem from '../components/about/GoalItem';

export default function AboutScreen() {
  return (
    <Layout>
      <View style={styles.container}>
        <DescriptionSection title="Budget Management App" iconColor="purple">
          <GoalItem icon="attach-money" iconColor="green" text="Helps users track 💸 and manage their finances 📊" />
          <GoalItem icon="trending-up" iconColor="blue" text="Provides insights 📈 into spending habits and trends 📉" />
          <GoalItem icon="account-balance" iconColor="orange" text="Offers tools for saving 💰and reaching financial goals 🎯" />
          <GoalItem icon="explore" iconColor="purple" text="Simple 🔍 and intuitive interface for easy navigation 💡" />
        </DescriptionSection>
      </View>
      <LicenseList />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});
