/**
 * Created by lmy2534290808 on 2017/8/24.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text,ToolbarAndroid} from 'react-native';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Util from '../Util';
import {Button} from 'react-native-elements';
import Colors from '../Colors';
import InspTypeModal from "./InspTypeModal";
import Constants from '../Constants';
import LoadingButton from "../LoadingButton";
import Modal from 'react-native-modal';
import QRScanView from "../qrscanpage/QRScanView";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppBar from "../AppBar";
export default class InspPage extends Component {
    constructor() {
        super();
        this.state = {
            typeVisible: false,
            qrVisible:false,
            inspType:0,
            title:''
        }
        this._showQrModal=this._showQrModal.bind(this);
        this._showTypeModal=this._showTypeModal.bind(this);
        this._hideQrModal=this._hideQrModal.bind(this);
        this._hideTypeModal=this._hideTypeModal.bind(this);
        this._navigateQRScan=this._navigateQRScan.bind(this);
        this._sendDeploy=this._sendDeploy.bind(this);
    }
    _showQrModal(){
        this._showModal('qrVisible');
    }
    _showTypeModal(){
        this._showModal('typeVisible')
    }
    _hideQrModal(){
        this._hideModal('qrVisible')
    }
    _hideTypeModal(){
        this._hideModal('typeVisible')
    }
    _showModal(type){
        this.setState({[type]:true})
    }
    _hideModal(type){
        this.setState({[type]:false})
    }
    _navigateQRScan(params){
        let {inspType,title}=params;
        this.setState({
            inspType,title
        })
        this._hideTypeModal();
        this._showQrModal();

        //this.props.navigation.navigate(Constants.screen.QRScan,{inspType:inspType,title:title});
    }
    _sendDeploy(rec) {
        let {inspType,title}=this.state;
        if(inspType===2){
            storage.load({key:'bleAddress'}).then(res=>{
                Util.sendBleCharData(res,'b').then(()=>{
                    this.props.navigation.navigate(Constants.screen.Deploy,{inspType,title,qrCode:rec.data})
                    this._hideQrModal();
                })
            })
        }else {
            this.props.navigation.navigate(Constants.screen.Deploy, {inspType, title, qrCode: rec.data})
            this._hideQrModal();
        }
    }
    render() {
        let {qrVisible,typeVisible}=this.state;
        return (<View style={styles.mainContent}>
            <Modal style={styles.qrModalContainer} isVisible={qrVisible} animationIn="fadeIn" animationOut="fadeOut" onBackButtonPress={this._hideQrModal}>
                <Icon.ToolbarAndroid onIconClicked={this._hideQrModal} style={{height:56,backgroundColor:'#ffcc03',elevation:4}} navIconName="arrow-back" iconColor="#fff" title="扫描" titleColor="#fff"/>
                <QRScanView barcodeReceived={this._sendDeploy}/>
            </Modal>
            <InspTypeModal title='类型选择' onBackButtonPress={this._hideTypeModal} typePress={this._navigateQRScan} visible={typeVisible} onNotContentPress={this._hideTypeModal}/>
            <FontAwesome name="qrcode" size={200} color="black"/>
            <Button containerViewStyle={styles.btnContainer} title="点击扫描" onPress={this._showTypeModal}
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
    },
    qrModalContainer:{
        margin:0
    }
})