import React from "react";
import { View, StyleSheet, Text, ScrollView,Dimensions,StatusBar  } from "react-native";
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'

const CrimeReportList = ({crimetype,details,image,id,name,location}) => {
 console.log(crimetype);
 console.log(details);
 console.log(id)
//  console.log(title);

 
  return (
      <View style={styles.list}>
          <Card style={styles.cardStyle}>
            <CardImage 
              src = {{uri:image}}
              title="crime image"

            />
            <CardTitle 
              title={crimetype} 
              subtitle={`Details: ${details}`}
              
            />  
            <CardContent />
            <CardContent
              text={`Reporter Name: ${name}`}
            />
            <CardContent
              text={`Location: ${location}`}
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

// const w=Dimensions.get('window').width ;
// // const h=(Dimensions.get('window').height)-(StatusBar.currentHeight) ;
// const h = Dimensions.get("screen").height-(StatusBar.currentHeight);
// console.log("height",h);
// console.log('ch', StatusBar.currentHeight);

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
  // cardStyle:{
  //   flex:1,
  // }
});

export default CrimeReportList;
