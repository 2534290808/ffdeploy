/**
 * Created by lmy2534290808 on 2017/8/28.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, Picker, TouchableWithoutFeedback, TouchableNativeFeedback} from 'react-native';
import PropTypes from 'prop-types';
import {Icon} from 'react-native-elements';
import Modal from 'react-native-modal';
import Util from '../Util'
import {WheelPicker} from 'react-native-wheel-picker-android';
export default class SimplePicker extends Component {
    static propTypes = {
        data: PropTypes.array,//jsonArray,包含value和label属性Array<{value,label}>
        onOK: PropTypes.func,
        placeholder: PropTypes.string,
        popOverTitle: PropTypes.string,
        popOverBtnColor: PropTypes.string,
        underlineColor: PropTypes.string,
        iconColor: PropTypes.string,
        label: PropTypes.string,//simplepicker左边的label
        value:PropTypes.string,//simplepicker展示的值
    }
    static defaultProps = {
        popOverTitle: '标题',
        underlineColor: '#666',
        iconColor: 'black',
        label: 'label'
    }

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            itemPosition: 0,
            value:props.value?props.value:null
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({value:nextProps.value})
    }
    _showModal() {
        this.setState({
            visible: true
        })
    }

    _hideModal() {
        this.setState({itemPosition: 0})
        this.setState({visible: false})
    }

    _getLabel(originData) {
        let label = [];
        if (originData && originData.length > 0) {
            for (var item of originData) {
                label.push(item.label)
            }
        }
        return label;
    }

    _onItemSelected(event) {
        this.setState({itemPosition: event.position})
    }

    _onOK() {
        this._hideModal();
        this.props.onOK ? this.props.onOK(this.props.data[this.state.itemPosition]) : null
    }

    render() {
        return (<View>
            <TouchableWithoutFeedback onPress={this._showModal.bind(this)}><View
                style={[styles.pickerContainer, {borderBottomColor: this.props.underlineColor}]}>
                <Text style={{fontSize: 17, color: '#000', marginRight: 11}}>{this.props.label}</Text><Text
                style={[styles.pickerLabel, this.state.label ? {color: '#000'} : {}]}>{this.state.value ? this.state.value : this.props.placeholder}</Text><Icon
                name='ios-arrow-down-outline' color={this.props.iconColor}
                type='ionicon'/></View></TouchableWithoutFeedback>
            <Modal onBackButtonPress={this._hideModal.bind(this)} style={{justifyContent: 'flex-end', margin: 0}}
                   isVisible={this.state.visible}>
                <TouchableWithoutFeedback onPress={this._hideModal.bind(this)}><View
                    style={styles.modalNotContent}></View></TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                    <View style={styles.modalBar}>
                        <TouchableNativeFeedback onPress={this._hideModal.bind(this)}><View
                            style={styles.modalBarCancel}><Text
                            style={styles.modalBarText}>取消</Text></View></TouchableNativeFeedback>
                        <View style={styles.modalBarTitle}><Text
                            style={styles.modalBarText}>{this.props.popOverTitle}</Text></View>
                        <TouchableNativeFeedback onPress={this._onOK.bind(this)}><View
                            style={styles.modalBarCertain}><Text
                            style={styles.modalBarText}>确定</Text></View></TouchableNativeFeedback></View>
                    <View style={styles.wheelPickerView}><WheelPicker itemTextSize={50} selectedItemPosition={0}
                                                                      selectedItemTextColor={'black'}
                                                                      style={styles.wheelPicker}
                                                                      data={this._getLabel(this.props.data)}
                                                                      onItemSelected={this._onItemSelected.bind(this)}/></View>
                </View>
            </Modal></View>)
    }
}
const styles = {
    pickerContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#666',
        paddingBottom: 5,
        paddingTop: 15,
        paddingLeft: 0,
        paddingRight: 0,
        marginLeft: 15,
        marginRight: 15,
        alignItems: 'flex-end'
    },
    pickerLabel: {
        flex: 1,
        fontSize: 14,
        color: '#333'
    },
    modalContainer: {justifyContent: 'flex-end', margin: 0},
    modalNotContent: {
        flex: 1
    },
    modalContent: {
        backgroundColor: 'white'
    },
    modalBar: {
        height: 56, borderBottomWidth: Util.pixel, borderBottomColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    modalBarTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalBarCancel: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 10,
        height: 56,
        width: 56,
    },
    modalBarCertain: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 10,
        height: 56,
        width: 56,
    },
    modalBarText: {
        fontSize: 16
    },
    wheelPickerView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    wheelPicker: {
        width: Util.size.width - 3,
        height: 200
    }
}