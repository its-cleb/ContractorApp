import React from 'react'
import { View, Text } from 'react-native'
import { globalStyles } from '../styles/globalstyles'
import DrawerHeader from '../components/DrawerHeader'

const EstimatorScreen = () => {
  return (
    <>
      <DrawerHeader title="Company" />

      <View style={globalStyles.containerHCentered}>
        <Text style={globalStyles.textTitle}>Estimator</Text>
      </View>
    </>
  )
}

export default EstimatorScreen