import { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { RankingStyle } from '../styles';
import Axios from 'axios';

const Ranking = () => {
  const [data, setData] = useState([]); //데이터 상태 관리
  const [rankType, setRankType] = useState('score'); //랭킹 종류 관리

  useEffect(() => {
    fetchData();
  }, []); //fetchdata 함수 호출

  const fetchData = async () => {
    try {
      const response = await Axios.get("https://www.smu-enip.site/user/rank?value=weight"); //Replace with your actual API endpoint
      const fetchedData = response.data; //응답데이터 추출
      setData(fetchedData); //데이터 상태 업데이트
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const updateRankings = () => {
    const sortedData = [...data].sort((a, b) => b[rankType] - a[rankType]); //랭킹 데이터 정렬
    const rankedData = sortedData.map((item, index) => ({
      ...item,
      rank: index + 1,
    })); //정렬 순위 추가
    setData(rankedData); //랭킹데이터 업데이트
  };

  const handleRankingToggle = () => {
    const newRankType = rankType === 'score' ? 'weight' : 'score';
    setRankType(newRankType); //랭킹 종류 업데이트
    updateRankings(); //호출
  };

  const renderRankingButton = () => {
    return (
      <View style={RankingStyle.buttonContainer}>
        <TouchableOpacity
          style={RankingStyle.button}
          onPress={handleRankingToggle}
        >
          <Text style={RankingStyle.buttonText}> 
            {`랭킹 (${rankType === 'score' ? '점수' : '무게'})`} 
          </Text> 
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        <View style={RankingStyle.tableContainer}>
          <View style={RankingStyle.tableHeader}>
            <Text style={RankingStyle.columnHeader}>순위</Text>
            <Text style={RankingStyle.columnHeader}>이름</Text>
            <Text style={RankingStyle.columnHeader}>무게</Text>
            <Text style={RankingStyle.columnHeader}>점수</Text>
          </View>

          {data.map((item, index) => (
            <View style={[RankingStyle.tableRow, { backgroundColor: RankingStyle.rowColors[index % RankingStyle.rowColors.length] }]} key={index}>
              <Text style={RankingStyle.column}>{index + 1}</Text>
              <Text style={RankingStyle.column}>{item.nickName}</Text>
              <Text style={RankingStyle.column}>{item.weight}</Text>
              <Text style={RankingStyle.column}>{item.score}</Text>
            </View>
          ))}
        </View>
        {renderRankingButton()}
      </View>
    </ScrollView>
  );
};

export default Ranking;