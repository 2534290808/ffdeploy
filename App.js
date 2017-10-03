/**
 * Created by lmy2534290808 on 2017/8/23.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableNativeFeedback} from 'react-native';
import PropTypes from 'prop-types';
import Constants from './view/Constants';
import {Icon} from 'react-native-elements';
import MainScreen from "./view/screen/MainScreen";
import QRScanScreen from './view/screen/QRScanScreen'
import DetailDownloadScreen from './view/screen/DetailDownloadScreen'
import DeployScreen  from './view/screen/DeployScreen';
import InspScreen from './view/screen/InspScreen';
import ExtinguisherDeploy from './view/extinguisherdeploy/ExtinguisherDeploy';
import {StackNavigator, CardStackTransitioner} from 'react-navigation';
const App = StackNavigator({
    "Main": {screen: MainScreen},
    'QRScan': {screen: QRScanScreen},
    'DetailDownload': {screen: DetailDownloadScreen},
    'Deploy': {screen: DeployScreen},
    'InspMain': {screen: InspScreen},
    'ExtinguisherDeploy': {screen: ExtinguisherDeploy}
}, {
    navigationOptions:({navigation})=>({
        headerStyle: {backgroundColor: '#ffcc03',},
        headerTitleStyle: {color: '#fff',fontWeight:'normal'},
        headerTintColor: '#fff',
        //headerRight: <TouchableNativeFeedback onPress={()=>{navigation.dispatch(Constants.actions.toMainAction)}}><View style={{flex:1,justifyContent:'center',alignItems:'center',width:56}}><Icon name="md-close" type="ionicon"
                                                          //color="#fff"/></View></TouchableNativeFeedback>,
    })
})
export default App;
