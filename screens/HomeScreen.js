import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { SimpleLineIcons, MaterialIcons, MaterialCommunityIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import ActiveProjectsRealm from '../components/ActiveProjectsRealm'
import { globalStyles } from '../styles/globalstyles'
import IconButtonNavigate from '../components/IconButtonNavigate'

const HomeScreen = props => {
  return (
    <>
      <View>
        <ActiveProjectsRealm />
      </View>

      <View style={styles.flexBox}>
        <View style={styles.flexItem}>
          <IconButtonNavigate navpage="Estimator" title="Estimator" icon="calculator" bgcolor="firebrick" /> 
        </View>
        <View style={styles.flexItem}>
          <IconButtonNavigate navpage="Projects" title="Projects" icon="tools" bgcolor="steelblue" /> 
        </View>
        <View style={styles.flexItem}>
         <IconButtonNavigate navpage="Company" title="Company" icon="users" bgcolor="chocolate" /> 
        </View>
        
     </View>

    </>
  )
}

const styles = StyleSheet.create({
  flexBox: {
    flexDirection: 'row',
    padding: 5
  },
  flexItem: {
    flex: 1
  }
})

export default HomeScreen