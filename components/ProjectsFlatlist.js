import React, { useContext } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { globalStyles } from '../styles/globalstyles'
import ProjectContext from '../context/ProjectContext'

const ProjectFlatlist = () => {
  const projectList = useContext(ProjectContext)
  return (

    <View style={globalStyles.flatlist}>
      <FlatList 
        data={projectList} 
        keyExtractor={(projectList) => projectList.id}
        renderItem={({ item }) => {
            return (
              <View style={[styles.projectContainer, {backgroundColor: 'maroon' }]}>
                <Text style={styles.projectText}>{item.projectName}</Text>
              </View>
            )
          }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  projectContainer: {
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectText: {
    color: 'white',
    fontSize: 16,
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

export default ProjectFlatlist