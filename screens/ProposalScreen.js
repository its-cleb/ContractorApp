import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Modal, useWindowDimensions, KeyboardAvoidingView, ScrollView } from 'react-native'
import { globalStyles } from '../styles/globalstyles'
import IconButtonHSmall from '../components/IconButtonHSmall'
import ModalCloseButton from '../components/ModalCloseButton'
import BottomTab3 from '../components/BottomTab3'

const ProposalScreen = () => {
  
  const [proposalSheet, setProposalSheet] = useState([{type: 'Section', value: 'Phase 1', date: '10/10/2023'}])
  const [modal2State, setmodal2State] = useState('')
  const [sectionName, setSectionName] = useState('')
  const [phaseDate, setPhaseDate] = useState('')
  const [lineItem, setLineItem] = useState('')
  const [cost, setCost] = useState('')

  let USDollar = Intl.NumberFormat('en-US');
 
  // --- Modal Functions ---
  const [modal1Visible, setModal1Visible] = React.useState(false)
  const [modal2Visible, setModal2Visible] = React.useState(false)
  const { height, width } = useWindowDimensions()

  const openLineSelectionModal = () => {
    setModal1Visible(true)
  }
  const openSectionModal = () => {
    setmodal2State('Section')
    setSectionName('')
    setPhaseDate('')
    setModal1Visible(false)
    setModal2Visible(true)
  }
  const openLineItemModal = () => {
    setmodal2State('LineItem')
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
    setProposalSheet(previousState => [...previousState, { type: 'LineItem', value: lineItem, cost: USDollar.format(cost)}])
    setModal2Visible(false)
  }
  const addSection = () => {
    setProposalSheet(previousState => [...previousState, { type: 'Section', value: sectionName, date: phaseDate}])
    setModal2Visible(false)
  }

  let modalBackground
  if (modal1Visible === true || modal2Visible === true) {
    modalBackground = <View style={styles.modalBG}></View>  
  } else { }

  // --- Modal Form Content ---
  let modalFormContent
  let modalFormButton

  if (modal2State === 'LineItem') {
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
  } if (modal2State === 'Section') {
    modalFormButton = <IconButtonHSmall pressFunction={addSection} title='Add Section' icon='indent' textcolor='white' bgcolor='steelblue' />
    modalFormContent =
    <View style={styles.formBox}>
      <View style={globalStyles.formRow}>
        <View style={[globalStyles.formColumn, { flex: 5 }]}>
          <Text style={globalStyles.formFieldCaption}>Section</Text>
          <TextInput 
            autoCorrect={false} 
            style={globalStyles.formFieldInput}
            value={sectionName}
            onChangeText={text => setSectionName(text)}></TextInput>
        </View>
        <View style={[globalStyles.formColumn, { flex: 3 }]}>
          <Text style={globalStyles.formFieldCaption}>Date</Text>
          <TextInput 
            autoCorrect={false} 
            style={globalStyles.formFieldInput}
            value={phaseDate}
            onChangeText={text => setPhaseDate(text)}></TextInput>
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
              <View style={styles.section}>
                <Text style={styles.phaseName}>{line.value}</Text>
                <Text style={styles.phaseDate}>{line.date}</Text>
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

  // Modal 1 
  lineSelectionBox: {
    flex: 1,
    justifyContent: 'center',
  },
  lineSelectionButtonsBox: {
    marginBottom: -10,
    marginTop: 10,
    width: '100%'
  },

  // Modal 2
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

  // Proposal Sheet
  section: {
    flexDirection: 'row',
    backgroundColor: 'dodgerblue', 
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  phaseName: {
    alignSelf: 'flex-start',
    color: 'white', 
    fontSize: 20,     
    fontWeight: 'bold',
    flex: 1
  },
  phaseDate: {
    color: 'white',
    alignSelf: 'flex-end',
    textAlign: 'right',
    fontSize: 18,
    flex: 1
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