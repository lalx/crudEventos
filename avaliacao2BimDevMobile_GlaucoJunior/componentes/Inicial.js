import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button, Alert } from "react-native";
import Eventos from "./Eventos";

import { db } from "../config/config";
import { ref, onValue, remove } from "firebase/database";

const Inicial = ({ navigation }) => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const eventosRef = ref(db, '/Eventos');
    onValue(eventosRef, (snapshot) => {
      let data = snapshot.val();
      if (data) {
        let eventos = Object.entries(data).map(([key, value]) => {
          return { key, ...value };
        });
        setEventos(eventos);
      } else {
        setEventos([]);
      }
    });
  }, []);

  const removerEvento = (index) => {
    const eventoARemover = eventos[index];
    const eventoKey = eventoARemover.key;
    remove(ref(db, `/Eventos/${eventoKey}`))
      .then(() => {
        Alert.alert('Evento removido com sucesso!');
      })
      .catch((error) => {
        Alert.alert('Erro ao remover o evento:', error.message);
      });
  };

  const DetalhesEvento = (evento) => {
    navigation.navigate('Detalhes', {
      evento: evento.Evento,
      data: evento.Data,
      local: evento.Local,
      descricao: evento.Descricao,
      eventos: eventos
    });
  };

  return (
    <View style={styles.container}>
      {eventos.length > 0 ? (
        <Eventos eventos={eventos} onRemoverEvento={removerEvento} onDetalhesEvento={DetalhesEvento} />
      ) : (
        <Text style={styles.text}>Não há eventos cadastrados!</Text>
      )}

      <View style={styles.botao}>
        <Button
          title="Criar Evento"
          onPress={() => navigation.navigate('Criar')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  botao: {
    margin: 10
  }
});

export default Inicial;