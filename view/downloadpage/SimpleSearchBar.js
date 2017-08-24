/**
 * Created by lmy2534290808 on 2017/8/24.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableNativeFeedback} from 'react-native';
import PropTypes from 'prop-types';
import {SearchBar, Icon, Button} from 'react-native-elements';
import Util from '../Util';
import Constants from '../Constants';
export default class SimpleSearchBar extends Component {
    static propTypes = {
        leftIconPress: PropTypes.func,
        onChangeText: PropTypes.func,
        rightBtnPress: PropTypes.func
    }

    _leftIconPress() {
        this.props.leftIconPress ? this.props.leftIconPress() : null
    }

    _changeText(value) {
        this.props.onChangeText ? this.props.onChangeText(value) : null
    }

    _rightBtnPress() {
        this.props.rightBtnPress ? this.props.rightBtnPress() : null
    }

    render() {
        return (
            <View style={styles.searchBar}><TouchableNativeFeedback onPress={this._leftIconPress.bind(this)}><View
                style={styles.leftIcon}>
                <Icon name="md-menu" type="ionicon"/></View></TouchableNativeFeedback><SearchBar
                containerStyle={{flex: 1}}
                lightTheme
                inputStyle={{backgroundColor: '#fff'}}
                round
                onChangeText={this._changeText.bind(this)}
                placeholder='输入单位名' clearIcon={{color: '#86939e', name: 'clear'}}/><TouchableNativeFeedback
                onPress={this._rightBtnPress.bind(this)}><View
                style={styles.rightBtn}><Text
                style={{textAlign: 'center'}}>搜索</Text></View></TouchableNativeFeedback></View>)
    }
}
const styles = StyleSheet.create({
    searchBar: {
        flexDirection: 'row',
        backgroundColor: Constants.color.grey5
    },
    leftIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5
    },
    rightBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5
    }
})