import React from "react";
import {Donut} from "react-native-donut-chart";
// import PieChart from "react-native-pie-chart";
// import { PieChart } from "react-native-gifted-charts";
import { View, StyleSheet, Text } from "react-native";
import { color } from "react-native-reanimated";
// import { PieChart } from "react-native-gifted-charts";
// import { VictoryPie } from "victory-native";


const Chart = ({crimeCount, safelifeCount, lostItemCount, foundItemCount}) => {
// const widthAndHeight = 100
// const series = [crimeCount, safelifeCount, lostItemCount, foundItemCount]
const sliceColor = ['rgb(220,20,60)','rgb(0,255,0)','rgb(0,0,0)','rgb(255, 255, 62)',]
  return (
    <View >

      {/* <PieChart 
        widthAndHeight={widthAndHeight}
        series={series}
        sliceColor={sliceColor}
        doughnut={true}
        coverRadius={0.45}
        coverFill={'#aaffaa'}
      /> */}
      <Text style={styles.text}>  {`Crime:   `}  <Text style={{ backgroundColor: 'rgb(220,20,60)', flex: 0.3 }}>{`           `}</Text></Text>
      <Text style={styles.text}>  {`safelife:  `} <Text style={{ backgroundColor: 'rgb(0,255,0)', flex: 0.3 }}>{`           `}</Text></Text>
      <Text style={styles.text}>  {`Lost:        `} <Text style={{ backgroundColor: 'rgb(0,0,0)', flex: 0.3 }}>{`           `}</Text></Text>
      <Text style={styles.text}>  {`Found:    `} <Text style={{ backgroundColor: 'rgb(255, 255, 62)', flex: 0.3 }}>{`           `}</Text></Text>
      <Donut 
      data ={ [
        {
          Text:"crime",
          label: "crime",
          value: crimeCount,
          color: 'rgb(220,20,60)',
        },
        {
          label: "safelife",
          value: safelifeCount,
          color: 'rgb(0,255,0)',
        }, 
        {
          label: "lostitems",
          value: lostItemCount,
          color: 'rgb(0,0,0)',
        }, 
        {
          label: "founditems",
          value: foundItemCount,
          color: 'rgb(255, 255, 62)',
        },
      ]}
      title="reports"
      radius={180}
      gap={15}
      bgStrokePadding={10}
      // bgStrokeOpacity={1}
      strokeWidth={60}
      

      /> 
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 50,
    marginTop: 10,
  },
  viewstyle:{
    
  }
});

export default Chart;
