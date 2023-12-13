import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Modal, useWindowDimensions, KeyboardAvoidingView } from 'react-native'
import { globalStyles } from '../styles/globalstyles'
import DrawerHeader from '../components/DrawerHeader'
import IconButtonHContent from '../components/IconButtonHContent'
import IconButtonHSmall from '../components/IconButtonHSmall'
import ModalCloseButton from '../components/ModalCloseButton'

const EstimatorScreen = () => {
  
  const [estimateSheet, setEstimateSheet] = useState([])
  const [modalState, setModalState] = useState('')
  const [sectionName, setSectionName] = useState('')
  const [lineItem, setLineItem] = useState('')
  const [cost, setCost] = useState('')
 
  // --- Modal Functions ---
  const [modalVisible, setModalVisible] = React.useState(false)
  const { width } = useWindowDimensions()

  const openSectionModal = () => {
    setModalState('Section')
    console.log('sectionModal')
    setModalVisible(true)
  }
  const openLineItemModal = () => {
    setModalState('LineItem')
    console.log('lineItemModal')
    setModalVisible(true)
  }
  const closeModal = () => {
    setModalVisible(false)
  }

  const addLineItem = () => {
    setEstimateSheet(previousState => [...previousState, { type: 'lineItem', value: lineItem, cost: cost}])
    setModalVisible(false)
    console.log(estimateSheet)
  }

  const addSection = () => {
    setEstimateSheet(previousState => [...previousState, { type: 'section', value: sectionName}])
    setModalVisible(false)
    console.log(estimateSheet)
  }

  let modalBackground
  if (modalVisible === true) {
    modalBackground = <View style={styles.modalBG}></View>  
  } else { }

  // --- Modal Form Content ---
  let modalFormContent
  if (modalState === 'LineItem') {
    modalFormButton = <IconButtonHSmall pressFunction={addLineItem} title='Add Line Item' icon='list' textcolor='white' bgcolor='steelblue' />
    modalFormContent =
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
    } if (modalState === 'Section') {
      modalFormButton = <IconButtonHSmall pressFunction={addSection} title='Add Section' icon='indent' textcolor='white' bgcolor='steelblue' />
      modalFormContent =
      <View style={styles.formBox}>
        <View style={globalStyles.formRow}>
          <View style={[globalStyles.formColumn, { flex: 1 }]}>
            <Text style={globalStyles.formFieldCaption}>Section</Text>
            <TextInput 
              autoCorrect={false} 
              style={globalStyles.formFieldInput}
              value={sectionName}
              onChangeText={text => setSectionName(text)}></TextInput>
          </View>
        </View>
      </View>
    }

  return (
    <View style={styles.pageContainer}>

      <DrawerHeader title="Estimator" />

      <View style={styles.buttonRow}>
        <View style={styles.addSectionButton}>
          <IconButtonHSmall pressFunction={openSectionModal} title="Add Section" icon="plus" bgcolor="steelblue" textcolor="white"/>
        </View>
        <View style={styles.addLineItemButton}>
          <IconButtonHSmall pressFunction={openLineItemModal} title="Add Line Item" icon="plus" bgcolor="chocolate" textcolor="white"/>
        </View>
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
              {modalFormContent}
              {modalFormButton}
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 100
  },
  buttonRow: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#fafafa',
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    paddingBottom: 10,
    zIndex: 10
  },
  addSectionButton: {
    flex: 1,
    marginRight: -5
  },
  addLineItemButton: {
    flex: 1,
    marginLeft: -5
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
  formBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
}) 

export default EstimatorScreen