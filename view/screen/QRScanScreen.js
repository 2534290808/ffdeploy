/**
 * Created by lmy2534290808 on 2017/8/15.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, DeviceEventEmitter} from 'react-native';
import PropTypes from 'prop-types';
import {NavigationActions} from 'react-navigation';
import QRScanPage from "../qrscanpage/QRScanPage";
import Constants from '../Constants';
export default class QRScanScreen extends Component {
    static navigationOptions = {
        title: '二维码扫描',
        headerRight:null
    }

    _sendHydrant(rec) {
        let {inspType,title}=this.props.navigation.state.params;
        /*let action = NavigationActions.reset({
            index: 2,
            actions: [NavigationActions.navigate({routeName: Constants.screen.Main}),
                NavigationActions.navigate({routeName:Constants.screen.InspMain}),
            NavigationActions.navigate({routeName:Constants.screen.Deploy,params:{inspType:inspType,title:title,qrCode:rec.data}})]
        })
            this.props.navigation.dispatch(action)*/

    }

    render() {
        return (<QRScanPage barcodeReceived={(rec) => {
          this._sendHydrant(rec);
        }}/>)
    }
}