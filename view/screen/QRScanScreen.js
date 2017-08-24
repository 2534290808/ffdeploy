/**
 * Created by lmy2534290808 on 2017/8/15.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, DeviceEventEmitter} from 'react-native';
import PropTypes from 'prop-types';
import {NavigationActions} from 'react-navigation';
import QRScanPage from "../qrscanpage/QRScanPage";
export default class QRScanScreen extends Component {
    static navigationOptions = {
        title: '二维码扫描',
        headerStyle: {backgroundColor: '#ffcc03'},
        headerTitleStyle: {color: 'white'}
    }
    render() {
        return (<QRScanPage barcodeReceived={(rec) => {

        }}/>)
    }
}