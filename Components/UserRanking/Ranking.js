import { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import Axios from 'axios';

const Ranking = () => {
  const [data, setData] = useState([]);
  const [rankType, setRankType] = useState('score');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await Axios.get("https://www.smu-enip.site/user/rank?value=weight"); //Replace with your actual API endpoint
      const fetchedData = response.data;
      setData(fetchedData);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const updateRankings = () => {
    const sortedData = [...data].sort((a, b) => b[rankType] - a[rankType]);
    const rankedData = sortedData.map((item, index) => ({
      ...item,
      rank: index + 1,
    }));
    setData(rankedData);
  };

  const handleRankingToggle = () => {
    const newRankType = rankType === 'score' ? 'weight' : 'score';
    setRankType(newRankType);
    updateRankings();
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
            <View style={styles.tableRow} key={index}>
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
    backgroundColor: 'green', // 버튼 배경색
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white', // 버튼 텍스트 색상
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#c8e6c9',
    borderRadius: 5,
    overflow: 'hidden',
    marginHorizontal: 15, 
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#81c784', // 헤더 배경
    paddingVertical: 10,
  },
  columnHeader: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white', // 헤더 텍스트 색상
    fontSize: 18,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
  },
  column: {
    flex: 1,
    textAlign: 'center',
    color: 'black', // 데이터 텍스트 색상
    paddingVertical: 5,
  },
});

export default Ranking;