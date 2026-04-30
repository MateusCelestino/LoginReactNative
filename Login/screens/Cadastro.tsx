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
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation<any>();

    function limparCampos() {
        setNome('');
        setSobrenome('');
        setEmail('');
        setSenha('');
        setConfirmarSenha('');
    }

    function validarCampos() {
        if (!nome.trim() || !sobrenome.trim() || !email.trim() || !senha.trim() || !confirmarSenha.trim()) {
            Alert.alert('Erro', 'Preencha todos os campos');
            return false;
        }

        if (!email.includes('@')) {
            Alert.alert('Erro', 'Email inválido');
            return false;
        }

        if (senha.length < 6) {
            Alert.alert('Erro', 'A senha precisa ter pelo menos 6 caracteres');
            return false;
        }

        if (senha !== confirmarSenha) {
            Alert.alert('Erro', 'As senhas não coincidem');
            return false;
        }

        return true;
    }

    async function cadastrarUsuario() {
        if (!validarCampos()) return;

        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signUp({
                email: email.trim(),
                password: senha,
            });

            if (error) {
                Alert.alert('Erro', error.message);
                return;
            }

            const userId = data.user?.id;

            const { error: errorDb } = await supabase.from('usuarios').insert({
                auth_id: userId,
                nome: nome.trim(),
                sobrenome: sobrenome.trim(),
                email: email.trim(),
            });

            if (errorDb) {
                Alert.alert('Erro', errorDb.message);
                return;
            }

            Alert.alert('Sucesso', 'Cadastro realizado com sucesso!', [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('Login'),
                },
            ]);

            limparCampos();
        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Erro inesperado ao cadastrar');
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Text style={styles.title}>Criar Conta</Text>
                <Text style={styles.subtitle}>Preencha os dados abaixo</Text>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu nome"
                        value={nome}
                        onChangeText={setNome}
                        editable={!loading}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Sobrenome</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu sobrenome"
                        value={sobrenome}
                        onChangeText={setSobrenome}
                        editable={!loading}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="seu@email.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        editable={!loading}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Senha</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua senha"
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry
                        editable={!loading}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Confirmar Senha</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirme sua senha"
                        value={confirmarSenha}
                        onChangeText={setConfirmarSenha}
                        secureTextEntry
                        editable={!loading}
                    />
                </View>

                <Pressable
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={cadastrarUsuario}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" size="small" />
                    ) : (
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    )}
                </Pressable>

                <Pressable
                    style={styles.buttonSecondary}
                    onPress={limparCampos}
                    disabled={loading}
                >
                    <Text style={styles.buttonSecondaryText}>Limpar Campos</Text>
                </Pressable>

                <Pressable
                    style={styles.linkContainer}
                    onPress={() => navigation.navigate('Login')}
                    disabled={loading}
                >
                    <Text style={styles.linkText}>Já tem conta? Faça login</Text>
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
    linkContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    linkText: {
        color: '#6C63FF',
        fontSize: 14,
        fontWeight: '600',
    },
});