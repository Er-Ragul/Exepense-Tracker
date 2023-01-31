import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, FlatList, Alert, Keyboard } from 'react-native';
import { addStyle } from '../styles/addStyle';
import { Input, Icon, Button } from '@rneui/themed';
import currentTime from './currentTime';
import { useSelector } from 'react-redux';
import { Calendar } from 'react-native-calendars';
import { apiUrl, databases } from "../../secret/appwriteConfig";
import axios from 'axios';

export default function Add() {

  let uid = useSelector((state) => state.variable.uid)

  let [productList, setProductList] = useState([])
  let [numpadheight, setNumPadHeight] = useState('flex')
  let [date, setDate] = useState('')
  let [modal, setModal] = useState(false)
  let [calendarModal, setCalendarModal] = useState(false)
  let [amount, setAmount] = useState('0')
  let [note, setNote] = useState('')
  let [spent, setSpent] = useState({
    pid: null,
    spent_for: null,
    money_spent: null,
    icon: null,
    time: null,
    date: null,
    note: null
  })

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
  }, [modal])

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setNumPadHeight('none')
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setNumPadHeight('flex')
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    const theDate = new Date();
    let tempDate = theDate.getDate().toString()+'-'+`${theDate.getMonth() + 1}`+'-'+ theDate.getFullYear().toString()
    setDate(tempDate)
  }, [])

  let updateAmount = (amt) => {
    if(amount == '0'){
      setAmount(amt)
    }
    else {
      setAmount(prevAmount => prevAmount + amt)
    }
  }

  let addExpense = () => {
    if(amount != '0' 
    && amount != '.' 
    && amount != ''
    && spent.pid != null
    && note.length > 0){
      try {
        axios.post(`${apiUrl}/addexpense`, {
          database: uid,
          collection: uid+'-exp',
          spent: spent
        })
        .then(function (response) {
          Alert.alert('Expense Added', 'Expense updated successfully 👍', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
            setSpent({
              pid: null,
              spent_for: null,
              money_spent: null,
              icon: null,
              time: null,
              date: null,
              note: null
            })
            setAmount('0')
            setNote('')
            const theDate = new Date();
            let tempDate = theDate.getDate().toString()+'-'+`${theDate.getMonth() + 1}`+'-'+ theDate.getFullYear().toString()
            setDate(tempDate)
        })
        .catch(function (error) {
          Alert.alert('Server Error', 'Please try again ⚠', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        });
      }
      catch(e){
        console.log(e);
        setSpent({
          pid: null,
          spent_for: null,
          money_spent: null,
          icon: null,
          time: null,
          date: null,
          note: null
        })
        setAmount('0')
        setNote('')
        const theDate = new Date();
        let tempDate = theDate.getDate().toString()+'-'+`${theDate.getMonth() + 1}`+'-'+ theDate.getFullYear().toString()
        setDate(tempDate)
      }
    }
    else {
      console.log('Condition not satisfied !');
      Alert.alert('Please fill out all fields!', '1) Amount\n2) Category\n3) Note or Comment', 
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  }

  let updateSpent = (id, name, icon) => {
    if(amount != '0' 
    && amount != '.' 
    && amount != ''
    && note.length > 0){
      let updatedValue = {
        pid: id,
        spent_for: name,
        money_spent: parseInt(amount),
        icon: icon,
        time: currentTime(),
        date: date,
        note: note
      }
      setSpent(prevSpent => ({
        ...prevSpent,
        ...updatedValue
      }))
      setModal(false)
    }
    else {
      Alert.alert('Invalid Amount', 'Please enter valid amount !', 
      [
        { text: 'OK', onPress: () => setModal(false) },
      ]);
    }
  }

  let updateDate = (date) => {
    setDate(date)
    setCalendarModal(false)
  }

  return (
    <View style={addStyle.container}>
      <View style={addStyle.totalAmount}>
        <Text style={{fontWeight: 'bold', fontSize: 60, color: 'rgba(78, 116, 289, 1)'}}>{amount} ₹</Text>
        <TouchableOpacity style={{
           position: 'absolute', 
           left: 14, 
           top: 14, 
           flexDirection: 'row',
           borderWidth: 1,
           borderRadius: 10,
           padding: 6,
           borderColor: '#3786ed'}}
           onPress={() => setCalendarModal(true)}>
          <Icon 
            type='ionicon'
            name='calendar'
            color='#777778'
            size={28}
          />
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 4, marginLeft: 4, color: 'rgba(78, 116, 289, 1)' }}>{date}</Text>
        </TouchableOpacity>
      </View>
      <View style={addStyle.comment}>
        <Text style={{fontSize: 15, marginBottom: 26}}>Today at {currentTime()}</Text>
        <Input placeholder='Add Note' 
        inputContainerStyle={{width: 180, borderBottomWidth: 0}}
        onChangeText={(text) => setNote(text)}
        value={note}/>
      </View>
      <View style={addStyle.saveEntry}>
        <View style={addStyle.spentChip}>
          <Image source={{uri: 'https://img.icons8.com/office/80/000000/wallet.png'}} 
          style={{width: 30, height: 30}}/>
          <Text style={{fontSize: 15}}> Spent for</Text>
        </View>
        <Icon type='material' name='arrow-forward'/>
        <TouchableOpacity style={addStyle.categoryButton} onPress={() => setModal(true)}>
          <Image source={{
            uri: spent.icon == null ? 'https://img.icons8.com/office/80/000000/wallet.png' : spent.icon
          }}
          style={{width: 30, height: 30}}/>
          <Text style={{marginLeft: 10}}>{spent == undefined ? ' ' : spent['spent']}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={addStyle.saveButton} onPress={addExpense}>
          <Text style={{color: 'white'}}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={[addStyle.numPad, {display: numpadheight}]}>
      <View style={addStyle.numPadRow}>
          <TouchableOpacity
          onPress={() => updateAmount('7')}>
            <Text style={{fontSize: 28}}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={() => updateAmount('8')}>
            <Text style={{fontSize: 28}}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => updateAmount('9')}>
            <Text style={{fontSize: 28}}>9</Text>
          </TouchableOpacity>
        </View>
        <View style={addStyle.numPadRow}>
          <TouchableOpacity
          onPress={() => updateAmount('4')}>
            <Text style={{fontSize: 28}}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => updateAmount('5')}>
            <Text style={{fontSize: 28}}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => updateAmount('6')}>
            <Text style={{fontSize: 28}}>6</Text>
          </TouchableOpacity>
        </View>
        <View style={addStyle.numPadRow}>
          <TouchableOpacity
          onPress={() => updateAmount('1')}>
            <Text style={{fontSize: 28}}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => updateAmount('2')}>
            <Text style={{fontSize: 28}}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => updateAmount('3')}>
            <Text style={{fontSize: 28}}>3</Text>
          </TouchableOpacity>
        </View>
        <View style={addStyle.numPadRow}>
          <TouchableOpacity
          onPress={() => updateAmount('.')}>
            <Text style={{fontSize: 28}}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => updateAmount('0')}>
            <Text style={{fontSize: 28}}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAmount(amount.slice(0, -1))}>
            <Text style={{fontSize: 28}}>
              <Icon 
                type='material'
                name='backspace'
              />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={modal} transparent={true}>
        <View style={addStyle.modalView}>
          <View style={addStyle.categoryList}>
            <View style={addStyle.headingTab}>
            <Text style={{fontWeight: 'bold', fontSize: 24, color: 'white'}}>EXPENSES</Text>
            <Icon 
              type='material'
              name='cancel'
              color='white'
              onPress={() => setModal(false)}
            />
            </View>
            <FlatList
              data={productList}
              renderItem={({ item }) => (
                <TouchableOpacity style={addStyle.listView}
                onPress={() => updateSpent(item.id, item.name, item.url)}>
                  <Image source={{uri: item.url}} style={{width: 40, height:40}}/>
                  <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: 8}}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
      <Modal visible={calendarModal}>
        <View style={addStyle.calendarView}>
          <Calendar 
          onDayPress={(day) => 
          updateDate(day.day+'-'+day.month+'-'+day.year)}/>
          <View style={addStyle.calendarClose}>
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