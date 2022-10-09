import React from "react";
import { useState, useEffect } from "react";
import { View, FlatList, DevSettings, RefreshControl } from "react-native";
import {Button, Text } from 'react-native-paper';
import sessionStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import api from "../api/ApiService.js";

const FinalizaServico = ( navigation ) => {
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
    const post = await api.post("/pedido", createPedido);

    await sessionStorage.setItem("item_servico",JSON.stringify([]));
    navigation.jumpTo('pedidos')
  };

  const onRefresh = () => {
    setRefreshing(false);
    getItemsServicos();
    console.log(allItens);
  }
  

  return (
    <SafeAreaView>
      <Button onPress={() => onRefresh()} ><FontAwesome color="#03a9f4" size={22}  name='retweet' /></Button>
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
              <Text>Data Inicio: {item.date}</Text>
              <Text>Data Termino: {item.data_termino}</Text>
              <Text>Forma Pagamento: {item.forma_pagamento}</Text>
              <Text>Hora: {item.hora}</Text>
              <Text>Listros: {item.quantidade_litros}</Text>
              
            </>
          );
        }}
      />

      <Button disabled={allItens.length > 0 ?  false : true } onPress={() => save()}> Finalizar Serviço</Button>
      

    </SafeAreaView>
  );
};

export default FinalizaServico;
