import React, { useEffect} from 'react';
import MainScreen from "./Screens/MainScreen";
import AdminScreen from "./Screens/AdminScreen";
import * as Font from 'expo-font';

export default function App() {
  useEffect(() => {
    const getFonts = async () => {
      await Font.loadAsync({
        BMJUA: require("./assets/fonts/BMJUA.ttf"),
      });
    };

    getFonts();
  }, []);

  return (
    <MainScreen></MainScreen>
  );
}
