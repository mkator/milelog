import React, {useCallback, useState} from 'react'
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useFocusEffect} from '@react-navigation/native'
import moment from 'moment'
import {fonts, fontSize, screenSize, colors} from '../../styles'
import {STORAGE_KEY} from '../../utils/constants'
import {formatData} from '../../utils/helpers'

const {fullHeight, fullWidth} = screenSize

// const formatData = data => {
//   if (!data) {
//     return []
//   }

//   // Group data by date
//   const groupedData = data.reduce((acc, item) => {
//     const date = item.date
//     if (!acc[date]) {
//       acc[date] = []
//     }
//     acc[date].push(item)

//     return acc
//   }, {})

//   // Transform grouped data into an array of objects with a data property
//   const sectionData = Object.entries(groupedData).map(([key, value]) => ({
//     title: key,
//     data: value,
//   }))

//   return sectionData.reverse()
// }

const History = () => {
  const [data, setData] = useState([])
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
      if (jsonValue !== null) {
        // value previously stored
        const value = JSON.parse(jsonValue)
        return value
      }
    } catch (e) {
      // error reading value
    }
  }

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      // handle error
    }
    setData([])
  }

  useFocusEffect(
    useCallback(() => {
      const callGetData = async () => {
        const temp = await getData()

        setData(formatData(temp))
      }
      callGetData()
    }, []),
  )

  if (!data.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No History Available</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <SectionList
        sections={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemLeft}>
              <Text style={styles.title}>Start:</Text>
              <Text style={styles.title}>Stop:</Text>
              <Text style={styles.title}>Total:</Text>
              <Text style={styles.title}>Distance:</Text>
            </View>
            <View style={styles.itemRight}>
              <Text style={styles.title}>
                {moment(item.start).format('hh:mm:ss a')}
              </Text>
              <Text style={styles.title}>
                {moment(item.stop).format('hh:mm:ss a')}
              </Text>
              <Text style={styles.title}>
                {moment.utc(item.stop - item.start).format('HH:mm:ss')}
              </Text>
              <Text style={styles.title}>{item.mile.toFixed(5)} miles</Text>
            </View>
          </View>
        )}
        renderSectionHeader={({section: {title}}) => (
          <View style={styles.headerContainer}>
            <Text style={styles.header}>{title}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.floatingBtn} onPress={removeData}>
        <Text style={styles.btnText}>Clear</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingTop: fullHeight * 0.01,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: fullWidth * 0.02,
    marginVertical: fullHeight * 0.01,
    width: fullWidth * 0.9,
    borderRadius: 5,
  },
  itemLeft: {
    alignItems: 'flex-start',
  },
  itemRight: {
    alignItems: 'flex-end',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: fontSize.l,
    fontFamily: fonts.medium,
  },
  title: {
    fontSize: fontSize.s,
    fontFamily: fonts.mediumItalic,
  },
  floatingBtn: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.warning,
    bottom: fullHeight * 0.05,
    right: fullWidth * 0.05,
  },
  btnText: {
    color: colors.background,
    fontSize: fontSize.s,
    fontFamily: fonts.mediumItalic,
  },
})

export default History
