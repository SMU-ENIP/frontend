import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AeforeReview from "../Components/Admin/AeforeReview"
import BeforeReview from '../Components/Admin/BeforeReview'
import AdminLogoutScreen from './AdminLogoutScreen'

const TopTab = createMaterialTopTabNavigator();

function AdminScreen(){
    return(
            <TopTab.Navigator>
                <TopTab.Screen name = "미션 검토 전" component ={ BeforeReview } />
                <TopTab.Screen name = "미션 검토 후" component ={ AeforeReview } />
                <TopTab.Screen name = "로그아웃" component ={ AdminLogoutScreen } />
            </TopTab.Navigator>
    )
}

export default AdminScreen;