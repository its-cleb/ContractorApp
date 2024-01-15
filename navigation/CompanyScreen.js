import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Context as CompanyContext } from '../context/CompanyContext'
import DrawerHeader from '../components/DrawerHeader'
import { IconButtonH } from '../components/Button'

const CompanyScreen = ({ navigation }) => {

  const { state } = useContext(CompanyContext)

  return (
    <>
      <DrawerHeader title="Company" />

      <View style={styles.companyContainer}>
        <View style={styles.companyHeader}>
          <Text style={styles.companyTextHeader}>{state.companyName}</Text>
        </View>
        <View style={styles.companyRow}>
          <Text style={[styles.companyTextBold, styles.flexOne]}>Phone:</Text>
          <Text style={styles.companyTextRight}>{state.phone}</Text>
        </View>
        <View style={styles.companyRow}>
          <Text style={[styles.companyTextBold, styles.flexOne]}>Email:</Text>
          <Text style={styles.companyTextRight}>{state.email}</Text>
        </View>
        <View style={styles.companyRow}>
          <Text style={[styles.companyTextBold]}>Address:</Text>
          <View style={styles.flexOne}>
            <Text style={styles.companyTextRight}>{state.address}, {state.unitNumber}</Text>
            <Text style={styles.companyTextRight}>{state.city}, {state.usState} {state.zip}</Text>
          </View>  
        </View>
      </View>

      <View style={styles.addButton}>
        <IconButtonH 
          pressFunction={() => navigation.navigate('CompanyForm', { isAdd: true, payload: ''})} 
          title="Edit Company" 
          icon="plus" 
          bgcolor="#00000000" 
          textcolor="steelblue"
          isBig
        />
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
  addButton: {
    paddingBottom: 20,
  }
})
export default CompanyScreen