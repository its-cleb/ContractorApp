import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { StyleSheet, Text } from 'react-native'
import HomeScreen from './navigation/HomeScreen';
import EstimatorScreen from './navigation/EstimatorScreen';
import CompanyScreen from './navigation/CompanyScreen';
import AddProjectScreen from './screens/AddProjectScreen';
import ViewProjectsScreen from './screens/ViewProjectsScreen';
import { Provider } from './context/ProjectContext';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Drawer.Navigator 
          initialRouteName="Home"
          screenOptions={{
              drawerActiveBackgroundColor: "wheat",
              drawerActiveTintColor: "#222",
              drawerLabelStyle: { fontSize: 18 }
            }}>
            <Drawer.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ 
                drawerIcon: () => (<FontAwesome name="home" size={22} color="#222" />),
                headerTitle: "Get Started",
                drawerLabel: "Home"
              }} 
            />
            <Drawer.Screen 
              name="Estimator" 
              component={EstimatorScreen} 
              options={{ 
                drawerIcon: () => (<FontAwesome name="calculator" size={22} color="#222" />),
                headerTitle: "Quotes & Estimates",
                drawerLabel: "Estimator"
              }} 
            />
            <Drawer.Screen 
              name="Projects" 
              component={App} 
              options={{ 
                drawerIcon: () => (<FontAwesome5 name="tools" size={24} color="black" />),
                headerTitle: "Your Projects",
                drawerLabel: "Projects"
              }} 
            />
            <Drawer.Screen 
              name="Company" 
              component={CompanyScreen} 
              options={{ 
                drawerIcon: () => (<FontAwesome5 name="users" size={22} color="#222" />),
                headerTitle: "Company Details",
                drawerLabel: "Company"
              }} 
            />
        </Drawer.Navigator>
    )
}
export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ }}
          />
          <Stack.Screen
            name="ViewProjects"
            component={ViewProjectsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddProject"
            component={AddProjectScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create ({
  drawerText: {
    fontSize: 18,
  }
})