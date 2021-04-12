import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AddTaskInput } from './AddTaskInput';
import { format } from 'date-fns';

export function RenderDetail({ rowData }): React.ReactElement {
  const { id, time, title, description } = rowData;
  if (id) {
    return <AddTaskInput />;
  }
  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>{title}</Text>
      <Text style={Styles.description}>{description}</Text>
      <Text style={Styles.date}>{format(new Date(time), 'do LLL, yyyy')}</Text>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    marginTop: -5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 19,
  },
  description: {
    marginTop: 5,
    fontSize: 16,
    lineHeight: 25,
    fontFamily: 'segoeui',
  },
  date: {
    marginTop: 10,
    fontWeight: 'bold',
  },
});
