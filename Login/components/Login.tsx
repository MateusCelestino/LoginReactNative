import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Login({ navigation }: any) {
  const [usuario, setUsuario] = useState<string>('');
  const [senha, setSenha] = useState<string>('');

  async function handleLogin() {
    if (!usuario || !senha) {
      Alert.alert('Erro', 'Preencha email e senha');
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: usuario.trim(),
      password: senha,
    });

    if (error || !data.user) {
      Alert.alert('Erro', 'Email ou senha inválidos');
      return;
    }

    const { data: perfil } = await supabase
      .from('usuarios')
      .select('nome, sobrenome')
      .eq('auth_id', data.user.id)
      .single();

    const nomeExibido = perfil?.nome ?? data.user.email?.split('@')[0] ?? 'Usuário';
    Alert.alert('Sucesso', `Bem-vindo, ${nomeExibido}`);
    navigation.navigate('Home', {
      usuario: {
        nome: perfil?.nome ?? nomeExibido,
        sobrenome: perfil?.sobrenome ?? '',
      },
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.titleContainer2}>
        <Text style={styles.title2}>Login</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Digite seu email"
            value={usuario}
            onChangeText={setUsuario}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Digite sua senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
        </View>

        <TouchableOpacity onPress={handleLogin} style={styles.titleContainer}>
          <Text style={styles.title}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Cadastro')}
          style={styles.titleContainer}
        >
          <Text style={styles.title}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6C63FF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  inputContainer: {
    marginVertical: 10,
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  titleContainer: {
    marginBottom: 20,
    backgroundColor: '#1e07f0',
    width: '80%',
    borderRadius: 5,
    padding: 10,
  },
  titleContainer2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title2: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20,
  },
});