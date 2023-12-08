import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

const SearchBar = props => {
  return (
    <View style={styles.searchBar}>
      <FontAwesome5 style={styles.buttonIcon} name='search' size={24} color='black' />
      <TextInput
        autoCorrect={false} 
        style={styles.formFieldInput}
        placeholder={props.placeholderText}
        // value={usState}
        // onChangeText={text => setUsState(text)}
      ></TextInput>
    </View>
  )
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#999999',
    backgroundColor: '#eeeeee',
    paddingVertical: Platform.OS === 'ios' ? 10 : 6,
    paddingHorizontal: 8,
    margin: 10,
    marginTop: 20
  },
  buttonIcon: {
    marginRight: 10
  },
  formFieldInput: {
    fontSize: 20
  }
})

export default SearchBar