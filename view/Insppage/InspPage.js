/**
 * Created by lmy2534290808 on 2017/8/24.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Util from '../Util';
import {Button} from 'react-native-elements';
import Colors from '../Colors';
import InspTypeModal from "./InspTypeModal";
import Constants from '../Constants';
import LoadingButton from "../LoadingButton";
export default class InspPage extends Component {
    constructor() {
        super();
        this.state = {
            visible: false
        }
    }

    _showModal() {
        this.setState({visible: true})
    }

    _hideModal() {
        this.setState({visible: false})
    }
    _navigateQRScan(params){
        this._hideModal();
        let {inspType,title}=params;
        this.props.navigation.navigate(Constants.screen.QRScan,{inspType:inspType,title:title});
    }
    render() {
        return (<View style={styles.mainContent}>
            <InspTypeModal title='类型选择' onBackButtonPress={this._hideModal.bind(this)} typePress={(params)=>this._navigateQRScan(params)} visible={this.state.visible} onNotContentPress={this._hideModal.bind(this)}/>
            <FontAwesome name="qrcode" size={200} color="black"/>
            <Button containerViewStyle={styles.btnContainer} title="点击扫描" onPress={this._showModal.bind(this)}
                    backgroundColor={Colors.appColor} borderRadius={5}/>
        </View>)
    }
}
const styles = StyleSheet.create({
    mainContent: {
        justifyContent: 'center', alignItems: 'center', flex:1,backgroundColor:'#fff'
    },
    btnContainer: {
        elevation:3
    }
})