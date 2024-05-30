import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default function IconBrand() {
  return (
    <View>
    <Image 
    source={require('../assets/icon.png')} 
    style={styles.imageStyle} />
  </View>
  );
}

const styles = StyleSheet.create({
    imageStyle: {
      width: 160, 
      height: 160, 
      marginBottom: 60, 
      borderRadius: 100
    }
});