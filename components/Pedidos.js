import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TextField,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
  Button,
  SafeAreaView,
} from "react-native";

import api from "../api/ApiService.js";

const Pedido = ({ navigation }) => {
  const [allPedidos, setAllPedidos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [formNome, setFormNome] = useState("");
  const [formTipo, setFormTipo] = useState("");

  const save = async () => {
    const createPedido = {
      tipo: formTipo,
      nome: formNome,
    };

    const post = await api.post("/pedido", createPedido);
    const data = allPedidos;
    data.push(post.data[0]);

    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    const getPedidos = async () => {
      const Pedidos = await api.get("/Pedido");
      setAllPedidos(Pedidos.data);
    };

    if(allPedidos.length === 0){
      getPedidos();
    }
    
  }, []);

  const deletePedido = async (id) => {
    const isDelete = await api.delete(`/pedido?id=${id}`);

    const newData =  Object.assign([], allPedidos);

    if (isDelete){
      const deletePedidoIndex = allPedidos.findIndex(
        (data) => data.id  == id
      );
     
      newData.splice(deletePedidoIndex , 1);
      setAllPedidos(newData)
    }

  };

  return (
    <SafeAreaView style={styles.centeredView}>
      <Button title="+" onPress={() => setModalVisible(true)} />
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
                placeholder="Tipo:"
                onChangeText={setFormNome}
                value={formNome}
              />
              <TextInput
                placeholder="Tipo:"
                onChangeText={setFormTipo}
                value={formTipo}
              />
            </>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={save}
            >
              <Text style={styles.textStyle}>Salvar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <FlatList
        data={allPedidos}
        keyExtractor={item => item.id} 
        renderItem={({ item }) => {
          return (
            <>
              <Text>Id: {item.id}</Text>
              <Text>Tipo: {item.tipo}</Text>
              <Text>Nome: {item.nome}</Text>
              <Text>Ativo: {item.ativo == 1 ? "Ativo" : "Destivado"}</Text>
              <Button title="-" onPress={() => deleteServico(item.id)} />
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
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Pedido;
