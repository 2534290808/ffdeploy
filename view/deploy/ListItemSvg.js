/**
 * Created by lmy2534290808 on 2017/10/2.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {ListItem} from 'react-native-elements';
import Util from '../Util';
export default class ListItemSvg extends Component {
    static propTypes = {
        ...ListItem.propTypes
    }

    getLeftIcon() {
        let {leftIcon} = this.props;
        if (typeof leftIcon == 'string') {
            return leftIcon;
        } else {
            return <View style={{height: 56, justifyContent: 'center', alignItems: 'center'}}>
                {leftIcon}
            </View>
        }
    }

    getRightIcon() {
        let {rightIcon} = this.props;
        if (typeof rightIcon == 'string') {
            return rightIcon;
        } else {
            return <View style={{height: 56, justifyContent: 'center', alignItems: 'center'}}>
                {rightIcon}
            </View>
        }
    }

    render() {
        return (
            <ListItem containerStyle={styles.listItem} {...this.props} leftIcon={this.getLeftIcon()} rightIcon={this.getRightIcon()}/>)
    }
}
const styles = StyleSheet.create({
    listItem: {
        borderBottomWidth: Util.pixel * 2,
        borderTopWidth: Util.pixel,
        borderLeftWidth: Util.pixel,
        borderRightWidth: Util.pixel,
        borderBottomColor: '#cccccc',
        borderTopColor: '#ccc',
        borderLeftColor: '#ccc',
        borderRightColor: '#ccc',
        margin: 10,
        paddingTop: 0,
        paddingBottom: 0, paddingRight: 0, height: 56
    }
})