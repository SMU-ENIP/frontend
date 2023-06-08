import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const API_BASE_URL = 'https://www.smu-enip.site';

const App = () => {
  const [email, setEmail] = useState('');
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/signUp`, {
        email: email,
        loginId: loginId,
        password: password,
      });
      console.log(response.data);

      const message = response.data.message;
      if (message === 'string') {
        // 회원가입 성공
        console.log('회원가입 성공');
      } else {
        // 회원가입 실패
        console.log('회원가입 실패');
      }
    } catch (error) {
      console.error('회원가입 오류:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <TextInput
        style={styles.input}
        placeholder="이메일"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="아이디"
        onChangeText={setLoginId}
        value={loginId}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  input: {
    width: '80%',
    height: 60, // Increase the height to make it larger
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    marginBottom: 10,
    paddingHorizontal: 100, // Add padding for better aesthetics
    fontSize: 16, // Adjust the font size if needed
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    width: '80%',
    height: 50,
    paddingHorizontal: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});


export default App;
