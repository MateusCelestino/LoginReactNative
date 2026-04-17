import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';
import Home from './components/Home';
import Vagas from './screens/Vagas';
import Perfil from './screens/Perfil';
import Dicas from './screens/Dicas';
import Favoritos from './screens/Favoritos';
import CriarVaga from './screens/CriarVaga';
import Cadastro from './screens/Cadastro';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login}
          options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={Cadastro}
          options={{ title: 'Cadastro' }} />
        <Stack.Screen name="Home" component={Home}
          options={{ title: 'Home' }} />
        <Stack.Screen name="Vagas" component={Vagas}
          options={{ title: 'Vagas' }} />
        <Stack.Screen name="Perfil" component={Perfil}
          options={{ title: 'Perfil' }} />
        <Stack.Screen name="Dicas" component={Dicas}
          options={{ title: 'Dicas' }} />
        <Stack.Screen name="Favoritos" component={Favoritos}
          options={{ title: 'Favoritos' }} />
        <Stack.Screen name="Criar Vaga" component={CriarVaga}
          options={{ title: 'Criar Vaga' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
