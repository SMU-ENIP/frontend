import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Complete from '../Components/Quest/Complete';
import Incomplete from '../Components/Quest/Incomplete';
import Proceeding from '../Components/Quest/Proceeding';

const TopTab = createMaterialTopTabNavigator();

export default function QuestTab() {
  return (
    <TopTab.Navigator
      tabBarOptions={{
        indicatorStyle: { backgroundColor: 'green' }, 
      }}
    >
      <TopTab.Screen name="미션 진행 전" component={Incomplete} />
      <TopTab.Screen name="미션 검토중" component={Proceeding} />
      <TopTab.Screen name="미션 완료" component={Complete} />
    </TopTab.Navigator>
  );
}
