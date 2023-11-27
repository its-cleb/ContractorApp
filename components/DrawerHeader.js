import React from 'react'
import { Text, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { globalStyles } from '../styles/globalstyles'
import { useNavigation } from '@react-navigation/native'

const DrawerHeader = props => {    
  
  const navigation = useNavigation()

  return (
    <SafeAreaView style={{backgroundColor: 'white', flexDirection: 'row'}}>
      <StatusBar hidden />
      <TouchableOpacity 
        style={[globalStyles.touchableOpacityButton, { backgroundColor: `${props.bgcolor}`, flexDirection: 'row' }]}
        onPress={() => {navigation.openDrawer()}}
      > 
          <Entypo name="menu" size={26} color="black" />
          <Text style={{ color: 'black', fontSize: 18, paddingLeft: 25, fontWeight: '500'}}>{props.title}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default DrawerHeader