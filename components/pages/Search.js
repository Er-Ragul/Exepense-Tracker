import { React, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal } from 'react-native';
import { Input, Icon } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { callSearchWindow } from '../../redux/storageSlice';
import { apiUrl } from '../../secret/appwriteConfig';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';

export default function Search({ navigation }){

    let uid = useSelector((state) => state.variable.uid)
    let dispatch = useDispatch()

    let [productList, setProductList] = useState([])
    let [searchProduct, setSearchProduct] = useState('')
    let [calendarModal, setCalendarModal] = useState(false)
    let [dates, setDates] = useState([])
    let [select, setSelect] = useState({})

    useEffect(() => {
        axios.post(`${apiUrl}/getproducts`, {
            database: uid,
            collection: uid+'-pds'
          })
          .then(function (response) {
            setProductList(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
    }, [])

    useEffect(() => {
        axios.post(`${apiUrl}/getproducts`, {
            database: uid,
            collection: uid+'-pds'
          })
          .then(function (response) {
            setProductList([])
            response.data.forEach((data) => {
                if(data.name.toLowerCase().includes(searchProduct.toLowerCase())){
                    setProductList(prevList => [{
                        id: data.id, 
                        name: data.name, 
                        url: data.url}, ...prevList])
                }
            })
          })
          .catch(function (error) {
            console.log(error);
          });
    }, [searchProduct])

    let selectDate = (date, dateString) => {
        setSelect(prevDate => ({
            ...prevDate,
            [dateString]: {selected: true, selectedColor: '#34ebb4'}
        }))
        setDates(prevDate => [date, ...prevDate])
    }

    let processQuery = (id, name, url) => {
        navigation.navigate('Individual', {
            id, 
            name, 
            url,
            dates
        })
        setDates([])
        setSelect({})
    }

    return(
        <View style={searchStyle.container}>
            <KeyboardAwareScrollView scrollEnabled={true} contentContainerStyle={{ backgroundColor: 'white' }}>
            <View style={searchStyle.menu}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'rgba(78, 116, 289, 1)' }}>Filter</Text>
                </View>
                <View style={searchStyle.menuButton}>
                    <TouchableOpacity style={{ padding: 8, borderRadius: 12, backgroundColor: '#eb4034' }}
                    onPress={() => setSearchProduct('')}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>CLEAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 8, borderRadius: 12, backgroundColor: 'rgba(78, 116, 289, 1)' }}
                    onPress={() => dispatch(callSearchWindow(false))}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>BACK</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Input
                placeholder="Search Expense"
                onChangeText={(e) => setSearchProduct(e)}
                value={searchProduct}
                inputContainerStyle={ searchStyle.inputBox }
                rightIcon={
                    <Icon 
                    type='ionicon'
                    name='calendar'
                    color='#777778'
                    onPress={() => setCalendarModal(true)}
                    />
                }
            />
            <View style={searchStyle.groupList}>
                <FlatList
                    scrollEnabled={false}
                    data={productList}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={searchStyle.listView}
                        onPress={(e) => processQuery(item.id, item.name, item.url)}>
                        <Image source={{uri: item.url}} style={{width: 40, height:40}}/>
                        <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: 8}}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
            </KeyboardAwareScrollView>
            <Modal visible={calendarModal}>
            <View style={searchStyle.calendarModal}>
                <Calendar 
                  onDayLongPress={day => {
                    selectDate(day.day+'-'+day.month+'-'+day.year, day.dateString)
                  }}
                  markedDates={select}/>
                <View style={searchStyle.calendarClose}>
                    <TouchableOpacity
                    style={{ 
                    borderWidth: 1, 
                    borderColor: '#eb4034', 
                    padding: 10, 
                    backgroundColor: '#eb4034',
                    borderRadius: 6
                    }}
                    onPress={() => setCalendarModal(false)}>
                    <Text style={{fontWeight: 'bold', fontSize: 18, color: 'white'}}>CLOSE</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </Modal>
        </View>
    )
}

const searchStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        backgroundColor: 'white',
        flexDirection: 'column'
    },
    menu: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        margin: 20
    },
    menuButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    inputBox: {
        padding: 6,
        borderWidth: 1,
        borderColor: 'rgba(78, 116, 289, 1)',
        borderRadius: 12
    },
    groupList: {
        height: '100%',
    },
    listView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: '#d1d1d1',
        borderRadius: 12,
    },
    calendarModal: {
        flex: 1,
        flexDirection: 'column'
      },
    calendarClose: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
})