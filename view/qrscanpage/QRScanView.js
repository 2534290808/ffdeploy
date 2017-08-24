/**
 * Created by lmy2534290808 on 2017/8/15.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {QRScannerView} from 'ac-qrcode'
import Util from '../Util';
import Constants from '../Constants';
export default class QRScanView extends Component {
    static propTypes = {
        barcodeReceived: PropTypes.func.isRequired,
    }
   componentDidMount(){
       // setTimeout(()=>{if(this.props.barcodeReceived)this.props.barcodeReceived({data:'12345'});},5000);
   }
    render() {
        return (
            < QRScannerView
                onScanResultReceived={(rec) => {
                    this.props.barcodeReceived(rec)
                }}
                renderTopBarView={() => {
                }}
                renderBottomMenuView={() => {
                }}
                cornerColor={Constants.color.themeColor}
                scanBarImage={Constants.image.scanBar}
                hintTextStyle={{color:Constants.color.themeColor}}
            />
        )
    }
}