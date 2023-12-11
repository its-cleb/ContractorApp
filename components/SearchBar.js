import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

const SearchBar = ({ placeholderText, searchTerm, onTermChange, onTermSubmit }) => {

  return (
    <View style={styles.searchBar}>
      <FontAwesome5 style={styles.buttonIcon} name='search' size={24} color='black' />
      <TextInput
        autoCorrect={false}
        autoCapitalize='none'
        underlineColorAndroid='transparent'
        style={styles.formFieldInput}
        placeholder={placeholderText}
        value={searchTerm}
        onChangeText={onTermChange}
        onEndEditing={onTermSubmit}
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
    paddingHorizontal: 8,
    margin: 10,
    marginTop: 15
  },
  buttonIcon: {
    marginRight: 10,
    paddingVertical: Platform.OS === 'ios' ? 10 : 6,
  },
  formFieldInput: {
    fontSize: 20,
    paddingVertical: Platform.OS === 'ios' ? 10 : 6,
    flex: 1,
    // alignItems: 'stretch',
    // backgroundColor: 'red'
  }
})

export default SearchBar