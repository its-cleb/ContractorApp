import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { IconButtonV } from '../components/Button'
import DrawerHeader from '../components/DrawerHeader'
import ProjectsFlatlist from '../components/flatlists/ProjectsFlatlist'
import { globalStyles } from '../styles/globalstyles'

const HomeScreen = ({navigation}) => {

  return (
    <>
      <DrawerHeader title="Home" />
      
      <View style={globalStyles.containerHCentered}>
        <Text style={globalStyles.textTitle}>Upcoming Projects</Text>
      </View>
      <View style={styles.projectsContainer}> 
        <ProjectsFlatlist isFiltered={false} fromHome={true} />
      </View>

      <View style={styles.flexBox}>
        <View style={styles.flexItem}>
          <IconButtonV
            pressFunction={() => navigation.navigate('Estimator')} 
            title='Estimator'
            icon={'calculator'} 
            color='white' 
            bgcolor='firebrick'
            border={true}
            size={24}
            padV={10}
            textSize={18}
            addStyles={{minHeight: 90}}
          />
        </View>
        <View style={styles.flexItem}>
          <IconButtonV
            pressFunction={() => navigation.navigate('ClientsStack')} 
            title='Clients'
            icon={'tools'} 
            color='white' 
            bgcolor='steelblue'
            border={true}
            size={28}
            padV={10}
            textSize={18}
            addStyles={{minHeight: 90}}
          />
        </View>
        <View style={styles.flexItem}>          
          <IconButtonV
            pressFunction={() => navigation.navigate('Employees')} 
            title='Employees'
            icon={'users'} 
            color='white' 
            bgcolor='chocolate'
            border={true}
            size={28}
            padV={10}
            textSize={18}
            addStyles={{minHeight: 90}}
          />
        </View>
     </View>
    </>
  )
}

const styles = StyleSheet.create({
  projectsContainer: {
    paddingHorizontal: 10,
    marginTop: -15
  },
  flexBox: {
    flexDirection: 'row',
    padding: 10,
    gap: 10
  },
  flexItem: {
    flex: 1
  }
})

export default HomeScreen