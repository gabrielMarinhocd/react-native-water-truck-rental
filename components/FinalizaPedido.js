import React from "react";
import { useState, useEffect } from "react";
import { View, Text,FlatList, DevSettings, RefreshControl } from "react-native";
import sessionStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

const FinalizaServico = ({ navigation }) => {
  const [allItens, setAllItens] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const getItemsServicos = async () => {
    const value = await sessionStorage.getItem("item_servico");
    setAllItens(JSON.parse(value));
    console.log(allItens);
  
  };

  useEffect(() => {
   
    getItemsServicos();

    // console.log(allItems);
  },[]);

  const onRefresh = () =>{
    console.log("Teste");
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
              <Text>Hora: {item.quantidade_litros}</Text>

            </>
          );
        }}
      />

    </SafeAreaView>
  );
};

export default FinalizaServico;
