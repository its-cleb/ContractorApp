import { React } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import StackHeader from '../components/StackHeader'
import ProjectsFlatlist from '../components/flatlists/ProjectsFlatlist'


const ProjectScreen = ({ route, navigation }) => {

  // const { state } = useContext(Context)
  const client = route.params.clientID

  return (
    <>
      <StackHeader title='Projects'/>
      
      <View style={styles.pageContainer}> 
        <ProjectsFlatlist isFiltered={true} filter={client}/>
      </View>
    </>
  )
}

const styles = StyleSheet.create({

})

export default ProjectScreen