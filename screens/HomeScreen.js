import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ActiveProjects from '../components/ActiveProjects'
import { globalStyles } from '../styles/globalstyles'

const HomeScreen = () => {
  return (
    <View style={globalStyles.containerHCentered}>
      <ActiveProjects />
    </View>
  )
}

const styles = StyleSheet.create({})

export default HomeScreen