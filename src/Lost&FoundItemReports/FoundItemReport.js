import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'


const FoundItemReport = ({key,founditemtype,details,description,color,name,state,itemname,location,image}) => {

  

  return (
    <View style={styles.list}>
          <Card style={styles.cardStyle}>
            <CardImage 
              src = {{uri:image}}
              title="crime image"

            />
            <CardTitle 
              title={founditemtype} 
              subtitle={`Details: ${details}\n\nDescription: ${description}`}
            
            />  
            <CardAction separator={true}/>
            <CardContent
              text={`\nItem Name: ${itemname}`}
            />
            
            <CardContent 
              text={`Color: ${color}`} />
            
            <CardContent
              text={`State: ${state}`} />
            
            <CardContent
              text={`Location: ${location}`}
            />
            
            <CardContent
              text={`Report Name: ${name}`} />
            
            <CardAction 
              separator={true} 
              inColumn={false}>
              
              {/* <CardButton
                onPress={() => {}}
                title="Edit"
                color="black"
              /> */}
              {/* <CardButton
                onPress={() => {}}
                title="Delete"
                color="red"
              /> */}
            </CardAction>
            <Text style={styles.text}>Upload found Item Image You found</Text>
            <View style={styles.imageStyle}>
              
              
              <Button 
                  title="Pick Image on Roll Camera"
                  color = "black"
                  onPress={()=>{}}
                />
            </View>
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
      paddingTop:10,
      paddingHorizontal:23,
     // color: "white",
     fontSize: 16,
     marginBottom:10
   },
   count: {
     // color: "white",
     fontSize: 20,
     fontWeight: "bold",
     textAlignVertical: "center",
   },
   imageStyle: {
    padding:10,
    paddingHorizontal:40,

    
    
  },
});

export default FoundItemReport;
