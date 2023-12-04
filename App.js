import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'
import HomeScreen from './navigation/HomeScreen'
import EstimatorScreen from './navigation/EstimatorScreen'
import CompanyScreen from './navigation/CompanyScreen'
import AddProjectScreen from './screens/AddProjectScreen'
import EditProjectScreen from './screens/EditProjectScreen'
import ProjectDetailsScreen from './screens/ProjectDetailsScreen'
import ViewProjectsScreen from './screens/ViewProjectsScreen'
import { Provider } from './context/ProjectContext'

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const MyTheme = { 
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fafafa'
  }
}

// Projects Pages
function ProjectScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ViewProjects"
        component={ViewProjectsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddProject"
        component={AddProjectScreen}
        options={{ headerTitle: "Add New Project" }}
      />
      <Stack.Screen
        name="EditProject"
        component={EditProjectScreen}
        options={{ headerTitle: "Edit Project" }}
      />
      <Stack.Screen
        name="ProjectDetails"
        component={ProjectDetailsScreen}
        options={{ headerTitle: "Project Details" }}
      />
    </Stack.Navigator>
    )
}
export default function App() {
  
  return (
    <Provider>
      <NavigationContainer theme={MyTheme}>
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
                drawerLabel: "Home",
                headerShown: false
              }} 
            />
            <Drawer.Screen 
              name="Estimator" 
              component={EstimatorScreen} 
              options={{ 
                drawerIcon: () => (<FontAwesome name="calculator" size={22} color="#222" />),
                headerTitle: "Quotes & Estimates",
                drawerLabel: "Estimator",
                headerShown: false
              }} 
            />
            <Drawer.Screen 
              name="Projects" 
              component={ProjectScreen} 
              options={{ 
                drawerIcon: () => (<FontAwesome5 name="tools" size={24} color="black" />),
                headerTitle: "Your Projects",
                drawerLabel: "Projects",
                headerShown: false
              }} 
            />
            <Drawer.Screen 
              name="Company" 
              component={CompanyScreen} 
              options={{ 
                drawerIcon: () => (<FontAwesome5 name="users" size={22} color="#222" />),
                headerTitle: "Company Details",
                drawerLabel: "Company",
                headerShown: false
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