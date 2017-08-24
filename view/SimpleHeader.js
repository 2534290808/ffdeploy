/**
 * Created by lmy2534290808 on 2017/8/23.
 * 简单头部组件
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {Header} from 'react-native-elements';
import Colors from './Colors';
export default class SimpleHeader extends Component {
    static propTypes={
        title:PropTypes.string,
    }
    render() {
        return (<View style={styles.simpleHeader}>
            <Header statusBarProps={{backgroundColor:Colors.appColor}}
                centerComponent={{text:this.props.title, style:styles.title}}
                backgroundColor={Colors.appColor}
                outerContainerStyles={styles.simpleHeader}/></View>)
    }
}
const styles=StyleSheet.create({
    simpleHeader:{
        height:56,
    },
    title:{
        color:'#fff',
        fontSize:20
    }
})