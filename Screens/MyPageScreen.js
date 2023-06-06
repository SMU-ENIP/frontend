import React, { useState, useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

function MyPageScreen() {
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [savedProfile, setSavedProfile] = useState({});
  const [isInputFocused, setInputFocused] = useState(false);
  //const {user,setUser} = useContext(UserContext)
  
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
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5', padding: 20 }}>
  <TouchableOpacity onPress={handleChooseProfileImage} style={{ marginBottom: 20 }}>
    {profileImage ? (
      <Image source={{ uri: profileImage }} style={{ width: 150, height: 150, borderRadius: 80 }} />
    ) : (
      <View style={{ width: 150, height: 150, borderRadius: 80, backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#AAAAAA', fontSize: 12 }}>프로필 사진</Text>
      </View>
    )}
  </TouchableOpacity>
  <View style={{ alignItems: 'center', marginBottom: 10 }}>
    {savedProfile && (
      <>
        <Text style={{ fontSize: 25, fontWeight: 'bold',fontFamily: "BMJUA" }}>프로필 정보</Text>
        <Text style={{ fontSize: 16, marginTop: 20, fontFamily: "BMJUA" }}>이름: {savedProfile.name}</Text>
      </>
    )}
  </View>
  <View style={{ alignItems: 'center', marginTop: 20 }}>
    <TextInput
      style={{
        width: 200,
        height: 40,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: isInputFocused ? '#000000' : '#bbbbbb',
        marginBottom: 10
      }}
      onChangeText={handleNameChange}
      value={name}
      onFocus={() => setInputFocused(true)}
      onBlur={() => setInputFocused(false)}
      placeholder={isInputFocused ? '' : '이름을 입력하세요.'}
    />
    <TouchableOpacity
      style={{ backgroundColor: '#14870c', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 5 }}
      onPress={handleProfileSave}
    >
      <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>프로필 저장</Text>
    </TouchableOpacity>
  </View>
</View>

  );
}

export default MyPageScreen;
