/**
 * Created by lmy2534290808 on 2017/8/23.
 * APP的第一个屏
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import ScrollableView from 'react-native-scrollable-tab-view';
import IconTabBar from "../IconTabBar";
import Colors from '../Colors';
import MainPage from "../mainpage/MainPage";
import DownLoadPage from "../downloadpage/DownLoadPage";
import UploadPage from "../uploadpage/UploadPage";
import Entrance from "../Entrance";
export default class MainScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super();
        this.state = {
            tabNames: ['主页', '上传'],
            tabIconNames: ['ios-home-outline', 'ios-cloud-upload-outline'],
            activeTabIconNames: ['ios-home', 'ios-cloud-upload'],
            showEntrance:true,
        };
    }

    _renderTabBar() {
        return (<IconTabBar activeTabColor={Colors.appColor} tabNames={this.state.tabNames}
                            tabIconNames={this.state.tabIconNames}
                            activeTabIconNames={this.state.activeTabIconNames}/>)
    }

    render() {
        return (<View style={{flex:1,backgroundColor:'transparent'}}><ScrollableView tabBarPosition="bottom" renderTabBar={() => this._renderTabBar()}>
            <MainPage tabLabel="1" navigation={this.props.navigation}/>
            <UploadPage tabLabel="2"/>
        </ScrollableView></View>)
    }
}
