import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Layout from '../components/Layout';
import transactionService from '../services/transactionService';
import CustomPieChart from '../components/analytics/CustomPieChart';
import CustomBarChart from '../components/analytics/CustomBarChart';
import { categoryNames, transactionTypeSelectItems } from '../constants/globalConstants';
import CustomLineChart from '../components/analytics/CustomLineChart';
import { summarizePieChartData, summarizeTransactionsData } from '../utils/chartDataUtils';
import RNPickerSelect from 'react-native-picker-select';

export default function AnalyticsScreen() {
    const [isStartPickerVisible, setStartPickerVisibility] = useState(false);
    const [isEndPickerVisible, setEndPickerVisibility] = useState(false);
    const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), 0, 1)); // January 1st of the current year
    const [endDate, setEndDate] = useState(new Date());
    const [transactions, setTransactions] = useState([]);
    const [refreshFlag, setRefreshFlag] = useState(false);
    const [transactionChartData, setTransactionChartData] = useState([]);
    const [pieChartData, setPieChartData] = useState([]);
    const [type, setType] = useState('expense'); // Default type is expense

    const handleRefreshChart = useCallback(() => {
        setRefreshFlag(prevFlag => !prevFlag); // Toggle the refresh flag
    }, []);

    const showStartPicker = () => {
        setStartPickerVisibility(true);
    };

    const hideStartPicker = () => {
        setStartPickerVisibility(false);
        handleRefreshChart();
    };

    const handleStartConfirm = (date) => {
        setStartDate(date);
        hideStartPicker();
    };

    const showEndPicker = () => {
        setEndPickerVisibility(true);
    };

    const hideEndPicker = () => {
        setEndPickerVisibility(false);
    };

    const handleEndConfirm = (date) => {
        setEndDate(date);
        hideEndPicker();
    };

    const formatDate = (date) => {
        return date.toLocaleDateString();
    };

    const setLastMonth = () => {
        const now = new Date();
        const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        setStartDate(firstDayLastMonth);
        setEndDate(lastDayLastMonth);
    };

    const setLastWeek = () => {
        const now = new Date();
        const lastWeek = new Date();
        lastWeek.setDate(now.getDate() - 7);
        setStartDate(lastWeek);
        setEndDate(now);
    };

    const setLastYear = () => {
        const now = new Date();
        const firstDayLastYear = new Date(now.getFullYear() - 1, 0, 1);
        const lastDayLastYear = new Date(now.getFullYear() - 1, 11, 31);
        setStartDate(firstDayLastYear);
        setEndDate(lastDayLastYear);
    };

    useFocusEffect(
        useCallback(() => {
            let timeoutId;

            // Set a timeout to delay the API call by 1 second
            timeoutId = setTimeout(fetchTransactions, 1000);

            // Cleanup function to clear the timeout if the focus is lost before 1 second
            return () => clearTimeout(timeoutId);
        }, [])
    );

    const fetchTransactions = async () => {
        try {
            const response = await transactionService.getTransactions();
            console.log('api call');
            if (response.isError) {
                console.log('Error fetching Transactions:', response.errorMessage);
                return;
            }
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching Transactions:', error);
        }
    };


    useEffect(() => {
        if (startDate && endDate && transactions.length > 0) {
            console.log('Filtering transactions');

            // Convert startDate and endDate to timestamps
            const startTimestamp = startDate.getTime();
            const endTimestamp = endDate.getTime();

            const filteredTransactions = transactions.filter((transaction) => {
                return transaction.date >= startTimestamp && transaction.date <= endTimestamp && transaction.type === type;
            });

            console.log('Filtered transactions:', filteredTransactions);

            const summarizedData = summarizeTransactionsData(filteredTransactions, startDate, endDate);
            console.log("🚀 ~ useEffect ~ summarizedData:", summarizedData)
            const generatedPieData = summarizePieChartData(filteredTransactions, categoryNames);

            setTransactionChartData(summarizedData);
            setPieChartData(generatedPieData);
            // Force to refresh the chart
            handleRefreshChart();
        }
    }, [startDate, endDate, transactions, type]);

    return (
        <Layout>
            <View style={{ flexDirection: 'row', marginTop: 20, backgroundColor: '#FFFFFF', padding: 10, borderRadius: 20, justifyContent: 'center'}}>
                <Text style={styles.typeText} >Type: </Text>
                <View style={{justifyContent: 'center'}}>
                    <RNPickerSelect
                        style={{}}
                        value={type}
                        onValueChange={(itemValue) => setType(itemValue)}
                        items={transactionTypeSelectItems}>
                    </RNPickerSelect>
                </View>
            </View>
            <View style={{ backgroundColor: '#FFFFFF', borderRadius: 20, marginVertical: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginHorizontal: 50}}>
                    <View>
                        <TouchableOpacity onPress={() => showStartPicker()}>
                            {startDate && <Text style={styles.dateText}> {formatDate(startDate)}</Text>}
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.dateText}>to</Text>
                    <View>
                        <TouchableOpacity onPress={() => showEndPicker()}>
                            {endDate && <Text style={styles.dateText}>{formatDate(endDate)}</Text>}
                        </TouchableOpacity>
                    </View>
                </View>

                <DateTimePickerModal
                    isVisible={isStartPickerVisible}
                    mode="date"
                    onConfirm={handleStartConfirm}
                    onCancel={hideStartPicker}
                />

                <DateTimePickerModal
                    isVisible={isEndPickerVisible}
                    mode="date"
                    onConfirm={handleEndConfirm}
                    onCancel={hideEndPicker}
                />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
                <Button title="Last Month" onPress={setLastMonth} />
                <Button title="Last Week" onPress={setLastWeek} />
                <Button title="Last Year" onPress={setLastYear} />
            </View>
            <ScrollView>
                <CustomBarChart key={refreshFlag.toString()} data={transactionChartData} />
                <CustomLineChart data={transactionChartData} />
                <CustomPieChart data={pieChartData} />
            </ScrollView>
        </Layout>
    );
}

const styles = StyleSheet.create({
    dateText: {
        fontWeight: '700',
        color: '#000000'
    },
    typeText: {
        fontWeight: '700',
        color: '#000000'
    },
});
