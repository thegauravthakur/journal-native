import { Text, View } from 'react-native';
import * as React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { activeDateState, markedDateState, themeState } from '../recoil/atom';
import colorScheme from '../constants/colorScheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Calendar } from 'react-native-calendars';
import { useState } from 'react';

const CustomHeader = () => {
  const theme = useRecoilValue(themeState);
  const markedDates = useRecoilValue(markedDateState);
  const [activeDate, setActiveDate] = useRecoilState(activeDateState);
  const [expand, setExpand] = useState(false);
  return (
    <View>
      <View
        style={{
          padding: 10,
          backgroundColor: colorScheme[theme].card,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{ color: colorScheme[theme].text }}>hello</Text>
        <Icon
          onPress={() => setExpand(!expand)}
          name={'calendar'}
          size={30}
          color={colorScheme[theme].text}
        />
      </View>
      {expand && (
        <Calendar
          theme={{ calendarBackground: colorScheme[theme].card }}
          key={theme}
          markedDates={markedDates}
          current={activeDate}
          onDayPress={({ timestamp }) => {
            setActiveDate(new Date(timestamp));
            // props.navigation.navigate('DayView');
          }}
          style={{}}
        />
      )}
    </View>
  );
};

export default CustomHeader;
