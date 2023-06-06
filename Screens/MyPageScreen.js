import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

function MyPageScreen() {
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [savedProfile, setSavedProfile] = useState(null);
  const [rankingScore, setRankingScore] = useState(0);
  const [isInputFocused, setInputFocused] = useState(false);

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleProfileSave = () => {
    const profile = {
      name: name,
      profileImage: profileImage,
    };
    setSavedProfile(profile);
    console.log('프로필 저장:', profile);
    setName("");
  };

  const handleChooseProfileImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('갤러리 접근 권한이 필요합니다.');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      setProfileImage(pickerResult.uri);
    }
  };

  // Simulating the retrieval of ranking score from an external source
  useEffect(() => {
    // Replace this with your actual implementation to fetch the ranking score
    const fetchRankingScore = async () => {
      try {
        // Simulating an API call to get the ranking score
        const response = await fetch('');
        const data = await response.json();

        // Assuming the ranking score is stored in the 'score' field of the response
        setRankingScore(data.score);
      } catch (error) {
        console.error('Error retrieving ranking score:', error);
      }
    };
    fetchRankingScore();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}></Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <TouchableOpacity onPress={handleChooseProfileImage}>
          <View style={{ marginRight: 20 }}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={{ width: 100, height: 100, borderRadius: 50 }} />
            ) : (
              <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#AAAAAA', fontSize: 12 }}>프로필 사진</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
        <TextInput
          style={{
            flex: 1,
            height: 40,
            borderColor: '#CCCCCC',
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
            color: isInputFocused ? '#000000' : '#bbbbbb',
          }}
          onChangeText={handleNameChange}
          value={name}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          placeholder={isInputFocused ? '' : '이름을 입력하세요.'}
        />
      </View>
      {savedProfile && (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>저장된 프로필 정보:</Text>
          <Text style={{ fontSize: 16 }}>이름: {savedProfile.name}</Text>
          <Image
            source={{ uri: savedProfile.profileImage }}
            style={{ width: 150, height: 150, borderRadius: 75, marginTop: 20 }}
          />
        </View>
      )}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>랭킹 점수: {rankingScore}</Text>
      <TouchableOpacity
        style={{ backgroundColor: '#14870c', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 5, marginBottom: 20 }}
        onPress={handleProfileSave}
      >
      <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>프로필 저장</Text>
      </TouchableOpacity>
    </View>
  );
}

export default MyPageScreen;
