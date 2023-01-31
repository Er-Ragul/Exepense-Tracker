import { React, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
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

const indiStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        backgroundColor: 'white'
    },
    total: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    list: {
        flex: 8
    },
    contentStyle: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#d1d1d1',
        marginTop: 14,
        paddingBottom: 14
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    buttonStyle: {
        backgroundColor: 'rgba(78, 116, 289, 1)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 10,
        marginVertical: 6
    }
})