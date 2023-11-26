import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { globalStyles } from '../styles/globalstyles'

const ActiveProjects = () => {

  // Active Projects array & Project Number variable
  const [activeProjects, setActiveProjects] = useState([])
  const [projectNumber, setProjectNumber] = useState(1)
  
  return (
    <>
    <View style={globalStyles.containerHCentered}>
      <Text style={globalStyles.textTitle}>Active Projects</Text>
    </View>

    {/* item.color destructured in render item as background color */}
    <View style={styles.flatlist}>
      <FlatList 
      data={activeProjects} 
      renderItem={({ item }) => {
          return <View style={[styles.projectContainer, {backgroundColor: item.color }]}><Text style={styles.projectText}>{item.name}</Text></View>
        }}
      />
    </View>

    {/* Incrememnt Project Number, insert new Project Number and RBG background color into Projects Array */}
    <TouchableOpacity 
      style={[globalStyles.touchableOpacityButton, { backgroundColor: "steelblue", margin: 10 }]}
      onPress={() => {
        setProjectNumber(projectNumber + 1)
        setActiveProjects([...activeProjects, { name: newProjectNumber(projectNumber), color: randomRGB() }])
      }}
    > 
        <Text style={globalStyles.textButton}>Add Project</Text>
    </TouchableOpacity>
    </>
  )
}

// Generate 3 random RGB values and interpolate as text, colors skewed towards red hue
const randomRGB = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 64);
  const blue = Math.floor(Math.random() * 64);

  return `rgb(${red}, ${green}, ${blue})`;
}

// Takes Project Number variable and interpolates as text 
const newProjectNumber = (incrementProjectNumber) => {
  return `Project ${incrementProjectNumber}`
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
    maxHeight: 300
  }
})

export default ActiveProjects