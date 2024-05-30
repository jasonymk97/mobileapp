import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from "../../context/theme";

const BalanceCard = (props) => {
  const {transactions} = props;
  const { theme, saveTheme} = useTheme();
  const [isHidden, setIsHidden] = useState(theme.isHidden || false);
  const currency = theme.currency || 'AUD';

  const totalExpense = () => {
    let totalExpense = 0;
    transactions.forEach(transaction => {
      if (transaction.type === 'expense') {
        // need to convert the amount to a number
        totalExpense += parseFloat(transaction.amount);
      }
    });
    return totalExpense;
  }
  
  const totalIncome = () => {
    let totalIncome = 0;
    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        // need to convert the amount to a number
        totalIncome += parseFloat(transaction.amount);
      }
    });
    return totalIncome;
  }
  
  let income = totalIncome().toFixed(2);
  let expense = totalExpense().toFixed(2);
  let balance = (income - expense).toFixed(2) || 0;


  const toggleVisibility = () => {
    setIsHidden(!isHidden);
    saveTheme({ ...theme, isHidden: !isHidden });
  };

  const renderValue = (value) => {
    if (isHidden) {
      return '*****';
    } else {
      return value
    }
  };

  return (
    <>
      <LinearGradient
        // colors={['#5B89FF', '#6640FF', '#8433A0']}
        colors={['rgba(91, 137, 255, 0.7)', 'rgba(102, 64, 255, 0.7)', 'rgba(132, 51, 160, 0.7)']}
        style={styles.gradient}
        start={[0, 0]}
        end={[1, 0]}
      >
        <View style={styles.topWidget}>
          <TouchableOpacity onPress={toggleVisibility}>
            <Ionicons name={isHidden ? 'eye-off' : 'eye'} size={24} color="black" />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 30 }}>Balance</Text>
            <Text style={{ fontWeight: '300', fontSize: 30 }}>{currency}$ {renderValue(balance)}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30 }}>
            <View>
              <Text style={{ fontWeight: 'bold' }}>Expense</Text>
              <Text>{currency}$ {renderValue(expense)}</Text>
            </View>
            <View>
              <Text style={{ fontWeight: 'bold' }}>Income</Text>
              <Text>{currency}$ {renderValue(income)}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

const styles = {
  gradient: {
    marginTop: 20,
    borderRadius: 20,
    marginBottom: 16,
  },
  topWidget: {
    padding: 20,
  }
};

export default BalanceCard;
