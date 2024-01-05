import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Switch, useWindowDimensions } from 'react-native'
import { globalStyles } from '../styles/globalstyles'
import BottomTab3 from '../components/BottomTab3'
import ModalCenterBG from '../components/ModalCenterBG'
import DrawerHeader from '../components/DrawerHeader'
import IconButtonHSmall from '../components/IconButtonHSmall'

const EstimatorScreen = () => {

  const { width } = useWindowDimensions()


  // Form Control
  const blankFormData = {
    costType: '',
    name: '',
    cost: '',
    multiplier: 1,
    lineTotal: ''
  }

  const [form, setForm] = useState(blankFormData)
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

  // Modal Control
  const closedModals = {
    modal1: false,
    modal2: false,
    modal3: false
  }

  const [modalVisible, setModalVisible] = useState(closedModals)

  const openModal1 = () => {
    setModalVisible({ modal1: true, modal2: false, modal3: false})
  }

  const openModal2 = (value) => {
    setFormState({costType: value})
    setModalVisible({ modal1: false, modal2: true, modal3: false})
    console.log(value)
  }

  const saveModal2 = () => {

  }

  const closeModal = () => {
    setModalVisible(closedModals)
  }

  // --- Modal 1 (Select Cost Type) ---
  const modal1Content =
  <>
    <View style={styles.contentBox}>
      <View style={styles.costModalButtonsBox}>
        <Text style={styles.modalHeading}>Add Cost</Text>
        <IconButtonHSmall pressFunction={() => openModal2('Materials')} title="Materials" icon="box" bgcolor="darkred" textcolor="white"/> 
        <IconButtonHSmall pressFunction={() => openModal2('Labor')} title="Labor" icon="hammer" bgcolor="darkgoldenrod" textcolor="white"/>
        <IconButtonHSmall pressFunction={() => openModal2('Mobilization')} title="Mobilization" icon="truck" bgcolor="darkolivegreen" textcolor="white"/>
        <IconButtonHSmall pressFunction={() => openModal2('Travel')} title="Travel" icon="plane" bgcolor="teal" textcolor="white"/>
        <IconButtonHSmall pressFunction={() => openModal2('Misc')} title="Misc" icon="plus" bgcolor="slategray" textcolor="white"/>
      </View>
    </View>
  </>

    // --- Modal 2 (Select Cost Type) ---
    const modal2Content =
    <>
      <View style={styles.contentBox}>
        <View style={styles.costModalButtonsBox}>
          <Text style={styles.modalHeading}>Add {form.costType} Expense</Text>
          <View style={globalStyles.formRow}>
            <View style={[globalStyles.formColumn, { flex: 3 }]}>
              <Text style={globalStyles.formFieldCaption}>Line Title</Text>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput}
                value={form.name}
                onChangeText={text => setFormState({name: text})}></TextInput>
            </View>
            <View style={[globalStyles.formColumn, { flex: 2, alignItems: 'center', justifyContent: 'flex-end'}]}>
              <Text style={globalStyles.formFieldCaption}>Flat Fee</Text>
              <Switch 
                onValueChange={(value) => setSwitchValue(value)}
                value={switchValue}
              />
            </View>
          </View>
          <View style={globalStyles.formRow}>
            <View style={[globalStyles.formColumn, { flex: 3 }]}>
              <Text style={globalStyles.formFieldCaption}>Cost</Text>
              <TextInput 
                autoCorrect={false}
                keyboardType='numeric'
                style={globalStyles.formFieldInput}
                value={form.value1}
                onChangeText={text => setFormState({value1: text})}></TextInput>
            </View>
            {switchValue ?
              ''
              : 
              <View style={[globalStyles.formColumn, { flex: 2 }]}>
                <Text style={globalStyles.formFieldCaption}># of Vehicles</Text>
                <TextInput 
                  autoCorrect={false}
                  keyboardType='numeric'
                  style={globalStyles.formFieldInput}
                  value={form.value2}
                  onChangeText={text => setFormState({value2: text})}></TextInput>
              </View>
            } 
          </View>
          <Text style={styles.lineTotal}>
            Line Total: {Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(form.value1 * (switchValue ? 1 : form.value2))}
            </Text>
          <IconButtonHSmall pressFunction={() => openModal2('Misc')} title="Save Line Item" icon="save" bgcolor="steelblue" textcolor="white"/>
        </View>
      </View>
    </>

  // ----- | Main Return | -----
  return (
    <>
      
      

      <View style={styles.pageContainer}> 

        <DrawerHeader title="Estimator" />

        <View style={styles.proposalSheet}>

          <Text>Test</Text>


        </View>      
      

        <BottomTab3 
          button1icon='eraser'
          button1text='Clear Form'
          // button1function={openEmployeeModal}
          button2icon='edit'
          button2text='Add Line'
          button2function={openModal1}
          button3icon='save'
          button3text='Save'
          // button3function={saveProject}
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


      </View>
    </>
  )
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  proposalSheet: {
    marginBottom: 120
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
  lineTotal: {
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 5
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

export default EstimatorScreen