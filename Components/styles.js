import { StatusBar, StyleSheet } from "react-native";
import {
  responsiveScreenWidth,
  responsiveScreenHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
  marginView: {
    marginTop: 10,
    arginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  marginCenterView: {
    marginTop: 10,
    arginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  centerView: {
    justifyContent: 'center', 
    alignItems: 'center',
  }
});

export const calendarStyle = {
  calendarView: {
    marginTop: "10%",
    arginBottom: 10,
    width: responsiveScreenWidth(90),
  },
  calendar: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    width: responsiveScreenWidth(90),
  },
  todayTextView: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    height: 50,
    backgroundColor: "#D4ECE4",
    borderColor: "grey",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  todaytextStyle: {
    fontSize: 15,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
};

export const receiptStyle = {
  receiptTitle: {
    fontSize: 32,
  },
  receiptText: {
    fontSize: 15,
  },
  receiptFlatListView: {
    height: responsiveScreenHeight(30),
    width: responsiveScreenWidth(90),
    marginBottom: 50,
  },
  marginView: {
    width: "100%",
    marginTop: 5,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalImage: {
    width: 300,
    height: 500,
    resizeMode: "contain",
  },
};

export const userImageStyle = {
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderColor: "Black",
    borderWidth: 2,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  photoButtonImage: {
    width: 20,
    height: 20,
    borderRadius: 100,
    borderColor: "Black",
    borderWidth: 1,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
};

export const homeIconStyle = {
  iconTextStyle: {
    fontSize: 8,
    fontWeight: "bold",
  },
  iconStyle: {
    justifyContent: 'center', 
    alignItems: 'center',
    marginleft: 20,
    marginRight: 20,
    marginTop: 20,
  },
}
