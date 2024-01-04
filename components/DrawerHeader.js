import React from 'react'
import { Text, SafeAreaView, TouchableOpacity, View, StatusBar, StyleSheet } from 'react-native'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

// Component Usage:
// <DrawerHeader title='' pressFunction={}/>

const DrawerHeader = props => {    
  
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar hidden />
      <View style={styles.header}>
        <View style={styles.left}>
          <TouchableOpacity style={styles.backIcon} onPress={() => {navigation.openDrawer()}}> 
            <Entypo name="menu" size={26} color="black" />
          </TouchableOpacity>
          <Text style={styles.text}>{props.title}</Text>
        </View>
          <TouchableOpacity style={styles.rightIcon} onPress={props.pressFunction}>
            <MaterialIcons name={props.rightIcon} size={26} color="black" />
          </TouchableOpacity>
      </View>
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
  header: {
    backgroundColor: "white",
    borderRadius: 5,
    flexDirection: 'row', 
    flex: 1,
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  backIcon: {
    justifyContent: 'center',
    padding: 15
  },
  text: {
    color: 'black', 
    fontSize: 20,
    paddingLeft: 20,
    fontWeight: '500',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  rightIcon: {
    justifyContent: 'center',
    padding: 13
  }


})

export default DrawerHeader