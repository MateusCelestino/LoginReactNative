import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function DetalhesVaga({ route }: any) {
    const navigation = useNavigation<any>();
    const vaga = route?.params?.vaga;

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Text style={styles.emoji}>💼</Text>
                <Text style={styles.titulo}>{vaga?.titulo || 'Vaga'}</Text>
                <Text style={styles.info}>{vaga?.info || ''}</Text>
            </View>

            <View style={styles.card}>
                {vaga?.email && (
                    <View style={styles.row}>
                        <Text style={styles.label}>📧 Email</Text>
                        <Text style={styles.value}>{vaga.email}</Text>
                    </View>
                )}

                {vaga?.telefone && (
                    <View style={styles.row}>
                        <Text style={styles.label}>📞 Telefone</Text>
                        <Text style={styles.value}>{vaga.telefone}</Text>
                    </View>
                )}

                {vaga?.salario_esperado != null && (
                    <View style={styles.row}>
                        <Text style={styles.label}>💰 Salário</Text>
                        <Text style={styles.value}>
                            R$ {Number(vaga.salario_esperado).toFixed(2)}
                        </Text>
                    </View>
                )}
            </View>

            <Pressable style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Voltar</Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9ff',
    },
    header: {
        backgroundColor: '#6C63FF',
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 30,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        alignItems: 'center',
    },
    emoji: {
        fontSize: 48,
        marginBottom: 12,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 8,
    },
    info: {
        fontSize: 14,
        color: '#e0d9ff',
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 16,
        padding: 20,
        elevation: 3,
    },
    row: {
        marginBottom: 16,
    },
    label: {
        fontSize: 12,
        color: '#999',
        marginBottom: 4,
    },
    value: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1a1a2e',
    },
    button: {
        backgroundColor: '#6C63FF',
        marginHorizontal: 16,
        marginBottom: 24,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
