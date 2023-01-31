import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { documentStyle } from '../styles/documentStyle';
import { useSelector } from 'react-redux';
import { apiUrl } from '../../secret/appwriteConfig';
import axios from 'axios';

export default function Document({ navigation }) {

  let uid = useSelector((state) => state.variable.uid)

  const [spentList, setSpentList] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      axios.post(`${apiUrl}/getdata`, {
        database: uid,
        collection: uid+'-exp'
      })
      .then(function (response) {
        setTotal(response.data.todayTotal)
        setSpentList(response.data.todayList)
      })
      .catch(function (error) {
        console.log(error);
      });
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    axios.post(`${apiUrl}/getdata`, {
      database: uid,
      collection: uid+'-exp'
    })
    .then(function (response) {
      setTotal(response.data.todayTotal)
      setSpentList(response.data.todayList)
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [])

  return (
    <View style={documentStyle.container}>
      <View style={documentStyle.totalAmount}>
        <Text style={{fontSize: 16, color: 'rgba(78, 116, 289, 1)'}}>Today Spent</Text>
        <Text style={{fontWeight: 'bold', fontSize: 60, color: 'rgba(78, 116, 289, 1)'}}>{total} ₹</Text>
      </View>
      <View style={documentStyle.listView}>
      <FlatList
        data={spentList}
        renderItem={({item}) => (
          <View style={documentStyle.contentStyle}>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Image style={{width: 40, height: 40}} source={{uri: item.icon}}/>
              <Text>{item.date}</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>{item.spent}</Text>
              <Text>{item.time}</Text>
            </View>
            <View>
              <Text>{item.amount} ₹</Text>
            </View>
          </View>
        )}
      />
      </View>
    </View>
  )
}