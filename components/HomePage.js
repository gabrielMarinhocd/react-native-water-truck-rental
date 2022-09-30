import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

function HomePage( navigation ) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        mode="contained"
        onPress={() =>  navigation.jumpTo('catalago')}
      >
        Solicite um de nossos serviços
      </Button>
    </View>
  );
}
export default HomePage;
