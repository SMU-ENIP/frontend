import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AdminLogoutScreen = ({ navigation }) => {
  const handleLogout = () => {
      navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>관리자 페이지</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>로그아웃</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdminLogoutScreen;
