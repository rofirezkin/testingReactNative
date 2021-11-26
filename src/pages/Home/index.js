import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {API_HOST} from '../../API';
import TextInput from '../../components/Input';
import {getData} from '../../utils/localstorage';

const Home = ({navigation}) => {
  const [token, setToken] = useState();
  const [data, setData] = useState([]);
  const [dataTambah, setDataTambah] = useState('');
  useEffect(() => {
    getData('token')
      .then(res => {
        console.log('token', res);
        setToken(res);
      })
      .catch(err => {
        console.log(err);
      });
    axios
      .get(`${API_HOST.checklistController}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setData(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [token]);

  const onSave = () => {
    const databaru = {
      name: dataTambah,
    };
    axios
      .post(`${API_HOST.checklistControllerSave}`, databaru, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        navigation.replace('Home');
      })
      .catch(err => {
        console.log(err);
      });
  };
  const onDelete = id => {
    console.log('id dele', id);
    axios
      .delete(`${API_HOST.checklistControllerDelete}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log('resss', res);
        navigation.replace('Home');
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  return (
    <ScrollView>
      <View style={{padding: 20}}>
        <TextInput
          label="data isi untuk penambahan"
          value={dataTambah}
          onChangeText={value => setDataTambah(value)}
        />
        <View style={{marginTop: 10}} />
        <Button onPress={onSave} title="tambah data" />
        {data.map(res => {
          const data = {
            token: token,
            id: res.id,
          };
          return (
            <View
              key={res.id}
              style={{
                borderWidth: 1,
                borderColor: 'black',
                padding: 10,
                marginTop: 15,
              }}>
              <Text> get Header data {res.id}</Text>
              <Text>{res.name}</Text>
              <Button
                title="Tambah Item"
                onPress={() => navigation.navigate('DetailChecklist', data)}
              />
              {res.items && (
                <View>
                  {res.items.map(res => {
                    return (
                      <View style={{marginTop: 10}} key={res.id}>
                        <View style={{marginTop: 10}} />
                        <Text>get item {res.id}</Text>
                        <Text>{res.name}</Text>
                      </View>
                    );
                  })}
                </View>
              )}
              <View style={{marginTop: 10}} />
              <Button
                onPress={() => onDelete(res.id)}
                title={`delete data ${res.id}`}
              />
            </View>
          );
        })}
        <View style={{marginTop: 30}} />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({});
