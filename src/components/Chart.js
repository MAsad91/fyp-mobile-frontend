import React from "react";
import {Donut} from "react-native-donut-chart";
import { PieChart } from "react-native-gifted-charts";
import { View, StyleSheet } from "react-native";
// import { VictoryPie } from "victory-native";

const Chart = ({crimeCount, safelifeCount, lostItemCount, foundItemCount}) => {
  //console.log(crimeCount, safelifeCount, lostItemCount, foundItemCount);
//  const pieData=[
//     {value: data.crimeCount, color: "rgb(220,20,60)", text: 'crime' },
//     {value: data.safelifeCount, color: "rgb(0,255,0)", text:'safelife'},
//     {value: data.lostItemCount, color: "rgb(0,0,0)", text:'lost'},
//     {value: data.foundItemCount, color: "rgb(255, 255, 62)", text: 'found'},
// ];
  return (
    <View >
      {/* <PieChart
      donut
      showText
      textColor='white'
      radius={140}
      textSize={20}
      focusOnPress
      showValuesAsLabels
      // showTextBackground
      data={pieData} /> */}
      
      <Donut 
      data ={ [
        {
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
      radius={180}
      gap={15}
      bgStrokePadding={10}
      // bgStrokeOpacity={1}
      strokeWidth={60}
      

      /> 
      
      {/* <PieChart
        innerRadius={80}
        colorScale={[
          "rgb(220,20,60)",
          "rgb(0,255,0)",
          "rgb(0,0,0)",
          "rgb(255, 255, 62)",
        ]} */}
        {/* data={[
          // { x: "1", y: crimeCount, label: "crime" },
          // { x: "2", y: safelifeCount, label: "safelife" },
          // { x: "3", y: lostItemCount, label: "lostitems" },
          // { x: "4", y: foundItemCount, label: "founditems" },
        // ]}
      /> */}
    </View>
  );
};

// const styles = StyleSheet.create({
//   chart: {},
// });

export default Chart;
