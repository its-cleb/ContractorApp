import React from 'react'
import { Modal, View, TouchableOpacity, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

// --- Component Usage --- 
{/* 
  // ScreenWidth requires witdh from useWindowDimensions import
  
  const closedModals = {
    modal1: false,
  }

  const [modalVisible, setModalVisible] = useState(closedModals)

  <ModalBG
    modalVisible={modal1}
    modalOnRequestClose={}
    screenWidth={}
    closeModalButton={}
    modalContent={}
  /> 
*/}

function ModalBG(props) {
  return (
    <View style={[styles.componentContainer, {zIndex: props.modalVisible ? 10 : 0 }]}>
      
      <View style={props.modalVisible ? styles.modalBG : ''}></View>

      <View style={styles.modal}>
        <Modal 
          animationType='slide'
          transparent={true} 
          visible={props.modalVisible}
          onRequestClose={() => props.modalOnRequestClose}
        >
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { width: props.screenWidth-40 }]}>

              {/* Close Button */}
              <TouchableOpacity onPress={props.closeModalButton} style={styles.closeButton}> 
                <MaterialIcons name="close" size={30} color="black" />
              </TouchableOpacity>

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

function ModalBox(props) {
  return (
    <View style={styles.modalBox}>
      {props.children}
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
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: -10,
  },
  modalBox: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'stretch',
  },
})

export { ModalBG, ModalBox } 