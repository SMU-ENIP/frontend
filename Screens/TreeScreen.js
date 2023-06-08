import React, { useEffect, useContext } from 'react';
import { Text, View, Image, StyleSheet, Alert } from 'react-native';
import UserContext from '../context/UserContext';
import userTree1 from '.././assets/userTree1.png';
import userTree2 from '.././assets/userTree2.png';
import userTree3 from '.././assets/userTree3.png';

function TreeScreen() {
  const { user } = useContext(UserContext);

  // 스코어에 따라 이미지를 가져오는 함수
  const getImageByScore = (score) => {
    if (score > 1) {
      return userTree1;
    } else if (score > 100) {
      return userTree2;
    } else if (score > 200) {
      return userTree3;
    }
    return null;
  };

  useEffect(() => {
    if (!user) {
      Alert.alert('New User', 'Welcome! Please set your nickname and score.');
    }
  }, [user]);

  const imageSource = user && user.score ? getImageByScore(user.score) : null;

  return (
    <View style={styles.container}>
        {imageSource && <Image source={imageSource} style={styles.image} />}
        <View style={styles.textContainer}>
          <View style={styles.rowContanier}>
            <Text>닉네임</Text>
            <Text style={styles.scoreText}>{user ? user.nickname : 'Unknown'}</Text>
          </View>
    
          <Text style={styles.scoreText}>랭킹 스코어: {user ? user.score : 'Unknown'}</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 10,
  },
  textContainer: {
    flexDirection: 'column',
  },
  rowContanier: {
    flexDirection: 'row',
  },
  scoreText: {
    fontSize: 12,
  },
});

export default TreeScreen;
