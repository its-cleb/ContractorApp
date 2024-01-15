import React, { useState } from 'react'
import { View, Text, StyleSheet, Switch, FlatList, TouchableOpacity, useWindowDimensions } from 'react-native'
import BottomTab3 from '../components/BottomTab3'
import { ModalCenterBG, ModalBox } from '../components/ModalCenterBG'
import DrawerHeader from '../components/DrawerHeader'
import IconButtonHSmall from '../components/IconButtonHSmall'
import { FontAwesome5 } from '@expo/vector-icons'
import { Row, Column, Caption, Field } from '../components/Form'
import * as Linking from 'expo-linking'

const EstimatorScreen = () => {

  const { width } = useWindowDimensions()

  const [ estimatorSheet, setEstimatorSheet ] = useState([])

  // --- Form Control
  const blankFormData = {
    key: '',
    costType: '',
    name: '',
    cost: '',
    multiplier: '1',
    lineTotal: ''
  }

  const [ form, setForm ] = useState(blankFormData)
  const [ switchValue, setSwitchValue ] = useState(false)

  const setFormState = (obj) => {
    Object.entries(obj).map(function(element) {
      setForm(prev => {
        return { 
          ...prev,
          [element[0]]: element[1]
      }})        
    })
  }

  let totalCost = estimatorSheet.reduce(function(previousValue, currentValue) {return previousValue + +currentValue.lineTotal }, 0)

  // --- Modal Control
  const closedModals = {
    modal1: false,
    modal2: false,
    modal3: false
  }

  const [modalVisible, setModalVisible] = useState(closedModals)

  const openModal1 = () => {
    setModalVisible({ modal1: true, modal2: false, modal3: false})
  }

  const [ isEdit, setIsEdit ] = useState(false)
  const [ currentKey, setCurrentKey ] = useState(null)

  const openModal2 = (value, edit, key) => {
    setIsEdit(edit)
    setCurrentKey(key)
    let lineData = estimatorSheet.find(lineKey => lineKey.key === key)
    setForm(edit ? lineData : blankFormData)
    setFormState({costType: value})
    setModalVisible({ modal1: false, modal2: true, modal3: false})
  }

  const saveModal2 = () => { 
    let copiedEstimatorSheet = estimatorSheet
    let currentLineIndex = estimatorSheet.findIndex(lineKey => lineKey.key === currentKey)
    copiedEstimatorSheet[currentLineIndex] = {
      key: currentKey,
      costType: form.costType,
      name: form.name,  
      cost: form.cost,
      multiplier: switchValue ? '1' : form.multiplier,
      lineTotal: form.cost * (switchValue ? '1' : form.multiplier)
    }
    isEdit ?
      setEstimatorSheet(copiedEstimatorSheet)
      :    
      setEstimatorSheet(previousState => [...previousState, { 
        key: Date.now(),
        costType: form.costType,
        name: form.name,  
        cost: form.cost,
        multiplier: switchValue ? '1' : form.multiplier,
        lineTotal: form.cost * (switchValue ? '1' : form.multiplier)
      }])
    setModalVisible({ modal1: false, modal2: false, modal3: false})
  }

  const openModal3 = () => {
    setModalVisible({ modal1: false, modal2: false, modal3: true})
  }

  const closeModal = () => {
    setModalVisible(closedModals)
  }

  const clearSheet = () => {
    setForm(blankFormData)
    setEstimatorSheet([])
    setModalVisible(closedModals)
  }

  // --- Modal 1 (Select Cost Type) ---
  const modal1Content =
  <>
    <View style={styles.contentBox}>
      <View style={styles.costModalButtonsBox}>
        <Text style={styles.modalHeading}>Add Cost</Text>
        <IconButtonHSmall pressFunction={() => openModal2('Materials', false)} title="Materials" icon="box" bgcolor="darkred" textcolor="white"/> 
        <IconButtonHSmall pressFunction={() => openModal2('Labor', false)} title="Labor" icon="hammer" bgcolor="darkgoldenrod" textcolor="white"/>
        <IconButtonHSmall pressFunction={() => openModal2('Mobilization', false)} title="Mobilization" icon="truck" bgcolor="darkolivegreen" textcolor="white"/>
        <IconButtonHSmall pressFunction={() => openModal2('Travel', false)} title="Travel" icon="plane" bgcolor="teal" textcolor="white"/>
        <IconButtonHSmall pressFunction={() => openModal2('Misc', false)} title="Misc" icon="plus" bgcolor="slategray" textcolor="white"/>
      </View>
    </View>
  </>

  // --- Modal 2 (Add/Edit Line) ---
  const modal2Content =
  <>
    <View style={styles.contentBox}>
      <View style={styles.costModalButtonsBox}>
        {isEdit ?
          <Text style={styles.modalHeading}>Edit Expense</Text>
          :
          <Text style={styles.modalHeading}>Add {form.costType} Expense</Text>
        }
        <Row>
          <Column flex={3}>
            <Caption>Line Title</Caption>
            <Field value={form.name} press={(text) => setFormState({name: text})}/>
          </Column>

          <Column flex={2} addStyles={{alignItems: 'center', justifyContent: 'flex-end'}}>
            <Caption>Flat Fee</Caption>
            <Switch 
              onValueChange={(value) => setSwitchValue(value)}
              value={switchValue}
            />
          </Column>
        </Row>
        <Row>
          <Column flex={3}>
            <Caption>Cost</Caption>
            <Field value={form.cost} numeric={true} press={(text) => setFormState({cost: text})}/>
          </Column>
          {switchValue ?
            ''
            : 
            <Column flex={2}>
              <Caption># of Items</Caption>
              <Field value={form.multiplier} numeric={true} press={(text) => setFormState({multiplier: text})}/>
            </Column>
          } 
        </Row>

        <View style={{alignSelf: 'stretch', marginHorizontal: -10}}>
          <Text style={styles.itemTotal}>
            Line Total: {Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(form.cost * (switchValue ? 1 : form.multiplier))}
          </Text>
          <IconButtonHSmall pressFunction={saveModal2} title={isEdit ? "Save Line Item" : "Add Line Item"} icon="save" bgcolor="steelblue" textcolor="white"/>
        </View>
      </View>
    </View>
  </>

  // --- Modal 3 (Confirm Clear Form) ---
  const modal3Content =
  <>
    <View style={styles.contentBox}>
      <View style={styles.costModalButtonsBox}>
          <Text style={styles.modalHeading}>Clear Estimate?</Text>
      </View>
    </View>
    
    <View style={{flexDirection: 'row'}}>
      <View style={{flex: 1}}> 
        <IconButtonHSmall pressFunction={clearSheet} title="Yes" icon="eraser" bgcolor="steelblue" textcolor="white"/>
      </View>
      <View style={{flex: 1}}> 
        <IconButtonHSmall pressFunction={closeModal} title="No" icon="ban" bgcolor="maroon" textcolor="white"/>
      </View>
    </View>
  </>

  // Flatlist Content 
  const getEstimates = (item) => {
    let currentIcon
    let currentColor

    switch(item.costType) {
      case 'Materials':
        currentIcon = 'box'
        currentColor = 'darkred'
        break
      case 'Labor':
        currentIcon = 'hammer'
        currentColor = 'darkgoldenrod'
        break
      case 'Mobilization':
        currentIcon = 'truck'
        currentColor = 'darkolivegreen'
        break
      case 'Travel':
        currentIcon = 'plane'
        currentColor = 'teal'
        break
      case 'Misc':
        currentIcon = 'clipboard-check'
        currentColor = 'slategray'
        break
      default: 
        currentIcon = 'question-circle'
        currentColor = 'black'
    }

    return (
      <TouchableOpacity style={[styles.lineRow, {backgroundColor: 'white' }]} onPress={() => openModal2(item.costType, true, item.key)}>
        <FontAwesome5 
          style={styles.lineIcon} 
          size={20} 
          color={currentColor}
          name={currentIcon}
        />
        <Text style={styles.lineName}>{item.name}</Text>
        <Text style={styles.lineCost}>
          {Boolean(item.multiplier > 1) ? Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(item.cost) : '' }
        </Text>
        <Text style={styles.lineMultiplier}>
          {Boolean(item.multiplier > 1) ? item.multiplier : '' }
        </Text>
        <Text style={styles.lineTotal}>{Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(item.lineTotal)}</Text>
      </TouchableOpacity>
    )
  }

  // ----- | Main Return | -----
  return (
    <>
      <View style={styles.pageContainer}> 

        <DrawerHeader title="Estimator" />

        <View style={styles.estimatorSheet}>

          <View style={styles.headerRow}>
            <Text style={[styles.lineName, styles.headerItem, { marginLeft: 10}]}>Item</Text>
            <Text style={[styles.lineCost, styles.headerItem, { textAlign: 'center'}]}>Cost</Text>
            <Text style={[styles.lineMultiplier, styles.headerItem]}>Qty</Text>
            <Text style={[styles.lineTotal, styles.headerItem]}>Total</Text>
          </View>
          
          <FlatList
            data={estimatorSheet}
            keyExtractor={item => item.key}
            renderItem={({item}) => getEstimates(item)}
          />
          <View style={styles.totalBar}>
            <Text style={styles.totalText}>Total: {Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(totalCost)}</Text>
          </View>

        </View>    

        <BottomTab3 
          button1icon='eraser'
          button1text='Clear Form'
          button1function={openModal3}
          button2icon='edit'
          button2text='Add Line'
          button2function={openModal1}
          button3icon='envelope'
          button3text='Email'
          button3function={() => Linking.openURL(`sms:1234567890?body=${test}`)}
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

      </View>
    </>
  )
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  estimatorSheet: {
    marginBottom: 120,
    zIndex: 1
  },
  
  // Modals
  contentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  modalHeading: {
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: -20,
    marginBottom: 10
  },

  // Modal 1 
  costModalBox: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  costModalButtonsBox: {
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
  itemTotal: {
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 5
  },

  // Estimator Sheet
  headerRow: {
    flexDirection: 'row', 
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#ddd'
  },
  headerItem: {
    justifyContent: 'center',
    alignContent: 'center',
    paddingVertical: 5,
    paddingLeft: 5,
    textAlign: 'left'
  },
  lineRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingLeft: 5,
  },
  lineName: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 18,
    flex: 4,
    paddingLeft: 5
  },
  lineIcon: {
    justifyContent: 'center',
    alignContent: 'center',
    paddingRight: 5,
    alignSelf: 'center',
    minWidth: 30
  },
  lineCost: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 18,
    flex: 2
  },
  lineMultiplier: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 18,
    flex: 1
  },
  lineTotal: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    fontSize: 18,
    flex: 2,
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

export default EstimatorScreen