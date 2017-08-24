/**
 * Created by lmy2534290808 on 2017/8/24.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {List} from 'react-native-elements';
import InspTypeItem from "./InspTypeItem";
import Constants from '../Constants';
export default class InspType extends Component {
    static propTypes={
        typePress:PropTypes.func
    }
    _typePress(type){
        this.props.typePress?this.props.typePress(type):null
    }
    render() {
        return (<List containerStyle={styles.listContainer}>
            <InspTypeItem inspType={Constants.inspType.hydrant} title='消火栓' onPress={this._typePress.bind(this)}/>
            <InspTypeItem inspType={Constants.inspType.pump} title='水泵' onPress={this._typePress.bind(this)}/>
            <InspTypeItem inspType={Constants.inspType.rollerDoor} title='消防门' onPress={this._typePress.bind(this)}/>
            <InspTypeItem inspType={Constants.inspType.other} title='其他' onPress={this._typePress.bind(this)}/>
        </List>)
    }
}
const styles = StyleSheet.create({
    listContainer: {
        marginTop: 1, borderTopWidth: 0, borderBottomWidth: 0, borderBottomColor: Constants.color.borderColor
    },
})