/**
 * Created by lmy2534290808 on 2017/8/28.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, NativeAppEventEmitter, ToastAndroid} from 'react-native';
import {InputItem} from 'antd-mobile';
import {NavigationActions} from 'react-navigation';
import LoadingButton from "../LoadingButton";
import NativePicker from "./NativePicker";
import Constants from '../Constants';
import ProjectSqlUtil from '../ProjectSqlUtil';
import Util from '../Util';
import {ListItem, Button} from 'react-native-elements';
import BleManager from 'react-native-ble-manager';
import IconSvg from "../icon/IconSvg";
import ListItemSvg from "./ListItemSvg";
let ps = new ProjectSqlUtil();
export default class DeployPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            loading: false,
            waterBag: [{value: 1, label: '是'}, {value: 0, label: '否'}],
            spray: [{value: 1, label: '是'}, {value: 0, label: '否'}],
            waterBagValue: 1,
            sprayValue: 1,
            floor: '',
            name: '',
            vibrationCode: '未完成',
            openCode: '未完成',
            closeCode: '未完成',
            bleAddress: '',
            sendType: ''
        }
        this._saveData = this._saveData.bind(this);
        this._handleDidUpdateValue = this._handleDidUpdateValue.bind(this);
        this._sendVibrationCodeOrder = this._sendVibrationCodeOrder.bind(this);
        this._sendOpenCodeOrder = this._sendOpenCodeOrder.bind(this);
        this._sendCloseCodeOrder = this._sendCloseCodeOrder.bind(this);
    }

    componentDidMount() {
        storage.load({key: Constants.storage_key.detailData}).then((res) => {
            let {floor, name} = res;
            this.setState({
                floor: floor,
                name: name,
            })
        }).catch(() => {
        })
        this.handleDidUpdateValueForCharacteristic = NativeAppEventEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this._handleDidUpdateValue)
        storage.load({key: 'bleAddress'}).then(bleAddress => {
            console.warn(bleAddress);
            //ToastAndroid.show(bleAddress+"---",ToastAndroid.SHORT);
            this.setState({bleAddress: bleAddress});
            Util.startBleNotify(bleAddress);
        })
    }

    componentWillUnmount() {
        this.handleDidUpdateValueForCharacteristic.remove()
    }

    _handleDidUpdateValue(args) {
       // console.warn(JSON.stringify(args));
        //ToastAndroid.show('通知了', ToastAndroid.SHORT)
        let value = args.value, len = value.length;
        let {sendType} = this.state;
        if (sendType === 't') {
            if (len == 12) {
                let time = value.slice(1, 9), card = [value[9], value[10], value[11]];
                let cardStr = parseInt(card.map((v) => Util.byteToHexString(v)).join(''), 16) + '',
                    timeStr = String.fromCharCode(...time)
                this.setState({vibrationCode: cardStr})
            } else {
                this.setState({vibrationCode: '获取失败'})
            }
        }else if(sendType=='o'){
            if (len == 7) {
                let card1 = [value[1], value[2], value[3]], card2 = [value[4], value[5], value[6]];
                let card1Str = parseInt(card1.map((v) => Util.byteToHexString(v)).join(''), 16) + '';
                let card2Str = parseInt(card2.map((v) => Util.byteToHexString(v)).join(''), 16) + ''
                this.setState({openCode: card1Str + '-' + card2Str})
            }else{
                this.setState({openCode:'获取失败'})
            }
        }else if(sendType==='c'){
            if (len == 7) {
                let card1 = [value[1], value[2], value[3]], card2 = [value[4], value[5], value[6]];
                let card1Str = parseInt(card1.map((v) => Util.byteToHexString(v)).join(''), 16) + '';
                let card2Str = parseInt(card2.map((v) => Util.byteToHexString(v)).join(''), 16) + ''
                this.setState({closeCode: card1Str + '-' + card2Str})
            }else{
                this.setState({closeCode:'获取失败'})
            }
        }else{

        }
    }

    _saveData() {
        let {floor, name} = this.state;
        storage.save({
            key: 'detailData',
            data: {
                floor: floor,
                name: name,
            }
        })
        storage.load({key: Constants.storage_key.baseData}).then((res) => {
            let {unitName, regionId, buildingName, buildingTypeValue, riskGradeValue} = res;
            let {inspType, qrCode} = this.props.navigation.state.params;
            let jsonParams = {
                qrCode: qrCode,
                name: this.state.name,
                region: regionId,
                unit: unitName,
                building: buildingName,
                buildingType: buildingTypeValue,
                riskGrade: riskGradeValue,
                floor: this.state.floor,
                type: inspType,
                ensureWaterBag: this.state.waterBagValue,
                ensureSpray: this.state.sprayValue,
                closeCode: this.state.closeCode,
                openCode: this.state.openCode,
                vibrationCode: this.state.vibrationCode
            }
            if (ps) {
                ps.insertEquipment(jsonParams).then(() => {
                    inspType == 1 ? this.props.navigation.navigate(Constants.screen.ExtinguisherDeploy, {qrCode: qrCode}) : this.props.navigation.goBack();
                }).catch((e) => {
                    ToastAndroid.show('保存失败', ToastAndroid.SHORT)
                })
            }
        }).catch(() => {
        })
    }

    _sendVibrationCodeOrder() {
        Util.sendBleCharData(this.state.bleAddress, 't').then(() => {
            this.setState({vibrationCode: '获取中', sendType: 't'})
        })
    }

    _sendOpenCodeOrder() {
        Util.sendBleCharData(this.state.bleAddress, 'o').then(() => {
            this.setState({openCode: '获取中', sendType: 'o'})
        })
    }

    _sendCloseCodeOrder() {
        Util.sendBleCharData(this.state.bleAddress, 'c').then(() => {
            this.setState({closeCode: '获取中', sendType: 'c'})
        })
    }

    render() {
        let {inspType} = this.props.navigation.state.params;
        return (<View style={{backgroundColor: '#fff', flex: 1}}>
            <InputItem value={this.state.floor} selectionColor="#ffcc03"
                       style={styles.inputItemStyle} onChange={(value) => {
                this.setState({floor: value})
            }}>楼层名</InputItem>
            <InputItem selectionColor="#ffcc03" value={this.state.name}
                       style={styles.inputItemStyle} onChange={(value) => {
                this.setState({name: value})
            }}>检测点</InputItem>
            {inspType == 1 || inspType == 2 ?
                <View>
                    {inspType == 1 ?
                        <View><NativePicker selectedValue={this.state.waterBagValue} onValueChange={(value) => {
                            this.setState({waterBagValue: value})
                        }} label='存在水袋' data={this.state.waterBag}/><NativePicker selectedValue={this.state.sprayValue}
                                                                                  data={this.state.spray}
                                                                                  onValueChange={(value) => {
                                                                                      this.setState({sprayValue: value})
                                                                                  }} label='存在喷头'/></View> : <View>
                            <ListItemSvg rightTitle={this.state.vibrationCode} leftIcon={
                                <IconSvg name="RFID"/>
                            } title="RFID" titleStyle={{marginLeft: 10}} rightIcon={
                                <Button title="获取" containerViewStyle={{width: 70}}
                                        onPress={this._sendVibrationCodeOrder} backgroundColor='transparent'
                                        color='black'/>
                            }/>
                        </View>}
                </View> : inspType == 3 ?
                    <View>
                        <ListItemSvg rightTitle={this.state.openCode} leftIcon={
                            <IconSvg name="open-door"/>
                        } title="开门码" rightTitleNumberOfLines={2} titleStyle={{marginLeft: 10}} rightIcon={
                            <Button title="获取" containerViewStyle={{width: 70}} onPress={this._sendOpenCodeOrder}
                                    backgroundColor='transparent' color='black'/>
                        }/>
                        <ListItemSvg rightTitleNumberOfLines={2} rightTitle={this.state.closeCode} leftIcon={
                            <IconSvg name="close-door"/>
                        } title="关门码" titleStyle={{marginLeft: 10}} rightIcon={
                            <Button title="获取" containerViewStyle={{width: 70}} onPress={this._sendCloseCodeOrder}
                                    backgroundColor='transparent' color='black'/>
                        }/>
                    </View> : null}
            <LoadingButton style={{marginTop: 10}} onPress={this._saveData} title='保存'/>
        </View>)
    }
}
const styles = StyleSheet.create({
    regionLabel: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 5,
        marginRight: 5
    },
    regionLabelText: {
        fontSize: 16,
        color: '#333'
    },
    inputItemStyle: {
        borderBottomColor: "#ffcc03", borderBottomWidth: 1, marginRight: 18
    },
    listItem: {
        borderBottomWidth: Util.pixel * 2,
        borderTopWidth: Util.pixel,
        borderLeftWidth: Util.pixel,
        borderRightWidth: Util.pixel,
        borderBottomColor: '#cccccc',
        borderTopColor: '#ccc',
        borderLeftColor: '#ccc',
        borderRightColor: '#ccc',
        margin: 10,
        paddingTop: 0,
        paddingBottom: 0, paddingRight: 0, height: 56
    }
})
