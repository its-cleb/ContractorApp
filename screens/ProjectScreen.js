import { React, useState, useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import StackHeader from '../components/StackHeader'
import IconButtonHSmall from '../components/IconButtonHSmall'
import ModalCenterBG from '../components/ModalCenterBG'
import BottomTab3 from '../components/BottomTab3'
import { Context } from '../context/ProjectContext'
import ProjectsFlatlist from '../components/projects/ProjectsFlatlist'


const ProjectScreen = ({ route, navigation }) => {

  // const { state } = useContext(Context)
  const client = route.params.clientID

  return (
    <>
      <StackHeader title='Projects'/>
      
      <View style={styles.pageContainer}> 
        <ProjectsFlatlist  filter={client}/>
      </View>
    </>
  )
}

const styles = StyleSheet.create({

})

export default ProjectScreen