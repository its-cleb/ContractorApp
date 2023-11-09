import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { globalStyles } from '../styles/globalstyles'
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('names.db')


const ActiveProjectsDB = () => {
  
  const [isLoading, setIsLoading] = useState(true)
  const [names, setNames] = useState([])
  const [currentName, setCurrentName] = useState(undefined)

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS names (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)', [], () => { console.log("Table created successfully");
      }, (error) => {
          console.log("Create table error", error)
        })
    })

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM names', null, 
        (txObj, resultSet) => setNames(resultSet.rows._array),
        (txObj, error) => console.log(error)
      )
    })
  

  setIsLoading(false)
}, [])  

  if (isLoading) {
    return (
      <View>
        <Text>Loading names...</Text>
      </View>
    )
  }

  const addName= () => {
    db.transaction(tx => {
      tx.executeSql('INSERT INTO names (name) values (?)', [currentName],
      (txObj, resultSet) => {
        let existingNames = [...names]
        existingNames.push({ id: resultSet.insertId, name: currentName})
        setNames(existingNames),
        setCurrentName(undefined)
      },
      (txObj, error) => console.log(error)
      )
    })
  }

  const deleteName= () => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM names WHERE id = ? ', [id],
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          let existingNames = [...names].filter(name => name.id !== id)
          setNames(existingNames)
        }
      },
      (txObj, error) => console.log(error)
      )
    })
  }


  const showNames = () => {
    return names.map((name, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text>{name.name}Test2</Text>
        </View>
      )
    })
  }

  return (
    <View>
      <Text>Test</Text>
      <TextInput value={currentName} placeholder="name" onChangeText={setCurrentName}/>
      <TouchableOpacity 
        style={[globalStyles.touchableOpacityButton, { backgroundColor: "steelblue" }]}
        onPress={() => { addName }}
      > 
          <Text style={globalStyles.textButton}>Add Name</Text>
      </TouchableOpacity>
      {showNames()}
    </View>
  )

}

const styles = StyleSheet.create({
  projectContainer: {
    flex: 1,
    backgroundColor: 'maroon',
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    margin: 5
  }
})

export default ActiveProjectsDB