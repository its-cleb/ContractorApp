import { React } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import StackHeader from '../components/StackHeader'
import ProjectsFlatlist from '../components/flatlists/ProjectsFlatlist'
import IconButtonHContent from '../components/IconButtonHContent'


const ProjectScreen = ({ route, navigation }) => {

  // const { state } = useContext(Context)
  const clientID = route.params.clientID

  return (
    <>
      <StackHeader title='Projects'/>
      
      <View style={styles.pageContainer}> 
        <ProjectsFlatlist isFiltered={true} filter={clientID} fromHome={route.params.fromHome}/>

        <View style={styles.addProjectButton}>
          <IconButtonHContent pressFunction={() => navigation.navigate('ProjectForm', { isAdd: true, clientID: clientID, payload: ''})} title="Add New Project" icon="plus" bgcolor="#00000000" textcolor="steelblue"/>
        </View>
      </View>

    </>
  )
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingHorizontal: 5
  },
  addProjectButton: {
    backgroundColor: '#fafafa',
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    paddingBottom: 10,
  }
})

export default ProjectScreen