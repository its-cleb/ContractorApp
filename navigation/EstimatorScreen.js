import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Modal, useWindowDimensions, KeyboardAvoidingView } from 'react-native'
import { globalStyles } from '../styles/globalstyles'
import DrawerHeader from '../components/DrawerHeader'
import IconButtonHContent from '../components/IconButtonHContent'
import IconButtonHSmall from '../components/IconButtonHSmall'
import ModalCloseButton from '../components/ModalCloseButton'

const EstimatorScreen = () => {
  
  const [lineItem, setLineItem] = useState('')
  const [cost, setCost] = useState('')

 
  // --- Modal Functions ---
  const [modalVisible, setModalVisible] = React.useState(false)
  const { width } = useWindowDimensions()

  const openModal = () => {
    setModalVisible(true)
  }
  const closeModal = () => {
    setModalVisible(false)
  }

  let modalBackground
  if (modalVisible === true) {
    modalBackground = <View style={styles.modalBG}></View>  
  }

  return (
    <View style={styles.pageContainer}>

      <DrawerHeader title="Estimator" />

      <View style={styles.addCostButton}>
        <IconButtonHContent pressFunction={() => setModalVisible(true)} title="Add Line Item" icon="plus" bgcolor="#00000000" textcolor="steelblue"/>
      </View>

      {modalBackground}

      <View style={styles.modalBox}>
        <Modal 
          animationType='slide'
          transparent={true} 
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
        <View style={styles.modalBox}>
          <View style={[styles.modalContent, { width: width-40 }]}>
            <ModalCloseButton pressFunction={closeModal} />
            
            {/* Modal Content */}
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : -500} >

              <View style={styles.formBox}>
                <View style={globalStyles.formRow}>
                  <View style={[globalStyles.formColumn, { flex: 5 }]}>
                    <Text style={globalStyles.formFieldCaption}>Line Item</Text>
                    <TextInput 
                      autoCorrect={false} 
                      style={globalStyles.formFieldInput}
                      value={lineItem}
                      onChangeText={text => setLineItem(text)}></TextInput>
                  </View>
                  <View style={[globalStyles.formColumn, { flex: 2 }]}>
                    <Text style={globalStyles.formFieldCaption}>Cost</Text>
                    <TextInput 
                      autoCorrect={false} 
                      style={globalStyles.formFieldInput}
                      keyboardType="numeric"
                      value={cost}
                      onChangeText={text => setCost(text)}></TextInput>
                  </View>
                </View>
              </View>

              <IconButtonHSmall pressFunction={closeModal} title='Add Line Item' icon='bars' textcolor='white' bgcolor='steelblue' />
            </KeyboardAvoidingView>

          </View>  
        </View>

        </Modal>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  modalBG: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  addCostButton: {
    backgroundColor: '#fafafa',
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    paddingBottom: 10,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 5,
  },
  formBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
}) 

export default EstimatorScreen