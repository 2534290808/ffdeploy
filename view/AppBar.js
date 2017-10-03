/**
 * Created by lmy2534290808 on 2017/10/1.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons'
export default class AppBar extends Component {
    static propTypes = {
        leftComponent: PropTypes.any,
        title: PropTypes.string,
        rightComponent: PropTypes.any,
    }

    _getLeftComponent() {
        let {leftComponent} = this.props;
       return leftComponent ? (typeof leftComponent == 'string' ? <Icon size={24} name={leftComponent} color="#fff"/> : leftComponent) :
            <Icon name="arrow-back" color="#fff" size={24}/>
    }
    render() {
        return (<View style={styles.appBar}>
            {this._getLeftComponent()}
            <Text style={styles.appBarTitle}>{this.props.title}</Text>
        </View>)
    }
}
const styles = StyleSheet.create({
    appBar: {
        height: 56,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor:'#ffcc03'
    },
    appBarTitle:{
        color:'#fff',
        marginLeft:56
    }
})