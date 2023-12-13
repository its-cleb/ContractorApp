import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Modal, useWindowDimensions, KeyboardAvoidingView, ScrollView } from 'react-native'
import { globalStyles } from '../styles/globalstyles'
import DrawerHeader from '../components/DrawerHeader'
import IconButtonHContent from '../components/IconButtonHContent'
import IconButtonHSmall from '../components/IconButtonHSmall'
import ModalCloseButton from '../components/ModalCloseButton'

const EstimatorScreen = () => {
  
  const [estimateSheet, setEstimateSheet] = useState([{type: 'Section', value: 'Phase 1'}])
  const [modalState, setModalState] = useState('')
  const [sectionName, setSectionName] = useState('')
  const [lineItem, setLineItem] = useState('')
  const [cost, setCost] = useState('')
 
  // --- Modal Functions ---
  const [modalVisible, setModalVisible] = React.useState(false)
  const { height, width } = useWindowDimensions()

  const openSectionModal = () => {
    setModalState('Section')
    setSectionName('')
    setModalVisible(true)
  }
  const openLineItemModal = () => {
    setModalState('LineItem')
    setLineItem('')
    setCost('')
    setModalVisible(true)
  }
  const closeModal = () => {
    setModalVisible(false)
  }

  const addLineItem = () => {
    setEstimateSheet(previousState => [...previousState, { type: 'LineItem', value: lineItem, cost: cost}])
    setModalVisible(false)
  }

  const addSection = () => {
    setEstimateSheet(previousState => [...previousState, { type: 'Section', value: sectionName}])
    setModalVisible(false)
  }

  let modalBackground
  if (modalVisible === true) {
    modalBackground = <View style={styles.modalBG}></View>  
  } else { }

  // --- Modal Form Content ---
  let modalFormContent
  let modalFormButton

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
    
  // ----- Main Return -----
  return (
    <View style={styles.pageContainer}>

      <DrawerHeader title="Estimator" />

      {/* --- Line Items --- */}
      <ScrollView style={{ marginBottom: 75}}>
        {estimateSheet.map((line) => {
          if (line.type === 'Section')   {
            return (
              <View>
                <Text style={styles.section}>{line.value}</Text>
              </View>
            )
          } if (line.type === 'LineItem') {
            return (
              <View style={styles.lineRow}>
                <Text style={styles.lineItem}>{line.value} ...</Text>
                <Text style={styles.lineCost}>${line.cost}</Text>
              </View>
            )
          } else { return }
        })}
      </ScrollView>

      <View style={styles.buttonRow}>
        <View style={styles.addSectionButton}>
          <IconButtonHSmall pressFunction={openSectionModal} title="Add Section" icon="plus" bgcolor="steelblue" textcolor="white"/>
        </View>
        <View style={styles.addLineItemButton}>
          <IconButtonHSmall pressFunction={openLineItemModal} title="Add Line Item" icon="plus" bgcolor="chocolate" textcolor="white"/>
        </View>
      </View>  

      {modalBackground}

      {/* --- Modal --- */}
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
  lineItemsBox:{
  },
  section: {
    backgroundColor: 'steelblue', 
    color: 'white', 
    fontSize: 20, 
    fontWeight: 'bold',
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  lineRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingLeft: 20
  },
  lineItem: {
    alignSelf: 'flex-start',
    fontSize: 18,
    flex: 5
  },
  lineCost: {
    alignSelf: 'flex-end',
    alignContent: 'flex-end',
    fontSize: 18,
    flex: 2
  }
}) 

export default EstimatorScreen