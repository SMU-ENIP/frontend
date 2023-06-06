import * as React from 'react';
import { Text, View } from 'react-native';
import CalendarView from '../Components/Calenders/CalendarView';
import PopUp from '../Components/Calenders/PopUp';

function AccountBookScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CalendarView></CalendarView>
    </View>
  );
}

export default AccountBookScreen