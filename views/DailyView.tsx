import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import { RenderDetail } from '../components/RenderDetail';
import Icon from 'react-native-vector-icons/Feather';
import { useRecoilState } from 'recoil';
import { descriptionInputState, titleInputState } from '../recoil/atom';

export function DailyView(): React.ReactElement {
  const [title, setTitle] = useRecoilState(titleInputState);
  const [description, setDescription] = useRecoilState(descriptionInputState);
  const inputRef: any = useRef();
  useEffect(() => {
    inputRef.current.onClick = () => {
      console.log('hello');
    };
  });
  const [data, setData] = useState([
    {
      icon: (
        <Icon
          ref={inputRef}
          // onPress={() => {
          //   const temp = [...data];
          //   temp.push({
          //     title,
          //     description,
          //     icon: <Icon name='edit' size={20} color='#78787a' />,
          //     time: Date.now(),
          //   });
          //   setData(temp);
          //   console.log(data);
          // }}
          name='plus'
          size={20}
          color='#78787a'
        />
      ),
      id: 'reserved',
    },
    {
      title: 'Event 1 Description',
      icon: <Icon name='edit' size={20} color='#78787a' />,
      time: 1618136035755,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
      title: 'Event 2 Description',
      icon: <Icon name='edit' size={20} color='#78787a' />,
      time: 1618136035655,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
      title: 'Event 3 Description',
      icon: <Icon name='edit' size={20} color='#78787a' />,
      time: 1618136035625,
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis',
    },
    {
      title: 'Event 4 Description',
      icon: <Icon name='edit' size={20} color='#78787a' />,
      time: 1618136035555,
      description:
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores',
    },
    {
      title: 'Event 5 Description',
      icon: <Icon name='edit' size={20} color='#78787a' />,
      time: 1618136035455,
      description:
        'slore aieo lcnoe wopqn mdoe hnvowl ls dfioej  cjvod oie  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis',
    },
    {
      title: 'Event 5 Description',
      icon: (
        <Icon
          onPress={() => console.log('hello')}
          name='edit'
          size={20}
          color='#78787a'
        />
      ),
      time: 1618136035155,
      description:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
  ]);
  return (
    <View style={Styles.container}>
      <Timeline
        listViewContainerStyle={{ paddingTop: 20 }}
        lineWidth={2}
        circleSize={40}
        circleColor='#ebebed'
        style={Styles.list}
        data={data}
        showTime={false}
        lineColor='#BDBDBD'
        renderDetail={rowData => <RenderDetail rowData={rowData} />}
        innerCircle={'icon'}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    marginRight: 10,
  },
});
