import React, { useState } from 'react'
import { Keyboard, SafeAreaView, StyleSheet, View } from 'react-native'
import { IconButtonH } from '../components/Button'
import ClientFlatlist from '../components/flatlists/ClientsFlatlist'
import DrawerHeader from '../components/DrawerHeader'
import SearchBar from '../components/SearchBar'

const ViewClientsScreen = ({ navigation }) => {

  const [searchTerm, setSearchTerm] = useState('')
  
  return (
    <>
      <DrawerHeader title="Clients" />
      <SafeAreaView style={styles.pageContainer}>
        
        <SearchBar 
          placeholderText="Search Clients" 
          searchTerm={searchTerm} 
          onTermChange={newSearchTerm => setSearchTerm(newSearchTerm)} 
          onTermSubmit={() => Keyboard.dismiss()} 
        />

        <ClientFlatlist filterSearchTerm={searchTerm} />

        <View style={styles.addButton}>
          <IconButtonH 
            pressFunction={() => navigation.navigate('ClientForm', { isAdd: true, payload: ''})} 
            title="Add New Client" 
            icon="plus" 
            bgcolor="#00000000" 
            textcolor="steelblue"
            isBig
          />
        </View>

      </SafeAreaView>
    </>
  ) 
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1
  },
  addButton: {
    backgroundColor: '#fafafa',
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    paddingBottom: 20,
  }
}) 

export default ViewClientsScreen