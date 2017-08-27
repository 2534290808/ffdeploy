/**
 * Created by lmy2534290808 on 2017/8/25.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableWithoutFeedback, TouchableNativeFeedback,ToastAndroid} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import Util from '../Util';
import RegionPicker from "./RegionPicker";
export default class RegionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible ? props.visible : false,
            itemData:null

        }
    }

    static propTypes = {
        visible: PropTypes.bool,
        onCountySelected: PropTypes.func
    }

    _hideModal() {
        this.setState({visible: false})
    }

    _certainPress() {
      if(this.state.itemData && this.state.itemData.id>0){
          console.warn(JSON.stringify(this.state.itemData));
          this._hideModal()
          this.setState({itemData:null})
      }else {
          ToastAndroid.show('不合法选择', ToastAndroid.SHORT);
      }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({visible: nextProps.visible})
    }

    render() {
        return (<Modal onBackButtonPress={this._hideModal.bind(this)} style={{justifyContent: 'flex-end', margin: 0}}
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
              <RegionPicker onProvinceSelected={()=>{this.setState({itemData:null})}} onCitySelected={()=>{this.setState({itemData:null})}} onCountySelected={(item)=>{this.setState({itemData:item.data})}}/>
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