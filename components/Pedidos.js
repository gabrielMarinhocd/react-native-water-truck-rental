import React from "react";
import { useState, useEffect } from "react";
import {  View,  Text,  Modal,  TextField,  TextInput,  TouchableOpacity,  TouchableHighlight,  StyleSheet,  Pressable,  FlatList,  Image,  Button,  SafeAreaView,  RefreshControl,} from "react-native";
import api from "../api/ApiService.js";

const Pedido = ({ navigation }) => {
  const [allPedidos, setAllPedidos] = useState([]);
  const [allItens, setAllItens] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getPedidos = async () => {
    const Pedidos = await api.get("/Pedido");
    setAllPedidos(Pedidos.data);
  };

  useEffect(() => {
    if (allPedidos.length === 0) {
      getPedidos();

    }
  }, []);


  const deletePedido = async (id) => {
    const isDelete = await api.delete(`/pedido?id=${id}`);

    const newData = Object.assign([], allPedidos);

    if (isDelete) {
      const deletePedidoIndex = allPedidos.findIndex((data) => data.id == id);

      newData.splice(deletePedidoIndex, 1);
      setAllPedidos(newData);
    }
  };

  const onRefresh = () => {
    setRefreshing(false);
    getPedidos();
 
  };


  const getItensPedido = async (id) => {
    const get = await api.get(`/pedido/itens?id=${id}`);
    console.log(id);
    setAllItens(get.data)
    setModalVisible(!modalVisible);
  };

  return (
    <SafeAreaView style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Lista de Itens:</Text>
            <FlatList
              data={allItens}
              keyExtractor={(item) => item.id}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              renderItem={({ item }) => {
                return (
                  <>
                    <Text>Codigo: {item.id}</Text>
                    <Text>Data Inicio: {item.data_inicio}</Text>
                    <Text>Data Termino: {item.data_termino}</Text>
                    <Text>Forma Pagamento: {item.forma_pagamento}</Text>
                    <Text>Local: {item.local}</Text>
                    <Text>Quantidade: {item.quantidade}</Text>
                    <Text>Quantidade litros: {item.quatidade_litros}</Text>
                    <Text>Serviço: {item.no_servico}</Text>
                  
                  </>
                );
              }}
            />

            <Pressable
              style={[styles.button, styles.buttonClose]}
            >
              <Text style={styles.textStyle} onPress={() => setModalVisible(false)}>Ver Menos</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <FlatList
        data={allPedidos}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => {
          return (
            <>
              <Text>Id: {item.id}</Text>
              <Text>
                Valor: {item.valor !== null ? item.valor : "Pendente"}
              </Text>
              <Text>Nome: {item.data}</Text>
              <Text>Data Pagamento: {item.data_pagamento}</Text>
              <Text>Ativo: {item.ativo == 1 ? "Ativo" : "Destivado"}</Text>
              <Button title="-" onPress={() => deletePedido(item.id)} />

              <TouchableHighlight onPress={() => getItensPedido(item.id)}>
                <View style={styles.button}>
                  <Text>Mais</Text>
                </View>
              </TouchableHighlight>
            </>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 100,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Pedido;
