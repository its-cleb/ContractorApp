import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Modal, useWindowDimensions, KeyboardAvoidingView, ScrollView } from 'react-native'
import { globalStyles } from '../styles/globalstyles'
import IconButtonHSmall from '../components/IconButtonHSmall'
import ModalCloseButton from '../components/ModalCloseButton'
import BottomTab3 from '../components/BottomTab3'

const ProposalScreen = () => {
  
  const [proposalSheet, setProposalSheet] = useState([{type: 'Section', value: 'Phase 1'}])
  const [modalState1, setModalState1] = useState('')
  const [modalState2, setModalState2] = useState('')
  const [sectionName, setSectionName] = useState('')
  const [lineItem, setLineItem] = useState('')
  const [cost, setCost] = useState('')
 
  // --- Modal Functions ---
  const [modal1Visible, setModal1Visible] = React.useState(false)
  const [modal2Visible, setModal2Visible] = React.useState(false)
  const { height, width } = useWindowDimensions()

  const openLineSelectionModal = () => {
    setModal1Visible(true)
  }
  const openSectionModal = () => {
    setModalState2('Section')
    setSectionName('')
    setModal1Visible(false)
    setModal2Visible(true)
  }
  const openLineItemModal = () => {
    setModalState2('LineItem')
    setLineItem('')
    setCost('')
    setModal1Visible(false)
    setModal2Visible(true)
  }
  const closeModal = () => {
    setModal1Visible(false)
    setModal2Visible(false)
  }

  const addLineItem = () => {
    setProposalSheet(previousState => [...previousState, { type: 'LineItem', value: lineItem, cost: cost}])
    setModal2Visible(false)
  }

  const addSection = () => {
    setProposalSheet(previousState => [...previousState, { type: 'Section', value: sectionName}])
    setModal2Visible(false)
  }

  let modalBackground
  if (modal1Visible === true || modal2Visible === true) {
    modalBackground = <View style={styles.modalBG}></View>  
  } else { }

  // --- Modal Form Content ---
  let modalFormContent
  let modalFormButton

  if (modalState2 === 'LineItem') {
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
    } if (modalState2 === 'Section') {
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

      {/* --- Line Items --- */}
      <ScrollView style={{ marginBottom: 75}}>
        {proposalSheet.map((line) => {
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

      {/* --- Line Selection Modal --- */}
      <View style={styles.modalBox}>
        <Modal 
          animationType='slide'
          transparent={true} 
          visible={modal1Visible}
          onRequestClose={() => setModal1Visible(false)}
        >
          <View style={styles.lineSelectionBox}>
            <View style={styles.modalContent}>
              <ModalCloseButton pressFunction={closeModal} />
                <View style={styles.lineSelectionButtonsBox}>
                  <IconButtonHSmall pressFunction={openSectionModal} title="Add Section" icon="plus" bgcolor="steelblue" textcolor="white"/>
                  <IconButtonHSmall pressFunction={openLineItemModal} title="Add Line Item" icon="plus" bgcolor="chocolate" textcolor="white"/>
                </View>
            </View>
          </View>  
        </Modal>
      </View>

      <BottomTab3 
        button1icon='plus'
        button1text='Add Line'
        button1function={openLineSelectionModal}
        button2icon='save'
        button2text='Save'
        button3icon='envelope'
        button3text='Send'
      />

      {modalBackground}

      {/* --- Add Line Item Modal --- */}
      <View style={styles.modalBox}>
        <Modal 
          animationType='slide'
          transparent={true} 
          visible={modal2Visible}
          onRequestClose={() => setModal2Visible(false)}
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
  lineSelectionBox: {
    flex: 1,
    justifyContent: 'center',
  },
  lineSelectionButtonsBox: {
    marginBottom: -10,
    marginTop: 10,
    width: '100%'
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
  section: {
    backgroundColor: 'dodgerblue', 
    color: 'white', 
    fontSize: 20, 
    fontWeight: 'bold',
    paddingVertical: 10,
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

export default ProposalScreen