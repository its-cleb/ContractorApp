import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ViewProjectsScreen from '../screens/ViewProjectsScreen'
import AddProjectScreen from '../screens/AddProjectScreen'

const Stack = createNativeStackNavigator();

const ProjectsScreen = () => {
  
  return (
      <Stack.Navigator>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="View Projects"
          component={ViewProjectsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Add New Projects"
          component={AddProjectScreen}
          options={{ headerShown: false }}
        /></Stack.Group>
      </Stack.Navigator>
      
  ) 
  }


export default ProjectsScreen