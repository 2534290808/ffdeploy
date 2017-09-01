/**
 * Created by lmy2534290808 on 2017/8/31.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import PropTypes from 'prop-types';
export default class NativeInput extends Component {
    static propTypes = {
        label: PropTypes.string,
        flexLabel: PropTypes.number,
        flexInput: PropTypes.number,//其他为textinput的所有属性
    }
    static defaultProps = {
        label: 'label',
        flexLabel: 0,
        flexInput: 1,
    }

    render() {
        return (<View style={styles.inputContainer}><Text
            style={[styles.inputLabel, {flex: this.props.flexLabel}]}>{this.props.label}</Text><TextInput {...this.props}//使用延展操作符必須為組件的第一個參數
            style={[styles.inputStyle, {flex: this.props.flexInput}]}
            underlineColorAndroid='transparent'/></View>)
    }
}
const styles = {
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginLeft: 16,
        marginRight: 16,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ffcc03',
    },
    inputStyle: {
        flex: 1
    },
    inputLabel: {fontSize: 17, color: '#000',marginBottom:14,marginTop:14}
}