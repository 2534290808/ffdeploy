/**
 * Created by lmy2534290808 on 2017/8/23.
 * 主页
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, AsyncStorage, TextInput, NativeAppEventEmitter,ToastAndroid} from 'react-native';
import PropTypes from 'prop-types';
import SimpleHeader from "../SimpleHeader";
import ProjectSqlUtil from '../ProjectSqlUtil'
import {Toast} from 'antd-mobile';
import LoadingButton from "../LoadingButton";
import Constants from '../Constants';
import ComplexPicker from "../deploy/ComplexPicker";
import SimplePicker from "../deploy/SimplePicker";
import Storage from 'react-native-storage';
import NativePicker from "../deploy/NativePicker";
import NativeInput from "../deploy/NativeInput";
import {List, ListItem,Button} from 'react-native-elements';
import BleManager from 'react-native-ble-manager';
import MdIcon from 'react-native-vector-icons/MaterialIcons';
import Util from '../Util';
var storage = new Storage({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
    sync: {}
});
global.storage = storage;
export default class MainPage extends Component {
    constructor() {
        super()
        this.state = {
            buildingType: [],
            riskGrade: [],
            loading: false,
            unitName: '',
            buildingName: '',
            buildingTypeValue: 1,
            riskGradeValue: 1,
            regionName: '',
            regionId: '',
            bleEnabled: false,
            scanning:false,
            bleAddress:'',
            bleConnected:false
        }
        this._handleDidUpdateState=this._handleDidUpdateState.bind(this);
        this._handleDiscoverPeripheral=this._handleDiscoverPeripheral.bind(this);
        this._handleStopScan=this._handleStopScan.bind(this);
        this._handleDisconnectPeripheral=this._handleDisconnectPeripheral.bind(this);
        this._optionBle=this._optionBle.bind(this);
    }

    componentDidMount() {
        let ps = new ProjectSqlUtil();
        ps.initDB();
        ps.openEquipmentDatabase();
        ps.createExtinguisherTable().then(() => {
        }).catch((e) => {
        })
        ps.getBuildingType().then((value) => {
            this.setState({buildingType: value})
        }).catch((e) => {
            console.warn(e)
        });
        ps.getRiskGrade().then((value) => {
            this.setState({riskGrade: value})
        })
        storage.load({key: Constants.storage_key.baseData}).then((res) => {
            let {unitName, regionName, regionId, buildingName, buildingTypeValue, riskGradeValue} = res;
            this.setState({
                unitName: unitName,
                regionName: regionName,
                buildingName: buildingName,
                buildingTypeValue: buildingTypeValue,
                riskGradeValue: riskGradeValue,
                regionId: regionId
            })
        }).catch(() => {
        })
        storage.load({key:'bleAddress'}).then(bleAddress=>{
            this.setState({bleAddress})
        })
        //蓝牙初始化
        BleManager.start({showAlert: false}).then(()=>{
            console.warn('准备就绪')
        }).catch(e=>{console.warn(JSON.stringify(e))});
        //蓝牙状态更新
        this.handleDidUpdateState = NativeAppEventEmitter.addListener('BleManagerDidUpdateState', this._handleDidUpdateState)
        /**
         * 注册发现外围设备的事件
         */
        this.handleDiscoverPeripheral = NativeAppEventEmitter.addListener('BleManagerDiscoverPeripheral', this._handleDiscoverPeripheral)

        //监听到蓝牙扫描停止，使用BleManager.stopScan()并不会触发
        this.handleStopScan = NativeAppEventEmitter.addListener('BleManagerStopScan', this._handleStopScan)
        this.handleDisconnectPeripheral = NativeAppEventEmitter.addListener('BleManagerDisconnectPeripheral', this._handleDisconnectPeripheral)
        BleManager.checkState();
    }
    componentWillUnmount(){
       this.handleDidUpdateState.remove();
       this.handleDiscoverPeripheral.remove();
       this.handleStopScan.remove();
       this.handleDisconnectPeripheral.remove();
       let {bleAddress}=this.state
       BleManager.isPeripheralConnected(bleAddress, []).then(isConnected => {
           if (isConnected) {
               console.warn('removePeripheral时蓝牙已经连接:'+bleAddress)
               BleManager.disconnect(bleAddress).then(() => {
                   console.warn('断开连接')
               }).catch(e => e)
           } else {
               console.warn('removePeripheral时蓝牙没有连接:'+bleAddress)
               BleManager.removePeripheral(bleAddress).then(res=>console.warn('remove成功')).catch(e=>console.warn(JSON.stringify(e)))
           }
       }).catch(e => console.warn(JSON.stringify(e)))
   }
    _handleDidUpdateState(args) {
        if (args.state === 'on') {
            this.setState({bleEnabled: true})
            console.warn('ble is opened')
        } else if (args.state == 'off') {
            this.setState({bleEnabled: false});
            console.warn('ble is closed')
        }
    }
    _handleDiscoverPeripheral(data) {
        console.warn(data.name+':'+data.id);
        if (data.name == "BLE SPP") {
            BleManager.stopScan().then(() => {
                this.setState({scanning: false})
                BleManager.connect(data.id).then(() => {
                    this.setState({bleConnected: true,bleAddress:data.id});
                    storage.save({key: 'bleAddress', data: data.id});
                    this.startNotify();
                    Toast.hide();
                    ToastAndroid.show('蓝牙已经连接', ToastAndroid.SHORT);

                })
            });
        }
    }
    _handleStopScan() {
        this.setState({scanning: false});
        Toast.hide();
        ToastAndroid.show('未找到蓝牙', ToastAndroid.SHORT);
    }
    _handleDisconnectPeripheral() {
        this.setState({bleConnected: false});
        //BleManager.removePeripheral(this.state.bleAddress)
        Toast.hide();
        console.warn('触发了disconnect事件')
        ToastAndroid.show('蓝牙断开连接', ToastAndroid.SHORT);
    }
    startNotify() {
        BleManager.retrieveServices(this.state.bleAddress).then((info) => {
            let serviceUUID, characterUUID;
            // ToastAndroid.show(JSON.stringify(info.characteristics),ToastAndroid.LONG);
            for (var item of info.characteristics) {
                let {Notify} = item.properties;
                if (Notify) {
                    serviceUUID = item.service;
                    characterUUID = item.characteristic;
                    break;
                }
            }
            BleManager.startNotification(this.state.bleAddress, serviceUUID, characterUUID).then(() => {
                //ToastAndroid.show('打开通知成功', ToastAndroid.LONG);
            }).catch(() => {
                // ToastAndroid.show('打开通知失败', ToastAndroid.LONG);
            })
        })
    }
    _optionBle(index) {
        let {bleEnabled, bleConnected, scanning} = this.state;
        if (index == 0) {
            if (bleEnabled) {
                ToastAndroid.show('蓝牙已经打开', ToastAndroid.SHORT);
            } else {
                BleManager.enableBluetooth().then(() => {
                })
            }
        } else {
            if (bleEnabled) {
                if (bleConnected) {
                    ToastAndroid.show('蓝牙已连接', ToastAndroid.SHORT);
                } else {
                    if (!scanning) {
                        Toast.loading('连接中...', 0);
                        BleManager.scan([], 10, true).then(() => {
                        })
                    }
                }
            } else {
                ToastAndroid.show('蓝牙未打开', ToastAndroid.SHORT);
            }
        }
    }
    _setRegion(item) {
        if (item.cityName == '县' || item.cityName == '市辖区') {
            this.setState({regionName: item.provinceName + " " + item.countyData.name})
        } else {
            this.setState({regionName: item.provinceName + " " + item.cityName + " " + item.countyData.name})
        }
        this.setState({regionId: item.countyData.id})
    }

    _saveData() {
        let {unitName, regionName, regionId, buildingName, buildingTypeValue, riskGradeValue,bleConnected} = this.state;
        if(!bleConnected){
            ToastAndroid.show('蓝牙未连接',ToastAndroid.SHORT)
            return ;
        }
        storage.save({
            key: 'baseData',
            data: {
                unitName: unitName,
                regionName: regionName,
                regionId: regionId,
                buildingName: buildingName,
                buildingTypeValue: buildingTypeValue,
                riskGradeValue: riskGradeValue
            }
        })
        this.props.navigation.navigate(Constants.screen.InspMain)
    }

    render() {
       let {bleConnected}=this.state;
        return (<View style={{backgroundColor: '#fff', flex: 1}}><SimpleHeader title="主页"/>
            <ListItem containerStyle={styles.listItem} rightTitle={bleConnected?'已连接':'未连接'} leftIcon={{name: 'bluetooth'}} title="蓝牙"
                      rightIcon={
                          <MdIcon.ToolbarAndroid style={{height: 56, width: 56}}
                                                 actions={[{title: '打开'}, {title: '连接'}]} onActionSelected={this._optionBle}/>
                      }/>
            <ComplexPicker label='区域选择' value={this.state.regionName} underlineColor='#ffcc03'
                           onOK={this._setRegion.bind(this)
                           }/>
            <NativeInput label='单位名' value={this.state.unitName} onChangeText={(value) => {
                this.setState({unitName: value})
            }} selectionColor="#ffcc03" flexInput={4} flexLabel={1}/>
            <NativeInput label='楼栋名' value={this.state.buildingName} onChangeText={(value) => {
                this.setState({buildingName: value})
            }} selectionColor="#ffcc03" flexInput={4} flexLabel={1}/>
            <NativePicker onValueChange={(value) => {
                this.setState({buildingTypeValue: value})
            }} data={this.state.buildingType} label='建筑等级' selectedValue={this.state.buildingTypeValue}/>
            <NativePicker onValueChange={(value) => {
                this.setState({riskGradeValue: value})
            }} data={this.state.riskGrade} label='危险等级' selectedValue={this.state.riskGradeValue}/>
            <LoadingButton onPress={() => {
                this._saveData()
            }} indicatorColor='#fff' loading={this.state.loading} style={{marginTop: 10}} title='进入'/>
        </View>)
    }
}

const styles = StyleSheet.create({
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
        paddingBottom: 0
    }
})