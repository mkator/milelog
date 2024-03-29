import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Home from '../screens/Home'
import HistoryStackNavigator from './HistoryStackNavigator'
import {screenSize, colors, fontSize, fonts} from '../styles'
import {HistoryStackParamList} from './HistoryStackNavigator'

type TabParamList = {
  Home: undefined
  History: HistoryStackParamList
}

export type BottomTabProps = BottomTabScreenProps<TabParamList>

const Tab = createBottomTabNavigator<TabParamList>()

const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName = ''

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline'
            } else if (route.name === 'History') {
              iconName = focused ? 'list' : 'list-outline'
            }

            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: colors.navy,
          tabBarInactiveTintColor: colors.slate,
          tabBarStyle: {
            backgroundColor: colors.background,
            height: screenSize.fullHeight * 0.15,
          },
          tabBarLabelStyle: {
            fontSize: fontSize.s,
            fontFamily: fonts.medium,
          },
          headerShown: false,
        })}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="History" component={HistoryStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default BottomTabNavigator
