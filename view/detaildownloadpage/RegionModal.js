/**
 * Created by lmy2534290808 on 2017/8/25.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableWithoutFeedback, TouchableNativeFeedback, ToastAndroid} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import Util from '../Util';
import RegionPicker from "./RegionPicker";
export default class RegionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible ? props.visible : false,
            countyItemData: null,
            provinceName: null,
            cityName: null

        }
    }

    static propTypes = {
        visible: PropTypes.bool,
        onOK: PropTypes.func,
        onModalHide:PropTypes.func
    }

    _hideModal() {
        this.setState({visible: false})
    }

    _certainPress() {
        if (this.state.countyItemData && this.state.countyItemData.id > 0) {
            this.setState({countyItemData: null})
            this.props.onOK ? this.props.onOK({
                provinceName: this.state.provinceName,
                cityName: this.state.cityName,
                countyData: this.state.countyItemData
            }) : null;
        } else {
            ToastAndroid.show('不合法选择', ToastAndroid.SHORT);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({visible: nextProps.visible})
    }
    _onModalHide(){
        this.props.onModalHide?this.props.onModalHide():null;
    }
    render() {
        return (<Modal onModalHide={this.props.onModalHide.bind(this)} onBackButtonPress={this._hideModal.bind(this)} style={{justifyContent: 'flex-end', margin: 0}}
                       isVisible={this.state.visible}>
            <TouchableWithoutFeedback onPress={this._hideModal.bind(this)}><View style={styles.modalNotContent}></View></TouchableWithoutFeedback>
            <View style={styles.modalContent}>
                <View style={styles.modalBar}>
                    <TouchableNativeFeedback onPress={this._hideModal.bind(this)}><View
                        style={styles.modalBarCancel}><Text
                        style={styles.modalBarText}>取消</Text></View></TouchableNativeFeedback>
                    <View style={styles.modalBarTitle}><Text style={styles.modalBarText}>区域选择</Text></View>
                    <TouchableNativeFeedback onPress={this._certainPress.bind(this)}><View
                        style={styles.modalBarCertain}><Text
                        style={styles.modalBarText}>确定</Text></View></TouchableNativeFeedback></View>
                <RegionPicker onProvinceSelected={(item) => {
                    this.setState({countyPosition: null, provinceName: item.data.name})
                }} onCitySelected={(item) => {
                    this.setState({countyItemData: null, cityName: item.data.name})
                }} onCountySelected={(item) => {
                    this.setState({countyItemData: item.data})
                }}/>
            </View>
        </Modal>)
    }
}
const styles = StyleSheet.create({
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
        width: 56
    },
    modalBarCertain: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 10,
        height: 56,
        width: 56
    },
    modalBarText: {
        fontSize: 16
    },
    wheelPicker: {
        flex: 1,
        height: 200
    }
})