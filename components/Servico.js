import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  FlatList,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import api from "../api/ApiService.js";
import { Card, Button, TextInput, Title } from "react-native-paper";

const Servico = ({ navigation }) => {
  const [allServicos, setAllServicos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [formNome, setFormNome] = useState("");
  const [formTipo, setFormTipo] = useState("");
  const [formDescricao, setFormDescricao] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [formImagem, setFormImagem] = useState("");

  const save = async () => {
    const createServico = {
      tipo: formTipo,
      descricao: formDescricao,
      nome: formNome,
      imagem: formImagem,
    };

    const post = await api.post("/servico", createServico);
    const data = allServicos;
    data.push(post.data[0]);

    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    if (allServicos.length === 0) {
      getServicos();
    }
  }, []);

  const getServicos = async () => {
    const Servicos = await api.get("/Servico");
    setAllServicos(Servicos.data);
  };

  const deleteServico = async (id) => {
    await api.delete(`/servico?id=${id}`);

    await onRefresh();
  };

  const onRefresh = () => {
    setRefreshing(false);
    getServicos();
  };

  return (
    <SafeAreaView>
      <Button onPress={() => setModalVisible(true)} mode="contained">
        NOVO
      </Button>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modal}>
          <View style={styles.modalView}>
            <Title style={styles.modalText}>Cadastrar Serviço</Title>

            <>
              <TextInput
                mode="outlined"
                label="Nome:"
                onChangeText={setFormNome}
                value={formNome}
              />
              <TextInput
                mode="outlined"
                label="Tipo:"
                onChangeText={setFormTipo}
                value={formTipo}
              />
              <TextInput
                mode="outlined"
                label="Descrição:"
                onChangeText={setFormDescricao}
                value={formDescricao}
              />
              <TextInput
                mode="outlined"
                label="Imagem:"
                onChangeText={setFormImagem}
                value={formImagem}
              />
            </>

            <View>
              <View style={styles.alingButton}>
                <Button
                  style={{ marginTop: 25, marginLeft: 15 }}
                  mode="contained"
                  onPress={save}
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

      <FlatList
        style={{ marginBottom: 40 }}
        data={allServicos}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => {
          return (
            <View style={styles.centeredView}>
              <Title style={{ textAlign: "center" }}>Codigo: {item.id}</Title>
              <Text style={styles.itenText}>Tipo: {item.tipo}</Text>
              <Text style={styles.itenText}>Nome: {item.nome}</Text>
              <Text style={styles.itenText}>Descrição: {item.descricao}</Text>
              <Text style={styles.itenText}>Link IMG: {item.imagem}</Text>
              <Text style={styles.itenText}>
                Status: {item.ativo == 1 ? "Ativo" : "Destivado"}
              </Text>

              <Button
                style={{ marginTop: 10 }}
                mode="contained"
                onPress={() => deleteServico(item.id)}
                disabled={item.ativo == 2}
              >
                Desativar
              </Button>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modal: {
    marginTop: 110,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#03a9f4",
    shadowOpacity: 1.2,
    shadowRadius: 3,
    shadowRadius: 4,
  },
  centeredView: {
    flex: 2,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    textAlign: "center",
    elevation: 2,
    shadowColor: "#03a9f4",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    padding: 10,
    marginColor: "black",
  },
  modalView: {
    marginTop: 100,
    margin: 20,
  },
  button: {
    margin: 10,
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
  alingButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itenText: {
    padding: 3,
  },
});

export default Servico;
