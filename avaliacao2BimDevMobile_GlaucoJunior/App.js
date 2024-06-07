// App.js
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicial from "./componentes/Inicial";
import CriarEvento from "./componentes/CriarEvento";
import DetalhesEvento from "./componentes/DetalhesEvento";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicial" component={Inicial} />
        <Stack.Screen name="Criar" component={CriarEvento} />
        <Stack.Screen name="Detalhes" component={DetalhesEvento} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}