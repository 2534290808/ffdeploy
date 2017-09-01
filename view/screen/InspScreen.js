/**
 * Created by lmy2534290808 on 2017/8/29.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text,Button} from 'react-native';
import PropTypes from 'prop-types';
import InspPage from "../Insppage/InspPage";
import {Icon} from 'react-native-elements';
export default class InspScreen extends Component {
    static navigationOptions = {
        title: '部署',
    }

    render() {
        return (<InspPage navigation={this.props.navigation}/>)
    }
}