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
  Image,
} from "react-native";
import { Card, Button, TextInput } from "react-native-paper";
import DateField from "react-native-datefield";

import sessionStorage from "@react-native-async-storage/async-storage";
import api from "../api/ApiService.js";

const Catalago = (navigation, Test) => {
  const [allServicos, setAllServicos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [dateForm, setDateForm] = useState(new Date());
  const [formLocal, setFormLocal] = useState("");
  const [formHora, setFormHora] = useState("");
  const [formFormaPagamento, setFormFormaPagamento] = useState("");
  const [formQTDLitros, setFormQTDLitros] = useState(0);
  const [servico, setServico] = useState([]);
  const [itens, setItens] = useState([]);
  const [formQuantidade, setFormQuantidade] = useState([]);
  const [dateFormTermino, setDateFormTermino] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (allServicos.length === 0) {
      getServicos();
    }
  }, []);

  const onRefresh = () => {
    setRefreshing(false);
    getServicos();
  };

  const getServicos = async () => {
    const Servicos = await api.get("/Servico/ativo");
    const data = Servicos.data.filter((item) => (item.ativo = 1));
    setAllServicos(data);
  };

  const itemPage = async () => {
    try {
      let newItens = itens;
      newItens.push({
        id_servico: servico.id,
        no_servico: servico.nome,
        local: formLocal,
        data_inicio: dateForm,
        hora: formHora,
        forma_pagamento: formFormaPagamento,
        quantidade_litros: formQTDLitros,
        quantidade: formQuantidade,
        data_termino: dateFormTermino,
      });
      setItens(newItens);
      setModalVisible(false);
    } catch (e) {
      console.log(e);
    }
  };

  const finish = () => {
    const data = async () => {
      try {
        return await sessionStorage.setItem(
          "item_servico",
          JSON.stringify(itens)
        );
      } catch (error) {
        return error;
      }
    };
    data();
    setItens([]);
    navigation.jumpTo("recentes");
    // navigation.navigate("FinalizaServico")
  };

  const openForm = async (item) => {
    setModalVisible(true);
    setServico(item);
  };

  return (
    <SafeAreaView>
      <Button
        mode="contained"
        disabled={itens.length > 0 ? false : true}
        onPress={() => finish()}
      >
        Finalizar pedido
      </Button>

      <View>
        <TextInput
          style={{ textAlign: "center", margin: 15, color:"blue" }}
          value="Distrito Federal"
          editable={false}
        />
      </View>
      <FlatList
        data={allServicos}
        style={{marginBottom:150}}
        keyExtractor={(item) => item.id}
        numColumns={2}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => {
          if (item.ativo == 1) {
            return (
              <View style={styles.container}>
               
                <View style={styles.row}>
                <Image
                  style={styles.image}
                    source={{
                      uri: `${item.imagem}`,
                    }}
                  
                  />
                  <Text style={styles.titleStyle}>{item.nome}</Text>
                  <Text style={styles.textContent}> {item.descricao}</Text>
                  <Button
                    style={styles.button}
                    mode="contained"
                    onPress={() => openForm(item)}
                  >
                    Solicitar
                  </Button>
                </View>
              </View>
            );
          }
        }}
      />
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
            <Text style={styles.modalText}>
              Preencha os campos e clique em proximo.
            </Text>

            <>
              <TextInput
                mode="outlined"
                label="Local que serviço deve ocorrer:"
                onChangeText={setFormLocal}
              />
              <Text style={styles.label}>Data Inicio:</Text>
              <DateField
                disabled
                styleInput={{ fontSize: 15 }}
                onSubmit={(value) => setDateForm(value)}
              />
              <Text style={styles.label}>Data Termino (opcional):</Text>
              <DateField
                disabled
                styleInput={{ fontSize: 15 }}
                onSubmit={(value) => setDateFormTermino(value)}
              />
              {/* <DateTimePicker
                  value={date}
                /> */}
              <TextInput
                mode="outlined"
                label="Hora que o serviço deve acontecer:"
                onChangeText={setFormHora}
              />

              <TextInput
                mode="outlined"
                label="Forma Pagamento:"
                onChangeText={setFormFormaPagamento}
              />
              <TextInput
                mode="outlined"
                label="Litragem do caminhão:"
                onChangeText={setFormQTDLitros}
              />
              <TextInput
                mode="outlined"
                label="Quantidade de viajens:"
                onChangeText={setFormQuantidade}
              />
            </>
            <View>
              <View style={styles.alingButton}>
                <Button
                  style={{ marginTop: 25, marginLeft: 15 }}
                  mode="contained"
                  onPress={() => itemPage()}
                  disabled={formQuantidade > 0 ? false : true}
                >
                  Adicionar
                </Button>
                <Button
                  style={{
                    marginTop: 25,
                    marginRight: 15,
                    backgroundColor: "red",
                  }}
                  mode="contained"
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  Cancelar
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    margin:10,
    backgroundColor: "aliceblue",
    borderRadius: 10,
    textAlign: "center",
    elevation: 2,
    shadowColor: '#03a9f4',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  label: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  row: {
    textAlign: "center",
  },
  textContent: {
    padding: 10,
    fontSize: 12,
    color: "#737373",
    textAlign: "center",
  },
  titleStyle: {
    marginLeft: 0,
    color: "#03a9f4",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  modalView: {
    marginTop: 100,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: 350,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 200,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  button: {
    marginRight: 10,
    marginLeft:10,
    marginBottom: 10,
    alignContent: "center",
    textAlign: "center",
    padding: 0,
    width: 150,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  alingButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    marginRight : 10,
    marginLeft: 10,
    marginBottom: 0,
    width: 150,
    height: 150,
    resizeMode: 'contain',
  }
});

export default Catalago;
