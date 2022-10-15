import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  FlatList,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import {
  Card,
  Button,
  TextInput,
  List,
  Title,
  Paragraph,
} from "react-native-paper";
import api from "../api/ApiService.js";
import FontAwesome from "react-native-vector-icons/FontAwesome";

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
    setAllItens(get.data);

    setModalVisible(!modalVisible);
  };
  console.log(allPedidos);

  return (
    <SafeAreaView>
      <Modal
        style={styles.centeredView}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Title style={styles.modalText}>Lista de Itens:</Title>
            <FlatList
              data={allItens}
              keyExtractor={(item) => item.id}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              renderItem={({ item }) => {
                return (
                  
                    <Card>
                      <Card.Content>
                        <Title>Codigo: {item.id}</Title>
                        <Paragraph>Data Inicio: {item.data_inicio}</Paragraph>
                        <Paragraph>Data Termino: {item.data_termino}</Paragraph>
                        <Paragraph>
                          Forma Pagamento: {item.forma_pagamento}
                        </Paragraph>
                        <Paragraph>Local: {item.local}</Paragraph>
                        <Paragraph>Quantidade: {item.quantidade}</Paragraph>
                        <Paragraph>
                          Quantidade litros: {item.quatidade_litros}
                        </Paragraph>
                        <Paragraph>Serviço: {item.no_servico}</Paragraph>
                      </Card.Content>
                    </Card>
                  
                );
              }}
            />
            <Button
              mode="contained"
              onPress={() => setModalVisible(false)}
              style={styles.seeMore}
            >
              Ver Mais
            </Button>
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
            <View style={styles.listItem}>
              <Title style={styles.titleStyle}>Pedido {item.id}</Title>
              <View>
                <Paragraph>Data de Inicio: {item.date}</Paragraph>
                <Paragraph>Data Termino: {item.data_termino}</Paragraph>
                <Paragraph>Data Pagamento: {item.data_pagamento}</Paragraph>
                <Button
                  mode="contained"
                  onPress={() => getItensPedido(item.id)}
                  style={styles.seeMore}
                >
                  Ver Mais
                </Button>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    color: "blue",
    with: 100,
    backgroundColor: "whitesmoke",
    padding: 10,
    margin: 20,
    borderRadius: 10,
  },
  seeMore: {
    marginTop: 10,
    marginLeft: 50,
    marginRight: 50,
  },
  titleStyle: {
    color: "#03a9f4",
    textAlign: "center",
    marginBottom: 10,
  },
  centeredView: {
    margin: 25,
    marginTop: 55,
    marginBottom: 230,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    padding: 20,
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
