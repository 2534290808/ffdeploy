/**
 * Created by lmy2534290808 on 2017/8/27.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {Svg, Path} from 'react-native-svg'
export default class RollerDoor_Svg extends Component {
    static propTypes = {
        width: PropTypes.string,
        height: PropTypes.string,
        style:PropTypes.any
    }
   static defaultProps={
        width:'20',
        height:'20'
   }
   //CTRL+F批量查找  CTRL+R批量替换
    render() {
        return (<Svg style={this.props.style} width={this.props.width} height={this.props.height} viewBox="0 0 1024 1024">
            <Path d="M64 0h908.8a64 64 0 0 1 64 64 64 64 0 0 1-64 64H64A64 64 0 0 1 0 64 64 64 0 0 1 64 0z" fill="#fcc002"/>
            <Path d="M147.2 0a44.8 44.8 0 0 1 44.8 44.8v934.4a44.8 44.8 0 0 1-44.8 44.8 44.8 44.8 0 0 1-44.8-44.8V44.8a44.8 44.8 0 0 1 44.8-44.8zM889.6 0a44.8 44.8 0 0 1 44.8 44.8v934.4a44.8 44.8 0 0 1-44.8 44.8 44.8 44.8 0 0 1-44.8-44.8V44.8a44.8 44.8 0 0 1 44.8-44.8z"
                  fill="#fcc002"/>
            <Path d="M115.2 204.8h806.4a51.2 51.2 0 0 1 51.2 51.2 51.2 51.2 0 0 1-51.2 51.2H115.2a51.2 51.2 0 0 1-51.2-51.2 51.2 51.2 0 0 1 51.2-51.2zM115.2 384h806.4a51.2 51.2 0 0 1 51.2 51.2 51.2 51.2 0 0 1-51.2 51.2H115.2a51.2 51.2 0 0 1-51.2-51.2 51.2 51.2 0 0 1 51.2-51.2zM115.2 563.2h806.4a51.2 51.2 0 0 1 51.2 51.2 51.2 51.2 0 0 1-51.2 51.2H115.2a51.2 51.2 0 0 1-51.2-51.2 51.2 51.2 0 0 1 51.2-51.2zM115.2 742.4h806.4a51.2 51.2 0 0 1 51.2 51.2 51.2 51.2 0 0 1-51.2 51.2H115.2a51.2 51.2 0 0 1-51.2-51.2 51.2 51.2 0 0 1 51.2-51.2zM115.2 921.6h806.4a51.2 51.2 0 0 1 51.2 51.2 51.2 51.2 0 0 1-51.2 51.2H115.2a51.2 51.2 0 0 1-51.2-51.2 51.2 51.2 0 0 1 51.2-51.2z"
                  fill="#fcc002"/>
        </Svg>)
    }
}