import React from 'react'
import { Text, SafeAreaView, TouchableOpacity, StyleSheet, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

// --- Component Usage ---
{/* 
  <BottomTab3 
    button1icon=''
    button1text=''
    button1function={}
    button2icon=''
    button2text=''
    button2function={}
    button3icon=''
    button3text=''
  /> 
*/}

const BottomTab3 = props => {    
  
  return (
    <SafeAreaView style={styles.safeArea}>

        <TouchableOpacity style={styles.buttonBox} onPress={props.button1function}>
          <FontAwesome5 style={styles.buttonIcon} name={props.button1icon} size={24} color="black"  />
          <Text style={styles.text}>{props.button1text}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonBox} onPress={props.button2function}>
          <FontAwesome5 style={styles.buttonIcon} name={props.button2icon} size={24} color="black"  />
          <Text style={styles.text}>{props.button2text}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonBox} onPress={props.button3function}>
          <FontAwesome5 style={styles.buttonIcon} name={props.button3icon} size={24} color="black"  />
          <Text style={styles.text}>{props.button3text}</Text>
        </TouchableOpacity>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'white', 
    flexDirection: 'row', 
    borderColor: '#ccc', 
    borderTopWidth: 1,
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    bottom: 0,
    zIndex: 10
  },
  buttonBox: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 10,
    flex: 1,
  },
  buttonIcon: {
    margin: 8,
    marginBottom: 5
  },
  text: {
    color: 'black', 
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 16, 
    fontWeight: '500'
  }
})
export default BottomTab3