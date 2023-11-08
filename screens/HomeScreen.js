import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { SimpleLineIcons, MaterialIcons, MaterialCommunityIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import ActiveProjects from '../components/ActiveProjects'
import { globalStyles } from '../styles/globalstyles'
import IconButtonNavigate from '../components/IconButtonNavigate'

const HomeScreen = props => {
  return (
    <View style={globalStyles.containerHCentered}>
      <ActiveProjects />

      <IconButtonNavigate navpage="Estimator" title="Estimator" icon="calculator" bgcolor="firebrick" /> 
      <IconButtonNavigate navpage="Projects" title="Projects" icon="tools" bgcolor="steelblue" /> 
      <IconButtonNavigate navpage="Company" title="Company" icon="users" bgcolor="chocolate" /> 
      
    </View>
  )
}

const styles = StyleSheet.create({})

export default HomeScreen