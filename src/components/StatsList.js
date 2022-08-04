import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, CardTitle, CardContent } from 'react-native-material-cards';

const StatsList = ({ key, title, description, count }) => {
  return (
    <View style={styles.list}>
      <Card key={key}>
        <CardTitle 
          title={title} 
          subtitle={description}
          />
        <CardContent style={styles.count} text={count} />
      </Card>
      
      {/* <View>
        <Text style={styles.count}>{count}</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "white",
    borderRadius: 5,
    borderBottomWidth: 10,
    borderBottomColor:'black',
    backgroundColor: "snow",
    padding: 1,
    marginVertical: 12,
  },
  title: {
    // color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    // color: "white",
    fontSize: 15,
  },
  count: {
    // color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlignVertical: "center",
  },
});

export default StatsList;
