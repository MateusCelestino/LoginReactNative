import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Vaga {
    id: string;
    nome: string;
    experiencia: string;
    email: string;
    telefone: string;
    salario_esperado: number | null;
}

export default function Vagas() {
    const [vagas, setVagas] = useState<Vaga[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        buscarVagas();
    }, []);

    async function buscarVagas() {
        setLoading(true);
        const { data, error } = await supabase
            .from('vagas')
            .select('*')
            .order('id', { ascending: false });

        if (error) {
            setError('Não foi possível carregar as vagas.');
        } else {
            setVagas((data ?? []).map((item: any) => ({ ...item, id: String(item.id) })));
            setError(null);
        }
        setLoading(false);
    }

    const renderVaga = ({ item }: { item: Vaga }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.nome}>{item.nome}</Text>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>Aberta</Text>
                </View>
            </View>

            <Text style={styles.experiencia}>{item.experiencia || 'Sem descrição'}</Text>

            <View style={styles.detalhes}>
                <View style={styles.detalheItem}>
                    <Text style={styles.detalheLabel}>📧 Email</Text>
                    <Text style={styles.detalheValor} numberOfLines={1}>{item.email || '-'}</Text>
                </View>
                <View style={styles.detalheItem}>
                    <Text style={styles.detalheLabel}>📞 Telefone</Text>
                    <Text style={styles.detalheValor}>{item.telefone || '-'}</Text>
                </View>
                {item.salario_esperado != null && (
                    <View style={styles.detalheItem}>
                        <Text style={styles.detalheLabel}>💰 Salário</Text>
                        <Text style={styles.detalheValor}>
                            R$ {Number(item.salario_esperado).toFixed(2)}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            <FlatList
                data={vagas}
                keyExtractor={(item) => item.id}
                renderItem={renderVaga}
                showsVerticalScrollIndicator={false}
                onRefresh={buscarVagas}
                refreshing={loading}
                ListHeaderComponent={
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Vagas Disponíveis</Text>
                        <Text style={styles.headerSubtitle}>Encontre sua próxima oportunidade</Text>
                    </View>
                }
                ListEmptyComponent={
                    !loading ? (
                        <View style={styles.messageBox}>
                            <Text style={styles.messageText}>
                                {error ?? 'Nenhuma vaga encontrada.'}
                            </Text>
                        </View>
                    ) : null
                }
                contentContainerStyle={styles.flatListContent}
            />
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
        marginBottom: 16,
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
    messageBox: {
        margin: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    messageText: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
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
        marginBottom: 8,
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a2e',
        flex: 1,
        marginRight: 8,
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
    experiencia: {
        fontSize: 13,
        color: '#555',
        lineHeight: 20,
        marginBottom: 12,
    },
    detalhes: {
        paddingTop: 12,
        borderTopWidth: 1,
        borderColor: '#f0f0f0',
        gap: 8,
    },
    detalheItem: {},
    detalheLabel: {
        fontSize: 12,
        color: '#999',
        marginBottom: 2,
    },
    detalheValor: {
        fontSize: 13,
        fontWeight: '600',
        color: '#1a1a2e',
    },
});
