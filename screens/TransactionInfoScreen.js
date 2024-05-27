import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AppButton from '../components/AppButton';
import transactionService from '../services/transactionService';
import useAlert from '../hooks/useAlert';
import Layout from '../components/Layout';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const TransactionInfoScreen = ({ route }) => {
    const { transaction } = route.params;
    const {
        id,
        date: transactionDate, 
        amount: transactionAmount, 
        description: transactionDescription,
        type: transactionType,
        category_id: transactionCategory, 
    } = transaction;

    const [date, setDate] = useState(new Date(transactionDate)); // convert integer to date object
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const { show } = useAlert();
    const [amount, setAmount] = useState(transactionAmount.toString()); // convert float to string
    const [description, setDescription] = useState(transactionDescription);
    const [type, setType] = useState(transactionType);
    const [category, setCategory] = useState(transactionCategory);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    const showDatePickerFunction = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleConfirm = (date) => {
        setDate(date);
        hideDatePicker();
    };

    const handleUpdateTransaction = async () => {
        // Validate form fields
        if (!amount || isNaN(parseFloat(amount))) {
            Alert.alert('Error', 'Please enter a valid amount.');
            return;
        }

        if (!description.trim()) {
            Alert.alert('Error', 'Please enter a description.');
            return;
        }
        try {
            let requestObj = {
                id: id,
                date: date.getTime(), // convert to integer timestamp
                amount: parseFloat(amount), // convert string to float
                description: description,
                type: type,
                category_id: category,
            }
            setIsLoading(true);
            const response = await transactionService.updateTransaction(requestObj);

            if (response.isError) {
                show('Error', 'Failed to update transaction. Please try again.', 'error');
                setIsLoading(false);
                return;
            }
            show('Success', 'Transaction update successfully.', 'success');
            setIsLoading(false);
        } catch (error) {
            console.error('Error updating transaction:', error);
            setIsLoading(false);
        }
    };

    const showDeleteConfirmation = () => {
        Alert.alert(
            'Delete Transaction',
            'Are you sure you want to delete this transaction?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: handleDeleteTransaction,
                    style: 'destructive',
                },
            ],
            { cancelable: false }
        );
    };

    const handleDeleteConfirmation = () => {
        showDeleteConfirmation();
    };

    const handleDeleteTransaction = async () => {
        try {
            const response = await transactionService.deleteTransaction(id);

            if (response.isError) {
                show('Error', 'Failed to deleting transaction. Please try again.', 'error');
                return;
            }

        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
        show('Success', 'Transaction delete successfully.', 'success');
        // delete transaction and navigate to home screen
        navigation.navigate('Home');
    }
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    return (
        <Layout>
            <View style={styles.container}>
                <View style={{ alignItems: 'flex-end' }}>
                    <TouchableOpacity onPress={handleDeleteConfirmation} >
                        <MaterialIcons name="delete" size={36} color="black" />
                    </TouchableOpacity>
                </View>
                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>Date:</Text>
                <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => showDatePickerFunction()}>
                    <Text style={styles.dateText}>{formatDate(date)}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    date={date}
                    isVisible={datePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
                <Text style={{ marginBottom: 5, fontWeight: 'bold' }} >Amount:</Text>
                <TextInput
                    style={styles.input}
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                    placeholder="Enter Amount"
                />


                <Text style={{ marginBottom: 5, fontWeight: 'bold' }} >Description:</Text>
                <TextInput
                    style={styles.descriptionInput}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Enter Description"
                    multiline
                    numberOfLines={4}
                />

                <Text style={{ marginBottom: 5, fontWeight: 'bold' }} >Type:</Text>
                <View style={styles.rnPicker}>
                    <RNPickerSelect
                        value={type}
                        onValueChange={(itemValue) => setType(itemValue)}
                        items={[
                            { label: 'Expense', value: 'expense' },
                            { label: 'Income', value: 'income' },
                        ]}>
                    </RNPickerSelect>
                </View>

                <Text style={{ marginBottom: 5, fontWeight: 'bold' }} >Category:</Text>
                <View style={styles.rnPicker}>
                    <RNPickerSelect
                        value={category}
                        onValueChange={(itemValue) => setCategory(itemValue)}
                        items={[
                            { label: 'Housing', value: 1 },
                            { label: 'Utilities', value: 2 },
                            { label: 'Food', value: 3 },
                            { label: 'Transportation', value: 4 },
                            { label: 'Insurance', value: 5 },
                            { label: 'Medical & Healthcare', value: 6 },
                            { label: 'Savings', value: 7 },
                            { label: 'Personal Spending', value: 8 },
                            { label: 'Recreation & Entertainment', value: 9 },
                            { label: 'Miscellaneous', value: 10 },
                        ]}>
                    </RNPickerSelect>
                </View>
                <View style={{ marginBottom: 10 }} />
                <AppButton title="Update Transaction" onPress={handleUpdateTransaction} isLoading={isLoading} />
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
    input: {
        borderRadius: 10,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    descriptionInput: {
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        padding: 10,
        height: 80,
    },
    rnPicker: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
    },
});

export default TransactionInfoScreen;
