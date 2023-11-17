import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { globalStyles } from '../styles/globalstyles'

const ActiveProjects = () => {
  
  let initialProjects = [
    { name: 'Project 1' }
  ]

  const [activeProjects, setActiveProjects] = useState(initialProjects)

  return (
    <>
    <View style={globalStyles.containerHCentered}>
      <Text style={globalStyles.textTitle}>Active Projects</Text>
    </View>

    <View style={styles.flatlist}>
      <FlatList 
      data={activeProjects} 
      renderItem={({ item }) => {
          return <View style={[styles.projectContainer, {backgroundColor: randomRGB() }]}><Text style={styles.projectText}>{item.name}</Text></View>
        }}
      />
    </View>

    <TouchableOpacity 
      style={[globalStyles.touchableOpacityButton, { backgroundColor: "steelblue", margin: 10 }]}
      onPress={() => {
        setActiveProjects([...activeProjects, {name: 'Project #'}])
        console.log(activeProjects)
      }}
    > 
        <Text style={globalStyles.textButton}>Add Project</Text>
    </TouchableOpacity>
    </>
  )
}

const randomRGB = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 64);
  const blue = Math.floor(Math.random() * 64);

  return `rgb(${red}, ${green}, ${blue})`;
}

const styles = StyleSheet.create({
  projectContainer: {
    //flex: 1,
    // backgroundColor: 'maroon',
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
    maxHeight: 300
  }
})

export default ActiveProjects