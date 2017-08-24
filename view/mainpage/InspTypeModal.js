/**
 * Created by lmy2534290808 on 2017/8/24.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import Util from '../Util';
import InspType from "./InspType";
export default class InspTypeModal extends Component {
    static propTypes = {
        title: PropTypes.string,
        visible: PropTypes.bool,
        onNotContentPress: PropTypes.func,
        typePress: PropTypes.func.isRequired,
        onBackButtonPress:PropTypes.func

    }

    render() {
        return (<Modal onBackButtonPress={()=>{this.props.onBackButtonPress?this.props.onBackButtonPress():null}} style={{justifyContent: 'flex-end', margin: 0}} isVisible={this.props.visible}>
            <TouchableWithoutFeedback onPress={() => {
                this.props.onNotContentPress ? this.props.onNotContentPress() : null
            }}><View style={styles.modalNotContent}></View></TouchableWithoutFeedback>
            <View style={styles.modalContent}>
                <View style={styles.modalBar}><Text style={styles.modalBarTitle}>{this.props.title}</Text></View>
               <InspType typePress={this.props.typePress.bind(this)}/>
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
        height:56, borderBottomWidth: Util.pixel, borderBottomColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalBarTitle: {
        fontSize: 16
    }
})