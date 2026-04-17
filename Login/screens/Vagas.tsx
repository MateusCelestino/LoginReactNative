import { StatusBar } from 'expo-status-bar';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Pressable,
    Modal,
    TextInput,
    Alert,
    FlatList,
} from 'react-native';
import { useState, useEffect } from 'react';

interface Candidato {
    id: string;
    nome: string;
    sobrenome: string;
    experiencia: string;
    email: string;
    dataNascimento: string;
    telefone: string;
    valor: string;
}

const mapApiCandidato = (item: any): Candidato => ({
    id: String(item.id ?? ''),
    nome: item.Name ?? item.nome ?? '',
    sobrenome: item.Sobrenome ?? item.sobrenome ?? '',
    experiencia: item.Experiencia ?? item.experiencia ?? '',
    email: item.email ?? '',
    dataNascimento: item.DataNascimento ?? item.dataNascimento ?? '',
    telefone: item.Telefone ?? item.telefone ?? '',
    valor: item.valor ?? '',
});

export default function Vagas() {
    const [modalVisivel, setModalVisivel] = useState(false);
    const [candidatoSelecionado, setCandidatoSelecionado] = useState<Candidato | null>(null);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [candidatos, setCandidatos] = useState<Candidato[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const apiUrl =
            Platform.OS === 'android'
                ? 'http://10.0.2.2:7177/api/Candidato'
                : 'https://localhost:7177/api/Candidato';

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Erro ${response.status}: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                const lista = Array.isArray(data) ? data.map(mapApiCandidato) : [];
                setCandidatos(lista);
                setError(null);
            })
            .catch((fetchError) => {
                console.error('Erro ao buscar candidatos:', fetchError);
                setError('Não foi possível carregar os candidatos. Verifique a conexão.');
            })
            .finally(() => setLoading(false));
    }, []);

    const abrirInscricao = (candidato: Candidato) => {
        setCandidatoSelecionado(candidato);
        setNome('');
        setEmail('');
        setModalVisivel(true);
    };

    const confirmarInscricao = () => {
        if (!nome.trim() || !email.trim()) {
            Alert.alert('Erro', 'Preencha todos os campos!');
            return;
        }

        Alert.alert(
            'Sucesso',
            `Inscrição realizada com sucesso para ${candidatoSelecionado?.nome}!`
        );
        setModalVisivel(false);
        setCandidatoSelecionado(null);
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Candidatos Disponíveis</Text>
            <Text style={styles.headerSubtitle}>Encontre sua próxima oportunidade</Text>
        </View>
    );

    const renderMensagem = () => {
        if (loading) {
            return (
                <View style={styles.messageBox}>
                    <Text style={styles.messageText}>Carregando candidatos...</Text>
                </View>
            );
        }

        if (error) {
            return (
                <View style={styles.messageBox}>
                    <Text style={styles.messageText}>{error}</Text>
                </View>
            );
        }

        return null;
    };

    const renderCandidato = ({ item: candidato }: { item: Candidato }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View>
                    <Text style={styles.nome}>{candidato.nome}</Text>
                    <Text style={styles.sobrenome}>{candidato.sobrenome}</Text>
                </View>

                <View style={styles.badge}>
                    <Text style={styles.badgeText}>Novo</Text>
                </View>
            </View>

            <Text style={styles.dataNascimento}>{candidato.dataNascimento}</Text>

            <View style={styles.detalhes}>
                <View style={styles.detalheItem}>
                    <Text style={styles.detalheLabel}>📞 Telefone</Text>
                    <Text style={styles.detalheValor}>{candidato.telefone}</Text>
                </View>

                <View style={styles.detalheItem}>
                    <Text style={styles.detalheLabel}>💰</Text>
                    <Text style={styles.detalheValor}>{candidato.valor}</Text>
                </View>

                <View style={styles.detalheItem}>
                    <Text style={styles.detalheLabel}>📧 Email</Text>
                    <Text style={styles.detalheValor}>{candidato.email}</Text>
                </View>
            </View>

            <Pressable
                style={styles.botaoInscrever}
                onPress={() => abrirInscricao(candidato)}
            >
                <Text style={styles.botaoTexto}>Inscrever-se</Text>
            </Pressable>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            <FlatList
                data={!loading && !error ? candidatos : []}
                keyExtractor={(item) => item.id}
                renderItem={renderCandidato}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <>
                        {renderHeader()}
                        <View style={styles.listContent}>
                            {renderMensagem()}
                        </View>
                    </>
                }
                ListEmptyComponent={
                    !loading && !error ? (
                        <View style={styles.listContent}>
                            <View style={styles.messageBox}>
                                <Text style={styles.messageText}>
                                    Nenhum candidato encontrado.
                                </Text>
                            </View>
                        </View>
                    ) : null
                }
                contentContainerStyle={styles.flatListContent}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisivel}
                onRequestClose={() => setModalVisivel(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Inscrever-se</Text>
                            <Pressable onPress={() => setModalVisivel(false)}>
                                <Text style={styles.fecharBotao}>✕</Text>
                            </Pressable>
                        </View>

                        <Text style={styles.modalCandidatoName}>
                            {candidatoSelecionado?.nome}
                        </Text>
                        <Text style={styles.modalCandidatoSobrenome}>
                            {candidatoSelecionado?.sobrenome}
                        </Text>
                        <Text style={styles.modalCandidatoInfo}>
                            Telefone: {candidatoSelecionado?.telefone}
                        </Text>
                        <Text style={styles.modalCandidatoInfo}>
                            Valor: {candidatoSelecionado?.valor}
                        </Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Seu Nome Completo"
                            placeholderTextColor="#999"
                            value={nome}
                            onChangeText={setNome}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Seu Email"
                            placeholderTextColor="#999"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />

                        <Pressable
                            style={styles.botaoConfirmar}
                            onPress={confirmarInscricao}
                        >
                            <Text style={styles.botaoConfirmarTexto}>
                                Confirmar Inscrição
                            </Text>
                        </Pressable>

                        <Pressable
                            style={styles.botaoCancelar}
                            onPress={() => setModalVisivel(false)}
                        >
                            <Text style={styles.botaoCancelarTexto}>Cancelar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9ff',
    },
    flatListContent: {
        paddingBottom: 16,
    },
    header: {
        backgroundColor: '#6C63FF',
        paddingTop: 40,
        paddingBottom: 30,
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#e0d9ff',
    },
    listContent: {
        padding: 16,
    },
    messageBox: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    messageText: {
        fontSize: 14,
        color: '#333',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a2e',
        marginBottom: 4,
    },
    sobrenome: {
        fontSize: 14,
        color: '#666',
    },
    badge: {
        backgroundColor: '#6C63FF',
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    dataNascimento: {
        fontSize: 13,
        color: '#555',
        lineHeight: 20,
        marginBottom: 12,
    },
    detalhes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#f0f0f0',
    },
    detalheItem: {
        flex: 1,
    },
    detalheLabel: {
        fontSize: 12,
        color: '#999',
        marginBottom: 4,
    },
    detalheValor: {
        fontSize: 13,
        fontWeight: '600',
        color: '#1a1a2e',
    },
    botaoInscrever: {
        backgroundColor: '#6C63FF',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    botaoTexto: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 20,
        paddingVertical: 24,
        paddingBottom: 40,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1a1a2e',
    },
    fecharBotao: {
        fontSize: 24,
        color: '#999',
    },
    modalCandidatoName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6C63FF',
        marginBottom: 4,
    },
    modalCandidatoSobrenome: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    modalCandidatoInfo: {
        fontSize: 13,
        color: '#555',
        marginBottom: 12,
    },
    input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 12,
        fontSize: 14,
        color: '#1a1a2e',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    botaoConfirmar: {
        backgroundColor: '#6C63FF',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    botaoConfirmarTexto: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    botaoCancelar: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    botaoCancelarTexto: {
        color: '#666',
        fontSize: 16,
        fontWeight: 'bold',
    },
});