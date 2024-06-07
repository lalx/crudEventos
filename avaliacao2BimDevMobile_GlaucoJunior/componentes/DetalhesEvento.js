import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Button, Alert } from "react-native";

import { db } from "../config/config";
import { ref, update } from "firebase/database";

const DetalhesEvento = ({ route, navigation }) => {
const { evento, data, local, descricao, eventos } = route.params;
  const [novoEvento, setNovoEvento] = useState(evento);
  const [novaData, setNovaData] = useState(data);
  const [novoLocal, setNovoLocal] = useState(local);
  const [novaDescricao, setNovaDescricao] = useState(descricao);

  const salvarEdicao = () => {
    const eventoExistente = eventos.find(c =>
      c.Evento === evento &&
      c.Data === data &&
      c.Local === local &&
      c.Descricao === descricao
    );

    if (eventoExistente) {
      update(ref(db, `/Eventos/${eventoExistente.key}`), {
        Evento: novoEvento,
        Data: novaData,
        Local: novoLocal,
        Descricao: novaDescricao,
      }).then(() => {
        Alert.alert('Evento atualizado com sucesso!');
        navigation.goBack();
      }).catch(error => {
        Alert.alert('Erro ao atualizar o evento: ', error.message);
      });
    } else {
      Alert.alert('Evento não encontrado.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={novoEvento}
        onChangeText={setNovoEvento}
      />
      <Text style={styles.label}>Data:</Text>
      <TextInput
        style={styles.input}
        value={novaData}
        onChangeText={setNovaData}
      />
      <Text style={styles.label}>Local:</Text>
      <TextInput
        style={styles.input}
        value={novoLocal}
        onChangeText={setNovoLocal}
      />
      <Text style={styles.label}>Descrição:</Text>
      <TextInput
        style={styles.input}
        value={novaDescricao}
        onChangeText={setNovaDescricao}
      />
      <Button title="Salvar" onPress={salvarEdicao} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 40,
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default DetalhesEvento;