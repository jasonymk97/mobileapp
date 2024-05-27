import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import licenses from '../../licenses.json'; // Importing the local JSON file
import { MaterialCommunityIcons } from '@expo/vector-icons';
const LicenseList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setData(licenses); // Set data from the imported JSON file
        setLoading(false);

    }, []);

    if (loading) {
        return <ActivityIndicator size="large" />;
    }

    return (
        <>
            <View style={{flexDirection: 'row', marginVertical: 20 }}>
                <MaterialCommunityIcons name="license" size={24} color="purple" style={{marginRight: 5}}/>
                <Text style={{ fontSize: 20, fontWeight: '700', color: '#db5a74' }}>Licenses</Text>
            </View>
            <View style={styles.container}>
                <FlatList
                    data={Object.keys(data)} // Extract keys from the object
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={styles.title}>{item}</Text>
                            <Text style={{ marginBottom: 5, fontWeight: '700', color: '#964dd1' }}>Licenses:</Text>
                            <Text style={{ marginBottom: 5 }}>{data[item].licenses}</Text>
                            <Text style={{ marginBottom: 5, fontWeight: '700', color: '#d46695' }}>Repository: </Text>
                            <Text style={{ marginBottom: 5 }}>{data[item].repository}</Text>
                            <Text style={{ marginBottom: 5, fontWeight: '700', color: '#e0a272' }}>License URL: </Text>
                            <Text style={{ marginBottom: 5 }}>{data[item].licenseUrl}</Text>
                        </View>
                    )} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 20
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});

export default LicenseList;
