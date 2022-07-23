import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'

const SafeLifeReports = ({reporttype,details,image,id,name,location}) => {
  

  return (
    <View style={styles.list}>
          <Card style={styles.cardStyle}>
            <CardImage 
              src = {{uri:image}}
              title="safelife image"

            />
            <CardTitle 
              title={reporttype} 
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
              style={styles.editbutton}
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
     // marginVertical: 12,
     marginLeft:15,
     marginTop:20
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
   editbutton : {
     borderColor:'red'
   }
});

export default SafeLifeReports;
