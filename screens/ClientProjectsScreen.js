import { React } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import StackHeader from '../components/StackHeader'
import ProjectsFlatlist from '../components/flatlists/ProjectsFlatlist'
import IconButtonHContent from '../components/IconButtonHContent'


const ClientProjectsScreen = ({ route, navigation }) => {

  const isDrawer = Boolean(route.params ===  undefined)
  const clientID = isDrawer ? null : route.params.clientID

  return (
    <>
      <StackHeader title='Projects of Client' navFunction={() => isDrawer ? navigation.navigate('Home') : navigation.pop()}/>
      
      <View style={styles.pageContainer}> 
        <ProjectsFlatlist isFiltered={isDrawer ? false : true} filter={isDrawer ? null : clientID} fromHome={isDrawer ? true : route.params.fromHome}/>
 
        <View style={styles.addProjectButton}>
          { isDrawer ?
          <>
            <Text style={styles.noticeText}>New projects must be added through the Client page</Text>
            <IconButtonHContent pressFunction={() => navigation.navigate('ClientsStack', { screen: 'ViewClients'})} title="Go to Clients" icon="user-alt" bgcolor="#00000000" textcolor="steelblue"/>
          </> 
          :
          <IconButtonHContent pressFunction={() => navigation.navigate('ProjectForm', { isAdd: true, clientID: isDrawer ? null : clientID, payload: ''})} title="Add New Project" icon="plus" bgcolor="#00000000" textcolor="steelblue"/>
          }
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