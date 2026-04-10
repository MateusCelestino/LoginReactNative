import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function Login() {
  return (
    <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.titleContainer2}>
        <Text style={styles.title2}>Login</Text>
       
      
      <View style={styles.inputContainer}>
        <TextInput placeholder="Enter your username" />
      </View>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Enter your password" secureTextEntry={true} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Entrar</Text>
      </View>
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