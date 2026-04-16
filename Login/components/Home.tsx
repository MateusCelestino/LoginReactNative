import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, ScrollView, FlatList, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

// Interfaces
interface Usuario {
    nome: string; // Mapeia com o [JsonPropertyName("nome")] do C#
}

interface Recurso {
    id: string;
    emoji: string;
    titulo: string;
    info: string;
}
x   
export default function Home() {
    const [userName, setUserName] = useState('Visitante');
    const navigation = useNavigation<any>();

    useEffect(() => {
        // Nota: 10.0.2.2 é o IP do host para o emulador Android
        // Se estiver no iOS, use 'localhost'. Se for celular físico, use o IP da sua máquina.
        const apiUrl = Platform.OS === 'android' ? 'http://10.0.2.2:7177/api/Login' : 'http://localhost:7177/api/Login';

        fetch(apiUrl)
            .then((resposta) => {
                if (!resposta.ok) throw new Error('Erro na resposta do servidor');
                return resposta.json();
            })
            .then((dados: Usuario) => {
                if (dados && dados.nome) {
                    setUserName(dados.nome);
                }
            })
            .catch((erro) => console.error('Erro ao buscar dados:', erro));
    }, []);

    const abrirVagas = () => {
        navigation.navigate('Vagas');
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <View style={styles.saudacao}>
                            <Text style={styles.oi}>Olá, 👋</Text>
                            <Text style={styles.nomeUsuario}>{userName}</Text>
                        </View>
                        <View style={styles.avatarContainer}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarTexto}>
                                    {userName ? userName.substring(0, 2).toUpperCase() : 'US'}
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
                    <View style={styles.destaqueBadge}>
                        <Text style={styles.destaqueBadgeTexto}>🔥 Em Alta</Text>
                    </View>
                    <Text style={styles.destaqueTitle}>Vagas Disponíveis</Text>
                    <Text style={styles.destaqueDescricao}>
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
                            <Pressable style={styles.recursoCard}>
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
    destaqueBadge: {
        alignSelf: 'flex-start',
        backgroundColor: '#fff3e0',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginBottom: 12,
    },
    destaqueBadgeTexto: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#ff9800',
    },
    destaqueTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1a1a2e',
        marginBottom: 8,
    },
    destaqueDescricao: {
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