import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Favoritos() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Favoritos</Text>
            <Text>Suas vagas favoritas aqui.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9ff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6C63FF',
    },
});