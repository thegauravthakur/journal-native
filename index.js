/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en';
TimeAgo.addDefaultLocale(en);
AppRegistry.registerComponent(appName, () => App);
