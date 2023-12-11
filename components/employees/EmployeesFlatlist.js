import React, { useContext } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Context } from '../../context/EmployeesContext'
import { useNavigation } from '@react-navigation/native';

const EmployeeFlatlist = () => {
 
  const { state } = useContext(Context)
  const navigation = useNavigation()

  return (
    <View style={styles.flatlistbox}>
      <FlatList 
        data={state} 
        keyExtractor={(item) => item.employeeID}
        renderItem={({ item }) => 
          <TouchableOpacity onPress={() => navigation.navigate('EmployeeDetails', {payload: item.employeeID})}>
            <View style={styles.projectContainer}>
              <View style={styles.projectRowTop}>
                <View style={[styles.projectColumnLeft, { flex: 1 }]}>
                  <Text style={[styles.projectTextLeft, { fontWeight: 'bold' }]}>{item.name}</Text>
                </View>
                <View style={[styles.projectColumnRight, { flex: 1 }]}>
                  <Text style={styles.projectTextRight}>${item.wage}/hr</Text>
                </View>
              </View>
              <View style={styles.projectRowBottom}>
                <View style={[styles.projectColumnLeft, { flex: 2 }]}>
                  <Text style={styles.projectTextLeft}>{item.phone}</Text>
                </View>
                <View style={[styles.projectColumnRight, { flex: 1 }]}>
                  <Text style={styles.projectTextRight}>{item.city}, {item.usState}</Text>
                </View>

              </View>
            </View>
          </TouchableOpacity>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  flatlistbox: {
    flex: 1,
    marginBottom: Platform.OS === 'ios' ? 60 : 90,
    marginTop: 10
  },
  projectContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'steelblue',
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: 'powderblue',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
    flex: 1
  },
  projectRowTop: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#4682b477',
    paddingBottom: 3
  },
  projectRowBottom: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    paddingTop: 5
  },
  projectTextLeft: {
    color: 'black',
    textAlign: 'left',
    fontSize: 16,
  },
  projectTextRight: {
    color: 'black',
    textAlign: 'right',
    fontSize: 16,
    flexWrap: 'wrap'
  },
  flexBox: {
    flexDirection: 'row',
    padding: 5,
  },
  flexItem: {
    flex: 1
  }
})

export default EmployeeFlatlist