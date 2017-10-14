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
import QRScanView from "./view/qrscanpage/QRScanView";
import QRScanView1 from "./view/qrscanpage/QRScanView1";
export default class ffdeploy extends Component {

    render() {
        return (<App/>);
    }
}
AppRegistry.registerComponent('ffdeploy', () => ffdeploy);
