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

import AddClientScreen from './screens/AddClientScreen'
import EditClientScreen from './screens/EditClientScreen'
import ClientDetailsScreen from './screens/ClientDetailsScreen'
import ProposalScreen from './screens/ProposalScreen'

import AddEmployeeScreen from './screens/AddEmployeeScreen'
import EditEmployeeScreen from './screens/EditEmployeeScreen'
import EmployeeDetailsScreen from './screens/EmployeeDetailsScreen'

import { Provider as ClientProvider } from './context/ClientContext'
import { Provider as EmployeeProvider } from './context/EmployeeContext'
import { Provider as ProposalProvider } from './context/ProposalContext'


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
function ClientScreenStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ViewClients"
        component={ClientsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddClient"
        component={AddClientScreen}
        options={{ headerTitle: "Add New Client" }}
      />
      <Stack.Screen
        name="EditClient"
        component={EditClientScreen}
        options={{ headerTitle: "Edit Client" }}
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
        name="AddEmployee"
        component={AddEmployeeScreen}
        options={{ headerTitle: "Add New Employee" }}
      />
      <Stack.Screen
        name="EditEmployee"
        component={EditEmployeeScreen}
        options={{ headerTitle: "Edit Employee" }}
      />
      <Stack.Screen
        name="EmployeeDetails"
        component={EmployeeDetailsScreen}
        options={{ headerTitle: "Employee Details" }}
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
              component={EstimatorStack} 
              options={{ 
                drawerIcon: () => (<FontAwesome name="calculator" size={22} color="#222" style={{marginRight: -2}} />),
                headerTitle: "Quotes & Estimator",
                drawerLabel: "Estimator",
                headerShown: false
              }} 
            />
            <Drawer.Screen 
              name="Clients" 
              component={ClientScreenStack} 
              options={{ 
                drawerIcon: () => (<FontAwesome5 name="user-alt" size={22} color="black" />),
                headerTitle: "Your Clients",
                drawerLabel: "Clients",
                headerShown: false
              }} 
            />
            <Drawer.Screen 
              name="Employees"
              component={EmployeeScreenStack} 
              options={{ 
                drawerIcon: () => (<FontAwesome5 name="users-cog" size={22} color="#222" style={{marginRight: -4, marginLeft: -2}} />),
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
    </ProposalProvider>
    </EmployeeProvider>
    </ClientProvider>
  );
}