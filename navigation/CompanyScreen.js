import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { globalStyles } from '../styles/globalstyles'
import DrawerHeader from '../components/DrawerHeader'

const CompanyScreen = () => {
  return (
    <>
      <DrawerHeader title="Company" />

      <View style={globalStyles.containerHCentered}>
        <Text style={globalStyles.textTitle}>Company Details</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({})

export default CompanyScreen