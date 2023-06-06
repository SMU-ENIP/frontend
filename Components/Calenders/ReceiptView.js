import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import Axios from "axios";
import { receiptStyle } from "../styles";

const ReceiptView = (props) => {
  const [selectedId, setSelectedId] = useState();

  //모달 상태 변수
  const [modalVisible, setModalVisible] = useState(false);

  //선택된 Item의 이미지 경로의 상태 변수
  const [selectedItemImage, setSelectedItemImage] = useState("");

  //영수증 내용 리스트
  const [renderList,setRenderList] = useState([]);

  const receiptListToken = {
    Authorization: `Bearer eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE2ODYwMjUyMDMsInN1YiI6IjEiLCJ1c2VySWQiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiUk9MRV9VU0VSIiwicHJvdmlkZXIiOiJMT0NBTCIsImV4cCI6MTY4NjExMTYwM30.8ch4q4UezZQ_KPoAd62c3g30zEZsf8QPt77Rjz3RRTLPHTWjGI6Mt9l7jS77wkL5`,
  };
  
  //서버에서 영수증 정보를 불러옴
  useEffect(() => {
  const fetchData = async() =>{
    try {
      const res = await Axios.get("https://www.smu-enip.site/item/list", {
        headers: receiptListToken,
        params: {
          date: (props.onSelectedDay),
        },
      })

      const uniqueData = res.data.filter((item, index, self) =>
        index === self.findIndex((t) => (
          t.id === item.id
        ))
      );

      setRenderList(uniqueData);

      console.log(renderList)
      console.log(props.onSelectedDay)

    } catch (error) {
      console.log(error);
    }
  }

    fetchData();
  },[props.onSelectedDay]);
  
  
  //openModal의 상태 정의
  function openModal(item) {
    setSelectedId(item);
    setModalVisible(true);
  }

  //openModal의 상태 정의
  function closeModal() {
    setModalVisible(false);
  }

  //영수증을 나타내는 아이템 리스트
  const Item = ({ item, onPress, backgroundColor, textColor }) => {

    return(
      <TouchableOpacity
        onPress={ onPress }
        style={[styles.item, { backgroundColor }]}
      >
      <View
        style = {{
          flexDirection: 'row'
        }}
      >
        <Text style={[receiptStyle.receiptTitle, { color: textColor }]}> {item.receiptList} </Text>
        <Text style={[receiptStyle.receiptText, { color: textColor }]}> {item.date} </Text>
      </View>
      <View
        style = {{
          flexDirection: 'row'
        }}
      >
        <Text style={[receiptStyle.receiptText, { color: textColor }]}> {item.trashAmount} </Text>
        <Text style={[receiptStyle.receiptText, { color: textColor }]}>  {item.expenditureCost} </Text>
      </View>
    </TouchableOpacity>
    );
  }
  
  //아이템 리스트를 불러와 리스트를 구성함.
  const renderItem = ({ item }) => {
    const idbackgroundColor = item.id === selectedId ? "#009966" : "#ABDECD";
    const idcolor = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress = {() => {openModal(item.id)
          setSelectedItemImage(item.purchasedItemExampleImage);
          }
        }
        backgroundColor={idbackgroundColor}
        textColor={idcolor}
      />
    );
  };

  return (
    <View style={styles.marginView}>
        <SafeAreaView>
          <FlatList
            style={receiptStyle.receiptFlatListView}
            data={renderList}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            extraData={selectedId}
          />
        </SafeAreaView>

        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            {selectedId && (
              <TouchableOpacity
                style={styles.modalContent}
                onPress={closeModal}
              >
                <Image
                  source={{ uri: selectedItemImage }} // 'imageUri'를 실제 데이터 객체에서 이미지 URI 속성으로 대체하세요.
                  style={styles.modalImage}
                />
              </TouchableOpacity>
            )}
          </View>
        </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  marginView: {
    width: "100%",
    marginTop: 5,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalImage: {
    width: 300,
    height: 500,
    resizeMode: "contain",
  },
});

export default ReceiptView;
