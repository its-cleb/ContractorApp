import { React } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import StackHeader from '../components/StackHeader'
import ProjectsFlatlist from '../components/flatlists/ProjectsFlatlist'
import IconButtonHContent from '../components/IconButtonHContent'


const ClientProjectsScreen = ({ route, navigation }) => {
  
  const clientID = route.params.clientID

  return (
    <>
      <StackHeader title='Projects of Client' navFunction={() => navigation.pop()}/>
      
      <View style={styles.pageContainer}> 
        <ProjectsFlatlist 
          isFiltered={true} 
          filter={clientID} 
          fromHome={false}
          fromClient={true}
          client
        />
 
        <View style={styles.addProjectButton}>
          <IconButtonHContent 
            pressFunction={() => navigation.navigate('ClientProjectForm', { isAdd: true, clientID, payload: ''})} 
            title="Add New Project" 
            icon="plus" 
            bgcolor="#00000000" 
            textcolor="steelblue"
          />
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
  noticeText: {
    fontSize: 18,
    color: '#666666',
    width: '70%',
    textAlign: 'center'
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

export default ClientProjectsScreen