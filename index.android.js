/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View, Button, ScrollView,TextInput
} from 'react-native';
import App from "./App";
import ExtinguisherDeploy from "./view/extinguisherdeploy/ExtinguisherDeploy";
export default class ffdeploy extends Component {

    render() {
        return (<App/>);
    }
}
AppRegistry.registerComponent('ffdeploy', () => ffdeploy);
