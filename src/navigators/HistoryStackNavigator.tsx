import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import LocationInfo from '../components/LocationInfo'
import History from '../screens/History'

const Stack = createNativeStackNavigator()

const HistoryStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HistoryList"
        component={History}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LocationHistory"
        component={LocationInfo}
        options={{headerTitle: '', headerTransparent: true}}
      />
    </Stack.Navigator>
  )
}

export default HistoryStackNavigator
