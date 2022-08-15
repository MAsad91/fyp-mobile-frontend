import React from "react";
import { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'

const EventsDetail = ({id,details,eventtype,location,name,image}) => {
  console.log(image)
  const [state, setState] = useState(0);

  const handleScroll = (event) => {
    const slide = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
    console.log(slide);
    if(slide!==state){
      setState(slide);
    }
  };

  return (
    <View style={styles.list}>
          <Card key={id} style={styles.cardStyle}>
          <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          pagingEnabled={true}
          style={styles.scrollView}
        >
          {image.map((img, index) => (
            <CardImage
              key={index}
              source={{ uri: img }}
              style={styles.cardImage}
            />
          ))}
        </ScrollView>
        <View style={styles.pagination}>
            {image.map((i,k) => (
                <Text key={k} style={k===state ? styles.pagingActivetext : styles.pagingtext}>⬤</Text>
              ))
            }
          </View>
            <CardTitle 
              title={eventtype} 
              subtitle={`Details: ${details}`}
              
            />  
            <CardAction separator={true}/>
            
            <CardContent
              text={`\nEvent Name: ${name}\n\nLocation: ${location}`}
            />
            
            
            {/* <CardAction 
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
            </CardAction> */}
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
   cardImage: {
    width: 310,
    height: 230,
    resizeMode: "contain",
  },
   scrollView: {
    width: "100%",
    height: "100%",
  },
  pagingtext: { 
    fontSize:25,
    color: "#888", 
    marginLeft: 10 
  },
  pagingActivetext: { 
    fontSize:25,
    color: "#fff", 
    marginLeft: 10 
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    top:190,
    alignSelf: "center",
  },
});

export default EventsDetail;
