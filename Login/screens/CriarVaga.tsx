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
    Platform,
} from 'react-native';

export default function CriarVaga({ navigation }: any) {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [experiencia, setExperiencia] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [valor, setValor] = useState('');
    const [loading, setLoading] = useState(false);

    const limparCampos = () => {
        setNome('');
        setSobrenome('');
        setExperiencia('');
        setEmail('');
        setTelefone('');
        setValor('');
    };

    const validarCampos = () => {
        if (
            !nome.trim() ||
            !sobrenome.trim() ||
            !experiencia.trim() ||
            !email.trim() ||
            !telefone.trim() ||
            !valor.trim()
        ) {
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

        const vaga: any = {
            nome: nome,
            sobrenome: sobrenome,
            experiencia: experiencia,
            email: email,
            telefone: telefone,
            valor: valor,
        };

        try {
            const apiUrl = 'https://localhost:7177/api/Candidato';

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vaga),
            });

            if (response.ok) {
                Alert.alert('Sucesso', 'Vaga cadastrada com sucesso!');
                // fechar a tela 
                navigation.goBack();
                limparCampos();
            } else {
                Alert.alert('Erro', 'Falha ao cadastrar vaga');
            }
        } catch (error) {
            Alert.alert('Erro', 'Erro ao conectar com o servidor');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Text style={styles.title}>Cadastrar Nova Vaga</Text>
                <Text style={styles.subtitle}>Preencha os dados abaixo</Text>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o nome"
                        value={nome}
                        onChangeText={setNome}
                        editable={!loading}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Sobrenome</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o sobrenome"
                        value={sobrenome}
                        onChangeText={setSobrenome}
                        editable={!loading}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Experiência</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: 5 anos em desenvolvimento"
                        value={experiencia}
                        onChangeText={setExperiencia}
                        multiline
                        numberOfLines={3}
                        textAlignVertical="top"
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
        shadowColor: '#6C63FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
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