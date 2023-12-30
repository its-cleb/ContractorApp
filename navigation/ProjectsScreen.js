import React, { useState, useContext } from 'react'
import { Keyboard, SafeAreaView, StyleSheet, Text, TouchableOpacity, Switch, FlatList, View } from 'react-native'
import { Context } from '../context/ProjectContext'
import { Context as EmployeeContext } from '../context/EmployeeContext'
import { Context as ClientContext } from '../context/ClientContext'
import DrawerHeader from '../components/DrawerHeader'
import SearchBar from '../components/SearchBar'

const ProjectsScreen = ({ navigation }) => {

  const { state } = useContext(Context)
  const projects = state

  const employees = useContext(EmployeeContext)
  const clients = useContext(ClientContext)
  
  const [searchTerm, setSearchTerm] = useState('')

  const [ isComplete, setIsComplete ] = useState('')

  // Employee Flatlist content function
  const getEmployees = (item) => {
    let currentEmployee = employees.state.filter((employeeState) => employeeState.employeeID === item )
    return (
      <Text style={styles.projectTextRight}>
        {currentEmployee[0].employeeName}
        </Text>
    )
  }

  const getClient = (item) => {
    let currentClient = clients.state.filter((clientState) => clientState.clientID === item.clientID )
    return <Text style={styles.projectTextLeft}>{currentClient[0].clientName}</Text>
  }

  return (
    <>
      <DrawerHeader title="Projects" />
      <SafeAreaView style={styles.pageContainer}>
        
      <View style={styles.searchPanel}>
        <SearchBar 
          placeholderText="Search Projects" 
          searchTerm={searchTerm} 
          onTermChange={newSearchTerm => setSearchTerm(newSearchTerm)} 
          onTermSubmit={() => Keyboard.dismiss()} 
        />
        <Switch 
          onValueChange={(value) => setIsComplete(value)}
          value={isComplete}
        />
      </View>

        <View style={styles.flatlistbox}>
          <FlatList 
            data={projects} 
            keyExtractor={(item) => item.projectID}
            renderItem={({ item }) => (
              <TouchableOpacity 
                onPress={() => navigation.navigate('ProjectStack', { screen: 'ProjectDetails', params: {isAdd: false, projectID: item.projectID, fromHome}})
              }
              >
                <View style={[styles.projectContainer]}>
                  <View style={styles.projectRowTop}>
                    <View style={[styles.projectColumnLeft, { flex: 2 }]}>
                      <Text style={[styles.projectTextLeft, { fontWeight: 'bold' }]}>{item.title}</Text>
                      <FlatList
                        data={projects}
                        renderItem={({ item }) => getClient(item)}
                      /> 
                    </View>
                    <View style={[styles.projectColumnRight, { flex: 1 }]}>
                      <Text style={[styles.projectTextRight, { fontWeight: 'bold' }]}>{item.date}</Text>
                      <Text style={[styles.projectTextRight]}>{item.status}</Text>
                    </View>
                  </View>

                  <View style={styles.projectRowBottom}>
                    <View style={[styles.projectColumnLeft, { flex: 1 }]}>
                      <Text style={[styles.projectTextLeft, { fontWeight: 'bold' }]}>Tasks:</Text>
                      <FlatList
                        data={item.tasks}
                        renderItem={({ item }) =>
                        <Text style={styles.projectTextLeft}>{item}</Text> 
                      }
                      />
                    </View>
                    <View style={[styles.projectColumnRight, { flex: 1 }]}>
                      <Text style={[styles.projectTextRight, { fontWeight: 'bold' }]}>Workers:</Text>
                      <FlatList
                        data={item.employees}
                        renderItem={({ item }) => getEmployees(item)}
                      />
                    </View>
                  </View>

                </View>
              </TouchableOpacity>
            )}
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
  searchPanel: {
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1,

  },
  flatlistbox: {
    marginTop: 10,
    marginHorizontal: 5
  },
  projectContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'darkkhaki',
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: 'khaki',
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
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: 'darkkhaki',
  },
  projectRowBottom: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    paddingTop: 5, 

  },
  projectTextLeft: {
    color: 'black',
    textAlign: 'left',
    fontSize: 16,
  },
  projectTextRight: {
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

export default ProjectsScreen