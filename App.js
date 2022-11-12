import React from "react";

import { StyleSheet, Text, View, Button } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Servico from "./components/Servico";
import Cliente from "./components/Clientes";
import Catalago from "./components/Catalago";
import FinalizaServico from "./components/FinalizaPedido";
import Pedido from "./components/Pedidos";
import Home from "./Home";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

const Drawer = createDrawerNavigator();

export default function App() {
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    version: 3,
    colors: {
      ...DefaultTheme.colors,
      primary: "#03a9f4",
    },
  };

  const themeDrawer = {
    dark: false,
    colors: {
      primary: "#03a9f4",
      background: "#03a9f4",
      card: "#ffffff",
      text: "#03a9f4",
      border: "#03a9f4",
      notification: "#03a9f4",
      iconColor: "#03a9f4", 
    },
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={themeDrawer}>
        {/* <Stack1.Navigator> */}
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Water Truck Rental" component={Home} />
          {/* <Drawer.Screen name="Home" component={HomeScreen} /> */}
          <Drawer.Screen name="Cliente " component={Cliente} />
          <Drawer.Screen name="Serviço " component={Servico} />
          <Drawer.Screen name="Catalago " component={Catalago} />
          <Drawer.Screen name="FinalizaServico" component={FinalizaServico} />
          <Drawer.Screen name="Pedidos" component={Pedido} />
        </Drawer.Navigator>

        {/* <Stack.Screen name="Home" component={HomeScreen} />

    </Stack1.Navigator> */}
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
