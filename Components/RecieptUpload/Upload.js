import React, { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { Alert, Pressable, Text, Image, Button, View } from 'react-native';
import Axios from 'axios';

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

        const localUri = result.uri;
        const filename = localUri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename ?? "");
        const type = match ? `image/${match[1]}` : `image`;
        const formData = new FormData();
        formData.append("image", { uri: localUri, name: filename, type });
        

        //유저 토큰
        const receiptToken = {
            Authorization: `Bearer eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE2ODYwNzQ1MTEsInN1YiI6IjEiLCJ1c2VySWQiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiUk9MRV9VU0VSIiwicHJvdmlkZXIiOiJMT0NBTCIsImV4cCI6MTY4NjE2MDkxMX0.e0CDol3o60D99_ZwRYicTjc2KDtbi1sakc4S18SmhGk4l6k9pXqEusxs-N0FnfK-`,
        };
        
        const imageData = {
            date: dateString,
            image: localUri,
        }

        await Axios({
            method: "POST",
            url: 'https://www.smu-enip.site/receipt', 
            headers: receiptToken,
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
        <View>
            <Button
                title = "이미지 업로드하기"
                color = '#009966'
                onPress = { uploadImage }
            ></Button>
            <Image
                source = {{ uri: imageUrl }}
            ></Image>
        </View>
    );
}

export default Upload;