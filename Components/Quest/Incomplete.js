import React, { useState, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Button,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Axios from 'axios';

const Incomplete = (props) => {

  //모달 상태 변수
  const [modalVisible, setModalVisible] = useState(false);

  //영수증 내용 리스트
  const [renderList,setRenderList] = useState([]);

  const [renderImage, setRenderImge] = useState("");


  //openModal의 상태 정의
  function openModal() {
    setModalVisible(true);
  }

  //openModal의 상태 정의
  function closeModal() {
    setModalVisible(false);
  }

  const receiptListToken = {
    Authorization: `Bearer eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE2ODYxMDQ1MDYsInN1YiI6IjEiLCJ1c2VySWQiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiUk9MRV9BRE1JTiIsInByb3ZpZGVyIjoiTE9DQUwiLCJleHAiOjE2ODYxOTA5MDZ9.9xJS7xRxr5foIl6Vc91G6zhdxROiPWqaWNA3PmsTE25dcL_lUqA4BdOIKh3ejGmv`,
  };


  const fetchData = () =>{
    Axios.get("https://www.smu-enip.site/item/list", {
       headers: receiptListToken,
     }).then((res)=>{
       
       setRenderList([...res.data])
       console.log(renderList)
       
     }).catch((err)=>{
       console.log(err)
     })
 }

  //서버에서 영수증 정보를 불러옴
  useEffect(() => {
      fetchData();
  },[]);


  //이미지 주소
  const [ imageUrl, setImageUrl ] = useState('');

  //권한 요청
  const [ status, requestPermission ] = ImagePicker.useMediaLibraryPermissions();

  //이미지 업로드 기능
  const uploadImage = async(itemId) => {

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
      
      const imageData = {
          image: localUri,
          itemId: itemId
      }

      await Axios({
          method: "POST",
          url: 'https://www.smu-enip.site/recycle/image', 
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
  }

  const Item = ({item, onPress}) => (
    <View style={[styles.itemStyle]}>
      <View
        style = {{
          flexDirection: 'row'
        }}
      >
        <View style={[styles.viewStyle]}>
          <Image source={{ uri: item.categoryImage }} style={[ styles.imageStyle ]} />
        </View>

        <View style={[styles.viewStyle]}>
          <Text style={[styles.dateTextStyle]}>{item.date}</Text>
          <Text 
            style={[styles.nameTextStyle]}
            numberOfLines={1} 
            ellipsizeMode="tail"
          >{item.name}</Text>
          <Text style={[styles.recycleTextStyle]}>{item.category}</Text>
        </View>

        <View style={[styles.ButtonStyle]}>
          <TouchableOpacity
            style={styles.infoButtonStyle}
            onPress={() => onPress(setRenderImge(item.recycleImage))}
          >
            <Text style = {[styles.infoTextStyle]}>info</Text>
          </TouchableOpacity>

          <View style={[styles.uploadButtonStyle]}>  
            <Button
              title = '업로드'
              color = "#009966"
              onPress = {()=>uploadImage(item.id)}
            ></Button>
          </View>

        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          closeModal();
        }}
      >
        <View style={styles.centeredView}>
          <ScrollView  contentContainerStyle={[styles.modalView, styles.alignItemsCenter]}>
            <Image source={{ uri: renderImage }} style={[ styles.recycleImageStyle ]} />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => closeModal()}
              >
              <Text style={styles.textStyle}>닫기</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      <FlatList
        data={renderList}
        renderItem={({ item, index }) => <Item item={item} onPress={openModal} />}
        onPress={openModal}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageStyle : {
    width: 100, 
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  itemStyle: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#ABDECD",
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
  },
  viewStyle: {
    marginRight:10,
    width: 100,
  },
  ButtonStyle: {
    marginRight:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateTextStyle: {
    marginTop: 10,
    marginBottom: 15,
    fontSize: 15,
    fontWeight: 'bold'
  },
  nameTextStyle: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 12,
  },
  recycleTextStyle: {
    marginTop: 15,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold'
  },
  infoTextStyle: {
    color: 'white',
  },
  infoButtonStyle: {
    backgroundColor: "#009966",
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 1,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 70,
  },
  uploadButtonStyle: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 3,
  },

  closeButton: {
    backgroundColor: "#009966",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
      shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    },
  },
  recycleImageStyle : {
    resizeMode: 'contain',
    width: 250,
    height: 450,
    maxWidth: '100%',
    maxHeight: '100%',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
});

export default Incomplete;