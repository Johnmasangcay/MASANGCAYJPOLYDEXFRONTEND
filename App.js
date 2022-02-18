import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogInScreen from './Screens/LogInScreen';
import DashboardScreen from './Screens/DashboardScreen';
import CreateAccScreen from './Screens/CreateAccScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name='DashboardScreen'
          component={DashboardScreen}
          options={{ headerShown: false, title: "Pokedex" }}
        />
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


      </Stack.Navigator>
    </NavigationContainer>
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
