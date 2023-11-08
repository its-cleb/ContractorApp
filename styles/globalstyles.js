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
  }

})