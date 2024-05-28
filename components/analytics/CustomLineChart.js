import React from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

const CustomLineChart = ({ data }) => {
    return (
        <View
            style={{
                padding: 20,
                marginBottom: 20,
            }}>
            <LineChart
                areaChart
                hideDataPoints
                isAnimated
                animationDuration={1200}
                startFillColor="#0BA5A4"
                startOpacity={1}
                endOpacity={0.5}
                data={data}
                spacing={40}
                thickness={5}
                hideRules
                yAxisColor="#0BA5A4"
                xAxisColor="#0BA5A4"
                color="#0BA5A4"
                yAxisThickness={0}
                xAxisThickness={0}
                noOfSections={3}
            />
        </View>
    );
};

export default CustomLineChart;
