/**
 * Created by lmy2534290808 on 2017/8/28.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';
import {Icon} from 'react-native-elements';
import Util from '../Util';
import RegionModal from "../detaildownloadpage/RegionModal";
export default class ComplexPicker extends Component {
    static propTypes = {
        placeholder: PropTypes.string,
        onOK: PropTypes.func.isRequired,
        underlineColor: PropTypes.string,
        label:PropTypes.string,
        value:PropTypes.string,
    }
    static defaultProps = {
        underlineColor:'#666',
        label:'label'
    }

    constructor(props) {
        super(props)
        this.state = {
            label: null,
            visible: false,
        }
    }

    _showModal() {
        this.setState({visible: true})
    }

    _onOK(item) {
        this.setState({visible: false})
        this.props.onOK(item);
    }

    render() {
        return (<View>
            <TouchableWithoutFeedback onPress={this._showModal.bind(this)}><View
                style={[styles.pickerContainer, {borderBottomColor: this.props.underlineColor}]}>
                <Text style={{fontSize: 17, color: '#000', marginRight: 11}}>{this.props.label}</Text><Text
                style={[styles.pickerLabel, this.props.value ? {color: '#000'} : {}]}>{this.props.value ? this.props.value : this.props.placeholder}</Text><Icon
                name='caret-down' style={{marginRight:18}} size={15} color="#666" type='font-awesome'/></View></TouchableWithoutFeedback>
            <RegionModal onModalHide={()=>{this.setState({visible:false})}} visible={this.state.visible} onOK={(item) => {
                this._onOK(item)
            }}/>
        </View>)
    }
}
const styles = {
    pickerContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#666',
        paddingBottom: 15,
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
    wheelPickerView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    wheelPicker: {
        width: Util.size.width - 3,
        height: 200
    }
}