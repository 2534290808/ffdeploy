/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import App from "./App";
import AppTest from './AppTest';
import ModalTest from "./test/ModalTest";
import {Button} from 'antd-mobile';
import {SearchBar} from 'react-native-elements';
export default class ffdeploy extends Component {
  render() {
    return (
      <App/>
    );
  }
}
AppRegistry.registerComponent('ffdeploy', () => ffdeploy);
