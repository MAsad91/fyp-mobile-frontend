import { useEffect, useState, Fragment } from "react";
import {View, StyleSheet,Text, Image} from 'react-native';
import { useNavigation, useParams,useRoute } from "@react-navigation/native";
import axios from "axios";
// import success from "../shared/utils/success.png";
import success from "../assets/success.png";



const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();
  const route = useRoute()
  const navigation = useNavigation();

  console.log(`PARAMS ID     ${route.id}
    PARAMS TOKEN     ${route.token}`);

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://192.168.100.10:5000/auth/${param.id}/verify/${param.token}/`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <View>
      {validUrl ? (
        <View style={styles.container}>
          <Image
              source={success}
              style={{
                height: 135,
                width: 155
              }}
            />
          {/* <img src={success} alt="success_img" style={styles.success_img} /> */}
          <Text>Email verified successfully</Text>
          <Button
            title="Login"
            color="black"
            onPress={()=> {navigation.navigate("login")}}
          />
          
          {/* <Link to="/login">
            <button style={styles.black_btn}>Login</button>
          </Link> */}
        </View>
      ) : (
        <Text>404 Not Found</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex:1,
    // width: 100,
    // height: 100,
    // display: flex,
    // align: center,
    
    // justify: center,
    // flex: column,
  },
  
  // black_btn: {
  //   // border: none,
  //   // outline: none,
  //   // padding: 12 0,
  //   backgroundcolor: '#1c1f1e',
  //   borderradius: 20,
  //   width: 180,
  //   fontweight: bold,
  //   fontsize: 14,
  //   cursor: pointer,
  //   color: white,
  // }
});
export default EmailVerify;
