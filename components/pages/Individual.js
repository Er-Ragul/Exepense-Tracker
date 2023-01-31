import { React, useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';
import { DataTable } from 'react-native-paper';
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
            <View>
            <DataTable style={indiStyle.table}>
                <DataTable.Header style={indiStyle.heading}>
                    <DataTable.Title>
                        <Text style={{ fontWeight: 'bold', fontSize: 20}}>Date</Text>
                    </DataTable.Title>
                    <DataTable.Title>
                        <Text style={{ fontWeight: 'bold', fontSize: 20}}>Time</Text>
                    </DataTable.Title>
                    <DataTable.Title>
                    <Text style={{ fontWeight: 'bold', fontSize: 20}}>Spent</Text>
                    </DataTable.Title>
                </DataTable.Header>
            </DataTable>
            </View>
            <View style={indiStyle.list}>
                <FlatList
                    data={list}
                    renderItem={({item}) => (
                        <DataTable style={indiStyle.table}>
                            <DataTable.Row>
                                <DataTable.Cell>{item.date}</DataTable.Cell>
                                <DataTable.Cell>{item.time}</DataTable.Cell>
                                <DataTable.Cell>{item.amount}</DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>
                    )}
                />
            </View>
            <View style={indiStyle.buttons}>
                <Icon raised name='home' 
                type='ionicon' color='rgba(78, 116, 289, 1)'
                onPress={() => dispatch(callSearchWindow(false))}/>
                <Icon raised name='search' 
                type='ionicon' color='rgba(78, 116, 289, 1)'
                onPress={() => navigation.navigate('Search')} />
            </View>
        </View>
    )
}