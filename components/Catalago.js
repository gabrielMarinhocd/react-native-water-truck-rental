import React from "react";
import { useState, useEffect } from "react";
import {  View,  Text,  Modal,  TextField,  TextInput,  TouchableOpacity,  TouchableHighlight,  StyleSheet,  Pressable,  FlatList,  Image,  Button,  SafeAreaView,} from "react-native";
// import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
// import DateTimePicker from '@react-native-community/datetimepicker';
import DateField from "react-native-datefield";

import sessionStorage from "@react-native-async-storage/async-storage";
import api from "../api/ApiService.js";
import { set } from "react-native-reanimated";

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
  const [formDataInicio, setFormDataInicio] = useState([])
  const [dateFormTermino, setDateFormTermino] = useState(new Date())

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
    <SafeAreaView style={styles.centeredView}>
      <Button title="Finalizar pedido:" onPress={() => finish()}>
        {" "}
      </Button>

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
            <Text style={styles.modalText}>Cadastrar:</Text>

            <>
              <TextInput
                placeholder="Local:"
                onChangeText={setFormLocal}
                value={formLocal}
              />
              <DateField
                disabled
                defaultValue={dateForm}
                styleInput={{ fontSize: 15 }}
                onSubmit={(value) => setDateForm(value)}
              />
              <DateField
                disabled
                defaultValue={dateFormTermino}
                styleInput={{ fontSize: 15 }}
                onSubmit={(value) => setDateFormTermino(value)}
              />
              {/* <DateTimePicker
                  value={date}
                /> */}
              <TextInput
                placeholder="Hora:"
                onChangeText={setFormHora}
                value={formHora}
              />
              <TextInput
                placeholder="FormaPagamento:"
                onChangeText={setFormFormaPagamento}
                value={formFormaPagamento}
              />
              <TextInput
                placeholder="QTDLitros:"
                onChangeText={setFormQTDLitros}
                value={formQTDLitros}
              />
              <TextInput
                placeholder="Quantidade:"
                onChangeText={setFormQuantidade}
                value={formQuantidade}
              />
            </>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => itemPage()}
            >
              <Text style={styles.textStyle}>Salvar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View>
        <TextInput value="Distrito Federal" editable={false} />
      </View>
      <FlatList
        data={allServicos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <>
              <Text>Nome: {item.nome}</Text>
              <Text>Tipo: {item.tipo}</Text>
              <Text>Descrição: lorem ipsom lorem ipsom</Text>

              <Button
                title="Solicitar Serviço"
                onPress={() => openForm(item)}
              />
              {/* <TouchableHighlight onPress={deleteServico(item.id)}>
                <View style={styles.button}>
                  <Text>Touch Here</Text>
                </View>
              </TouchableHighlight> */}
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
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Catalago;
