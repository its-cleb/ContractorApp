import React, { useContext } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Context } from '../../context/ClientContext'
import { useNavigation } from '@react-navigation/native';

const ClientFlatlist = ( filterSearchTerm ) => {
  
  const { state } = useContext(Context)
  const navigation = useNavigation()

  // Get Search Bar Value and convert it to string
  const searchText = Object.values(filterSearchTerm).toString()

  const filteredClients = (item) => {
    // Check all fields for matching
    if ( item.clientName.toLowerCase().includes(searchText.toLowerCase()) || 
         item.city.toLowerCase().includes(searchText.toLowerCase()) ||
         item.usState.toLowerCase().includes(searchText.toLowerCase()) ||
         item.contactDate.toLowerCase().includes(searchText.toLowerCase()) ||
         searchText === ""
    ) { 
      return (
        <TouchableOpacity onPress={() => navigation.navigate('ClientDetails', {payload: item.clientID})}>
          <View style={styles.clientContainer}>
            <View style={styles.clientRowTop}>
              <View style={[styles.clientColumnLeft, { flex: 1 }]}>
                <Text style={[styles.clientTextLeft, { fontWeight: 'bold' }]}>{item.clientName}</Text>
              </View>
              <View style={[styles.clientColumnRight, { flex: 1 }]}>
                <Text style={styles.clientTextRight}>{item.contactDate}</Text>
              </View>
            </View>
            <View style={styles.clientRowBottom}>
              <View style={[styles.clientColumnLeft, { flex: 3 }]}>
                <Text style={styles.clientTextLeft}>{item.address}, {item.unit}</Text>
              </View>
              <View style={[styles.clientColumnRight, { flex: 2 }]}>
                <Text style={styles.clientTextRight}>{item.city}, {item.usState}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        )
    } else {
      return
    }
  }

  return (
    <View style={styles.flatlistbox}>
      <FlatList 
        data={state} 
        keyExtractor={(item) => item.clientID}
        renderItem={({ item }) => filteredClients(item) }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  flatlistbox: {
    flex: 1,
    marginBottom: Platform.OS === 'ios' ? 60 : 90
  },
  clientContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'steelblue',
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: 'powderblue',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
    flex: 1
  },
  clientRowTop: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#4682b466',
    paddingBottom: 3
  },
  clientRowBottom: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    paddingTop: 5
  },
  clientTextLeft: {
    color: 'black',
    textAlign: 'left',
    fontSize: 16,
  },
  clientTextRight: {
    color: 'black',
    textAlign: 'right',
    fontSize: 16,
    flexWrap: 'wrap'
  },
  flexBox: {
    flexDirection: 'row',
    padding: 5,
  },
  flexItem: {
    flex: 1
  }
})

export default ClientFlatlist