import React, { useContext } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { globalStyles } from '../styles/globalstyles'
import { Context } from '../context/ProjectContext'
import DeleteButton from '../components/DeleteButton'

const ProjectDetails = ({ route, navigation }) => {
  
  const { state, deleteProject } = useContext(Context)

  const { id } = route.params
  
  const projects = state.find(projects => projects.id === id)

  const clickFunction = () => {
    deleteProject(projects.id)
    navigation.pop()
  }
  
  return (
    <>
        <View style={styles.projectContainer}>
          <View style={styles.projectHeader}>
            <Text style={styles.projectTextHeader}>{projects.clientName}</Text>
            <DeleteButton pressFunction={clickFunction}/>
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
              <Text style={styles.projectTextRight}>{projects.address}, {projects.unit}</Text>
              <Text style={styles.projectTextRight}>{projects.city}, {projects.state} {projects.zip}</Text>
            </View>  
          </View>
          <View style={styles.projectRow}>
            <View style={styles.projectBox}>
              <Text style={[styles.projectTextBold, {marginBottom: 10}]}>Project Description:</Text>
              <Text style={[styles.projectText]}>{projects.description}</Text>
            </View>
          </View>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
  projectContainer: {
    borderRadius: 5,
    margin: 10,
    padding: 10,
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
  }

})

export default ProjectDetails