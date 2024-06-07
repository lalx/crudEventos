import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import PropTypes from "prop-types";

class Eventos extends React.Component {
    static propTypes = {
        eventos: PropTypes.array.isRequired,
        onRemoverEvento: PropTypes.func.isRequired, 
        onDetalhesEvento: PropTypes.func.isRequired
    }

    render() {
        return (
            <View style={estilos.listaEventos}>
                {this.props.eventos.map((evento, index) => (
                    <View style={estilos.card} key={index}>
                        <View>
                            <Text style={estilos.textEventos}>{evento.Evento}</Text>
                            <Text style={estilos.textEventos}>Data: {evento.Data}</Text>
                            <Text style={estilos.textEventos}>Local: {evento.Local}</Text>
                        </View>
                        <View style={estilos.botoesContainer}>
                            <Button
                                title="Detalhes"
                                onPress={() => this.props.onDetalhesEvento(evento)}
                                color="blue"
                            />
                            <Button
                                title="Remover"
                                onPress={() => this.props.onRemoverEvento(index)}
                                color="red"
                            />
                        </View>
                    </View>
                ))}
            </View>
        );
    }
}

const estilos = StyleSheet.create({
    listaEventos: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textEventos: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    botoesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});

export default Eventos;