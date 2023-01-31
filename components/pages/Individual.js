import { React, useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { indiStyle } from '../styles/indiStyle';
import { useSelector, useDispatch } from 'react-redux';
import { callSearchWindow } from '../../redux/storageSlice';
import { apiUrl } from '../../secret/appwriteConfig';
import axios from 'axios';

export default function Individual({ route, navigation }){

    let { id, name, url, dates } = route.params
    let uid = useSelector((state) => state.variable.uid)
    let dispatch = useDispatch()

    let [total, setTotal] = useState(0)
    let [list, setList] = useState([])

    useEffect(() => {
        axios.post(`${apiUrl}/query`, {
            database: uid,
            collection: uid+'-exp',
            pid: id,
            date: dates
          })
          .then(function (response) {
            setList(response.data.list)
            setTotal(response.data.total)
          })
          .catch(function (error) {
            console.log(error);
          });
    }, [])

    return(
        <View style={indiStyle.container}>
            <View style={indiStyle.total}>
                <Text style={{fontSize: 16, color: 'rgba(78, 116, 289, 1)'}}>Total Spent on {name}</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 60, color: 'rgba(78, 116, 289, 1)' }}>{total} ₹</Text>
            </View>
            <View style={indiStyle.heading}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Date</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Time</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Spent</Text>
            </View>
            <View style={indiStyle.list}>
                <FlatList
                    data={list}
                    renderItem={({item}) => (
                    <View style={indiStyle.contentStyle}>
                        <Text>{item.date}</Text>
                        <Text>{item.time}</Text>
                        <Text>{item.amount} ₹</Text>
                    </View>
                    )}
                />
            </View>
            <View style={indiStyle.buttons}>
                <TouchableOpacity style={indiStyle.buttonStyle}
                onPress={() => navigation.navigate('Search')}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>BACK TO SEARCH</Text>
                </TouchableOpacity>
                <TouchableOpacity style={indiStyle.buttonStyle}
                onPress={() => dispatch(callSearchWindow(false))}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>BACK TO MAIN</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}