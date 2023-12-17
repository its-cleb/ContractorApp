import React, { useContext } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Context } from '../../context/ProposalContext'
import { useNavigation } from '@react-navigation/native';

const ProposalsFlatlist = props => {
 
  const { state } = useContext(Context)
  const navigation = useNavigation()

  const proposals = state.filter((clients) => clients.clientID === props.filter )
  console.log(proposals)

  return (
    <View style={styles.flatlistbox}>
      <FlatList 
        data={proposals} 
        keyExtractor={(item) => item.projectID}
        renderItem={({ item }) => 
          <TouchableOpacity onPress={() => navigation.navigate('ProposalScreen', {payload: item.projectID})}>
            <View style={styles.projectContainer}>
              <View style={styles.projectRowTop}>
                <View style={[styles.projectColumnLeft, { flex: 2 }]}>
                  <Text style={[styles.projectTextLeft, { fontWeight: 'bold' }]}>{item.description}</Text>
                </View>
                <View style={[styles.projectColumnRight, { flex: 1 }]}>
                  <Text style={[styles.projectTextRight, { fontWeight: 'bold' }]}>${Intl.NumberFormat('en-US').format(item.totalCost)}</Text>
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
    marginTop: 10
  },
  projectContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'steelblue',
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: 'lightblue',
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

export default ProposalsFlatlist