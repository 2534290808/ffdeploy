/**
 * Created by lmy2534290808 on 2017/8/28.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import HydrantDeployPage from "../deploy/DeployPage";
export default class DeployScreen extends Component {
    static navigationOptions =({ navigation, screenProps }) => ({
        title: navigation.state.params.title,
    });


    render() {
        return (<HydrantDeployPage navigation={this.props.navigation}/>)
    }
}