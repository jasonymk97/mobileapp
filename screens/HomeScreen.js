import React, { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { FAB } from 'react-native-paper';
import Layout from '../components/Layout';
import TransactionItem from '../components/home/TransactionItem';
import transactionService from '../services/transactionService';
import BottomPopupModal from '../components/BottomPopupModal';
import TransactionForm from '../components/home/TransactionForm';
import BalanceCard from '../components/home/BalanceCard';
import { useTheme } from "../context/theme";
import useAlert from '../hooks/useAlert';

export default function HomeScreen() {
  const { theme } = useTheme();
  const { show } = useAlert();
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
      if (response.isError) {
        console.log('Error fetching expenses:', response.errorMessage);
        show('Error', response.errorMessage, 'error');
        setTransactions([]);
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
        {/* Balance Card */}
        <View style={{ opacity: modalVisible ? 0.5 : undefined }}>
          <BalanceCard transactions={transactions} />

        {/* Transactions */}
        </View>
        <Text style={styles.header}>Transactions</Text>

        {transactions.length === 0 ?
          (<View style={styles.errorContainer}>
            <Text style={styles.errorText}>Sorry ! No transactions are provided</Text>
          </View>
          ) : (
            <FlatList
              data={transactions}
              renderItem={({ item }) => <TransactionItem transaction={item} />}
              keyExtractor={(item) => item.id.toString()} />)
        }

        {/* NOTE: FAB must behind the FlatList, as the FlatList will block the FAB */}
        {/* Floating Action Button  */}
        <FAB
          icon="plus"
          style={[styles.fab, theme.isLeft ? { left: 0 } : { right: 0 }]}
          onPress={() => setModalVisible(true)}
        />
        {/* Bottom Pop Modal */}
        <BottomPopupModal
          visible={modalVisible}
          onClose={handleClose}
          onConfirm={handleConfirm} >
          <TransactionForm setModalVisible={setModalVisible} setRefreshTransactions={setRefreshTransactions} />
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
    bottom: 0,
  },
  errorContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  }
});
