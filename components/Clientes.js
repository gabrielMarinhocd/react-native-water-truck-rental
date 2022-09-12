import React from "react";
import {View, Text,  TouchableOpacity, FlatList, Image}  from 'react-native';

const Cliente =  ({navigation}) => {

    useEffect(() => {
        api
          .get("/cliente")
          .then((response) => console.log(response.data))
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);


    return (
       <View>
        <Text> OK </Text>
       </View>
    )
}

export default Cliente;