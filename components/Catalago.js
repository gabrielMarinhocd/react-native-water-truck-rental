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
} from "react-native";
import { Card, Button, TextInput } from "react-native-paper";
import DateField from "react-native-datefield";

import sessionStorage from "@react-native-async-storage/async-storage";
import api from "../api/ApiService.js";
import { color, set } from "react-native-reanimated";

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

  useEffect(() => {
    const getServicos = async () => {
      const Servicos = await api.get("/Servico");
      setAllServicos(Servicos.data);
    };

    if (allServicos.length === 0) {
      getServicos();
    }
  }, []);

  const itemPage = async () => {
    try {
      let newItens = itens;
      newItens.push({
        id_servico: servico.id,
        no_servico: servico.nome,
        local: formLocal,
        date: dateForm,
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
    navigation.jumpTo("recentes");
    // navigation.navigate("FinalizaServico")
  };

  const openForm = async (item) => {
    setModalVisible(true);
    setServico(item);
  };

  return (
    <SafeAreaView>
      <Button mode="contained" onPress={() => finish()}>
        Finalizar pedido:
      </Button>

      <View>
        <TextInput
          style={{ textAlign: "center", margin: 15 }}
          value="Distrito Federal"
          editable={false}
        />
      </View>
      <FlatList
        data={allServicos}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => {
          return (
            <View style={styles.container}>
              <View style={styles.row}>
                <Text style={styles.titleStyle}>{item.nome}</Text>
                <Text style={styles.textContent}> lorem ipsom lorem ipsom</Text>
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
            <Text style={styles.modalText}>Preencha os campos e clique em proximo.</Text>

            <>
              <TextInput
                mode="outlined"
                label="Local"
                onChangeText={setFormLocal}
      
              />
              <DateField
                disabled

                styleInput={{ fontSize: 15 }}
                onSubmit={(value) => setDateForm(value)}
              />
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
                label="Hora:"
                onChangeText={setFormHora}

              />
              <TextInput
                mode="outlined"
                label="FormaPagamento:"
                onChangeText={setFormFormaPagamento}

              />
              <TextInput
                mode="outlined"
                label="QTDLitros:"
                onChangeText={setFormQTDLitros}

              />
              <TextInput
                mode="outlined"
                label="Quantidade:"
                onChangeText={setFormQuantidade}

              />
            </>
            <View>
              <View style={styles.alingButton}>
                <Button
                  style={{marginTop: 25, marginLeft: 15}}
                  mode="contained"
                  onPress={() => itemPage()}
                >
                  Proximo
                </Button>
                <Button
                style={{marginTop: 25, marginRight: 15, backgroundColor: 'red'}}
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
    width: 400,
    flex: 2,
    marginTop: 8,
    margin: 8,
    backgroundColor: "aliceblue",
    paddingHorizontal: 10,
    borderRadius: 10,
    textAlign: "center",
  },
  row: {
    padding: 10,
    textAlign: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  textContent: {
    padding: 10,
    fontSize: 12,
    color: "#737373",
  },
  titleStyle: {
    padding: 10,
    marginLeft: 30,
    color: "#03a9f4",
    fontSize: 18,
    textAlign: "center",
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
});

export default Catalago;
