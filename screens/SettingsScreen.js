import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useTheme } from "../context/theme";
import Slider from '@react-native-community/slider';
import Layout from '../components/Layout';
import CommonStyles from '../style/CommonStyles';
import RNPickerSelect from 'react-native-picker-select';
import { Avatar } from 'react-native-elements';
import AppButton from '../components/AppButton';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const { theme, saveTheme } = useTheme();
  const [textSize, setTextSize] = useState(theme.textSize);
  const [color, setColor] = useState(theme.color || 'purple');
  const [isLeft, setIsLeft] = useState(theme.isLeft);
  // TODO: please fix it after login
  const username = 'Jason';
  const initial = username.charAt(0).toUpperCase();
  const navigation = useNavigation();

  const colorsItems = [
    { label: 'Purple', value: 'purple' },
    { label: 'Blue', value: 'blue' },
    { label: 'Red ', value: 'red' },
  ];

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

  const handleLogout = async () => {
    // TODO: place your logout logic here
    navigation.navigate('Auth', { screen: 'Login' });
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
          title={initial}
          containerStyle={[styles.avatarContainer, {backgroundColor: CommonStyles.colorStyles[color]}]}
          titleStyle={styles.avatarTitle}
        />
        <Text style={styles.username}>{username}</Text>
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
             trackColor={{true: CommonStyles.colorStyles[color]}}
              onValueChange={handleAlignmentChange}
              value={isLeft}
              st
            />
          </View>
        </View>
        {/* Logout */}
        <AppButton onPress={handleLogout} title="Log Out"/>
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
  }
});

