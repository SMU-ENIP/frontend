import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { homeIconStyle } from '../styles';

function Home(props){

  return (
    <View style = {{ 
      flex: 1, 
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    }}>
      <TouchableOpacity
        style = { homeIconStyle.iconStyle }
        onPress={() => props.navigation.navigate("Upload")}
      >
        <Image
          style = {{
            width: 50, 
            height: 50,
            marginBottom: 20,
          }}
          source={ require('C:/Project/Mobile/SMU-Enip/assets/ReceiptScan.png') }
        ></Image>
        <Text
          style = { homeIconStyle.iconTextStyle }
        >영수증 업로드</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style = { homeIconStyle.iconStyle }
        onPress={() => props.navigation.navigate("Ranking")}
      >
        <Image
          style = {{
            width: 50, 
            height: 50,
            marginBottom: 20,
          }}
          source={ require('C:/Project/Mobile/SMU-Enip/assets/Ranking.png') }
        ></Image>
        <Text
          style = { homeIconStyle.iconTextStyle }
        >환경 지킴이 랭킹</Text>
      </TouchableOpacity>   
    </View>
  );
}

export default Home;