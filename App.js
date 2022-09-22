import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Servico from './components/Servico';
import Cliente from './components/Clientes';
import Catalago from './components/Catalago';

import  api from './api/ApiService';

export default function App() {

  function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Go to Clientes"
        />
      </View>
    );
  }
  
  const Drawer = createDrawerNavigator();
  

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Cliente " component={Cliente} />
        <Drawer.Screen name="Serviço " component={Servico} />
        <Drawer.Screen name="Catalago " component={Catalago} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
