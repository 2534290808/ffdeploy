/**
 * Created by lmy2534290808 on 2017/8/24.
 */
import React,{Component} from 'react';
import {StyleSheet,View,Text,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
export default class ModalTest extends Component {
    state = {
        isModalVisible: false
    }

    _showModal = () => this.setState({ isModalVisible: true })

    _hideModal = () => this.setState({ isModalVisible: false })

    render () {
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={this._showModal}>
                    <Text>Show Modal</Text>
                </TouchableOpacity>
                <Modal onBackButtonPress={()=>{this._hideModal()}} isVisible={this.state.isModalVisible}>
                    <View style={{ flex: 1 }}>
                        <Text>Hello!</Text>
                    </View>
                </Modal>
            </View>
        )
    }

}