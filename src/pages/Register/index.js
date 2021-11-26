import axios from 'axios';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {API_HOST} from '../../API';
import TextInput from '../../components/Input';
import Input from '../../components/Input';
import useForm from '../../utils/useForm';
const Register = ({navigation}) => {
  const [form, setForm] = useForm({
    email: '',
    password: '',
    username: '',
  });

  const onContinue = () => {
    axios
      .post(`${API_HOST.register}`, form, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log('res', res);
        navigation.replace('SignIn');
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <View style={{padding: 20}}>
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
      <Input
        value={form.email}
        onChangeText={value => setForm('email', value)}
        label="email"
      />
      <View style={{paddingTop: 20}} />
      <Button title="SignIn" onPress={onContinue} />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
