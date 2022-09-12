import React from "react";
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";

import api from "../api/ApiService.js";

const Cliente = ({ navigation }) => {
  const [allClientes, setAllClientes] = useState([]);

  useEffect(() => {
    const getClientes = async () => {
      const clientes = await api.get("/cliente");
      setAllClientes(clientes.data);
      console.log(clientes.data);
    };

    getClientes();
  }, []);

  return (
    <View>
      <FlatList
        data={allClientes}
        renderItem={({item}) =>{
            return(
                <>
                 <Text>Id: {item.id}</Text>
                <Text>Nome: {item.nome}</Text>
                <Text>Email: {item.email}</Text>
                <Text>Cpf: {item.cpf}</Text>
                <Text>Telefone: {item.telefone}</Text>
                <Text>Ativo: {item.ativo == 1 && "Ativo" }</Text>
                </>
            )
        }}
      />
    </View>
  );
};

export default Cliente;
