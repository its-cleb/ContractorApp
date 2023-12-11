import React, { useContext } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Context } from '../../context/ProjectContext'
import { useNavigation } from '@react-navigation/native';

const ProjectFlatlist = ( filterSearchTerm ) => {
  const { state } = useContext(Context)
  const navigation = useNavigation()

  // Get Search Bar Value and convert it to string
  const searchText = Object.values(filterSearchTerm).toString()

  const filteredProjects = (item) => {
    // Check all fields for matching
    if ( item.clientName.toLowerCase().includes(searchText.toLowerCase()) || 
         item.city.toLowerCase().includes(searchText.toLowerCase()) ||
         item.usState.toLowerCase().includes(searchText.toLowerCase()) ||
         item.description.toLowerCase().includes(searchText.toLowerCase()) ||
         searchText === ""
    ) { 
      return (
        <TouchableOpacity onPress={() => navigation.navigate('ProjectDetails', {payload: item.projectID})}>
          <View style={styles.projectContainer}>
            <View style={styles.projectRowTop}>
              <View style={[styles.projectColumnLeft, { flex: 1 }]}>
                <Text style={[styles.projectTextLeft, { fontWeight: 'bold' }]}>{item.clientName}</Text>
              </View>
              <View style={[styles.projectColumnRight, { flex: 1 }]}>
                <Text style={styles.projectTextRight}>{item.contactDate}</Text>
              </View>
            </View>
            <View style={styles.projectRowBottom}>
              <View style={[styles.projectColumnLeft, { flex: 1 }]}>
                <Text style={styles.projectTextLeft}>{item.city}, {item.usState}</Text>
              </View>
              <View style={[styles.projectColumnRight, { flex: 2 }]}>
                <Text style={styles.projectTextRight}>{item.description}</Text>
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
        keyExtractor={(item) => item.projectID}
        renderItem={({ item }) => filteredProjects(item) }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  flatlistbox: {
    flex: 1,
    marginBottom: 80
  },
  projectContainer: {
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: 'maroon',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
    flex: 1
  },
  projectRowTop: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee99',
    paddingBottom: 3
  },
  projectRowBottom: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    paddingTop: 5
  },
  projectTextLeft: {
    color: 'white',
    textAlign: 'left',
    fontSize: 16,
  },
  projectTextRight: {
    color: 'white',
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

export default ProjectFlatlist