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
import { format } from "date-fns";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Pedido = ({ navigation }) => {
  const [allPedidos, setAllPedidos] = useState([]);
  const [allItens, setAllItens] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (allPedidos.length === 0) {
      getPedidos();
    }
  }, []);

  const getPedidos = async () => {
    const Pedidos = await api.get("/Pedido");
    setAllPedidos(Pedidos.data);
  };

  const deletePedido = async (id) => {
    console.log("Teste");
    const isDelete = await api.delete(`/pedido?id=${id}`);

    const newData = Object.assign([], allPedidos);

    if (isDelete) {
      getPedidos()
    }
  };

  const onRefresh = () => {
    setRefreshing(false);
    getPedidos();
  };

  const getItensPedido = async (id) => {
    const get = await api.get(`/pedido/itens?id=${id}`);
    setAllItens(get.data);

    setModalVisible(!modalVisible);
  };

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
            <Title style={styles.modalText}>Itens do Pedido:</Title>
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
                      <Paragraph>Serviço: {item.no_servico}</Paragraph>
                      <Paragraph>
                        Data Inicio:{" "}
                        {item.data_inicio == null
                          ? false
                          : format(Date.parse(item.data_inicio), "dd/MM/yyyy")}
                      </Paragraph>
                      <Paragraph>
                        Data Termino:{" "}
                        {item.data_termino == null
                          ? false
                          : format(Date.parse(item.data_termino), "dd/MM/yyyy")}
                      </Paragraph>
                      <Paragraph>Hora: {item.hora}</Paragraph>
                      <Paragraph>
                        Forma Pagamento: {item.forma_pagamento}
                      </Paragraph>
                      <Paragraph>Local: {item.local}</Paragraph>
                      <Paragraph>Quantidade: {item.quantidade}</Paragraph>
                      <Paragraph>
                        Quantidade litros: {item.quatidade_litros}
                      </Paragraph>
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
              Ver Menos
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
                <Paragraph style={{ textAlign: "center" }}>
                  Data da Solicitação:
                </Paragraph>
                <Paragraph style={{ textAlign: "center" }}>
                  {" "}
                  {format(Date.parse(item.date), "dd/MM/yyyy")}
                </Paragraph>
                <Paragraph style={{ textAlign: "center" }}>
                  {" "}
                  {item.ativo != 1 ? "Cancelado" : "Em adamento"}
                </Paragraph>

                <View>
                  <View style={styles.alingButton}>
                    <Button
                      style={{ marginTop: 25, marginLeft: 50 }}
                      mode="contained"
                      onPress={() => getItensPedido(item.id)}
                    >
                     Ver Mais
                    </Button>
                    <Button
                      style={{
                        marginTop: 25,
                        marginRight: 40,
                        backgroundColor: item.ativo == 1 ? "red"  : "#e0e0e0",
                        borderWidth: 1,
                        borderColor:  item.ativo == 1 ? "red" : "white",
                        color: item.ativo == 1 ? "red" :'#03a9f4' ,
                      }}
                      mode="contained"
                      onPress={() => deletePedido(item.id)}
                      disabled={item.ativo == 2}
                    >
                      Cancelar
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  alingButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listItem: {
    color: "blue",
    with: 100,
    backgroundColor: "whitesmoke",
    padding: 10,
    margin: 20,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#03a9f4',
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
    margin: 30,
    marginTop: 100,
    marginBottom: 300,
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
