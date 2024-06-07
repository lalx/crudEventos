import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Button, Alert } from "react-native";

import { db } from "../config/config";
import { ref, push } from "firebase/database";

const CriarEvento = ({ navigation }) => {
  const [evento, setEvento] = useState('');
  const [data, setData] = useState('');
  const [local, setLocal] = useState('');
  const [descricao, setDescricao] = useState('');

  const salvarEvento = () => {
    if (evento && data && local && descricao) {
      const eventosRef = ref(db, '/Eventos');
      push(eventosRef, {
        Evento: evento,
        Data: data,
        Local: local,
        Descricao: descricao
      }).then(() => {
        Alert.alert('Evento Salvo!');
        setEvento('');
        setData('');
        setLocal('');
        setDescricao('');
      }).catch(error => {
        Alert.alert('Erro ao salvar o evento: ', error.message);
      });
    } else {
      Alert.alert('Por favor, preencha todos os campos.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Evento:</Text>
      <TextInput
        style={styles.input}
        value={evento}
        onChangeText={setEvento}
      />
      <Text style={styles.label}>Data:</Text>
      <TextInput
        style={styles.input}
        value={data}
        onChangeText={setData}
      />
      <Text style={styles.label}>Local:</Text>
      <TextInput
        style={styles.input}
        value={local}
        onChangeText={setLocal}
      />
      <Text style={styles.label}>Descrição:</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
      />
      <Button title="Criar" onPress={salvarEvento} />
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

export default CriarEvento;