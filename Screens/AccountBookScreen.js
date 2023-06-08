import { View } from 'react-native';
import CalendarView from '../Components/Calenders/CalendarView';

function AccountBookScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CalendarView></CalendarView>
    </View>
  );
}

export default AccountBookScreen