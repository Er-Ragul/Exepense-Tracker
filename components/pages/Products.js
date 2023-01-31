import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from "react-native";
import { productStyle } from "../styles/productStyle";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Input, Icon, Button } from '@rneui/themed';
import { useSelector, useDispatch } from 'react-redux';
import { apiUrl } from "../../secret/appwriteConfig";
import axios from "axios";

export default function Products(){

    let [iconList, setIconList] = useState([])
    let [productId, setProductId] = useState(0)
    let [name, setName] = useState('')
    let [url, setUrl] = useState('')

    let dispatch = useDispatch()
    let uid = useSelector((state) => state.variable.uid)

    useEffect(() => {
        axios.get(`${apiUrl}/geticons`)
          .then(function (response) {

            let pid = new Date()
            setProductId(pid.getTime())

            setIconList(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
    }, [])

    let addProduct = () => {
        if(name != '' && url != ''){
            axios.post(`${apiUrl}/setproduct`, {
                name: name,
                id: productId.toString(),
                url: url,
                database: uid,
                collection: uid+'-pds'
            })
            .then(function (response) {
                Alert.alert('Product Added', 'Product added successfully 👍', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
                setName('')
                setUrl('')
                let pid = new Date()
                setProductId(pid.getTime())
            })
            .catch(function (error) {
                Alert.alert('Server Error', 'Please try again ⚠', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            });
        }
        else {
            Alert.alert('Icon Not Selected', 'Please select the icon and try again.', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        }
    }

    return (
        <KeyboardAwareScrollView>
        <View style={productStyle.container}>
            <View style={productStyle.header}>
                <Text style={{fontWeight: 'bold', fontSize: 28, marginLeft: 10, color: 'rgba(78, 116, 289, 1)'}}>Add Categories</Text>
            </View>
            <View style={productStyle.inputBox}>
                <Input
                    placeholder="Enter Product Name"
                    leftIcon={{ type: 'material', name: 'category' }}
                    onChangeText={value => setName(value)}
                    value={name}
                />
                <Input
                    placeholder="Product ID"
                    leftIcon={{ type: 'material', name: 'info' }}
                    value={productId.toString()}
                    editable={false}
                />
            </View>
            <View style={productStyle.listViewBox}>
                <FlatList
                    data={iconList}
                    horizontal={true}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={productStyle.listView}
                        onPress={() => setUrl(item)}>
                        <Image source={{uri: item}} style={{width: 50, height: 50}}/>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={{flexGrow: 1, justifyContent: 'space-evenly'}}
                    />
                </View>
            <View style={productStyle.buttonBox}>
                <Button
                    title="Save Product"
                    buttonStyle={{ backgroundColor: 'rgba(78, 116, 289, 1)' }}
                    containerStyle={{
                        height: 40,
                        width: 200,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                    titleStyle={{
                        color: 'white',
                        marginHorizontal: 20,
                    }}
                    onPress={addProduct}
                />
            </View>
        </View>
        </KeyboardAwareScrollView>
    )
}