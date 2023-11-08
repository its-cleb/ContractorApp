import { StyleSheet } from 'react-native'

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerHCentered: {
    flex: 1,
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
  touchableOpacityButton: {
    // width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "steelblue",
    borderRadius: 5,
    margin: 5,
    padding: 10
  },
  buttonIcon: {
    margin: 10,
  }

})