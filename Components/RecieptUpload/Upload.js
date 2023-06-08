import React, { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { Alert, Pressable, Text, Image, Button, View, StyleSheet } from 'react-native';
import Axios from 'axios';
import UserContext from "../../context/UserContext";

const Upload = () => {

  // 현재 날짜를 가져오는 Date 객체 생성
  const currentDate = new Date();

  // 년도
  const year = currentDate.getFullYear();

  // 월 (주의: 월은 0부터 시작하므로 1을 더해야 합니다)
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');

  // 일자
  const day = currentDate.getDate().toString().padStart(2, '0');

  // 날짜 문자열 생성
  const dateString = `${year}-${month}-${day}`;

  //이미지 주소
  const [ imageUrl, setImageUrl ] = useState('');

  //권한 요청
  const [ status, requestPermission ] = ImagePicker.useMediaLibraryPermissions();

  //유저 토큰
  const {user, setUser} = React.useContext(UserContext)

  const receiptListToken = {
    Authorization: `Bearer ${user ? user.token : 'Unknown'}`
  };

  const uploadImage = async() => {

    //이미지 업로드 권한확인
    //권한이 없으면 물어본다, 승인 X => 함수 종료
    if(!status?.granted){
      const permission = await requestPermission();

      if(!permission.granted){
        alert('갤러리 접근 권한이 필요합니다.');
        return null;
      }
    }

    //이미지 업로드 기능
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      aspect: [1, 1]
    });

    //이미지 업로드를 취소한 경우
    if(result.canceled){
      return null;
    }

    //이미지 업로드 결과 및 이미지 경로 업데이트
    console.log(result);
    setImageUrl(result.uri);
    Alert.alert("이미지 업로드 완료 !");
    
    const imageData = {
      date: dateString,
      image: imageUrl,
    }

  await Axios({
    method: "POST",
    url: 'https://www.smu-enip.site/receipt', 
    headers: receiptListToken,
    data:imageData,
    })
    .then(function(response) {
        console.log("");
        console.log("RESPONSE : " + JSON.stringify(imageData));
        console.log("");
    })
    .catch(function(error) {
        console.log("");
        console.log("ERROR : " + JSON.stringify(error));
        console.log("");
    });
  };

  return(
    <Pressable onPress = { uploadImage }>
      <View style = {[styles.uploadImage]}>
        <Text>이미지 업로드하기</Text>
      </View>
      
      <Image
        source = {{ uri: imageUrl }}
      ></Image>
    </Pressable>
  );
}

export default Upload;

const styles = StyleSheet.create({
  uploadTextStyle: {
    backgroundColor: '#009966'
  }
})