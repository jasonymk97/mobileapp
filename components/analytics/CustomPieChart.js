import React from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

const CustomPieChart = ({ data }) => {
  const pieData = data.map((item, index) => ({
    value: item.value,
    color: item.color,
    gradientCenterColor: item.color,
    focused: item.focused || false,
  }));

  const renderDot = (color) => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    const total = data.reduce((acc, item) => acc + item.value, 0);
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {data.map((item, index) => {
          const percentage = ((item.value / total) * 100).toFixed(2);
          return (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: 120,
                marginRight: 20,
                marginBottom: 10,
              }}>
              {renderDot(item.color)}
              <Text style={{ color: 'white' }}>{`${item.category}: ${item.value} (${percentage}%)`}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: '#34448B',
        borderRadius: 20,
      }}>
      <View
        style={{
          margin: 20,
          padding: 16,
          borderRadius: 20,
          backgroundColor: '#232B5D',
        }}>
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
          Performance
        </Text>
        <View style={{ padding: 20, alignItems: 'center' }}>
          <PieChart
            data={pieData}
            donut
            showGradient
            sectionAutoFocus
            radius={90}
            innerRadius={60}
            innerCircleColor={'#232B5D'}
            centerLabelComponent={() => {
              const total = data.reduce((acc, item) => acc + item.value, 0);
              const focusedItem = data.length > 0 ? data.reduce((prev, current) => (prev.value > current.value ? prev : current)) : { value: 0, category: 'None' };
              const percentage = ((focusedItem.value / total) * 100).toFixed(2);
              return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text
                    style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>
                    {`${percentage}%`}
                  </Text>
                  <Text style={{ fontSize: 14, color: 'white' }}>{focusedItem.category}</Text>
                </View>
              );
            }}
          />
        </View>
        {renderLegendComponent()}
      </View>
    </View>
  );
};

export default CustomPieChart;

