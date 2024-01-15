import { StyleSheet } from 'react-native'

export const globalStyles = StyleSheet.create({
  mainNavigationContainer: {
    padding: 10
  },
  container: {
    flex: 1
  },
  containerHCentered: {
    alignItems: 'center',
    padding: 10,
  },
  containerVHCentered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  textTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333'
  },
  textButton: {
    fontSize: 16,
    color: 'white'
  },
  textInput: {
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#999999',
    backgroundColor: '#eeeeee',
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  touchableOpacityButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "steelblue",
    borderRadius: 5,
    margin: 5,
    padding: 10
  },
  buttonIcon: {
    margin: 10,
  },

  TextButton: {
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: "steelblue",
    borderRadius: 5,
    marginVertical: 5,
    padding: 10
  },
  pressableBox: {
    flex: 1,
  },

  // Form Styling
  // formRow: {
  //   flexDirection: 'row',
  //   gap: 10,
  //   paddingBottom: 8
  // },
  // formColumn: {
  // },
  // formFieldCaption: {
  //   alignContent: 'flex-start',
  //   marginBottom: 1,
  //   fontWeight: 'bold'
  // },
  // formFieldInput: {
  //   borderRadius: 3,
  //   borderStyle: 'solid',
  //   borderWidth: 1,
  //   borderColor: '#999999',
  //   backgroundColor: '#eeeeee',
  //   paddingVertical: Platform.OS === 'ios' ? 10 : 6,
  //   paddingHorizontal: 12,
  //   color: 'black'
  // },
  // formFieldInputMultiline: {
  //   borderRadius: 3,
  //   borderStyle: 'solid',
  //   borderWidth: 1,
  //   borderColor: '#999999',
  //   backgroundColor: '#eeeeee',
  //   paddingTop: Platform.OS === 'ios' ? 10 : 16,
  //   paddingHorizontal: 12,
  //   minHeight: 80,
  //   textAlignVertical: 'top'
  // },

})