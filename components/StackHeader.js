import React from 'react'
import { Text, SafeAreaView, TouchableOpacity, View, StatusBar, StyleSheet } from 'react-native'
import { MaterialIcons, Feather } from '@expo/vector-icons'

// Component Usage
// <StackHeader title='' navFunction={} rightIcon={} pressfunction{}/>

const StackHeader = props => {    
  
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar hidden />
        <View style={styles.header}>
          <View style={styles.left}>
            <TouchableOpacity style={styles.backIcon} onPress={props.navFunction}> 
              <Feather name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.text}>{props.title}</Text>
          </View>
            <TouchableOpacity style={styles.rightIcon} onPress={props.pressFunction}>
              <MaterialIcons name={props.rightIcon} size={28} color="black" />
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

export default StackHeader