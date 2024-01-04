import React, { useState } from 'react'
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import { globalStyles } from '../styles/globalstyles'
import BottomTab3 from '../components/BottomTab3'
import ModalCenterBG from '../components/ModalCenterBG'
import DrawerHeader from '../components/DrawerHeader'
import IconButtonHSmall from '../components/IconButtonHSmall'

const EstimatorScreen = () => {

  const { width } = useWindowDimensions()

  // Modal Control
  const closedModals = {
    modal1: false,
  }

  const [modalVisible, setModalVisible] = useState(closedModals)

  const closeModal = () => {
    setModalVisible(false)
  }

  // --- Modal 1 (Select Line Item Type) ---
  const modal1Content =
  <View style={styles.contentBox}>
    <View style={styles.lineSelectionButtonsBox}>
      <IconButtonHSmall pressFunction={() => openModal2(true)} title="Add Phase" icon="plus" bgcolor="steelblue" textcolor="white"/> 
      <IconButtonHSmall pressFunction={() => openModal2(false)} title="Add Line Item" icon="plus" bgcolor="chocolate" textcolor="white"/>
    </View>
  </View>

  // ----- | Main Return | -----
  return (
    <>
      <DrawerHeader title="Estimator" />

      <View style={styles.pageContainer}> 

        <View style={styles.proposalSheet}>



        </View>
          <BottomTab3 
            button1icon='eraser'
            button1text='Clear Form'
            // button1function={openEmployeeModal}
            button2icon='edit'
            button2text='Add Line'
            button2function={() => setModalVisible(true)}
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

})

export default EstimatorScreen