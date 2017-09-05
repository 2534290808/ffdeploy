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
        onPress: PropTypes.func.isRequired,
        iconName: PropTypes.string,
        inspType: PropTypes.number.isRequired,
        leftIcon: PropTypes.any
    }
   constructor(props){
        super(props)
       this._onPress=this._onPress.bind(this);
   }
    _onPress() {
        this.props.onPress({inspType: this.props.inspType, title: this.props.title})
    }

    render() {
        return (<ListItem underlayColor={Colors.underlayColor} containerStyle={styles.listItem} hideChevron
                          leftIcon={this.props.leftIcon}
                          title={this.props.title}
                          onPress={this._onPress}/>)
    }
}
const styles = StyleSheet.create({
    listItem: {
        borderBottomWidth: Util.pixel,
        borderBottomColor: '#ccc',
        borderTopWidth:0
    }
})