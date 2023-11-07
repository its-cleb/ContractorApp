import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { SimpleLineIcons, MaterialIcons, MaterialCommunityIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import HomeScreen from './screens/HomeScreen';
import EstimatorScreen from './screens/EstimatorScreen';
import CompanyScreen from './screens/CompanyScreen';
import ProjectsScreen from './screens/ProjectsScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="Home"
        screenOptions={{
            drawerActiveBackgroundColor: "wheat",
            drawerActiveTintColor: "#222"
          }}>
          <Drawer.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ drawerIcon: () => (<FontAwesome name="home" size={22} color="#222" />) }} 
          />
          <Drawer.Screen 
            name="Estimator" 
            component={EstimatorScreen} 
            options={{ drawerIcon: () => (<FontAwesome name="calculator" size={22} color="#222" />) }} 
          />
          <Drawer.Screen 
            name="Projects" 
            component={ProjectsScreen} 
            options={{ drawerIcon: () => (<FontAwesome5 name="tools" size={24} color="black" />) }} 
          />
          <Drawer.Screen 
            name="Company" 
            component={CompanyScreen} 
            options={{ drawerIcon: () => (<MaterialCommunityIcons name="briefcase-account" size={22} color="#222" />) }} 
          />
        </Drawer.Navigator>
    </NavigationContainer>
  );
}