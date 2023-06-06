import { View, Text } from "react-native";
import React, { useState } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";

import { calendarStyle } from "../styles";
import ReceiptView, {} from "./ReceiptView";

LocaleConfig.locales["kr"] = {
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월 ",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월 ",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  monthNamesShort: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월 ",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  dayNames: [
    "일요알",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  today: "오늘!",
};

LocaleConfig.defaultLocale = "kr";

const CalendarView = () => {
  const [selected, setSelected] = useState("");

  return (
    <View>
      <View style={calendarStyle.calendarView}>
        <Calendar
          style={calendarStyle.calendar}
          monthFormat={"yyyy년 MM월"}
          onDayPress={(day) => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: "pink",
            },
          }}
          theme={{
            "stylesheet.calendar.header": {
              dayTextAtIndex0: {
                color: "red",
              },
              dayTextAtIndex6: {
                color: "blue",
              },
            },
            textSectionTitleDisabledColor: "pink",
            selectedDayBackgroundColor: "#009966",
            todayTextColor: "#009966",
            arrowColor: "#009966",
            dotColor: "#009966",
          }}
        ></Calendar>
      </View>

      <View style = {calendarStyle.todayTextView}>
        <Text style = {calendarStyle.todaytextStyle}>
          Select Day : {selected}
        </Text>
      </View>

      <View>
        <ReceiptView 
          onSelectedDay = {selected}
        ></ReceiptView>
      </View>
    </View>
  );
};

export default CalendarView;