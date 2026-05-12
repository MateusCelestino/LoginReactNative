import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    FlatList,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';

interface Recurso {
    id: string;
    emoji: string;
    titulo: string;
    info: string;
    email?: string;
    telefone?: string;
    salario_esperado?: number;
}

const ACOES = [
    { label: 'Perfil', emoji: '👤', tela: 'Perfil' },
    { label: 'Criar Vaga', emoji: '➕', tela: 'Criar Vaga' },
    { label: 'Favoritos', emoji: '⭐', tela: 'Favoritos' },
    { label: 'Dicas', emoji: '💡', tela: 'Dicas' },
];

export default function Home({ route }: any) {
    const navigation = useNavigation<any>();

    const [nomeUsuario, setNomeUsuario] = useState<string>('');
    const [recursos, setRecursos] = useState<Recurso[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    useEffect(() => {
        carregarNome();
        buscarVagas();
    }, []);

    async function carregarNome() {
        if (route?.params?.usuario?.nome) {
            setNomeUsuario(route.params.usuario.nome);
            return;
        }

        const { data: authData } = await supabase.auth.getUser();
        const authUser = authData?.user;
        if (!authUser) return;

        const { data } = await supabase
            .from('usuarios')
            .select('nome')
            .eq('auth_id', authUser.id)
            .single();

        if (data?.nome) {
            setNomeUsuario(data.nome);
        } else if (authUser.email) {
            setNomeUsuario(authUser.email.split('@')[0]);
        }
    }

    async function buscarVagas() {
        setLoading(true);
        const { data, error } = await supabase
            .from('vagas')
            .select('*')
            .order('id', { ascending: false });

        if (!error && data) {
            setRecursos(data.map((item: any) => ({
                id: item.id.toString(),
                emoji: '💼',
                titulo: item.nome || 'Vaga sem nome',
                info: item.experiencia || 'Sem experiência informada',
                email: item.email,
                telefone: item.telefone,
                salario_esperado: item.salario_esperado,
            })));
        }
        setLoading(false);
    }

    async function atualizarLista() {
        setRefreshing(true);
        await buscarVagas();
        setRefreshing(false);
    }

    async function sair() {
        await supabase.auth.signOut();
        navigation.navigate('Login');
    }

    function renderHeader() {
        return (
            <>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <View style={styles.saudacao}>
                            <Text style={styles.oi}>Olá, 👋</Text>
                            <Text style={styles.nomeUsuario}>{nomeUsuario || 'Usuário'}</Text>
                        </View>
                        <Pressable style={styles.avatarContainer} onPress={sair}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarTexto}>
                                    {nomeUsuario ? nomeUsuario.substring(0, 2).toUpperCase() : 'US'}
                                </Text>
                            </View>
                            <Text style={styles.sairTexto}>Sair</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.subtitulo}>
                        Encontre a melhor oportunidade para sua carreira
                    </Text>
                </View>

                {/* Ações rápidas */}
                <View style={styles.acoesContainer}>
                    {ACOES.map((acao) => (
                        <Pressable
                            key={acao.tela}
                            style={styles.acaoCard}
                            onPress={() => navigation.navigate(acao.tela)}
                        >
                            <Text style={styles.acaoEmoji}>{acao.emoji}</Text>
                            <Text style={styles.acaoLabel}>{acao.label}</Text>
                        </Pressable>
                    ))}
                </View>

                {/* Card destaque */}
                <View style={styles.cardDestaque}>
                    <View style={styles.destqueBadge}>
                        <Text style={styles.destqueBadgeTexto}>🔥 Em Alta</Text>
                    </View>
                    <Text style={styles.destqueTitle}>Vagas Disponíveis</Text>
                    <Text style={styles.destqueDescricao}>
                        Explore as melhores oportunidades de trabalho
                    </Text>
                    <Text style={styles.vagasCount}>{recursos.length} vagas disponíveis</Text>
                    <Pressable style={styles.botaoPrincipal} onPress={() => navigation.navigate('Vagas')}>
                        <Text style={styles.botaoPrincipalTexto}>Explorar Vagas →</Text>
                    </Pressable>
                </View>

                <View style={styles.secaoRecursos}>
                    <Text style={styles.tituloSecao}>Vagas Recentes</Text>
                </View>
            </>
        );
    }

    function renderItem({ item }: { item: Recurso }) {
        return (
            <Pressable
                style={styles.recursoCard}
                onPress={() => navigation.navigate('DetalhesVaga', { vaga: item })}
            >
                <View style={styles.recursoIcone}>
                    <Text style={styles.recursoEmoji}>{item.emoji}</Text>
                </View>
                <Text style={styles.recursoTitulo}>{item.titulo}</Text>
                <Text style={styles.recursoInfo}>{item.info}</Text>
                {item.salario_esperado != null && (
                    <Text style={styles.salario}>
                        R$ {Number(item.salario_esperado).toFixed(2)}
                    </Text>
                )}
            </Pressable>
        );
    }

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6C63FF" />
                <Text style={styles.loadingText}>Carregando vagas...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <FlatList
                data={recursos}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={renderItem}
                ListHeaderComponent={renderHeader}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={atualizarLista} />
                }
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Nenhuma vaga encontrada</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9ff',
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#f8f9ff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        color: '#6C63FF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    listContent: {
        paddingBottom: 24,
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
    sairTexto: {
        color: '#e0d9ff',
        fontSize: 11,
        marginTop: 4,
    },
    subtitulo: {
        fontSize: 14,
        color: '#e0d9ff',
        lineHeight: 20,
    },
    acoesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 20,
        marginBottom: 4,
    },
    acaoCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 12,
        alignItems: 'center',
        paddingVertical: 14,
        marginHorizontal: 4,
        elevation: 2,
    },
    acaoEmoji: {
        fontSize: 22,
        marginBottom: 4,
    },
    acaoLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
    cardDestaque: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginTop: 16,
        marginBottom: 16,
        padding: 20,
        borderRadius: 16,
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
        marginBottom: 12,
    },
    tituloSecao: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a2e',
    },
    columnWrapper: {
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    recursoCard: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        alignItems: 'center',
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
        textAlign: 'center',
    },
    recursoInfo: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
    },
    salario: {
        marginTop: 8,
        fontSize: 13,
        fontWeight: 'bold',
        color: '#6C63FF',
    },
    emptyContainer: {
        padding: 30,
        alignItems: 'center',
    },
    emptyText: {
        color: '#999',
        fontSize: 15,
    },
});
