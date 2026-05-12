import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';

interface Usuario {
    nome: string;
    sobrenome: string;
    email: string;
}

export default function Perfil() {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<any>();

    useEffect(() => {
        carregarPerfil();
    }, []);

    async function carregarPerfil() {
        const { data: authData } = await supabase.auth.getUser();
        const authUser = authData?.user;

        if (!authUser) {
            setLoading(false);
            return;
        }

        const { data } = await supabase
            .from('usuarios')
            .select('nome, sobrenome, email')
            .eq('auth_id', authUser.id)
            .single();

        if (data) {
            setUsuario(data);
        } else {
            // fallback: usa email do auth
            const emailParts = (authUser.email ?? '').split('@')[0].split('.');
            setUsuario({
                nome: emailParts[0] ?? '',
                sobrenome: emailParts[1] ?? '',
                email: authUser.email ?? '',
            });
        }
        setLoading(false);
    }

    async function sair() {
        await supabase.auth.signOut();
        navigation.navigate('Login');
    }

    const iniciais = [usuario?.nome?.charAt(0), usuario?.sobrenome?.charAt(0)]
        .filter(Boolean)
        .join('')
        .toUpperCase() || 'US';

    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#6C63FF" />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.headerBackground} />
                <View style={styles.card}>
                    <View style={styles.avatarBox}>
                        <Text style={styles.avatarText}>{iniciais}</Text>
                    </View>

                    <Text style={styles.name}>
                        {usuario?.nome} {usuario?.sobrenome}
                    </Text>
                    <Text style={styles.email}>{usuario?.email || 'Email não informado'}</Text>

                    <View style={styles.infoRow}>
                        <View style={styles.infoBox}>
                            <Text style={styles.infoLabel}>Nome</Text>
                            <Text style={styles.infoValue}>{usuario?.nome || '-'}</Text>
                        </View>
                        <View style={styles.infoBox}>
                            <Text style={styles.infoLabel}>Sobrenome</Text>
                            <Text style={styles.infoValue}>{usuario?.sobrenome || '-'}</Text>
                        </View>
                    </View>

                    <View style={styles.buttonsRow}>
                        <Pressable style={styles.secondaryButton} onPress={sair}>
                            <Text style={styles.secondaryButtonText}>Sair</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#eef1ff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flexGrow: 1,
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 20,
    },
    headerBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 200,
        backgroundColor: '#6C63FF',
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
    },
    card: {
        width: '90%',
        backgroundColor: '#ffffff',
        borderRadius: 24,
        padding: 24,
        marginTop: 80,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 10 },
        elevation: 8,
        alignItems: 'center',
    },
    avatarBox: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#e7e4ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatarText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#6C63FF',
    },
    name: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2b2d42',
    },
    email: {
        marginTop: 4,
        fontSize: 14,
        color: '#6d7290',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 24,
    },
    infoBox: {
        flex: 1,
        backgroundColor: '#f7f7ff',
        borderRadius: 16,
        padding: 14,
        marginHorizontal: 4,
    },
    infoLabel: {
        fontSize: 12,
        color: '#8f92a1',
        marginBottom: 6,
    },
    infoValue: {
        fontSize: 14,
        color: '#333',
        fontWeight: '600',
    },
    buttonsRow: {
        width: '100%',
        marginTop: 28,
    },
    secondaryButton: {
        backgroundColor: '#eef1ff',
        borderRadius: 16,
        paddingVertical: 14,
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: '#6C63FF',
        fontWeight: '700',
        fontSize: 14,
    },
});
