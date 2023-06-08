import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';
import AdminScreen from './Screens/AdminScreen';
import MainScreen from './Screens/MainScreen';
import UserContext from './context/UserContext';
import * as Font from 'expo-font';

const Stack = createStackNavigator();

export default function App() {
  const [isLogin, setIsLogin] = useState(false); // 로그인 상태를 저장하기 위한 상태 변수
  const [showSignUp, setShowSignUp] = useState(false); // 회원가입 화면을 보여줄지 결정하기 위한 상태 변수
  const [user, setUser] = useState(null); // 사용자 정보를 저장하기 위한 상태 변수

  useEffect(() => {
    const getFonts = async () => {
      await Font.loadAsync({
        BMJUA: require("./assets/fonts/BMJUA.ttf"),
      });
    };

    getFonts();
    checkLoginStatus();
  }, []);

  // 로그인 상태 확인
  const checkLoginStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('isLogin');
      
      if (value !== null && value === 'true') {
        setIsLogin(true);
      }
    } catch (error) {
      console.error('Error retrieving login status:', error);
    }
  };

  // 로그인 성공 처리
  const handleLoginSuccess = async () => {
    try {
      await AsyncStorage.setItem('isLogin', 'true');
      setIsLogin(true);
    } catch (error) {
      console.error('Error setting login status:', error);
    }
  };

  // 로그아웃 처리
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('isLogin');
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('accessToken');
      
      setIsLogin(false);
    } catch (error) {
      console.error('Error removing login status:', error);
    }
  };

  // 회원가입 화면 보여주기
  const handleShowSignUp = () => {
    setShowSignUp(true);
  };

  // 로그인 화면으로 돌아가기
  const handleBackToLogin = () => {
    setShowSignUp(false);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator>
          {isLogin ? ( // 로그인 상태에 따라 화면 결정
            <>
              <Stack.Screen
                  name="Home"
                  component={isLogin === 'Admin' ? AdminScreen : MainScreen} // 'Admin'일 경우 AdminScreen, 그 외에는 MainScreen 컴포넌트를 보여줌
                  options={{ headerShown: false }}
              />

              <Stack.Screen
                  name="Logout"
                  options={{ headerShown: false }}
              >
                  {() => (
                      <View style={styles.container}>
                          <Text>로그인 성공!</Text>
                          
                          <TouchableOpacity style={styles.button} onPress={handleLogout}>
                              <Text style={styles.buttonText}>로그아웃</Text>
                          </TouchableOpacity>
                      </View>
                  )}
              </Stack.Screen>
            </>
          ) : ( // 로그인 상태가 아닐 경우
            <>
              <Stack.Screen
                  name="Login"
                  options={{ headerShown: false }}
              >
                {({ navigation }) => (
                  <View style={styles.panelContainer}>
                    {!showSignUp ? ( // 회원가입 화면이 보이지 않을 경우 로그인 화면 보여줌
                      <View style={styles.panel}>
                        <LoginScreen onLoginSuccess={handleLoginSuccess} navigation={navigation} />
                          
                        <TouchableOpacity onPress={handleShowSignUp} style={styles.linkButton}>
                          <Text style={styles.linkText}>회원가입</Text>
                        </TouchableOpacity>
                      </View>
                    ) : ( // 회원가입 화면이 보이는 경우 회원가입 화면 보여줌
                      <View style={styles.panel}>
                        <SignUpScreen></SignUpScreen>

                        <TouchableOpacity onPress={handleBackToLogin} style={styles.linkButton}>
                          <Text style={styles.linkText}>로그인으로 돌아가기</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                )}
              </Stack.Screen>

              <Stack.Screen
                name="Admin"
                component={AdminScreen}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="Main"
                component={MainScreen}
                options={{
                  headerShown: false,
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    panelContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    panel: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#3498db',
        borderRadius: 5,
        width: '80%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    linkButton: {
        marginTop: 170,
    },
    linkText: {
        color: '#3498db',
        fontSize: 16,
        fontWeight: 'bold',
    },
});