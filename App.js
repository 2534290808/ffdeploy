/**
 * Created by lmy2534290808 on 2017/8/23.
 */
import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import Constants from './view/Constants';
import MainScreen from "./view/screen/MainScreen";
import QRScanScreen from './view/screen/QRScanScreen'
import DetailDownloadScreen from './view/screen/DetailDownloadScreen'
import {StackNavigator} from 'react-navigation';
const App=StackNavigator({
    "Main":{screen:MainScreen},
    'QRScan':{screen:QRScanScreen},
    'DetailDownload':{screen:DetailDownloadScreen}
})
export default App;
