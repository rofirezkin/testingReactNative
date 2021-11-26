import axios, {Axios} from 'axios';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {API_HOST} from '../../API';
import Input from '../../components/Input';
import {storeData} from '../../utils/localstorage';
import useForm from '../../utils/useForm';

const SignIn = ({navigation}) => {
  const [form, setForm] = useForm({
    password: '',
    username: '',
  });

  const onContinue = () => {
    console.log('rof', form);
    axios
      .post(`${API_HOST.login}`, form, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log('halo ', res.data.data.token);
        const token = res.data.data.token;
        storeData('token', token);
        navigation.navigate('Home');
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  return (
    <View style={{flex: 1, padding: 19}}>
      <Input
        value={form.username}
        onChangeText={value => setForm('username', value)}
        label="username"
      />
      <Input
        value={form.password}
        onChangeText={value => setForm('password', value)}
        label="password"
        secureTextEntry={true}
      />
      <View style={{paddingTop: 20}} />
      <Button title="SignIn" onPress={onContinue} />
      <View style={{paddingTop: 20}} />
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
