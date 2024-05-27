import React, { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, FlatList, StyleSheet, Text} from 'react-native';
import { FAB } from 'react-native-paper';
import Layout from '../components/Layout';
import TransactionItem from '../components/TransactionItem';
import transactionService from '../services/transactionService';
import BottomPopupModal from '../components/BottomPopupModal';
import TransactionForm from '../components/TransactionForm';
import BalanceCard from '../components/home/BalanceCard';

export default function HomeScreen() {
  const [transactions, setTransactions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshTransactions, setRefreshTransactions] = useState(false);
  
  const handleClose = () => {
    setModalVisible(false);
  };

  const handleConfirm = () => {
    setModalVisible(false);
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
        console.log('Error fetching expenses:', response.errorMessage);
        return;
      }
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    if (refreshTransactions && !modalVisible) {
      console.log('refreshing transactions');
      fetchTransactions();
      setRefreshTransactions(false);
    }
  }, [modalVisible]);

  return (
    <>
      <Layout>
        <View style={{opacity: modalVisible? 0.5 : undefined}}>
        <BalanceCard transactions={transactions}/>
        </View>
        <Text style={styles.header}>Transactions</Text>
        <FlatList
          data={transactions}
          renderItem={({ item }) => <TransactionItem transaction={item} />}
          keyExtractor={(item) => item.id.toString()} />
        {/* NOTE: FAB must behind the FlatList, as the FlatList will block the FAB */}
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => setModalVisible(true)}
        />
        <BottomPopupModal
          visible={modalVisible}
          onClose={handleClose}
          onConfirm={handleConfirm} >
          <TransactionForm setModalVisible={setModalVisible} setRefreshTransactions={setRefreshTransactions}/>
        </BottomPopupModal>
      </Layout>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontWeight: '500',
    fontSize: 24,
    marginBottom: 16,
    color: 'rgb(223, 107, 146)'
  },
  input: {
    width: '100%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
