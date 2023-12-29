import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Context as ClientContext} from '../context/ClientContext'
import DeleteButton from '../components/DeleteButton'
import ProposalsFlatlist from '../components/flatlists/ProposalsFlatlist'
import BottomTab3 from '../components/BottomTab3'


const ClientDetailsScreen = ({ route, navigation }) => {
  
  const { state, deleteClient } = useContext(ClientContext)

  const { payload } = route.params
  
  const clients = state.find(clients => clients.clientID === payload)

  const deleteClientNavBack = () => {
    deleteClient(payload)
    navigation.pop()
  }
  
  return (
    <>
      <View style={styles.projectContainer}>
        <View style={styles.projectHeader}>
          <Text style={styles.projectTextHeader}>{clients.clientName}</Text>
          <DeleteButton pressFunction={deleteClientNavBack}/>
        </View>
        <View style={styles.projectRow}>
          <Text style={[styles.projectTextBold, styles.flexOne]}>First Contacted:</Text>
          <Text style={styles.projectTextRight}>{clients.contactDate}</Text>
        </View>
        <View style={styles.projectRow}>
          <Text style={[styles.projectTextBold, styles.flexOne]}>Phone:</Text>
          <Text style={styles.projectTextRight}>{clients.phone}</Text>
        </View>
        <View style={styles.projectRow}>
          <Text style={[styles.projectTextBold, styles.flexOne]}>Email:</Text>
          <Text style={styles.projectTextRight}>{clients.email}</Text>
        </View>
        <View style={styles.projectRow}>
          <Text style={[styles.projectTextBold]}>Address:</Text>
          <View style={styles.flexOne}>
            <Text style={styles.projectTextRight}>{clients.address}, {clients.unitNumber}</Text>
            <Text style={styles.projectTextRight}>{clients.city}, {clients.usState} {clients.zip}</Text>
          </View>  
        </View>

        <View style={styles.proposalsBox}>
          <Text style={[styles.projectTextBold]}>Proposals:</Text>
          <ProposalsFlatlist filter={clients.clientID} />
        </View>

      </View>
      
      <BottomTab3 
        button1icon='user-edit'
        button1text='Edit Client'
        button1function={() => navigation.navigate('ClientForm', {isAdd:false, payload: payload})}
        button2icon='file-alt'
        button2text='Add Proposal'
        button2function={() => navigation.navigate('ProposalScreen', { isAdd: true , clientID: clients.clientID, proposalID: ''})}
        button3icon='tools'
        button3text='Projects'
        button3function={() => navigation.navigate('ProjectStack', { screen: 'ProjectScreen', params: {clientID: clients.clientID, fromHome: false}})}
      /> 
    </>
  )
}

const styles = StyleSheet.create({
  projectContainer: {
    borderRadius: 5,
    margin: 10,
    paddingBottom: 8,
    flex: 1,
    marginBottom: 85
  },
  projectHeader: {
    flexDirection: 'row',
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#666666',
    paddingBottom: 3,
    paddingTop: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  projectRow: {
    flexDirection: 'row',
    padding: 10,
    marginTop: 5,
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderRadius: 5,
    borderWidth: 1,
  },
  projectText: {
    color: 'black',
    fontSize: 16,
  },
  projectTextHeader: {
    fontWeight: 'bold', 
    fontSize: 24,
    flex: 1
  },
  projectTextBold: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  projectTextRight: {
    color: 'black',
    textAlign: 'right',
    fontSize: 16,
  },
  flexOne: {
    flex: 1,
  },
  proposalsBox: {
    padding: 10,
    marginTop: 5,
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderRadius: 5,
    borderWidth: 1,
    flex: 1,
    flexGrow: 1
  },
})

export default ClientDetailsScreen