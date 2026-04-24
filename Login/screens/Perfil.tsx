import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Candidato {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    experiencia: string;
    sobremim: string;
}

export default function Candidato({ route }: any) {
    const [userName, setUserName] = useState<Candidato | null>(null);
    const navigation = useNavigation<any>();

    console.log('Candidato route params:', route.params);


    useEffect(() => {
        setUserName(route.params?.usuario || null);
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.headerBackground} />
                <View style={styles.card}>
                    <View style={styles.avatarBox}>
                        <Text style={styles.avatarText}>JD</Text>
                    </View>
                    <Text style={styles.name}>
                        {userName?.nome}
                    </Text>
                    <Text style={styles.role}>
                        {userName?.experiencia}
                    </Text>

                    <View style={styles.infoRow}>
                        <View style={styles.infoBox}>
                            <Text style={styles.infoLabel}>Email</Text>
                            <Text style={styles.infoValue}>
                                {userName?.email}
                            </Text>
                        </View>
                        <View style={styles.infoBox}>
                            <Text style={styles.infoLabel}>Telefone</Text>
                            <Text style={styles.infoValue}>
                                {userName?.telefone}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>24</Text>
                            <Text style={styles.statLabel}>Vagas</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>12</Text>
                            <Text style={styles.statLabel}>Favoritos</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>8</Text>
                            <Text style={styles.statLabel}>Conexões</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Sobre mim</Text>
                        <Text style={styles.sectionText}>
                            {userName?.sobremim || 'Profissional apaixonado por desenvolvimento de aplicativos com foco em experiências intuitivas e design moderno.'}
                        </Text>
                    </View>

                    <View style={styles.buttonsRow}>
                        <Pressable style={styles.primaryButton}>
                            <Text style={styles.primaryButtonText}>Editar Candidato</Text>
                        </Pressable>
                        <Pressable style={styles.secondaryButton}>
                            <Text style={styles.secondaryButtonText}>Sair</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#eef1ff',
    },
    container: {
        flexGrow: 1,
        backgroundColor: '#eef1ff',
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
    role: {
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
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 22,
        fontWeight: '700',
        color: '#6C63FF',
    },
    statLabel: {
        marginTop: 4,
        fontSize: 12,
        color: '#8f92a1',
    },
    section: {
        width: '100%',
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2b2d42',
        marginBottom: 8,
    },
    sectionText: {
        fontSize: 14,
        color: '#60677d',
        lineHeight: 20,
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 28,
    },
    primaryButton: {
        flex: 1,
        backgroundColor: '#6C63FF',
        borderRadius: 16,
        paddingVertical: 14,
        marginRight: 8,
        alignItems: 'center',
    },
    primaryButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 14,
    },
    secondaryButton: {
        flex: 1,
        backgroundColor: '#eef1ff',
        borderRadius: 16,
        paddingVertical: 14,
        marginLeft: 8,
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: '#6C63FF',
        fontWeight: '700',
        fontSize: 14,
    },
});