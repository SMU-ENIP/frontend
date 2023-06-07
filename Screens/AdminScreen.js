import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AeforeReview from "../Components/Admin/AeforeReview"
import BeforeReview from '../Components/Admin/BeforeReview'

const TopTab = createMaterialTopTabNavigator();

function AdminScreen(){
    return(
        <NavigationContainer>
            <TopTab.Navigator>
                <TopTab.Screen name = "미션 검토 전" component ={ BeforeReview } />
                <TopTab.Screen name = "미션 검토 후" component ={ AeforeReview } />
            </TopTab.Navigator>
        </NavigationContainer>
    )
}

export default AdminScreen;