import React from 'react'
import { useState, useContext } from 'react'
import { View, Text, TextInput, Pressable, Platform, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { globalStyles } from '../../styles/globalstyles'
import IconButtonHSmall from '../IconButtonHSmall'
import { Context } from '../../context/CompanyContext'

const CompanyForm = (props) => {
  
  const navigation = props.navigation
  const { state, editCompany } = useContext(Context)
  
  const company = state[0]

  const [ form, setForm ] = useState(company)
  const setFormState = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Control Button functionality
  const saveCompanyBackPage = () => {
    editCompany(form.companyName, form.phone, form.email, form.address, form.unitNumber, form.city, form.usState, form.zip)
    navigation.pop()
  }

  const keyboardDismiss = () => {
    Keyboard.dismiss()
  }

  return (
    <>    
    {/* --- Company Details --- */}
      <Pressable onPress={keyboardDismiss} style={globalStyles.pressableBox}>

        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : -500} style={styles.contentBox}>

          <View style={globalStyles.formRow}>
            <View style={[globalStyles.formColumn, { flex: 3 }]}>
              <Text style={globalStyles.formFieldCaption}>Company Name</Text>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput}
                value={form.companyName}
                onChangeText={(text) => setFormState('companyName', text)}></TextInput>
            </View>
            
          </View>

          <View style={globalStyles.formRow}>
            <View style={[globalStyles.formColumn, { flex: 2 }]}>
              <Text style={globalStyles.formFieldCaption}>Phone</Text>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput} 
                keyboardType="numeric"
                value={form.phone}
                onChangeText={(text) => setFormState('phone', text)}></TextInput>
            </View>

            <View style={[globalStyles.formColumn, { flex: 3 }]}>
              <Text style={globalStyles.formFieldCaption}>Email</Text>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput}
                value={form.email}
                onChangeText={(text) => setFormState('email', text)}></TextInput>
            </View>
          </View>

          <View style={globalStyles.formRow}>
            <View style={[globalStyles.formColumn, { flex: 2 }]}>
              <Text style={globalStyles.formFieldCaption}>Address</Text>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput}
                value={form.address}
                onChangeText={(text) => setFormState('address', text)}></TextInput>
            </View>

            <View style={[globalStyles.formColumn, { flex: 1 }]}>
              <Text style={globalStyles.formFieldCaption}>Unit</Text>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput}
                value={form.unitNumber}
                onChangeText={(text) => setFormState('unitNumber', text)}></TextInput>
            </View>
          </View>

          <View style={globalStyles.formRow}>
            <View style={[globalStyles.formColumn, { flex: 1 }]}>
              <Text style={globalStyles.formFieldCaption}>City</Text>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput}
                value={form.city}
                onChangeText={(text) => setFormState('city', text)}></TextInput>
            </View>

            <View style={[globalStyles.formColumn, { flex: 1 }]}>
              <Text style={globalStyles.formFieldCaption}>State</Text>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput}
                value={form.usState}
                onChangeText={(text) => setFormState('usState', text)}></TextInput>
            </View>

            <View style={[globalStyles.formColumn, { flex: 1 }]}>
              <Text style={globalStyles.formFieldCaption}>ZIP</Text>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput} 
                keyboardType="numeric"
                value={form.zip}
                onChangeText={(text) => setFormState('zip', text)}></TextInput>
            </View>
          </View>

          <View style={{ alignSelf: 'stretch', marginHorizontal: -10}}>
            <IconButtonHSmall pressFunction={saveCompanyBackPage} title='Save Changes' icon='save' textcolor='white' bgcolor='steelblue' />
            <IconButtonHSmall pressFunction={() => navigation.pop()} title='Discard Changes' icon='undo' textcolor='white' bgcolor='maroon' />
          </View>    
       
        </KeyboardAvoidingView>

      </Pressable>
    </>
  ) 
}

const styles = StyleSheet.create({
    contentBox: {
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 20,
      flex: 1,
    },

})
export default CompanyForm