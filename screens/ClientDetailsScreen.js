import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Context as ClientContext} from '../context/ClientContext'
import { Context as ProposalContext} from '../context/ProposalContext'
import DeleteButton from '../components/DeleteButton'
import IconButtonHSmall from '../components/IconButtonHSmall'
import ProposalsFlatlist from '../components/proposals/ProposalsFlatlist'


const ClientDetailsScreen = ({ route, navigation }) => {
  
  const { state, deleteClient } = useContext(ClientContext)

  const { proposalState } = useContext(ProposalContext)

  const { payload } = route.params
  
  const projects = state.find(projects => projects.clientID === payload)

  const deleteClientNavBack = () => {
    deleteClient(payload)
    navigation.pop()
  }
  
  return (
    <>
      <View style={styles.projectContainer}>
        <View style={styles.projectHeader}>
          <Text style={styles.projectTextHeader}>{projects.clientName}</Text>
          <DeleteButton pressFunction={deleteClientNavBack}/>
        </View>
        <View style={styles.projectRow}>
          <Text style={[styles.projectTextBold, styles.flexOne]}>First Contacted:</Text>
          <Text style={styles.projectTextRight}>{projects.contactDate}</Text>
        </View>
        <View style={styles.projectRow}>
          <Text style={[styles.projectTextBold, styles.flexOne]}>Phone:</Text>
          <Text style={styles.projectTextRight}>{projects.phone}</Text>
        </View>
        <View style={styles.projectRow}>
          <Text style={[styles.projectTextBold, styles.flexOne]}>Email:</Text>
          <Text style={styles.projectTextRight}>{projects.email}</Text>
        </View>
        <View style={styles.projectRow}>
          <Text style={[styles.projectTextBold]}>Address:</Text>
          <View style={styles.flexOne}>
            <Text style={styles.projectTextRight}>{projects.address}, {projects.unitNumber}</Text>
            <Text style={styles.projectTextRight}>{projects.city}, {projects.usState} {projects.zip}</Text>
          </View>  
        </View>

        <View style={styles.proposalsBox}>
          <Text style={[styles.projectTextBold]}>Projects:</Text>
          <View>
            <ProposalsFlatlist />
          </View>  
        </View>

      </View>
      
      
      

      <View>
        <IconButtonHSmall pressFunction={() => navigation.navigate('EditClient', {payload})} title='Edit Client Details' icon='user-alt' textcolor='white' bgcolor='steelblue' />
      </View>
      <View>
        <IconButtonHSmall pressFunction={() => navigation.navigate('ProposalScreen', projects.clientID)} title='View Proposals' icon='file-alt' textcolor='white' bgcolor='steelblue' />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  projectContainer: {
    borderRadius: 5,
    margin: 10,
    paddingBottom: 8,
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
  },
})

export default ClientDetailsScreen