import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ShareExample from "./components/ShareExample";

export default function App() {
  return (
    <View style={styles.container}>
      <ShareExample></ShareExample>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
