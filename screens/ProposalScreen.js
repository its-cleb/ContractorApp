import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, useWindowDimensions, TouchableOpacity, FlatList } from 'react-native'
import { globalStyles } from '../styles/globalstyles'
import IconButtonHSmall from '../components/IconButtonHSmall'
import ModalCenterBG from '../components/ModalCenterBG'
import BottomTab3 from '../components/BottomTab3'

// Scoped variables for line items
let currentLineIndex = 0

const ProposalScreen = ({ route, navigation }) => {
  
  const clientID  = route.params
  let project

  const [proposalSheet, setProposalSheet] = useState([{ key: Date.now(), isPhase: true, value1: 'test', value2: 'test'}])
  const [modal2isPhase, setmodal2isPhase] = useState('')
  const [modal3isPhase, setmodal3isPhase] = useState('')
  const [phaseName, setPhaseName] = useState('')
  const [phaseDate, setPhaseDate] = useState('')
  const [lineItem, setLineItem] = useState('')
  const [cost, setCost] = useState('')
  const [description, setDescription] = useState('')

  let USDollar = Intl.NumberFormat('en-US');

  // --- Modal Functions ---
  const [modal1Visible, setModal1Visible] = React.useState(false) // Line Type Selection Modal
  const [modal2Visible, setModal2Visible] = React.useState(false) // Add New Line Modal
  const [modal3Visible, setModal3Visible] = React.useState(false) // Edit Line Modal
  const [modal4Visible, setModal4Visible] = React.useState(false) // Save Proposal Modal


  const { width } = useWindowDimensions()

  const closeModal = () => {
    setModal1Visible(false)
    setModal2Visible(false)
    setModal3Visible(false)
    setModal4Visible(false)
  }
  const openLineSelectionModal = () => {
    setModal1Visible(true)
  }

  // Add Line Item Modal Settings
  const openPhaseModal = () => {
    setmodal2isPhase(true)
    setPhaseName('')
    setPhaseDate('')
    setModal1Visible(false)
    setModal2Visible(true)
  }
  const openLineItemModal = () => {
    setmodal2isPhase(false)
    setLineItem('')
    setCost('')
    setModal1Visible(false)
    setModal2Visible(true)
  }
  const addLineItem = () => {
    setProposalSheet(previousState => [...previousState, { key: Date.now(), isPhase: false, value1: lineItem, value2: USDollar.format(cost)}])
    setModal2Visible(false)
  }
  const addPhase = () => {
    setProposalSheet(previousState => [...previousState, { key: Date.now(), isPhase: true, value1: phaseName, value2: phaseDate}])
    setModal2Visible(false)
  }

  // Edit Line Item Modal Settings
  const openEditPhaseModal = (lineKey) => {
    setmodal3isPhase(true)
    currentLineIndex = proposalSheet.findIndex(({key}) => key === lineKey)
    let lineData = proposalSheet.find(({key}) => key === lineKey)
    setPhaseName(lineData.value1)
    setPhaseDate(lineData.value2)
    setModal3Visible(true)
  }
  const openEditLineItemModal = (lineKey) => {
    setmodal3isPhase(false)
    currentLineIndex = proposalSheet.findIndex(({key}) => key === lineKey)
    let lineData = proposalSheet.find(({key}) => key === lineKey)
    setLineItem(lineData.value1)
    setCost(lineData.value2)
    setModal3Visible(true)
  }
  const editPhase = () => {
    const copiedProposalSheet = proposalSheet  
    copiedProposalSheet[currentLineIndex].value1 = phaseName
    copiedProposalSheet[currentLineIndex].value2 = phaseDate
    setProposalSheet(copiedProposalSheet)
    setModal3Visible(false)
  }
  const editLineItem = () => {
    const copiedProposalSheet = proposalSheet  
    copiedProposalSheet[currentLineIndex].value1 = lineItem
    copiedProposalSheet[currentLineIndex].value2 = cost
    setProposalSheet(copiedProposalSheet)
    setModal3Visible(false)
  }
  const deleteLineItem = () => {
    const copiedProposalSheet = proposalSheet  
    copiedProposalSheet.splice(currentLineIndex, 1)
    setModal3Visible(false)
  }

  // Save Proposal Modal Settings
  const openSaveProposal = () => {
    setModal4Visible(true)
  }
  const saveProposal = () => {
    project = [ clientID, description, proposalSheet]
    console.log(project)
    navigation.pop()
  }

  // --- Modal 1 (Select Line Item Type) ---
  const modal1Content =
    <View style={styles.contentBox}>
      <View style={styles.lineSelectionButtonsBox}>
        <IconButtonHSmall pressFunction={openPhaseModal} title="Add Phase" icon="plus" bgcolor="steelblue" textcolor="white"/> 
        <IconButtonHSmall pressFunction={openLineItemModal} title="Add Line Item" icon="plus" bgcolor="chocolate" textcolor="white"/>
      </View>
    </View>

  // --- Modal 2 (Add Line Item) ---
  const modal2Content = 
    <>
      <View style={styles.contentBox}>
        <View style={globalStyles.formRow}>
          <View style={[globalStyles.formColumn, { flex: 5 }]}>
            <Text style={globalStyles.formFieldCaption}>{modal2isPhase ? 'Phase' : 'Line Item'}</Text>
            <TextInput 
              autoCorrect={false} 
              style={globalStyles.formFieldInput}
              value={modal2isPhase ? phaseName : lineItem}
              onChangeText={text => modal2isPhase ? setPhaseName(text) : setLineItem(text)}></TextInput>
          </View>
          <View style={[globalStyles.formColumn, { flex: modal2isPhase ? 3 : 2 }]}>
            <Text style={globalStyles.formFieldCaption}>{modal2isPhase ? 'Date' : 'Cost'}</Text>
            <TextInput 
              autoCorrect={false} 
              style={globalStyles.formFieldInput}
              keyboardType="numeric"
              value={modal2isPhase ? phaseDate : cost}
              onChangeText={text => modal2isPhase ? setPhaseDate(text) : setCost(text)}></TextInput>
          </View>
        </View>
      </View>
      <IconButtonHSmall 
        pressFunction={modal2isPhase ? addPhase : addLineItem} 
        title={modal2isPhase ? 'Add Phase' : 'Add Line Item'} 
        icon={modal2isPhase ? 'indent' : 'list'} 
        textcolor='white' 
        bgcolor='steelblue' 
      />
    </>

  // --- Modal 3 (Edit/Delete Line Item) ---
  const modal3Content = 
    <>
      <View style={styles.contentBox}>
        <View style={globalStyles.formRow}>
          <View style={[globalStyles.formColumn, { flex: 5 }]}>
            <Text style={globalStyles.formFieldCaption}>{modal3isPhase ? 'Phase' : 'Line Item'}</Text>
            <TextInput 
              autoCorrect={false} 
              style={globalStyles.formFieldInput}
              value={modal3isPhase ? phaseName : lineItem}
              onChangeText={text => modal3isPhase ? setPhaseName(text) : setLineItem(text)}></TextInput>
          </View>
          <View style={[globalStyles.formColumn, { flex: modal3isPhase ? 3 : 2  }]}>
            <Text style={globalStyles.formFieldCaption}>{modal3isPhase ? 'Date' : 'Cost'}</Text>
            <TextInput 
              autoCorrect={false} 
              style={globalStyles.formFieldInput}
              keyboardType="numeric"
              value={modal3isPhase ? phaseDate : cost}
              onChangeText={text => modal3isPhase ? setPhaseDate(text) : setCost(text)}></TextInput>
          </View>
        </View>
      </View>
      <IconButtonHSmall 
        pressFunction={modal3isPhase ? editPhase : editLineItem} 
        title='Save Edit' 
        icon='edit' 
        textcolor='white' 
        bgcolor='steelblue' 
      />
      <IconButtonHSmall 
        pressFunction={deleteLineItem} 
        title='Delete Line Item' 
        icon='backspace' 
        textcolor='white' 
        bgcolor='maroon' 
      />
    </>

  // --- Modal 4 (Save Proposal) ---
  const modal4Content = 
    <>
      <View style={styles.contentBox}>
        <View style={globalStyles.formRow}>
          <View style={[globalStyles.formColumn, { flex: 1 }]}>
            <Text style={globalStyles.formFieldCaption}>Add Project Description</Text>
            <TextInput 
              autoCorrect={false} 
              style={globalStyles.formFieldInput}
              value={description}
              onChangeText={text => setDescription(text)}></TextInput>
          </View>
        </View>
      </View>
      <IconButtonHSmall pressFunction={saveProposal} title='Save Proposal' icon='save' textcolor='white' bgcolor='steelblue' />
    </>

  // ---------- | Main Return | ----------
  return (
    <View style={styles.pageContainer}> 

      {/* --- Display Line Items --- */}
      <View style={{zIndex: 1}}>
        <FlatList
          data={proposalSheet}
          keyExtractor={item => item.key}
          renderItem={({item}) => 
            <TouchableOpacity style={item.isPhase ? styles.phase : styles.lineRow} onPress={() => item.isPhase ? openEditPhaseModal(item.key) : openEditLineItemModal(item.key) }>
              <Text style={item.isPhase ? styles.phaseName : styles.lineItem}>{item.value1}{item.isPhase ? '' : ' . . .'}</Text>
              <Text style={item.isPhase ? styles.phaseDate : styles.lineCost}>{item.isPhase ? '' : '$'}{item.value2}</Text>
            </TouchableOpacity>
          }
        />
      </View>

      <BottomTab3 
        button1icon='plus'
        button1text='Add Line'
        button1function={openLineSelectionModal}
        button2icon='save'
        button2text='Save'
        button2function={openSaveProposal}
        button3icon='envelope'
        button3text='Send'
      />

      {/* --- Modal 1 --- */}
      <ModalCenterBG
        modalVisible={modal1Visible}
        modalOnRequestClose={() => setModal1Visible(false)}
        screenWidth={width}
        closeModalButton={closeModal}
        modalContent={modal1Content}
      /> 

      {/* --- Modal 2 --- */}
      <ModalCenterBG
        modalVisible={modal2Visible}
        modalOnRequestClose={() => setModal2Visible(false)}
        screenWidth={width}
        closeModalButton={closeModal}
        modalContent={modal2Content}
      /> 

      {/* --- Modal 3 --- */}
      <ModalCenterBG
        modalVisible={modal3Visible}
        modalOnRequestClose={() => setModal3Visible(false)}
        screenWidth={width}
        closeModalButton={closeModal}
        modalContent={modal3Content}
      /> 

      {/* --- Modal 4 --- */}
      <ModalCenterBG
        modalVisible={modal4Visible}
        modalOnRequestClose={() => setModal4Visible(false)}
        screenWidth={width}
        closeModalButton={closeModal}
        modalContent={modal4Content}
      /> 

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

  // Modals
  contentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  // Modal 1 

  lineSelectionBox: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  lineSelectionButtonsBox: {
    marginBottom: -10,
    marginTop: 10,
    width: '100%'
  },

  // Modal 2 & 3
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

  // Proposal Sheet
  phase: {
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