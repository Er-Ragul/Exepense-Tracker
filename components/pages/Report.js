import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { reportStyle } from '../styles/reportStyle';
import { useSelector, useDispatch } from 'react-redux';
import { callSearchWindow } from '../../redux/storageSlice';
import { apiUrl } from '../../secret/appwriteConfig';
import axios from 'axios';

export default function Report({ navigation }) {

  let uid = useSelector((state) => state.variable.uid)
  let dispatch = useDispatch()

  const [spentList, setSpentList] = useState([])
  const [total, setTotal] = useState(0)
  const [timeLine, setTimeLine] = useState('week')
  const [weekStyle, setWeekStyle] = useState({
    borderWidth: 1, 
    borderRadius: 10, 
    color:'black'
  })
  const [monthStyle, setMonthStyle] = useState({
    borderWidth: 0, 
    borderRadius: 0, 
    color:'#949494'
  })
  const [yearStyle, setYearStyle] = useState({
    borderWidth: 0, 
    borderRadius: 0, 
    color:'#949494'
  })
  const [searchStyle, setSearchStyle] = useState({
    borderWidth: 0, 
    borderRadius: 0, 
    color:'#949494'
  })
  const [graphHeight, setGrapHeight] = useState([])

  useEffect(() => {
      axios.post(`${apiUrl}/weekdata`, {
        database: uid,
        collection: uid+'-exp'
      })
      .then(function (response) {
        setGrapHeight(response.data.graph)
        setSpentList(response.data.list)
        setTotal(response.data.total)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      axios.post(`${apiUrl}/weekdata`, {
        database: uid,
        collection: uid+'-exp'
      })
      .then(function (response) {
        setGrapHeight(response.data.graph)
        setSpentList(response.data.list)
        setTotal(response.data.total)
      })
      .catch(function (error) {
        console.log(error);
      });
    })
    return unsubscribe
  }, [navigation])


  let updateWeekData = () => {
    axios.post(`${apiUrl}/weekdata`, {
      database: uid,
      collection: uid+'-exp'
    })
    .then(function (response) {
      setGrapHeight(response.data.graph)
      setSpentList(response.data.list)
      setTotal(response.data.total)

      setTimeLine('week')
    })
    .catch(function (error) {
      console.log(error);
    });

    setWeekStyle({
      borderWidth: 1, 
      borderRadius: 10, 
      color:'black'
    })
    setMonthStyle({
      borderWidth: 0, 
      borderRadius: 0, 
      color:'#949494'
    })
    setYearStyle({
      borderWidth: 0, 
      borderRadius: 0, 
      color:'#949494'
    })
    setSearchStyle({
      borderWidth: 0, 
      borderRadius: 0, 
      color:'#949494'
    })
  }

  let updateMonthData = () => {
    axios.post(`${apiUrl}/monthdata`, {
      database: uid,
      collection: uid+'-exp'
    })
    .then(function (response) {
      setGrapHeight(response.data.graph)
      setSpentList(response.data.monthList)
      setTotal(response.data.monthTotal)

      setTimeLine('month')
    })
    .catch(function (error) {
      console.log(error);
    });
  
    setWeekStyle({
      borderWidth: 0, 
      borderRadius: 0, 
      color:'#949494'
    })
    setMonthStyle({
      borderWidth: 1, 
      borderRadius: 10, 
      color:'black'
    })
    setYearStyle({
      borderWidth: 0, 
      borderRadius: 0, 
      color:'#949494'
    })
    setSearchStyle({
      borderWidth: 0, 
      borderRadius: 0, 
      color:'#949494'
    })
  }

  let updateYearData = () => {
    axios.post(`${apiUrl}/yeardata`, {
      database: uid,
      collection: uid+'-exp'
    })
    .then(function (response) {
      setGrapHeight(response.data.graph)
      setSpentList(response.data.yearList)
      setTotal(response.data.yearTotal)

      setTimeLine('year')
    })
    .catch(function (error) {
      console.log(error);
    });
  
    setWeekStyle({
      borderWidth: 0, 
      borderRadius: 0, 
      color:'#949494'
    })
    setMonthStyle({
      borderWidth: 0, 
      borderRadius: 0, 
      color:'#949494'
    })
    setYearStyle({
      borderWidth: 1, 
      borderRadius: 10, 
      color:'black'
    })
    setSearchStyle({
      borderWidth: 0, 
      borderRadius: 0, 
      color:'#949494'
    })
  }

  let updateSearchData = () => {
    dispatch(callSearchWindow(true))
    setWeekStyle({
      borderWidth: 0, 
      borderRadius: 0, 
      color:'#949494'
    })
    setMonthStyle({
      borderWidth: 0, 
      borderRadius: 0, 
      color:'#949494'
    })
    setYearStyle({
      borderWidth: 0, 
      borderRadius: 0, 
      color:'#949494'
    })
    setSearchStyle({
      borderWidth: 1, 
      borderRadius: 10, 
      color:'black'
    })
  }

  return(
    <View style={reportStyle.container}>
      <View style={reportStyle.totalAmount}>
        <Text style={{fontWeight: 'bold', fontSize: 60, color: 'rgba(78, 116, 289, 1)'}}>{total} ₹</Text>
        <Text style={{fontSize: 16, color: '#acabab'}}>Total spent this {timeLine}</Text>
      </View>
      <View style={reportStyle.barGrap}>
        <FlatList 
          data={graphHeight}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
              <View style={[reportStyle.barBox, {
                marginHorizontal: 16
                }]}>
                  <View style={[reportStyle.barFill, {height: item.height}]}></View>
                  {
                  item.date == undefined ? 
                  '0' : 
                  <Text style={{ position: 'absolute', color: 'white' }}>{item.date.split('-')[0]}</Text>
                  }
                  
              </View>
          )}
        />
        {/* Week Bar */}
      </View>
      <View style={reportStyle.filterBar}>
        <TouchableOpacity style={[reportStyle.filterButton, {
          borderWidth: weekStyle.borderWidth, 
          borderRadius: weekStyle.borderRadius, 
          backgroundColor: weekStyle.backgroundColor}]}
          onPress={updateWeekData}>
          <Text style={{color: weekStyle.color}}>Week</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[reportStyle.filterButton, {
          borderWidth: monthStyle.borderWidth, 
          borderRadius: monthStyle.borderRadius, 
          color: monthStyle.color}]}
          onPress={updateMonthData}>
          <Text style={{color: monthStyle.color}}>Month</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[reportStyle.filterButton, {
          borderWidth: yearStyle.borderWidth, 
          borderRadius: yearStyle.borderRadius, 
          color: yearStyle.color}]}
          onPress={updateYearData}>
          <Text style={{color: yearStyle.color}}>Year</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[reportStyle.filterButton, {
          borderWidth: searchStyle.borderWidth, 
          borderRadius: searchStyle.borderRadius, 
          color: searchStyle.color}]}
          onPress={updateSearchData}>
          <Text style={{color: searchStyle.color}}>Filter</Text>
        </TouchableOpacity>
      </View>
      <View style={reportStyle.listView}>
        <FlatList
          data={spentList}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={reportStyle.contentStyle}>
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Image style={{width: 40, height: 40}} source={{uri: item.icon}}/>
                <Text>{item.date}</Text>
              </View>
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>{item.spent}</Text>
                <Text>{item.time}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 20 }}>{item.amount} ₹</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  )
}