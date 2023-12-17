import React from 'react'
import { Modal, View, KeyboardAvoidingView, useWindowDimensions, Text, StyleSheet } from 'react-native'
import ModalCloseButton from './ModalCloseButton'

// --- Component Usage --- 
{/* 
  <ModalCenterBG
    modalVisible={}
    modalOnRequestClose={}
    screenWidth={}
    closeModalButton={}
    modalContent={}
  /> 
*/}

const ModalCenterBG = props => {
  return (
    <View style={[styles.componentContainer, {zIndex: props.modalVisible ? 10 : 0 }]}>
      <View style={props.modalVisible ? styles.modalBG : ''}></View>

      <View style={styles.modalBox}>
        <Modal 
          animationType='slide'
          transparent={true} 
          visible={props.modalVisible}
          onRequestClose={() => props.modalOnRequestClose}
        >
          <View style={styles.modalBox}>
            <View style={[styles.modalContent, { width: props.screenWidth-40 }]}>
              <ModalCloseButton pressFunction={props.closeModalButton} />
              <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : -500} >
                {props.modalContent}
              </KeyboardAvoidingView>
            </View>  
          </View>
        </Modal>
        
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  componentContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  modalBG: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 100
  },
  modalBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    padding: 5,
    paddingBottom: 20,
    borderRadius: 5,
  },

})

export default ModalCenterBG