/**
 * Created by lmy2534290808 on 2017/8/31.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, DatePickerAndroid, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';
import {Icon} from 'react-native-elements';
export default class NativeDatePicker extends Component {
    static propTypes = {
        label: PropTypes.string,
        flexLabel: PropTypes.number,
        flexPicker: PropTypes.number,//其他为textinput的所有属性
        onValueChange:PropTypes.func.isRequired,
        selectedValue:PropTypes.string,
        placeholder:PropTypes.string,
    }
    static defaultProps = {
        label: 'label',
        flexLabel: 0,
        flexPicker: 1,
    }
   constructor(){
        super();
        this._openDataPicker=this._openDataPicker.bind(this);
   }
    async _openDataPicker() {
        try {
            const {action, year, month, day} = await
            DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: new Date(),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                this.props.onValueChange({year,month,day});
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }

    render() {
        return (<TouchableWithoutFeedback onPress={this._openDataPicker}><View
            style={[styles.pickerContainer]}>
            <Text style={{fontSize: 17, color: '#000', marginRight: 11}}>{this.props.label}</Text><Text
            style={[styles.pickerLabel, this.props.selectedValue ? {color: '#000'} : {}]}>{this.props.selectedValue ? this.props.selectedValue : this.props.placeholder}</Text><Icon
            name='caret-down' style={{marginRight: 18}} size={15} color="#666"
            type='font-awesome'/></View></TouchableWithoutFeedback>)
    }
}
const styles = {
    pickerContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ffcc03',
        paddingBottom: 10,
        paddingTop: 15,
        paddingLeft: 0,
        paddingRight: 0,
        marginLeft: 16,
        marginRight: 16,
        alignItems: 'flex-end',

    },
    pickerLabel: {
        flex: 1,
        fontSize: 14,
    },
}