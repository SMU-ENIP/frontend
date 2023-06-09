import React, { useState, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';
import Axios from 'axios';
import UserContext from '../../context/UserContext';

const Complete = (props) => {

  //영수증 내용 리스트
  const [renderList,setRenderList] = useState([]);

  const {user, setUser} = React.useContext(UserContext)

  const receiptListToken = {
    Authorization: `Bearer ${user ? user.token : 'Unknown'}`
  };

  const fetchData = () =>{
    Axios.get("https://www.smu-enip.site/item/list", {
       headers: receiptListToken,
    }).then((res)=>{
      setRenderList(res.data)
      console.log(renderList)
    }).catch((err)=>{
      console.log(err)
    })
 }

  //서버에서 영수증 정보를 불러옴
  useEffect(() => {
    fetchData();
  },[]);

  const Item = ({item}) => (
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
          <Text style={[styles.recycleTextStyle]}>{item.name}</Text>
          <Text style={[styles.recycleTextStyle]}>{item.trashAmount}</Text>
        </View>

        <View style={[styles.ButtonStyle]}>
          <View style={[styles.uploadButtonStyle]}>  
            <Text style={[styles.infoTextStyle]}>검토완료</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={renderList}
        renderItem={Item}
        keyExtractor={item => item.id.toString()}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
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
    width: 100,
    marginRight:10,
  },
  ButtonStyle: {
    marginRight:10,
    marginTop: 100,
    alignItems: 'flex-end',
    justifyContent: 'center',
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
    fontSize: 20,
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
  uploadButtonStyle: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: "#6E6E6E",
    borderRadius: 10,
    borderColor: 'black',
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Complete;