import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Components/RecieptUpload/Home';
import Upload from '../Components/RecieptUpload/Upload';
import Ranking from '../Components/UserRanking/Ranking';

const Stack = createStackNavigator();

function HomeScreen(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Upload" component={Upload} />
      <Stack.Screen name="Ranking" component={Ranking} />
    </Stack.Navigator>
  );
}

export default HomeScreen;