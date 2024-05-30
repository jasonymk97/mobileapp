import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useTheme } from "../context/theme";
import Slider from '@react-native-community/slider';
import Layout from '../components/Layout';
import CommonStyles from '../style/CommonStyles';
import RNPickerSelect from 'react-native-picker-select';
import { Avatar } from 'react-native-elements';
import AppButton from '../components/AppButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const { theme, saveTheme } = useTheme();
  const [textSize, setTextSize] = useState(theme.textSize);
  const [color, setColor] = useState(theme.color || 'purple');
  const [isLeft, setIsLeft] = useState(theme.isLeft);
  const [currency, setCurrency] = useState(theme.currency || 'AUD');
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  

  useEffect(() => {
    getEmail();
  }, []);

  const colorsItems = [
    { label: 'Purple', value: 'purple' },
    { label: 'Blue', value: 'blue' },
    { label: 'Red ', value: 'red' },
  ];

  const currencies = [
    { label: 'AUD', value: 'AUD' },
    { label: 'USD', value: 'USD' },
    { label: 'HKD', value: 'HKD' },
  ];

  const getEmail = async () => {
    const emailFromStorage = await AsyncStorage.getItem('email');
    setEmail(emailFromStorage);
  }

  const handleTextSizeChange = (value) => {
    const newSize = value === 0 ? 'small' : value === 1 ? 'medium' : 'large';
    saveTheme({ ...theme, textSize: newSize });
    setTextSize(value);
  };

  const handleColorChange = (selectedColor) => {
    if (selectedColor !== color) {
      saveTheme({ ...theme, color: selectedColor });
      setColor(selectedColor);
    }
  };

  const handleAlignmentChange = (isLeft) => {
    saveTheme({ ...theme, isLeft });
    setIsLeft(isLeft)
  };

  const handleCurrencyChange = (currency) => {
    saveTheme({ ...theme, currency });
    setCurrency(currency);
  }

  const handleLogout = async () => {
    // remove token
    await AsyncStorage.removeItem('token');
    // navigate to login screen
    navigation.replace('Auth', { screen: 'Login' });
  }

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      backgroundColor: CommonStyles.colorStyles[color],
      padding: 20,
      borderRadius: 20,
      color: 'transparent',
      fontSize: 0.1, // NOTE: it cannot be 0, so use a small number to minimize the size
    }
  });

  return (
    <Layout>
      <View style={styles.userContainer}>
        <Avatar
          size="large"
          rounded
          title={email ? email.charAt(0).toUpperCase() : ''}
          containerStyle={[styles.avatarContainer, { backgroundColor: CommonStyles.colorStyles[color] }]}
          titleStyle={styles.avatarTitle}
        />
        <Text style={styles.username}>{email}</Text>
      </View>
      <View style={styles.container}>
        {/* Text Size */}
        <View style={styles.settingContainer}>
          <View style={styles.settingBlock}>
            <Text style={[styles.text, CommonStyles.textSizeStyles[theme.textSize]]} >Text Size</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={2}
              step={1}
              value={textSize}
              minimumTrackTintColor={CommonStyles.colorStyles[color]}
              onValueChange={handleTextSizeChange}
            />
          </View>
        </View>
        {/* Color */}
        <View style={styles.settingContainer}>
          <View style={styles.settingBlock}>
            <Text style={[styles.text, CommonStyles.textSizeStyles[theme.textSize]]}>Color</Text>
            <RNPickerSelect
              style={pickerSelectStyles}
              value={color}
              items={colorsItems}
              onValueChange={handleColorChange}
            >
            </RNPickerSelect>
          </View>
        </View>
        {/* Alignment */}
        <View style={styles.settingContainer}>
          <View style={styles.settingBlock}>
            <Text style={[styles.text, CommonStyles.textSizeStyles[theme.textSize]]}>Alignment (Left)</Text>
            <Switch
              trackColor={{ true: CommonStyles.colorStyles[color] }}
              onValueChange={handleAlignmentChange}
              value={isLeft}
              st
            />
          </View>
        </View>
        {/* Currency */}
        <View style={styles.settingContainer}>
          <View style={styles.settingBlock}>
            <Text style={[styles.text, CommonStyles.textSizeStyles[theme.textSize]]}>Currency</Text>
            <RNPickerSelect
              style={styles.currencyPickerSelectStyles}
              value={currency}
              items={currencies}
              onValueChange={handleCurrencyChange}
            >
            </RNPickerSelect>
          </View>
        </View>
        {/* Logout */}
        <AppButton onPress={handleLogout} title="Log Out" />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  avatarContainer: {
    backgroundColor: '#007bff', // Background color for the avatar
  },
  avatarTitle: {
    color: '#fff',
    fontSize: 36,
  },
  username: {
    marginTop: 10,
    fontSize: 18,
  },
  container: {
    flex: 1,
    marginVertical: 20,
  },
  settingBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
  },
  slider: {
    width: '30%',
  },
  settingContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    height: 60,
    justifyContent: 'center',
    marginBottom: 20,
  },
  currencyPickerSelectStyles: {
    inputIOS: {
      marginTop: 5,
    }
  }
});

