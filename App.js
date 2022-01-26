import React, { useState, useEffect } from 'react';
import { Appbar, TextInput, Button, Card, List, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen'

import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, Alert, View, } from 'react-native';


HomeScreen = () => {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('');
  const [editVal, setEdit] = useState('')
  


  useEffect(() => {
    getData();
    SplashScreen.hide();
  }, []);



  const clearAllData = async () => {
    todos.splice(0, todos.length)
    try {
      await AsyncStorage.setItem('Todo', JSON.stringify(todos));
    } catch (error) {
      alert("data input error", error)
    }
    getData()
  }



  const getData = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('Todo'))
      value !== null? setTodos(value):setTodos([])
      if (value !== null) {
        ///
      }
    } catch (e) {
      alert("There is problem to loading data from storage", e)
    }
  }



  Add_Todo = async () => {
    let obj = { title: text, edit: false }
    todos.push(obj);
    setText('')
    try {
      await AsyncStorage.setItem('Todo', JSON.stringify(todos));
    } catch (error) {
      alert("data input error", error)
    }
    getData()
  }



  Delete_Todo = async (k) => {
    todos.splice(k, 1)
    try {
      await AsyncStorage.setItem('Todo', JSON.stringify(todos));
    } catch (error) {
      alert("data input error", error)
    }
    getData()
  }



  Edit_todo = async (v, k) => {
    setEdit(v.title)
    todos[k].edit = true
    try {
      await AsyncStorage.setItem('Todo', JSON.stringify(todos));
    } catch (error) {
      alert("data input error", error)
    }
    getData()
  }



  UpdatValue = async(id) => {
    todos[id].title=editVal
    todos[id].edit= false
    try {
      await AsyncStorage.setItem('Todo', JSON.stringify(todos));
    } catch (error) {
      alert("data input error", error)
    }
    getData()
  }



  Icons = ({ val, props }) => {
    return (
      <View style={{ flexDirection: "row" }}>
        {val.edit ?
          <Button onPress={()=>UpdatValue(props)}>Update</Button>:
          <View style={{ flexDirection: "row" }}>
          <FontAwesome5 onPress={() => Edit_todo(val, props)} size={21} style={{ marginTop: 11, marginRight: 15, marginBottom: 10, color:"grey"  }} name="edit" />
          <MaterialIcons onPress={() => Delete_Todo(props)} size={25} style={{ marginTop: 10, marginBottom: 10, color:"grey"  }} name="delete" />
          </View>
        }
        </View>
    )
  }


  ////////////////////////////////////////////////////////////////
  return (

    <View style={styles.main}>
      <Appbar.Header>
        <Appbar.Content title="TODO LIST  " />
      </Appbar.Header>

      <TextInput
        label="Enter Todo"
        mode='flat'
        value={text}
        onChangeText={(text) => setText(text)}
      />

      <Button onPress={Add_Todo} mode="contained" icon={() => <Icon name="checklist" size={22} color="#fff" />} style={{ marginTop: 6, marginLeft: 10, marginRight: 10, marginBottom: 4 }} >
        Add Todo
      </Button>
      <Button onPress={clearAllData} mode="contained" icon={() => <Icon name="trashcan" size={22} color="#fff" />} style={{ marginTop: 6, marginLeft: 10, marginRight: 10, marginBottom: 4 }}>
        Delete All
      </Button>

      <ScrollView >
        <View>
          {
            todos.map((itm, k) => {
              return (
                <View key={k} style={styles.card}>
                  {itm.edit ? <TextInput value={editVal} onChangeText={(e)=>setEdit(e)} autoFocus={true} style={{ flex: 1 }} /> : <Paragraph style={{ padding: 16, fontSize: 15, flex: 1 }}>{itm.title}</Paragraph>}
                  <Icons val={itm} props={k} />
                </View>
              )
            })
          }
        </View>
      </ScrollView>

    </View>
  )
}
export default HomeScreen;


const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#d3d3d3',
  },
  card: {
    minHeight: 55,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 4,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingRight: 6,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

