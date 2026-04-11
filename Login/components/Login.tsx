import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, TouchableOpacity } from 'react-native';
import { useState } from 'react';


export default function Login({navigation}: any) {
  const [usuario, setUsuario] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  
  function handleLogin() {
    fetch ("https://localhost:7019/api/Login",
     {
      
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: usuario,
        Senha: senha,
      }),
    })
    .then((resposta) => { console.log(resposta) 
    if (resposta.ok) {
      console.log("Login bem-sucedido");
      // navigation.navigate("Home");
    } else {
      console.log("Login falhou");
    }

    });
      
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.titleContainer2}>
        <Text style={styles.title2}>Login</Text>


        <View style={styles.inputContainer}>
          <TextInput placeholder="Enter your username" onChangeText={setUsuario} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Enter your password" onChangeText={setSenha} secureTextEntry />
        </View>
        <TouchableOpacity onPress={handleLogin} style={styles.titleContainer}>
          <Text style={styles.title}>Entrar</Text>
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
  },
});