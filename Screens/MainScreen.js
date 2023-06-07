import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccountBookScreen from '../Screens/AccountBookScreen';
import HomeScreen from '../Screens/HomeScreen';
import MyPageScreen from '../Screens/MyPageScreen';
import QuestScreen from '../Screens/QuestScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'AccountBook') {
              iconName = 'calendar';
            } else if (route.name === 'Quest') {
              iconName = 'receipt-outline';
            } else if (route.name === 'MyPage') {
              iconName = 'person';
            }

            return <Icon name={iconName} color={color} size={size} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'green',
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen name="AccountBook" component={AccountBookScreen} />
        <Tab.Screen name="Quest" component={QuestScreen} />
        <Tab.Screen name="MyPage" component={MyPageScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainScreen;