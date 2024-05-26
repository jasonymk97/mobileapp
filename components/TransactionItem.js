import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // You can import icons from any library you prefer

const categoryIcons = {
    "1": "home", // Housing
    "2": 'settings', // Utilities
    "3": 'restaurant', // Food
    "4": 'directions-car', // Transportation
    "5": 'local-hospital', // Healthcare
    "6": 'trending-up', // Investments
    "7": 'theaters', // Entertainment
    "8": 'spa', // Personal Care
    "9": 'school', // Education
    "10": 'extension' // Miscellaneous
};

const categoryNames = {
    "1": "Housing",
    "2": "Utilities",
    "3": "Food",
    "4": "Transportation",
    "5": "Healthcare",
    "6": "Investments",
    "7": "Entertainment",
    "8": "Personal Care",
    "9": "Education",
    "10": "Miscellaneous"
};


function formatDate(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

const TransactionItem = ({ transaction }) => {
  const {category_id, amount, type, date} = transaction;
  // console.log("🚀 ~ TransactionItem ~ category_id:", category_id)

    // Format amount with + for income and - for expense
    const formattedAmount = type === 'income' ? `+ $${amount}` : `- $${amount}`;
    
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialIcons name={categoryIcons[category_id]} size={24} color="#CCB7F0" style={{marginRight: 20}}/>
        <Text>{categoryNames[category_id]}</Text>
      </View>
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
