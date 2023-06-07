import React, { useState } from "react";
import { View, Text } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { calendarStyle } from "../styles";
import ReceiptView from "./ReceiptView";

LocaleConfig.locales["kr"] = {
  monthNames: Array.from({ length: 12 }, (_, i) => `${i + 1}월`),
  monthNamesShort: Array.from({ length: 12 }, (_, i) => `${i + 1}`),
  dayNames: [
    "일요일",
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

  const handleDayPress = (day) => {
    setSelected(day.dateString);
  };

  return (
    <View>
      <View style={calendarStyle.calendarView}>
        <Calendar
          style={calendarStyle.calendar}
          monthFormat={"yyyy년 MM월"}
          onDayPress={handleDayPress}
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
            selectedDayBackgroundColor: "#009966",
            todayTextColor: "#009966",
            arrowColor: "#009966",
            dotColor: "#009966",
          }}
        />
      </View>

      <View style={calendarStyle.todayTextView}>
        <Text style={calendarStyle.todaytextStyle}>
          Select Day: {selected}
        </Text>
      </View>

      <ReceiptView onSelectedDay={selected} />
    </View>
  );
};

export default CalendarView;