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

const Cliente = ({ navigation }) => {
  const [allClientes, setAllClientes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [formNome, setFormNome] = useState("");
  const [formCpf, setFormCpf] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formTelefone, setFormTelefone] = useState("");

  useEffect(() => {
    const getClientes = async () => {
      const clientes = await api.get("/cliente");
      setAllClientes(clientes.data);
    };
    if(allClientes.length == 0){

      getClientes();
    }

  }, []);

  const save = async () => {
    const createServico = {
      nome: formNome,
      cpf: formCpf,
      email: formEmail,
      telefone: formTelefone,
    };

    const post = await api.post("/cliente", createServico);
    console.log(post.data);
    const data = allClientes;
    data.push(post.data[0]);
    //  setAllServicos(data)
    console.log(data);
    setModalVisible(!modalVisible);
  };

  const deleteCliente = async (id) => {
    // const isDelete = await api.delete(`/servico?id=${id}`);
    const isDelete = true
    const newData =  Object.assign([], allClientes);

    // console.log(id);
    if (isDelete){
      const deleteServicoIndex = allClientes.findIndex(
        (data) => data.id  == id
      );
      // console.log(deleteServicoIndex);
      
     newData.slice( deleteServicoIndex, 1);
      console.log(teste);

      console.log(newData[1]);
      // console.log(newData);
      setAllClientes(newData)
      // console.log(allServicos)
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
              placeholder="Nome:"
              onChangeText={setFormNome}
              value={formNome}
            />
            <TextInput
              placeholder="Email:"
              onChangeText={setFormEmail}
              value={formEmail}
            />
            <TextInput
              placeholder="CPF:"
              onChangeText={setFormCpf}
              value={formCpf}
            />
            <TextInput
              placeholder="Telefone:"
              onChangeText={setFormTelefone}
              value={formTelefone}
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
      data={allClientes}
      keyExtractor={item => item.id} 
        renderItem={({item}) =>{
        return (
          <>
             <>
                <Text>Id: {item.id}</Text>
                <Text>Nome: {item.nome}</Text>
                <Text>Email: {item.email}</Text>
                <Text>Cpf: {item.cpf}</Text>
                <Text>Telefone: {item.telefone}</Text>
                <Text>Ativo: {item.ativo == 1 && "Ativo" }</Text>
                <Button title=" - " onPress={() => deleteCliente(item.id)} />
                </>
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

export default Cliente;
