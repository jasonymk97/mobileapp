import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { categoryNames, categoryMaterialIcons } from '../../constants/globalConstants';

const TransactionItem = ({ transaction }) => {
  const {category_id, amount, type, date, id} = transaction;

  const navigation = useNavigation();
    // Format amount with + for income and - for expense
  const formattedAmount = type === 'income' ? `+ $${amount}` : `- $${amount}`;
  
  const handlePress = () => {
    navigation.navigate('TransactionInfoScreen', {transaction: transaction});
  }
  
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
      <View style={styles.iconContainer}>
        <MaterialIcons name={categoryMaterialIcons[category_id]} size={24} color="#CCB7F0" style={{marginRight: 20}}/>
        <Text>{categoryNames[category_id]}</Text>
      </View>
      </TouchableOpacity>
      <View>
      <Text style={{fontSize: 10, alignSelf: 'flex-end'}}>{formatDate(date)}</Text>
        <Text style={[styles.amount, type === 'income' ? styles.income : styles.expense]}>{formattedAmount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#fff',
    marginVertical: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  income: {
    color: 'green',
  },
  expense: {
    color: '#EC5D56',
  },
});

export default TransactionItem;
