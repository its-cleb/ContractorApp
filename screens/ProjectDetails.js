import React, { useContext } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { globalStyles } from '../styles/globalstyles'
import { Context } from '../context/ProjectContext'

const ProjectDetails = ({ route, navigation }) => {
  
  const { state, addProject } = useContext(Context)

  const { id } = route.params
  
  const projects = state.find(projects => projects.id === id)
  
  return (
    <>

      <View><Text>Project Details</Text></View>
        <View style={styles.projectContainer}>
          <View style={styles.projectRowTop}>
            <View style={[styles.projectColumnLeft, { flex: 1 }]}>
              <Text style={[styles.projectTextLeft, { fontWeight: 'bold' }]}>{projects.id}</Text>
            </View>
            <View style={[styles.projectColumnRight, { flex: 1 }]}>
              <Text style={styles.projectTextRight}>{projects.contactDate}</Text>
            </View>
          </View>
          <View style={styles.projectRowBottom}>
            <View style={[styles.projectColumnLeft, { flex: 1 }]}>
              <Text style={styles.projectTextLeft}>{projects.city}, {projects.state}</Text>
            </View>
            <View style={[styles.projectColumnRight, { flex: 2 }]}>
              <Text style={styles.projectTextRight}>{projects.description}</Text>
            </View>
          </View>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
  projectContainer: {
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: 'maroon',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  projectRowTop: {
    flexDirection: 'row',
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee99',
    paddingBottom: 3
  },
  projectRowBottom: {
    flexDirection: 'row',
    gap: 10,
    paddingTop: 5
  },
  projectColumnLeft: {
    // backgroundColor: 'red'
  },
  projectColumnRight: {
    // backgroundColor: 'blue'
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
  flatlist: {
    maxHeight: 300,
    marginBottom: 20
  },
  flexBox: {
    flexDirection: 'row',
    padding: 5,
  },
  flexItem: {
    flex: 1
  }
})

export default ProjectDetails