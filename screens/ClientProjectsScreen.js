import { React } from 'react'
import { StyleSheet, View } from 'react-native'
import StackHeader from '../components/StackHeader'
import ProjectsFlatlist from '../components/flatlists/ProjectsFlatlist'
import { IconButtonH } from '../components/Button'


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
 
        <View style={styles.addButton}>
          <IconButtonH
            pressFunction={() => navigation.navigate('ClientProjectForm', { isAdd: true, clientID, payload: ''})} 
            title="Add New Project" 
            icon="plus" 
            bgcolor="#00000000" 
            textcolor="steelblue"
            isBig
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
  addButton: {
    backgroundColor: '#fafafa',
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    paddingBottom: 15,
  }
})

export default ClientProjectsScreen