/**
 * Created by lmy2534290808 on 2017/8/24.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {List} from 'react-native-elements';
import InspTypeItem from "./InspTypeItem";
import Constants from '../Constants';
import Hydrant_Svg from "../images/Hydrant_Svg";
import Pump_Svg from "../images/Pump_Svg";
import Other_Svg from "../images/Other_Svg";
import RollerDoor_Svg from "../images/RollerDoor_Svg";
export default class InspType extends Component {
    static propTypes={
        typePress:PropTypes.func
    }
    _typePress(type){
        this.props.typePress?this.props.typePress(type):null
    }
    render() {
        return (<List containerStyle={styles.listContainer}>
            <InspTypeItem leftIcon={<Hydrant_Svg style={styles.iconStyle}/>} inspType={Constants.inspType.hydrant} title='消火栓' onPress={this._typePress.bind(this)}/>
            <InspTypeItem leftIcon={<Pump_Svg style={styles.iconStyle}/>} inspType={Constants.inspType.pump} title='水泵' onPress={this._typePress.bind(this)}/>
            <InspTypeItem leftIcon={<RollerDoor_Svg style={styles.iconStyle}/>} inspType={Constants.inspType.rollerDoor} title='消防门' onPress={this._typePress.bind(this)}/>
            <InspTypeItem leftIcon={<Other_Svg style={styles.iconStyle}/>} inspType={Constants.inspType.other} title='其他' onPress={this._typePress.bind(this)}/>
        </List>)
    }
}
const styles = StyleSheet.create({
    listContainer: {
        marginTop: 1, borderTopWidth: 0, borderBottomWidth: 0, borderBottomColor: Constants.color.borderColor
    },
    iconStyle:{
        marginRight:5
    }
})