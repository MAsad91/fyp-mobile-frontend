import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/auth-context";
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Card,
  CardAction,
  CardContent,
  CardTitle,
} from "react-native-material-cards";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";

function SettingScreen() {
  const auth = useContext(AuthContext);
  const userId = auth.userId;
  const navigation = useNavigation();

  return (
    <View style={styles.sitecardwrapper}>
      <ScrollView>
      <Card style={styles.detailscard}>
        <CardTitle style={styles.title} title={"Change Details"} />
        {/* <CardAction separator={true} /> */}
        <Icon style={styles.iconStyle} name="user" size={44} color="#900"/>
        {/* <CardAction separator={true} /> */}
        <CardContent
          style={styles.text}
          text={"\nChange your details by clicking button "}
        />
        <View style={styles.buttonview}>
          <Button title="Click Me" color="black" onPress={() => {
            navigation.navigate("Main", {
                screen: "EditUserDetails",
                params: userId,
              });
            }} 
          />
        </View>
      </Card>

      <Card style={styles.passwordcard}>
        <CardTitle style={styles.title} title={"Change Password"} />
        <Icon style={styles.iconStyle} name="edit" size={44} color="#900"/>
        {/* <CardAction saparator={true} /> */}
        <CardContent
          style={styles.text}
          text={"\nChange your password by clicking button "}
        />
        <View style={styles.buttonview}>
          <Button  title="Click Me" color="black" onPress={() => {
            navigation.navigate("Main", {
                screen: "ChangeUserPassword",
                params: userId,
              });
          }} />
        </View>
      </Card>
      <Card style={styles.accountcard}>
        <CardTitle style={styles.title} title={"Delete Account"} />
        <Icon style={styles.iconStyle} name="trash" size={45} color="#900"/>
        {/* <CardAction saparator={true} /> */}
        <CardContent
          style={styles.text}
          text={"\nDelete your account by clicking button"}
        />
        <View style={styles.buttonview}>
          <Button
            style={styles.clickbutton}
            title="Click Me"
            color="black"
            onPress={() => {
                navigation.navigate("Main", {
                    screen: "DeleteUserAccount",
                    params: userId,
                  });
            }} 
          />
        </View>
      </Card>
      </ScrollView>
    </View>
  );
}

export default SettingScreen;

const styles = StyleSheet.create({
  sitecardwrapper: {
    flex: 1,
  },
  detailscard: {
    
    justifyContent: "space-between",
    width: "92%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: 5,
    borderBottomWidth: 8,
    borderBottomColor: "black",
    // backgroundColor: "snow",
    padding: 1,
    // marginVertical: 12,
    marginLeft: 15,
    marginTop: 5,
    textalign: "center",
  },
  passwordcard: {
    // flexDirection: "row",
    justifyContent: "space-between",
    width: "92%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: 5,
    borderBottomWidth: 8,
    borderBottomColor: "black",
    // backgroundColor: "snow",
    padding: 1,
    // marginVertical: 12,
    marginLeft: 15,
    marginTop: 5,
    textalign: "center",
  },
  accountcard: {
    // flexDirection: "row",
    justifyContent: "space-between",
    width: "92%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: 5,
    borderBottomWidth: 8,
    borderBottomColor: "black",
    // backgroundColor: "snow",
    padding: 1,
    // marginVertical: 12,
    marginLeft: 15,
    marginTop: 5,
    textalign: "center",
  },
  title: {
    // textAlign: "center"
    marginLeft: 55,
    paddingVertical:15,
  },
  text: {
    color: "#777",
    fontsize: 1,
    margintop: 5,
    marginBottom: 0.5,
    marginLeft:20,
    // fontfamily: sansserif,
    fontweight: 500,
  },
  buttonview: {
    paddingHorizontal: 120,
    paddingVertical:2,
  },
  clickbutton: {
    // borderRadius:5,
  },
  iconStyle: {
    marginTop:5,
    marginHorizontal:140,
  },
});

// import React, { Fragment, useContext } from "react";
// import { useHistory } from "react-router-dom";
// import { Card, Col, Row } from "antd";
// import {
//   UserDeleteOutlined,
//   UserOutlined,
//   EditOutlined,
// } from "@ant-design/icons";
// import { Button } from "antd";

// import { AuthContext } from "../context/auth-context";
// import "./UserSettingFeatures.css";

// const UserSettingFeatures = () => {
//   const auth = useContext(AuthContext);
//   const history = useHistory();
//   return (
//     <Fragment>
//       <div className="site-card-wrapper">
//         <Row gutter={16}>
//           <Col span={8}>
//             <Card
//               title="Change Details"
//               bordered={true}
//               hoverable={true}
//               headStyle={{
//                 textAlign: "center",
//                 fontWeight: "bold",
//                 fontSize: "1.2rem",
//                 fontFamily: "sans-serif",
//               }}
//             >
//               <UserOutlined style={{ fontSize: 50 }} />
//               <p className="text">
//                 Change your details by clicking button which is below
//               </p>
//               <Button
//                 shape="round"
//                 onClick={() => {
//                   history.push(`/settings/${auth.userId}/changeuserdetails`);
//                 }}
//               >
//                 Click
//               </Button>
//             </Card>
//           </Col>
//           <Col span={8}>
//             <Card
//               title="Change Password"
//               bordered={true}
//               hoverable={true}
//               headStyle={{
//                 textAlign: "center",
//                 fontWeight: "bold",
//                 fontSize: "1.2rem",
//                 fontFamily: "sans-serif",
//               }}
//             >
//               <EditOutlined style={{ fontSize: 50 }} />
//               <p className="text">
//                 Change your password by clicking button which is below
//               </p>
//               <Button
//                 shape="round"
//                 onClick={() => {
//                   history.push(`/settings/${auth.userId}/changeuserpassword`);
//                 }}
//               >
//                 Click
//               </Button>
//             </Card>
//           </Col>
//           <Col span={8}>
//             <Card
//               title="Delete Account"
//               bordered={true}
//               hoverable={true}
//               headStyle={{
//                 textAlign: "center",
//                 fontWeight: "bold",
//                 fontSize: "1.2rem",
//                 fontFamily: "sans-serif",
//               }}
//             >
//               <UserDeleteOutlined style={{ fontSize: 50 }} />
//               <p className="text">
//                 Delete your account by clicking button which is below
//               </p>
//               <Button
//                 shape="round"
//                 onClick={() => {
//                   history.push(`/settings/${auth.userId}/deleteuser`);
//                 }}
//               >
//                 Click
//               </Button>
//             </Card>
//           </Col>
//         </Row>
//       </div>
//     </Fragment>
//   );
// };

// export default UserSettingFeatures;
