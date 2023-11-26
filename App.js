import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { StyleSheet, Text } from 'react-native'
import HomeScreen from './screens/HomeScreen';
import EstimatorScreen from './screens/EstimatorScreen';
import CompanyScreen from './screens/CompanyScreen';
import ProjectsScreen from './screens/ProjectsScreen';
import { Provider } from './context/ProjectContext';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider>
      <NavigationContainer>
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
                headerTitle: "Get Started"
              }} 
            />
            <Drawer.Screen 
              name="Estimator" 
              component={EstimatorScreen} 
              options={{ 
                drawerIcon: () => (<FontAwesome name="calculator" size={22} color="#222" />),
                headerTitle: "Quotes & Estimates"
              }} 
            />
            <Drawer.Screen 
              name="Projects" 
              component={ProjectsScreen} 
              options={{ 
                drawerIcon: () => (<FontAwesome5 name="tools" size={24} color="black" />),
                headerTitle: "Your Projects"
              }} 
            />
            <Drawer.Screen 
              name="Company" 
              component={CompanyScreen} 
              options={{ 
                drawerIcon: () => (<FontAwesome5 name="users" size={22} color="#222" />),
                headerTitle: "Company Details"
              }} 
            />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create ({
  drawerText: {
    fontSize: 18,
  }
})