import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'

import HomeScreen from './navigation/HomeScreen'
import EstimatorScreen from './navigation/EstimatorScreen'
import CompanyScreen from './navigation/CompanyScreen'
import ClientsScreen from './navigation/ClientsScreen'
import EmployeeScreen from './navigation/EmployeeScreen'

import ClientFormScreen from './screens/ClientFormScreen'
import ClientDetailsScreen from './screens/ClientDetailsScreen'
import ClientProjectsScreen from './screens/ClientProjectsScreen'

import ProposalScreen from './screens/ProposalScreen'

import ProjectsScreen from './navigation/ProjectsScreen'
import ProjectDetailsScreen from './screens/ProjectDetailsScreen'
import ProjectFormScreen from './screens/ProjectFormScreen'

import EmployeeFormScreen from './screens/EmployeeFormScreen'
import EmployeeDetailsScreen from './screens/EmployeeDetailsScreen'

import { Provider as ClientProvider } from './context/ClientContext'
import { Provider as EmployeeProvider } from './context/EmployeeContext'
import { Provider as ProposalProvider } from './context/ProposalContext'
import { Provider as ProjectProvider } from './context/ProjectContext'
import { Provider as CompanyProvider } from './context/CompanyContext'


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const MyTheme = { 
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fafafa'
  }
}

// Client Pages
function ClientStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ViewClients"
        component={ClientsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ClientForm"
        component={ClientFormScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ClientDetails"
        component={ClientDetailsScreen}
        options={{ headerTitle: "Client Details" }}
      />
      <Stack.Screen
        name="ProposalScreen"
        component={ProposalScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProjectStack"
        component={ProjectStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
    )
}

// Employee Pages
function EmployeeScreenStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ViewEmployees"
        component={EmployeeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmployeeForm"
        component={EmployeeFormScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmployeeDetails"
        component={EmployeeDetailsScreen}
        options={{ headerTitle: "Employee Details" }}
      />
    </Stack.Navigator>
    )
}

// Project Pages
function ProjectStack() {
  return (
    <Stack.Navigator 
      initialRouteName="ProjectsScreen"
      detachInactiveScreens={true}
      detachPreviousScreen={true}
    >
      <Stack.Screen
        name="ProjectsScreen"
        component={ProjectsScreen}
        options={{ headerShown: false, animationTypeForReplace: 'pop' }}
      />
      <Stack.Screen
        name="ClientProjectsScreen"
        component={ClientProjectsScreen}
        options={{ headerShown: false, animationTypeForReplace: 'pop' }}
      />
      <Stack.Screen
        name="ProjectDetails"
        component={ProjectDetailsScreen}
        options={{ headerShown: false, animationTypeForReplace: 'pop' }}
      />
      <Stack.Screen
        name="ProjectForm"
        component={ProjectFormScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
    )
}

// Estimator Pages
function EstimatorStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="View"
        component={EstimatorScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default function App() {
  
  return (
    <ClientProvider>
    <EmployeeProvider>
    <ProposalProvider>
    <ProjectProvider>
    <CompanyProvider>
      <NavigationContainer theme={MyTheme}>
        <Drawer.Navigator 
          initialRouteName="Home"
          unmountOnBlur={true}
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
              name="ProjectStack" 
              component={ProjectStack}
              options={{ 
                drawerIcon: () => (<FontAwesome5 name="tools" size={22} color="#222" style={{paddingLeft: 2, marginRight: -4}} />),
                headerTitle: "Client Projects",
                drawerLabel: "Projects",
                headerShown: false
              }} 
            />
            <Drawer.Screen 
              name="Estimator" 
              component={EstimatorStack} 
              options={{ 
                drawerIcon: () => (<FontAwesome name="calculator" size={22} color="#222" style={{marginRight: -2}} />),
                headerTitle: "Quotes & Estimator",
                drawerLabel: "Estimator",
                headerShown: false
              }} 
            />
            <Drawer.Screen 
              name="ClientsStack" 
              component={ClientStack} 
              options={{ 
                drawerIcon: () => (<FontAwesome5 name="user-alt" size={22} color="black" style={{marginRight: -2}} />),
                headerTitle: "Your Clients",
                drawerLabel: "Clients",
                headerShown: false
              }} 
            />
            <Drawer.Screen 
              name="Employees"
              component={EmployeeScreenStack} 
              options={{ 
                drawerIcon: () => (<FontAwesome5 name="users-cog" size={22} color="#222" style={{marginRight: -4, marginLeft: -3}} />),
                headerTitle: "Employees",
                drawerLabel: "Employees",
                headerShown: false
              }} 
            />
            <Drawer.Screen 
              name="Company" 
              component={CompanyScreen} 
              options={{ 
                drawerIcon: () => (<FontAwesome5 name="briefcase" size={22} color="#222" style={{paddingLeft: 2, marginRight: -2}} />),
                headerTitle: "Company Details",
                drawerLabel: "Company",
                headerShown: false
              }} 
            />

        </Drawer.Navigator>
      </NavigationContainer>
    </CompanyProvider>
    </ProjectProvider>
    </ProposalProvider>
    </EmployeeProvider>
    </ClientProvider>
  );
}