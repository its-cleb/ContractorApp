import React from 'react'
import { Text, View, TouchableOpacity, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons'

  //  <IconButtonV
  //    pressFunction={} 
  //    title='' 
  //    icon={''}
  //    size={}  
  //    color='' 
  //    bgcolor=''
  //    border={}
  //    padV={}
  //    padH={}
  //    marginV={}
  //    marginH={}
  //    marginB=
  //  />

function IconButtonV(props) {
  let iconType 

  const getIcon = () => {
    switch(props.iconType) {
      case 'FontAwesome':
        iconType = <FontAwesome style={styles.buttonIcon} name={props.icon} size={props.size} color={props.color} />
        break
      default:
        iconType = <FontAwesome5 style={styles.buttonIcon} name={props.icon} size={props.size} color={props.color} />
    }
    return iconType
  }

  let hasPadV = Boolean(props.padV !== undefined)
  let hasPadH = Boolean(props.padH !== undefined)
  let hasMarginV = Boolean(props.marginV !== undefined)
  let hasMarginH = Boolean(props.marginH !== undefined)
  let hasMarginT = Boolean(props.marginT !== undefined)
  let hasMarginB = Boolean(props.marginB !== undefined)

  return (
    <TouchableOpacity 
      onPress={props.pressFunction}
      style={[styles.touchableOpacity, {
        backgroundColor: `${props.bgcolor}`, 
        borderColor: `${props.color}`, 
        borderWidth: props.border ? 2 : 0,
        paddingVertical: hasPadV ? props.padV : 10,
        paddingHorizontal: hasPadH ? props.padH : 5,
        marginVertical: hasMarginV ? props.marginV : 10,
        marginHorizontal: hasMarginH ? props.marginH : 0,
        marginTop: hasMarginT ? props.marginT : 10,
        marginBottom: hasMarginB ? props.marginB : 0
      }]}> 
      {getIcon()}
      <Text style={[styles.title, {color: `${props.color}`}]}>{props.title}</Text>
    </TouchableOpacity>
  )
}

  //  <IconButtonH
  //    pressFunction={} 
  //    title='' 
  //    icon={''}
  //    size={}  
  //    color='' 
  //    bgcolor=''
  //    border={}
  //    padV={}
  //    padH={}
  //    marginV={}
  //    marginH={}
  //    marginB=
  //  />
function IconButtonH(props) {
  
  let hasPadV = Boolean(props.padV !== undefined)
  let hasPadH = Boolean(props.padH !== undefined)
  let hasMarginV = Boolean(props.MarginV !== undefined)
  let hasMarginH = Boolean(props.MarginH !== undefined)
  let hasMarginT = Boolean(props.MarginT !== undefined)
  let hasMarginB = Boolean(props.MarginB !== undefined)

  return (
    <TouchableOpacity 
      onPress={props.pressFunction} 
      style={[styles.touchableOpacity, { 
        backgroundColor: `${props.bgcolor}`, 
        flexDirection: 'row',
        alignSelf: 'stretch',
        paddingVertical: hasPadV ? props.padV : 10,
        paddingHorizontal: hasPadH ? props.padH : 5,
        marginVertical: hasMarginV ? props.marginV : 10,
        marginHorizontal: hasMarginH ? props.marginH : 0,
        marginTop: hasMarginT ? props.marginT : 10,
        marginBottom: hasMarginB ? props.marginB : 0
      }]}> 
      <FontAwesome5 style={styles.buttonIcon} name={props.icon} size={16} color={props.textcolor} />
      <Text style={{ color: `${props.textcolor}`, fontSize: 16, marginLeft: 10}}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    alignContent: 'center',
    fontWeight: 500
  },
  touchableOpacity: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonIcon: {
    padding: 5,
  },
  textButton: {
    fontSize: 16,
    color: 'white'
  },
})

export { IconButtonH, IconButtonV } 