import React from 'react';
import {StyleSheet, Text, View, TextInput as TextInputRN} from 'react-native';

const TextInput = ({label, placeholder, ...restProps}) => {
  return (
    <View>
      <Text style={styles.text}>{label}</Text>
      <TextInputRN
        style={styles.input}
        placeholder={placeholder}
        {...restProps}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    backgroundColor: '#F9EFEF',
    borderWidth: 1,
    padding: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
});
