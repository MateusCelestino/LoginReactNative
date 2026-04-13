import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, ScrollView, Modal, TextInput, Alert } from 'react-native';
import { useState } from 'react';

interface Vaga {
    id: string;
    titulo: string;
    empresa: string;
    salario: string;
    localizacao: string;
    descricao: string;
}

const vagasData: Vaga[] = [
    {
        id: '1',
        titulo: 'Desenvolvedor React Native',
        empresa: 'Tech Solutions',
        salario: 'R$ 5.000 - R$ 8.000',
        localizacao: 'São Paulo, SP',
        descricao: 'Procuramos desenvolvedor experiente em React Native para trabalhar em projetos inovadores.',
    },
    {
        id: '2',
        titulo: 'Desenvolvedor Full Stack',
        empresa: 'Digital Innovations',
        salario: 'R$ 6.000 - R$ 9.000',
        localizacao: 'Rio de Janeiro, RJ',
        descricao: 'Desenvolva aplicações web e mobile com as melhores tecnologias do mercado.',
    },
    {
        id: '3',
        titulo: 'Designer UX/UI',
        empresa: 'Creative Studio',
        salario: 'R$ 4.500 - R$ 7.000',
        localizacao: 'Belo Horizonte, MG',
        descricao: 'Crie experiências incríveis para usuários em nossas plataformas digitais.',
    },
    {
        id: '4',
        titulo: 'Gerente de Projetos',
        empresa: 'Project Masters',
        salario: 'R$ 7.000 - R$ 10.000',
        localizacao: 'Curitiba, PR',
        descricao: 'Lidere times multidisciplinares em projetos de grande impacto.',
    },
];

export default function Vagas() {
    const [modalVisivel, setModalVisivel] = useState(false);
    const [vagaSelecionada, setVagaSelecionada] = useState<Vaga | null>(null);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

    const abrirInscricao = (vaga: Vaga) => {
        setVagaSelecionada(vaga);
        setNome('');
        setEmail('');
        setModalVisivel(true);
    };

    const confirmarInscricao = () => {
        if (!nome.trim() || !email.trim()) {
            Alert.alert('Erro', 'Preencha todos os campos!');
            return;
        }
        Alert.alert('Sucesso', `Inscrição realizada com sucesso para a vaga de ${vagaSelecionada?.titulo}!`);
        setModalVisivel(false);
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Vagas Disponíveis</Text>
                <Text style={styles.headerSubtitle}>Encontre sua próxima oportunidade</Text>
            </View>

            {/* Lista de Vagas */}
            <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
                {vagasData.map((vaga) => (
                    <View key={vaga.id} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View>
                                <Text style={styles.titulo}>{vaga.titulo}</Text>
                                <Text style={styles.empresa}>{vaga.empresa}</Text>
                            </View>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>Novo</Text>
                            </View>
                        </View>

                        <Text style={styles.descricao}>{vaga.descricao}</Text>

                        <View style={styles.detalhes}>
                            <View style={styles.detalheItem}>
                                <Text style={styles.detalheLabel}>💰 Salário</Text>
                                <Text style={styles.detalheValor}>{vaga.salario}</Text>
                            </View>
                            <View style={styles.detalheItem}>
                                <Text style={styles.detalheLabel}>📍 Localização</Text>
                                <Text style={styles.detalheValor}>{vaga.localizacao}</Text>
                            </View>
                        </View>

                        <Pressable
                            style={styles.botaoInscrever}
                            onPress={() => abrirInscricao(vaga)}
                        >
                            <Text style={styles.botaoTexto}>Inscrever-se</Text>
                        </Pressable>
                    </View>
                ))}
            </ScrollView>

            {/* Modal de Inscrição */}
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

                        <Text style={styles.modalVagaTitulo}>{vagaSelecionada?.titulo}</Text>
                        <Text style={styles.modalVagaEmpresa}>{vagaSelecionada?.empresa}</Text>

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
                            <Text style={styles.botaoConfirmarTexto}>Confirmar Inscrição</Text>
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
    listContainer: {
        flex: 1,
        padding: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
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
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a2e',
        marginBottom: 4,
    },
    empresa: {
        fontSize: 14,
        color: '#666',
    },
    badge: {
        backgroundColor: '#6C63FF',
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    descricao: {
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
    modalVagaTitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6C63FF',
        marginBottom: 4,
    },
    modalVagaEmpresa: {
        fontSize: 14,
        color: '#666',
        marginBottom: 24,
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