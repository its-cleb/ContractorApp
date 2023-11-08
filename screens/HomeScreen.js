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

      <TouchableOpacity 
        style={globalStyles.touchableOpacityButton}
        onPress={() => {props.navigation.navigate('Estimator');}}
      >
          <FontAwesome style={globalStyles.buttonIcon} name="calculator" size={40} color="white" />
          <Text style={globalStyles.textButton}>Estimates</Text>
      </TouchableOpacity>

      {/* <IconButtonNavigate /> */}
      
    </View>
  )
}

const styles = StyleSheet.create({})

export default HomeScreen