import React, { useState, useContext } from 'react'
import { View, Text, TextInput, StyleSheet, useWindowDimensions, TouchableOpacity, FlatList } from 'react-native'
import { globalStyles } from '../styles/globalstyles'
import IconButtonHSmall from '../components/IconButtonHSmall'
import ModalCenterBG from '../components/ModalCenterBG'
import BottomTab3 from '../components/BottomTab3'
import StackHeader from '../components/StackHeader'
import { Row, Column, Caption, Field } from '../components/Form'

import { Context } from '../context/ProposalContext'

// Scoped variables for line items
let currentLineIndex = 0

const ProposalScreen = ({ route, navigation }) => {
  
  const { state, addProposal, editProposal, deleteProposal } = useContext(Context)
  
  const { width } = useWindowDimensions()

  // Get navigation params
  const isAdd = route.params.isAdd
  const clientID  = route.params.clientID
  const proposalID = isAdd ? `${clientID}` + '-' + Date.now() : route.params.proposalID

  // Determine whether to add a new blank proposal or open existing
  const selectedProposal = state.find(proposals => proposals.proposalID === proposalID)
  const currentProposal = isAdd ? [] : selectedProposal.proposal
  const editDescription = isAdd ? '' : selectedProposal.description

  const [ proposalSheet, setProposalSheet ] = useState(currentProposal)

  // Form State
  const blankFormData = {
    phaseName: '',
    phaseDate: '',
    lineItem: '',
    cost: '',
    description: editDescription
  }

  const [form, setForm] = useState(blankFormData)

  const setFormState = (obj) => {
    Object.entries(obj).map(function(element) {
      setForm(prev => {
        return { 
          ...prev,
          [element[0]]: element[1]
      }})        
    })
  }

  // --- Modal Functions ---
  const closedModals = {
    modal1: false,
    modal2: false,
    modal3: false,
    modal4: false
  }

  const [modalVisible, setModalVisible] = useState(closedModals)
  const [modal2isPhase, setModal2isPhase] = useState('')
  const [modal3isPhase, setModal3isPhase] = useState('')

  // Total Cost Calculation
  let lineItems = proposalSheet.filter((item) => item.isPhase === false )
  
  let totalCost = lineItems.reduce(function(previousValue, currentValue) 
    { return previousValue + +currentValue.value2 }, 0)

  // Modal Control
  const closeModal = () => {
    setModalVisible(closedModals)
  }
  const openLineSelectionModal = () => {
    setModalVisible({ modal1: true, modal2: false, modal3: false, modal4: false })
  }

  // Add Line Item Modal Settings
  const openModal2 = (phaseModal) => {
    setModal2isPhase( phaseModal ? true : false )
    setFormState( phaseModal ? {phaseName: '', phaseDate: ''} : {lineItem: '', cost: ''} )
    setModalVisible({ modal1: false, modal2: true, modal3: false, modal4: false })
  }
  const addLine = () => {
    setProposalSheet(previousState => [...previousState, { 
      key: Date.now(), 
      isPhase: modal2isPhase ? true : false, 
      value1: modal2isPhase ? form.phaseName : form.lineItem, 
      value2: modal2isPhase ? form.phaseDate : form.cost
    }])
    setModalVisible({ modal1: false, modal2: false, modal3: false, modal4: false })
  }

  // Edit Line Item Modal Settings
  const openModal3 = (data) => {
    // Refactor? 
    setModal3isPhase(data.phaseModal ? true : false)
    currentLineIndex = proposalSheet.findIndex(({key}) => key === data.lineKey)
    let lineData = proposalSheet.find(({key}) => key === data.lineKey)
    setFormState(data.phaseModal ? {phaseName: lineData.value1, phaseDate: lineData.value2} : {lineItem: lineData.value1, cost: lineData.value2})
    setModalVisible({ modal1: false, modal2: false, modal3: true, modal4: false })
  }
  const editLine = (isPhase) => {
    const copiedProposalSheet = proposalSheet  
    copiedProposalSheet[currentLineIndex].value1 = isPhase ? form.phaseName : form.lineItem
    copiedProposalSheet[currentLineIndex].value2 = isPhase ? form.phaseDate : form.cost
    setProposalSheet(copiedProposalSheet)
    setModalVisible({ modal1: false, modal2: false, modal3: false, modal4: false })
  }
  const deleteLineItem = () => {
    const copiedProposalSheet = proposalSheet  
    copiedProposalSheet.splice(currentLineIndex, 1)
    setModalVisible({ modal1: false, modal2: false, modal3: false, modal4: false })
  }
  const moveToTopButton = () => { 
    // Get line data, check ifPhase, copy line to top, delete original line
    const copiedProposalSheet = proposalSheet
    let lineData = copiedProposalSheet[currentLineIndex]
    let phase = lineData.isPhase ? true : false
    copiedProposalSheet.splice(currentLineIndex, 1)
    copiedProposalSheet.unshift({ key: Date.now(), isPhase: lineData.isPhase, value1: phase ? form.phaseName : form.lineItem, value2: phase ? form.phaseDate : form.cost})
    setProposalSheet(copiedProposalSheet)
    setModalVisible({ modal1: false, modal2: false, modal3: false, modal4: false })
  }

  // Save Proposal Modal Settings
  const openSaveProposal = () => {
    setModalVisible({ modal1: false, modal2: false, modal3: false, modal4: true })
  }
  const saveProposal = () => {
    isAdd ? addProposal(clientID, proposalID, form.description, totalCost, proposalSheet) : editProposal(clientID, proposalID, form.description, totalCost, proposalSheet)
    navigation.pop()
  }

  const deleteButton = () => {
    if (isAdd === false) {
      deleteProposal(proposalID)
      navigation.pop()
    } else {
    navigation.pop()
    }
  }

  // --- Modal 1 (Select Line Item Type) ---
  const modal1Content =
    <View style={styles.contentBox}>
      <View style={styles.lineSelectionButtonsBox}>
        <IconButtonHSmall pressFunction={() => openModal2(true)} title="Add Phase" icon="plus" bgcolor="steelblue" textcolor="white"/> 
        <IconButtonHSmall pressFunction={() => openModal2(false)} title="Add Line Item" icon="plus" bgcolor="chocolate" textcolor="white"/>
      </View>
    </View>

  // --- Modal 2 (Add Line Item) ---
  const modal2Content = 
    <>
      <View style={styles.contentBox}>
        <Row>
          <Column flex={5}>
            <Caption>{modal2isPhase ? 'Phase' : 'Line Item'}</Caption>
            <Field 
              value={modal2isPhase ? form.phaseName : form.lineItem} 
              press={text => modal2isPhase ? setFormState({phaseName: text}) : setFormState({lineItem: text})}
            />
          </Column>
          <Column flex={modal2isPhase ? 3 : 2 }>
            <Caption>{modal2isPhase ? 'Date' : 'Cost'}</Caption>
            <Field 
              value={modal2isPhase ? form.phaseDate : form.cost} 
              numeric={modal2isPhase ? false : true} 
              press={text => modal2isPhase ? setFormState({phaseDate: text}) : setFormState({cost: text})}
            />
          </Column>
        </Row>
      </View>
      <IconButtonHSmall 
        pressFunction={addLine} 
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
        <Row>
          <Column flex={5}>
            <Caption>{modal3isPhase ? 'Phase' : 'Line Item'}</Caption>
            <Field 
              value={modal3isPhase ? form.phaseName : form.lineItem} 
              numeric={true} 
              press={text => modal3isPhase ? setFormState({phaseName: text}) : setFormState({lineItem: text})}
            />
          </Column>
          <Column flex={modal3isPhase ? 3 : 2  }>
            <Caption>{modal3isPhase ? 'Date' : 'Cost'}</Caption>
            <Field 
              value={modal3isPhase ? form.phaseDate : form.cost} 
              numeric={true} 
              press={text => modal3isPhase ? setFormState({phaseDate: text}) : setFormState({cost: text})}
            />
          </Column>
        </Row>
      </View>
      <IconButtonHSmall 
        pressFunction={() => editLine(modal3isPhase ? true : false)} 
        title='Save Edit' 
        icon='edit' 
        textcolor='white' 
        bgcolor='steelblue' 
      />
      <IconButtonHSmall 
        pressFunction={moveToTopButton} 
        title='Move to Top' 
        icon='level-up-alt' 
        textcolor='white' 
        bgcolor='chocolate' 
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
        <Row>
          <Column flex={1}>
            <Caption>{isAdd ? 'Add Project Description' : 'Edit Project Description'}</Caption>
            <Field value={form.description} press={(text) => setFormState({description: text})}/>
          </Column>
        </Row>
      </View>
      <IconButtonHSmall pressFunction={saveProposal} title='Save Proposal' icon='save' textcolor='white' bgcolor='steelblue' />
    </>

  // ---------- | Main Return | ----------
  return (
    <>
      <StackHeader 
        title={isAdd ? 'Add Proposal' : 'Edit Proposal'}
        navFunction={() => navigation.pop()}
        rightIcon='delete-forever'
        pressFunction={deleteButton}
      />
      <View style={styles.pageContainer}> 

        {/* --- Display Line Items --- */}
        <View style={styles.proposalSheet}>
          <FlatList
            data={proposalSheet}
            keyExtractor={item => item.key}
            renderItem={({item}) => 
              <TouchableOpacity style={item.isPhase ? styles.phase : styles.lineRow} onPress={() => openModal3({lineKey: item.key, phaseModal: item.isPhase ? true : false})}>
                <Text style={item.isPhase ? styles.phaseName : styles.lineItem}>{item.value1}{item.isPhase ? '' : ' . . .'}</Text>
                <Text style={item.isPhase ? styles.phaseDate : styles.lineCost}>{item.isPhase ? item.value2 : 
                  Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(item.value2)}</Text>
              </TouchableOpacity>
            }
          />
          <View style={styles.totalBar}>
            <Text style={styles.totalText}>Total: {Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(totalCost)}</Text>
          </View>
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
          modalVisible={modalVisible.modal1}
          modalOnRequestClose={closeModal}
          screenWidth={width}
          closeModalButton={closeModal}
          modalContent={modal1Content}
        /> 

        {/* --- Modal 2 --- */}
        <ModalCenterBG
          modalVisible={modalVisible.modal2}
          modalOnRequestClose={closeModal}
          screenWidth={width}
          closeModalButton={closeModal}
          modalContent={modal2Content}
        /> 

        {/* --- Modal 3 --- */}
        <ModalCenterBG
          modalVisible={modalVisible.modal3}
          modalOnRequestClose={closeModal}
          screenWidth={width}
          closeModalButton={closeModal}
          modalContent={modal3Content}
        /> 

        {/* --- Modal 4 --- */}
        <ModalCenterBG
          modalVisible={modalVisible.modal4}
          modalOnRequestClose={closeModal}
          screenWidth={width}
          closeModalButton={closeModal}
          modalContent={modal4Content}
        /> 

      </View>
    </> 
  )
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  proposalSheet: {
    zIndex: 1,
    marginBottom: 120
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
  },
  totalBar: {
    flexDirection: 'row',
    backgroundColor: 'gainsboro', 
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  totalText: {
    color: 'black',
    alignSelf: 'flex-end',
    textAlign: 'right',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1
  }
}) 

export default ProposalScreen