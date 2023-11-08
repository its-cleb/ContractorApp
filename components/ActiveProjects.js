import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { globalStyles } from '../styles/globalstyles'

const ActiveProjects = () => {
  const [activeProjects, setActiveProjects] = useState([])
  return (
    <View>
      <Text style={globalStyles.textTitle}>Active Projects</Text>
      <FlatList>

      </FlatList>
    </View>
  )
}

const styles = StyleSheet.create({})

export default ActiveProjects