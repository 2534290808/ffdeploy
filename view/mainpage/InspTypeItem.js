/**
 * Created by lmy2534290808 on 2017/8/24.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../Colors';
import {ListItem} from 'react-native-elements';
import Util from '../Util';
import Hydrant_Svg from "../images/Hydrant_Svg";
export default class InspTypeItem extends Component {
    static propTypes = {
        title: PropTypes.string,
        onPress: PropTypes.func,
        iconName: PropTypes.string,
        inspType:PropTypes.number.isRequired,
        leftIcon:PropTypes.any
    }
    _onPress(){
       this.props.onPress?this.props.onPress(this.props.inspType):null
    }
    render() {
        return (<ListItem underlayColor={Colors.underlayColor} containerStyle={styles.listItem} hideChevron
                          leftIcon={this.props.leftIcon}
                          title={this.props.title}
                          onPress={this._onPress.bind(this)}/>)
    }
}
const styles = StyleSheet.create({
    listItem: {
        borderBottomWidth: Util.pixel,
        borderBottomColor: '#ccc'
    }
})