import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '../components/Layout';

export default function AnalyticsScreen() {
    return (
        <Layout>
            <View style={styles.container}>
                <Text style={styles.header}>AnalyticsScreen</Text>
            </View>
        </Layout>
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
