import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, ScrollView, FlatList, Platform } from 'react-native';
import { useState, useEffect, use } from 'react';
import { useNavigation } from '@react-navigation/native';

// Interfaces
interface Usuario {
    nome: string;
}

interface Recurso {
    id: string;
    emoji: string;
    titulo: string;
    info: string;
}

// pegar os dados do usuário que foi enviado no navigate logado e exibir na tela de home
export default function Home({ route }: any) {
    const [userName, setUserName] = useState<Usuario | null>(null);
    const navigation = useNavigation<any>();

    console.log("Dados do usuário recebidos na Home:", route.params.usuario);
    const abrirVagas = () => {
        navigation.navigate('Vagas');
    };

    const abrirRecurso = (recurso: Recurso) => {
        navigation.navigate(recurso.titulo);
    };

    useEffect(() => {
        if (route.params.usuario) {
            setUserName(route.params.usuario);
        }
    }, [route.params.usuario]);

    const recursos: Recurso[] = [
        { id: '1', emoji: '📋', titulo: 'Perfil', info: 'Completo seu perfil' },
        { id: '2', emoji: '💼', titulo: 'Criar Vaga', info: 'Crie sua vaga' },
        { id: '3', emoji: '📚', titulo: 'Dicas', info: 'Dicas úteis' },
        { id: '4', emoji: '⭐', titulo: 'Favoritos', info: 'Suas vagas' },
    ];

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <View style={styles.saudacao}>
                            <Text style={styles.oi}>Olá, 👋</Text>
                            <Text style={styles.nomeUsuario}>{userName?.nome || 'Usuário Desconhecido'}</Text>
                        </View>
                        <View style={styles.avatarContainer}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarTexto}>
                                    {userName && userName.nome ? userName.nome.substring(0, 2).toUpperCase() : 'US'}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.subtitulo}>
                        Encontre a melhor oportunidade para sua carreira
                    </Text>
                </View>

                {/* Card Destaque */}
                <View style={styles.cardDestaque}>
                    <View style={styles.destqueBadge}>
                        <Text style={styles.destqueBadgeTexto}>🔥 Em Alta</Text>
                    </View>
                    <Text style={styles.destqueTitle}>Vagas Disponíveis</Text>
                    <Text style={styles.destqueDescricao}>
                        Explore as melhores oportunidades de trabalho
                    </Text>
                    <Text style={styles.vagasCount}>23 vagas novas esta semana</Text>
                    <Pressable style={styles.botaoPrincipal} onPress={abrirVagas}>
                        <Text style={styles.botaoPrincipalTexto}>Explorar Vagas →</Text>
                    </Pressable>
                </View>

                {/* Seção Recursos */}
                <View style={styles.secaoRecursos}>
                    <Text style={styles.tituloSecao}>Recursos</Text>
                    <FlatList
                        data={recursos}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        scrollEnabled={false}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        renderItem={({ item }) => (
                            <Pressable style={styles.recursoCard} onPress={() => abrirRecurso(item)}>
                                <View style={styles.recursoIcone}>
                                    <Text style={styles.recursoEmoji}>{item.emoji}</Text>
                                </View>
                                <Text style={styles.recursoTitulo}>{item.titulo}</Text>
                                <Text style={styles.recursoInfo}>{item.info}</Text>
                            </Pressable>
                        )}
                    />
                </View>

                {/* Mantive o restante do seu layout de stats e dicas igual... */}
                <View style={styles.secaoStats}>
                    <Text style={styles.tituloSecao}>Seu Desempenho</Text>
                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumero}>12</Text>
                            <Text style={styles.statLabel}>Inscrições</Text>
                        </View>
                        <View style={styles.statDivisor} />
                        <View style={styles.statItem}>
                            <Text style={styles.statNumero}>8</Text>
                            <Text style={styles.statLabel}>Perfil Visto</Text>
                        </View>
                        <View style={styles.statDivisor} />
                        <View style={styles.statItem}>
                            <Text style={styles.statNumero}>5</Text>
                            <Text style={styles.statLabel}>Entrevistas</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

// ... seus estilos permanecem os mesmos

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9ff',
    },
    scrollView: {
        flex: 1,
    },
    header: {
        backgroundColor: '#6C63FF',
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 30,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    saudacao: {
        flex: 1,
    },
    oi: {
        fontSize: 16,
        color: '#e0d9ff',
        marginBottom: 4,
    },
    nomeUsuario: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarTexto: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitulo: {
        fontSize: 14,
        color: '#e0d9ff',
        lineHeight: 20,
    },
    cardDestaque: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginTop: 20,
        marginBottom: 20,
        padding: 20,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 4,
    },
    destqueBadge: {
        alignSelf: 'flex-start',
        backgroundColor: '#fff3e0',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginBottom: 12,
    },
    destqueBadgeTexto: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#ff9800',
    },
    destqueTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1a1a2e',
        marginBottom: 8,
    },
    destqueDescricao: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
        lineHeight: 20,
    },
    vagasCount: {
        fontSize: 13,
        color: '#999',
        marginBottom: 16,
        fontStyle: 'italic',
    },
    botaoPrincipal: {
        backgroundColor: '#6C63FF',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    botaoPrincipalTexto: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    secaoRecursos: {
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    tituloSecao: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a2e',
        marginBottom: 12,
    },
    recursoGrid: {
        justifyContent: 'space-between',
    },
    recursoCard: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    recursoIcone: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    recursoEmoji: {
        fontSize: 24,
    },
    recursoTitulo: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1a1a2e',
        marginBottom: 4,
    },
    recursoInfo: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
    },
    secaoStats: {
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    statsContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 20,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statNumero: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6C63FF',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#999',
    },
    statDivisor: {
        width: 1,
        height: 40,
        backgroundColor: '#f0f0f0',
    },
    secaoDicas: {
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    dicaCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    dicaNumero: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#6C63FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    dicaNumeroTexto: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    dicaConteudo: {
        flex: 1,
    },
    dicaTitulo: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1a1a2e',
        marginBottom: 4,
    },
    dicaDescricao: {
        fontSize: 12,
        color: '#666',
        lineHeight: 18,
    },
});