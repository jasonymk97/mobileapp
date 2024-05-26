import React, { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Button, FlatList, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import Layout from '../components/Layout';
import TransactionItem from '../components/TransactionItem';
import transactionService from '../services/transactionService';
import BottomPopupModal from '../components/BottomPopupModal';
import TransactionForm from '../components/TransactionForm';


export default function HomeScreen({ navigation }) {
  const [transactions, setTransactions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshTransactions, setRefreshTransactions] = useState(false);

  const handleClose = () => {
    setModalVisible(false);
  };

  const handleConfirm = () => {
    // Handle confirm action
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
        {/* <View style={styles.container}> */}
        <View>

        </View>
        <FlatList
          data={transactions}
          renderItem={({ item }) => <TransactionItem transaction={item} />}
          keyExtractor={(item) => item.id.toString()} />
        {/* NOTE: FAB must behind the FlatList, as the FlatList will block the FAB */}
        <FAB
          icon="plus"
          style={styles.fab}
          // onPress={() => console.log('FAB pressed 4444')}
          onPress={() => setModalVisible(true)}
        />
        <BottomPopupModal
          visible={modalVisible}
          onClose={handleClose}
          onConfirm={handleConfirm} >
          <TransactionForm setModalVisible={setModalVisible} setRefreshTransactions={setRefreshTransactions}/>
        </BottomPopupModal>
      </Layout>
      {/* </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    // position: 'relative', // Ensure FAB is positioned relative to this container
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
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
    // zIndex: 1, // Ensure FAB appears above FlatList items
  },
});
