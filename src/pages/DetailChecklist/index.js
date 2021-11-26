import axios from 'axios';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {API_HOST} from '../../API';
import TextInput from '../../components/Input';
import useForm from '../../utils/useForm';

const DetailChecklist = ({navigation, route}) => {
  const id = route.params.id;
  const token = route.params.token;
  console.log('data', route.params);
  const [form, setForm] = useForm({
    checklistId: id,
    itemName: '',
  });
  const onSave = () => {
    console.log('halo', form);
    axios
      .post(`${API_HOST.checklistItemSave}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log('ressberhasil', res);
        navigation.replace('Home');
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <View style={{padding: 20}}>
      <View style={{marginTop: 20}} />
      <TextInput
        label="item Name"
        value={form.itemName}
        onChangeText={value => setForm('itemName', value)}
      />
      <Button title="Tambah Item" onPress={onSave} />
    </View>
  );
};

export default DetailChecklist;

const styles = StyleSheet.create({});
