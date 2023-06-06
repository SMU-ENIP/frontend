import { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import Axios from 'axios';

const Raking = () => {
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleRankingToggle}
        >
          <Text style={styles.buttonText}>
            {`랭킹 (${rankType === 'score' ? '점수' : '무게'})`}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.columnHeader}>순위</Text>
            <Text style={styles.columnHeader}>이름</Text>
            <Text style={styles.columnHeader}>무게</Text>
            <Text style={styles.columnHeader}>점수</Text>
          </View>

          {data.map((item, index) => (
  <View style={[styles.tableRow, { backgroundColor: styles.rowColors[index % styles.rowColors.length] }]} key={index}>
    <Text style={styles.column}>{index + 1}</Text>
    <Text style={styles.column}>{item.nickName}</Text>
    <Text style={styles.column}>{item.weight}</Text>
    <Text style={styles.column}>{item.score}</Text>
  </View>
))}


        </View>
        {renderRankingButton()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10, 
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableContainer: {
    backgroundColor: '#c8e6c9',
    borderRadius: 5,
    overflow: 'hidden',
    marginHorizontal: 15,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#81c784', 
    paddingVertical: 10,
  },
  columnHeader: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white', 
    fontSize: 18,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  column: {
    flex: 1,
    textAlign: 'center',
    color: 'black',
    paddingVertical: 5,
  },
  rowColors: ['#f0f8f6', '#e0f2e9'], 
});

export default Raking;