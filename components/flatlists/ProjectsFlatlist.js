import React, { useContext } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Context } from '../../context/ProjectContext'
import { Context as EmployeeContext } from '../../context/EmployeeContext'
import { useNavigation } from '@react-navigation/native'

const ProjectsFlatlist = props => {
  
  const navigation = useNavigation()

  const fromHome = props.fromHome

  const { state } = useContext(Context)
  const projects = props.isFiltered ? state.filter((project) => project.clientID === props.filter ) : state

  const employees = useContext(EmployeeContext)

  // Employee Flatlist content function
  const getEmployees = (item) => {
    let currentEmployee = employees.state.filter((employeeState) => employeeState.employeeID === item )
    return (
      <Text style={styles.projectTextRight}>
        {currentEmployee[0].employeeName}
        </Text>
    )
  }

  return (
    <View style={styles.flatlistbox}>
      <FlatList 
        data={projects} 
        keyExtractor={(item) => item.projectID}
        renderItem={({ item }) => (
          <TouchableOpacity 
            // disabled={fromHome ? true : false} 
            onPress={() => navigation.navigate('ProjectStack', { screen: 'ProjectDetails', params: {isAdd: false, projectID: item.projectID, fromHome}})
          }
          >
            <View style={[styles.projectContainer, {backgroundColor: fromHome ? '#eeeedd' : 'khaki'}]}>
              <View style={styles.projectRowTop}>
                <View style={[styles.projectColumnLeft, { flex: 2 }]}>
                  <Text style={[styles.projectTextLeft, { fontWeight: 'bold' }]}>{item.title}</Text>
                </View>
                <View style={[styles.projectColumnRight, { flex: 1 }]}>
                  <Text style={[styles.projectTextRight, { fontWeight: 'bold' }]}>{item.date}</Text>
                </View>
              </View>
            
              <View style={styles.projectRowBottom}>
                <View style={[styles.projectColumnLeft, { flex: 1 }]}>
                  <FlatList
                    data={item.tasks}
                    renderItem={({ item }) =>
                    <Text style={styles.projectTextLeft}>{item}</Text> 
                  }
                  />
                </View>
                <View style={[styles.projectColumnRight, { flex: 2 }]}>
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
  )
}

const styles = StyleSheet.create({
  flatlistbox: {
    marginTop: 10,
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
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderColor: 'darkkhaki',
  },
  projectRowBottom: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    paddingTop: 5
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

export default ProjectsFlatlist