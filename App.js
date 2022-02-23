import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from "./Screens/Context/UserContext";
import LogInScreen from './Screens/LogInScreen';
import DashboardScreen from './Screens/DashboardScreen';
import CreateAccScreen from './Screens/CreateAccScreen';
import FavoritePokemonScreen from './Screens/FavoritePokemonScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen
            name='LogInScreen'
            component={LogInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='CreateAccScreen'
            component={CreateAccScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='DashboardScreen'
            component={DashboardScreen}
            options={{ headerShown: false, title: "Pokedex" }}
          />
          <Stack.Screen
            name='FavoritePokemonScreen'
            component={FavoritePokemonScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
