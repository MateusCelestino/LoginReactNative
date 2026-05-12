import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    ScrollView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { supabase } from '../lib/supabase';

export default function CriarVaga({ navigation }: any) {
    const [nome, setNome] = useState('');
    const [experiencia, setExperiencia] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [valor, setValor] = useState('');
    const [loading, setLoading] = useState(false);

    const limparCampos = () => {
        setNome('');
        setExperiencia('');
        setEmail('');
        setTelefone('');
        setValor('');
    };

    const validarCampos = () => {
        if (!nome.trim() || !experiencia.trim() || !email.trim() || !telefone.trim() || !valor.trim()) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return false;
        }
        if (!email.includes('@')) {
            Alert.alert('Erro', 'Email inválido');
            return false;
        }
        return true;
    };

    const salvarVaga = async () => {
        if (!validarCampos()) return;

        setLoading(true);

        const { error } = await supabase.from('vagas').insert({
            nome: nome.trim(),
            experiencia: experiencia.trim(),
            email: email.trim(),
            telefone: telefone.trim(),
            salario_esperado: parseFloat(valor.replace(',', '.')) || null,
        });

        setLoading(false);

        if (error) {
            Alert.alert('Erro', error.message);
            return;
        }

        Alert.alert('Sucesso', 'Vaga cadastrada com sucesso!');
        navigation.goBack();
        limparCampos();
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Text style={styles.title}>Cadastrar Nova Vaga</Text>
                <Text style={styles.subtitle}>Preencha os dados abaixo</Text>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nome da Vaga</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: Desenvolvedor React Native"
                        value={nome}
                        onChangeText={setNome}
                        editable={!loading}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Experiência Necessária</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: 2 anos em desenvolvimento mobile"
                        value={experiencia}
                        onChangeText={setExperiencia}
                        multiline
                        numberOfLines={3}
                        textAlignVertical="top"
                        editable={!loading}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email de Contato</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="contato@empresa.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        editable={!loading}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Telefone</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="(11) 98765-4321"
                        value={telefone}
                        onChangeText={setTelefone}
                        keyboardType="phone-pad"
                        editable={!loading}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Salário Esperado</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="R$ 0,00"
                        value={valor}
                        onChangeText={setValor}
                        keyboardType="decimal-pad"
                        editable={!loading}
                    />
                </View>

                <Pressable
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={salvarVaga}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" size="small" />
                    ) : (
                        <Text style={styles.buttonText}>Salvar Vaga</Text>
                    )}
                </Pressable>

                <Pressable
                    style={styles.buttonSecondary}
                    onPress={limparCampos}
                    disabled={loading}
                >
                    <Text style={styles.buttonSecondaryText}>Limpar Campos</Text>
                </Pressable>
            </View>
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
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#e0d9ff',
    },
    formContainer: {
        paddingHorizontal: 20,
        paddingVertical: 24,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderWidth: 1.5,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 14,
        color: '#333',
    },
    button: {
        backgroundColor: '#6C63FF',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        elevation: 5,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonSecondary: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    buttonSecondaryText: {
        color: '#666',
        fontSize: 14,
        fontWeight: '600',
    },
});
