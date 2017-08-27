/**
 * Created by lmy2534290808 on 2017/8/25.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import DetailDownloadPage from "../detaildownloadpage/DetailDownloadPage";
import SimpleSearchBar from "../downloadpage/SimpleSearchBar";
import Constants from '../Constants';
export default class DetailDownloadScreen extends Component {
    static navigationOptions = {
        headerTitle: '下载',
        headerStyle: {backgroundColor: Constants.color.themeColor},
        headerTitleStyle:{color:"#fff"}
    }

    render() {
        return (<DetailDownloadPage/>)
    }
}