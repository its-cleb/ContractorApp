import React, { useContext } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Context } from '../../context/ProjectContext'
import { Context as ClientContext } from '../../context/ClientContext'
import { useNavigation } from '@react-navigation/native'

const ProjectsFlatlist = props => {
 
  const { state } = useContext(Context)

  const test = useContext(Context)

  const client = useContext(ClientContext)
  
  const navigation = useNavigation()

  const projects = props.isFiltered ? state.filter((project) => project.clientID === props.filter ) : state

  return (
    <View style={styles.flatlistbox}>
      <FlatList 
        data={projects} 
        keyExtractor={(item) => item.projectID}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ProjectDetailsScreen', { isAdd: false, clientID: item.clientID })}>
            <View style={styles.projectContainer}>
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
                  <Text style={styles.projectTextLeft}>{item.date}</Text>
                </View>
                <View style={[styles.projectColumnRight, { flex: 2 }]}>
                  <FlatList
                    data={item.employees}
                    renderItem={({ item }) => (
                      <Text style={styles.projectTextRight}>{item}</Text>
                    )}
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