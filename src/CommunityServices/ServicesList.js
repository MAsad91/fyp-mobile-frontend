import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'


const ServicesList = ({id,name,servicetype,details}) => {
  
  return (
    <View style={styles.list}>
          <Card style={styles.cardStyle}>
            <CardTitle 
              title={servicetype} 
              subtitle={`\nDetails: ${details}`}
              
            />  
            <CardContent />
            <CardAction separator={true} />
            <CardContent
              text={`\nReporter Name: ${name}`}
            />
            
            <CardAction 
              separator={true} 
              inColumn={false}>
              <CardButton
                onPress={() => {}}
                title="Edit"
                color="black"
              />
              <CardButton
                onPress={() => {}}
                title="Delete"
                color="red"
              />
            </CardAction>
          </Card>
    </View>

  );
};

const styles = StyleSheet.create({
  list: {
    flex:1,
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
     marginLeft:15,
     marginTop:10
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

export default ServicesList;
