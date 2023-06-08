import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import UserContext from '../context/UserContext';

const API_BASE_URL = 'https://www.smu-enip.site';

const LoginScreen = (props) => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const {user,setUser} = React.useContext(UserContext)

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/login`, {
        loginId: loginId,
        password: password,
      });
      console.log(response.data);

      const responseData = response.data.data;
      
      if (responseData) {
        const { role, token } = responseData;
        
        console.log('로그인 성공');
        console.log('권한:', role);
        console.log('토큰:', token);
        
        setUser(responseData)
        console.log(user)
        console.log(responseData)

        if (role === 'ROLE_ADMIN') {
          // Navigate to AdminScreen
          props.navigation.navigate('Admin');
        } else {
          // Navigate to MainScreen
          props.navigation.navigate('Main', { userName: responseData.name });
        }
      } else {
        console.log('로그인 실패');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
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
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    marginBottom: 10,
    paddingHorizontal: 100, 
    fontSize: 16, 
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


export default LoginScreen;
