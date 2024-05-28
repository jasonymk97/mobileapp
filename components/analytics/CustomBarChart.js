import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

const CustomBarChart = ({ data, chartTitle }) => {
  return (
    <View style={styles.container}>
      <BarChart
        data={data}
        chartTitle={chartTitle}
        barWidth={22}
        noOfSections={3}
        barBorderRadius={4}
        frontColor="#177AD5"
        yAxisThickness={0}
        xAxisThickness={0}
        hideRules
        yAxisLabelWidth={50} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
});

export default CustomBarChart;
