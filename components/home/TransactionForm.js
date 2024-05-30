import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AppButton from '../AppButton';
import transactionService from '../../services/transactionService';
import useAlert from '../../hooks/useAlert';
import { categorySelectItems, transactionTypeSelectItems } from '../../constants/globalConstants';

const TransactionForm = ({ setModalVisible, setRefreshTransactions }) => {
    const [date, setDate] = useState(new Date());
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const { show } = useAlert(); 
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('expense'); // Default type is expense
    const [category, setCategory] = useState(1); // Default category is 1 -> Housing
    const [isLoading, setIsLoading] = useState(false);

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

    const handleAddTransaction = async () => {
        try {
            // Validate form fields
            if (!amount || isNaN(parseFloat(amount))) {
                Alert.alert('Error', 'Please enter a valid amount.');
                return;
            }

            if (!description.trim()) {
                Alert.alert('Error', 'Please enter a description.');
                return;
            }

            let requestObj = {
                date: date.getTime(), // convert to integer timestamp
                amount: parseFloat(amount).toFixed(2), // convert to float
                description: description,
                type: type,
                category_id: category,
            }

            setIsLoading(true);
            const response = await transactionService.createTransaction(requestObj);

            if (response.isError) {
                show('Error', 'Failed to add transaction. Please try again.', 'error');
                setIsLoading(false);
                return;
            }

            show('Success', 'Transaction added successfully.', 'success');
            setIsLoading(false);
            setRefreshTransactions(true) // Refresh transactions
            setModalVisible(false); // Close the modal
        } catch (error) {
            console.error('Error adding transaction:', error);
            setIsLoading(false);
        }
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    return (
        <View style={styles.container}>
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
                    items={transactionTypeSelectItems}>
                </RNPickerSelect>
            </View>

            <Text style={{ marginBottom: 5, fontWeight: 'bold' }} >Category:</Text>
            <View style={styles.rnPicker}>
                <RNPickerSelect
                    value={category}
                    onValueChange={(itemValue) => setCategory(itemValue)}
                    items={categorySelectItems}>
                </RNPickerSelect>
            </View>
            <View style={{ marginBottom: 10 }} />
            <AppButton title="Add Transaction" onPress={handleAddTransaction} isLoading={isLoading} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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

export default TransactionForm;
