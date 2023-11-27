import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { globalStyles } from '../styles/globalstyles'
import DrawerHeader from '../components/DrawerHeader'

const EstimatorScreen = () => {
  return (
    <>
    <DrawerHeader title="Estimator" />

    <View style={globalStyles.containerHCentered}>
      <Text style={globalStyles.textTitle}>Quotes & Estimates</Text>
    </View>
    </>
  )
}

const styles = StyleSheet.create({})

export default EstimatorScreen