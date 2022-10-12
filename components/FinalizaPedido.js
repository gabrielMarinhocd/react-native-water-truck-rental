import React from "react";
import { useState, useEffect } from "react";
import { View, FlatList, DevSettings, RefreshControl } from "react-native";
import { Button, Text, Card, Title, Paragraph } from "react-native-paper";
import sessionStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import api from "../api/ApiService.js";

const FinalizaServico = (navigation) => {
  const [allItens, setAllItens] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const getItemsServicos = async () => {
    const value = await sessionStorage.getItem("item_servico");
    setAllItens(JSON.parse(value));
  };

  useEffect(() => {
    getItemsServicos();
  }, []);

  const save = async () => {
    let createPedido = {
      itens: allItens,
    };
    const post = await api.post("/pedido", createPedido);

    await sessionStorage.setItem("item_servico", JSON.stringify([]));
    navigation.jumpTo("pedidos");
  };

  const onRefresh = () => {
    setRefreshing(false);
    getItemsServicos();
    console.log(allItens);
  };

  const deleteItem = async (id) => {
    const newData = Object.assign([], allItens);
    const deleteItemIndex = allItens.findIndex((data) => data == id);
    newData.splice(deleteItemIndex, 1);
    
    try {
      await sessionStorage.setItem("item_servico", JSON.stringify(newData));
      setAllItens(newData);
    } catch (error) {
      return error;
    }
    
  };

  return (
    <SafeAreaView style={{ marginBottom: 100 }}>
      <Button onPress={() => onRefresh()}>
        <FontAwesome color="#03a9f4" size={22} name="retweet" />
      </Button>
      <Button
        disabled={allItens.length > 0 ? false : true}
        onPress={() => save()}
        mode="compact"
      >
        {" "}
        Finalizar Serviço
      </Button>
      <Title style={{ textAlign: "center" }}>
        Itens do carrinho:
        {allItens.length}
      </Title>
      <FlatList
        data={allItens}
        keyExtractor={(item) => item.local}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => {
          return (
            <Card>
              <Card.Content>
                <Title>{item.no_servico}</Title>
                <Paragraph> Local: {item.local}</Paragraph>
                <Paragraph> Data Inicio: {item.date}</Paragraph>
                <Paragraph> Data Termino: {item.data_termino}</Paragraph>
                <Paragraph> Forma Pagamento: {item.forma_pagamento}</Paragraph>
                <Paragraph> Listros: {item.quantidade_litros}</Paragraph>
                <Button onPress={() => deleteItem()}>
                  {" "}
                  <FontAwesome color="#03a9f4" size={22} name="trash" />
                </Button>
              </Card.Content>
            </Card>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default FinalizaServico;
