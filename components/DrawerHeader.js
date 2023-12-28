import React from 'react'
import { Text, SafeAreaView, TouchableOpacity, StatusBar, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { globalStyles } from '../styles/globalstyles'
import { useNavigation } from '@react-navigation/native'

// Component Usage:
// <DrawerHeader title='' />

const DrawerHeader = props => {    
  
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar hidden />
      <TouchableOpacity 
        style={[globalStyles.touchableOpacityButton, { backgroundColor: 'white', flexDirection: 'row' }]}
        onPress={() => {navigation.openDrawer()}}
      > 
          <Entypo name="menu" size={26} color="black" />
          <Text style={styles.text}>{props.title}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles=StyleSheet.create({
  safeAreaView: {
    backgroundColor: 'white', 
    flexDirection: 'row', 
    borderBottomColor: '#ccc', 
    borderBottomWidth: 1, 
    zIndex: 10
  },
  text: {
    color: 'black', 
    fontSize: 18,
    paddingLeft: 25, 
    fontWeight: '500'
  }

})

export default DrawerHeader