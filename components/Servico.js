import React from "react";
import { useState, useEffect } from "react";
import {  View,  Text,  Modal,  TextField,  TextInput,  TouchableOpacity,  TouchableHighlight,  StyleSheet,  Pressable,  FlatList,  Image,  Button,  SafeAreaView,} from "react-native";
import api from "../api/ApiService.js";

const Servico = ({ navigation }) => {
  const [allServicos, setAllServicos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [formNome, setFormNome] = useState("");
  const [formTipo, setFormTipo] = useState("");

  const save = async () => {
    const createServico = {
      tipo: formTipo,
      nome: formNome,
    };

    const post = await api.post("/servico", createServico);
    const data = allServicos;
    data.push(post.data[0]);

    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    const getServicos = async () => {
      const Servicos = await api.get("/Servico");
      setAllServicos(Servicos.data);
    };

    if(allServicos.length === 0){
      getServicos();
    }
    
  }, []);

  const deleteServico = async (id) => {
    const isDelete = await api.delete(`/servico?id=${id}`);

    const newData =  Object.assign([], allServicos);

    if (isDelete){
      const deleteServicoIndex = allServicos.findIndex(
        (data) => data.id  == id
      );
     
      newData.splice(deleteServicoIndex , 1);
      setAllServicos(newData)
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
        data={allServicos}
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

export default Servico;
