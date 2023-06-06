import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

function MyPageScreen() {
  const [name, setName] = useState('이성재');
  const [profileImage, setProfileImage] = useState(null);
  const [savedProfile, setSavedProfile] = useState(null);

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
  
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>마이페이지</Text>
      <TextInput
        style={{
          width: '100%',
          height: 40,
          borderColor: '#CCCCCC',
          borderWidth: 1,
          borderRadius: 5,
          paddingHorizontal: 10,
          marginBottom: 20,
        }}
        onChangeText={handleNameChange}
        value={name}
        placeholder="이름"
      />
      <TouchableOpacity onPress={handleChooseProfileImage}>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: '#E0E0E0',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={{ width: 100, height: 100, borderRadius: 50 }} />
          ) : (
            <Text style={{ color: '#AAAAAA', fontSize: 12 }}>프로필 사진</Text>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: '#2196F3', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 5, marginBottom: 20 }}
        onPress={handleProfileSave}
      >
        <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>프로필 저장</Text>
      </TouchableOpacity>
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
    </View>
  );
}

export default MyPageScreen;