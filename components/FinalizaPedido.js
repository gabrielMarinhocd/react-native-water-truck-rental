import React from "react";
import { useState, useEffect } from "react";
import { View, Text,FlatList, DevSettings, RefreshControl, Button } from "react-native";
import sessionStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

import api from "../api/ApiService.js";

const FinalizaServico = ({ navigation }) => {
  const [allItens, setAllItens] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const getItemsServicos = async () => {
    const value = await sessionStorage.getItem("item_servico");
    setAllItens(JSON.parse(value));
  
  };

  useEffect(() => {
   
    getItemsServicos();

  },[]);


  const save = async () => {
    let createPedido = {
      itens: 
        allItens
    }    
    console.log(createPedido)
    const post = await api.post("/pedido", createPedido);

    await sessionStorage.setItem("item_servico",JSON.stringify([]));
console.log(post.data);
    navigation.navigate("Home")
  };

  const onRefresh = () => {
    setRefreshing(false);
    getItemsServicos();
  }
  

  return (
    <SafeAreaView>
      <Text>Itens do carrinho:
        {allItens.length}
      </Text>
      <FlatList
        data={allItens}
        keyExtractor={item => item.local}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        renderItem={( {item} ) => {
          return (
            <>
              <Text>Local: {item.local}</Text>
              <Text>Data: {item.date}</Text>
              <Text>Forma Pagamento: {item.forma_pagamento}</Text>
              <Text>Hora: {item.hora}</Text>
              <Text>Listros: {item.quantidade_litros}</Text>
              
            </>
          );
        }}
      />

      <Button title="Finalizar Serviço" onPress={() => save()}/>
      

    </SafeAreaView>
  );
};

export default FinalizaServico;
