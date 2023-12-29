import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Context as CompanyContext } from '../context/CompanyContext'
import { globalStyles } from '../styles/globalstyles'
import DrawerHeader from '../components/DrawerHeader'

const CompanyScreen = () => {

  const { state, editCompany } = useContext(CompanyContext)
  console.log(state)
  
  return (
    <>
      <DrawerHeader title="Company" />

      <View style={styles.companyContainer}>
        <View style={styles.companyHeader}>
          <Text style={styles.companyTextHeader}>{state[0].companyName}</Text>
        </View>
        <View style={styles.companyRow}>
          <Text style={[styles.companyTextBold, styles.flexOne]}>Phone:</Text>
          <Text style={styles.companyTextRight}>{state[0].phone}</Text>
        </View>
        <View style={styles.companyRow}>
          <Text style={[styles.companyTextBold, styles.flexOne]}>Email:</Text>
          <Text style={styles.companyTextRight}>{state[0].email}</Text>
        </View>
        <View style={styles.companyRow}>
          <Text style={[styles.companyTextBold]}>Address:</Text>
          <View style={styles.flexOne}>
            <Text style={styles.companyTextRight}>{state[0].address}, {state[0].unitNumber}</Text>
            <Text style={styles.companyTextRight}>{state[0].city}, {state[0].usState} {state[0].zip}</Text>
          </View>  
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  companyContainer: {
    borderRadius: 5,
    margin: 10,
    paddingBottom: 8,
    flex: 1,
    marginBottom: 85
  },
  companyHeader: {
    flexDirection: 'row',
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#666666',
    paddingBottom: 3,
    paddingTop: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  companyRow: {
    flexDirection: 'row',
    padding: 10,
    marginTop: 5,
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderRadius: 5,
    borderWidth: 1,
  },
  companyText: {
    color: 'black',
    fontSize: 16,
  },
  companyTextHeader: {
    fontWeight: 'bold', 
    fontSize: 24,
    flex: 1
  },
  companyTextBold: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  companyTextRight: {
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
export default CompanyScreen