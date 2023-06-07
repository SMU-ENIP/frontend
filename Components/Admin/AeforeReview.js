import React, { useState, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Button,
  Modal,
  ScrollView,
} from 'react-native';
import Axios from 'axios';

const AeforeReview = () => {

  //모달 상태 변수
  const [modalVisible, setModalVisible] = useState(false);

  //영수증 내용 리스트
  const [renderList,setRenderList] = useState([]);

  //이미지 경로 상태저장소
  const [renderImage, setRenderImge] = useState("");

  //승인 여부의 상태변수
  const [ fatchApproval, setfatchApproval ] = useState(null);

  //openModal의 상태 정의
  function openModal() {
    setModalVisible(true);
  }

  //openModal의 상태 정의
  function closeModal() {
    setModalVisible(false);
  }

  const receiptListToken = {
    Authorization: `Bearer eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE2ODYwOTUxODcsInN1YiI6IjEiLCJ1c2VySWQiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiUk9MRV9BRE1JTiIsInByb3ZpZGVyIjoiTE9DQUwiLCJleHAiOjE2ODYxODE1ODd9.ArkPGGtGaPZAk3QR-vdWkY3_i4he6NOZ0gCT5Bu-l6J00D6GrZQ0jXofkSeUjn6D`,
  };

  //업로드한 유저 영수증 목록 출력
  const fetchData = (itemId) =>{
      Axios.get("https://www.smu-enip.site/admin/item/list", {
      headers: receiptListToken,
      params: {
          isRecycled : !null,
          recycledImageId: itemId,
      },
      }).then((res)=>{
        
      setRenderList([...res.data])
      console.log(res)
      console.log(renderList)
      
      setfatchApproval(res.data.approved)
      console.log(fatchApproval)
      
      }).catch((err)=>{
      console.log(err)
      })
      
  }

  //서버 동작을 실행
  useEffect(() => {
      fetchData();
  },[]);

  //승인 여부에 따른 텍스트 변경
  const getStatusText = () => {
    return fatchApproval ? "승인" : "거부";
  };

  //승인 여부에 따른 스타일 변경
  const getStatusStyle = () => {
    return fatchApproval ? styles.approvedStyle : styles.rejectedStyle;
  };

  const Item = ({item, onPress}) => (
    <View style={[styles.itemStyle]}>
      <View
        style = {{
          flexDirection: 'row'
        }}
      >
        <View style={[styles.viewStyle]}>
          <Image source={{ uri: item.image }} style={[ styles.imageStyle ]} />
        </View>

        <View style={[styles.viewStyle]}>
          <Text style={[styles.dateTextStyle]}>날짜 : {item.date}</Text>
          <Text style={[styles.recycleTextStyle]}>User: {item.userId}</Text>
        </View>

        <View style={[styles.ButtonStyle]}>
            <TouchableOpacity
                style={styles.infoButtonStyle}
                onPress={() => onPress(setRenderImge(item.image))}
            >
                <Text style = {[styles.infoTextStyle]}>확대</Text>
            </TouchableOpacity>
            
            <View
                style = {{
                    flexDirection: 'row'
                  }}
            >
                <View style={[styles.approvalStyle, getStatusStyle()]}>  
                    <Text style = {[styles.textStyle]}
                    >{getStatusText()}</Text>
                </View>
            </View>
        </View>
      </View>
    </View>
  );

  return (
    <View>
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
            keyExtractor={(item, index) => index.toString()}
        />
    </View>
  );
};

const styles = StyleSheet.create({
    imageStyle : {
        width: 100, 
        height: 150,
        borderColor: 'black',
        borderWidth: 1,
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
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
      },
      uploadButtonStyle: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 3,
        marginLeft: 10,
        marginRight: 10,
        width: 45,
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
      approvalStyle: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: "#5882FA",
        borderRadius: 10,
        borderColor: 'black',
        width: 60,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:10,
        marginLeft:10,
      },
      rejectStyle: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: "#FA5858",
        borderRadius: 10,
        borderColor: 'black',
        width: 60,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:10,
        marginLeft:10,
      },

});

export default AeforeReview;