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
export default class MainContent extends Component {
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
    _navigateQRScan(type){
        this._hideModal();
        this.props.navigation.navigate(Constants.screen.QRScan,{inspType:type});
    }
    render() {
        return (<View style={styles.mainContent}>
            <InspTypeModal title='类型选择' onBackButtonPress={this._hideModal.bind(this)} typePress={(type)=>this._navigateQRScan(type)} visible={this.state.visible} onNotContentPress={this._hideModal.bind(this)}/>
            <FontAwesome name="qrcode" size={200} color="black"/>
            <Button containerViewStyle={styles.btnContainer} raised title="点击扫描" onPress={this._showModal.bind(this)}
                    backgroundColor={Colors.appColor} borderRadius={5}/>
        </View>)
    }
}
const styles = StyleSheet.create({
    mainContent: {
        justifyContent: 'center', alignItems: 'center', height: Util.size.height - 112,backgroundColor:'#fff'
    },
    btnContainer: {
        backgroundColor: 'transparent'
    }
})