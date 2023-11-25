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
    padding: 20,
  },
  containerVHCentered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    flex: 1,
  },
  modalCloseButton: {
    alignContent: 'flex-end',
    alignSelf: 'flex-end',
    margin: 10
  },
  modalActionButton: {
    marginTop: 20
  },
  TextButton: {
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: "steelblue",
    borderRadius: 5,
    marginVertical: 5,
    padding: 10
  },

  // Form Styling
  formRow: {
    flexDirection: 'row',
    gap: 10,
    paddingBottom: 10
  },
  formColumn: {
  },
  formFieldCaption: {
    alignContent: 'flex-start',
    marginBottom: 2,
    fontWeight: 'bold'
  },
  formFieldInput: {
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#999999',
    backgroundColor: '#eeeeee',
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  formFieldInputMultiline: {
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#999999',
    backgroundColor: '#eeeeee',
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 100,
    textAlignVertical: 'top'
  },
  // Date Picker Styles
  datePickerBoxIOS: {
    paddingBottom: 40
  },
  datePicker: {
    height: 120,
    marginTop: -10
  },
})