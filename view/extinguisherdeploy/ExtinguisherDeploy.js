/**
 * Created by lmy2534290808 on 2017/8/31.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, DatePickerAndroid, Keyboard,ToastAndroid,DeviceEventEmitter} from 'react-native';
import PropTypes from 'prop-types';
import NativeInput from "../deploy/NativeInput";
import NativeDatePicker from "./NativeDatePicker";
import NativePicker from "../deploy/NativePicker";
import ProjectSqlUtil from '../ProjectSqlUtil';
import LoadingButton from "../LoadingButton";
import Util from '../Util';
import {Toast} from 'antd-mobile'
export default class ExtinguisherDeploy extends Component {
    static navigationOptions = {
        title: '灭火器'
    }

    constructor() {
        super()
        this.state = {
            dateValue: '',
            name: '',
            data: [],
            extinguisherType: 1,
        }
        this._saveData = this._saveData.bind(this);
    }

    componentDidMount() {
        let ps = new ProjectSqlUtil();
        ps.getExtinguisherType().then((value) => {
            this.setState({data: value})
        }).catch((e) => {
            console.warn(JSON.stringify(e))
        })
        storage.load({key:'extinguisherInfo'}).then((res)=>{
            let {name}=res;
            this.setState({
                name:name,
            })
        }).catch(()=>{})
    }

    _saveData() {
        let ps = new ProjectSqlUtil(), json = {
            name: this.state.name,
            qrCode: this.props.navigation.state.params.qrCode,
            dateValue: this.state.dateValue,
            extinguisherType:this.state.extinguisherType
        };
        storage.save({
            key:'extinguisherInfo',
            data:{name:this.state.name},
        })
        ps.extinguisherInfoIsExist(json).then(res=>{
            let num =res.rows.item(0).num;
            if(num==0){
                ps.insertExtinguisherInfo(json).then(()=>{
                    DeviceEventEmitter.emit('savedEvent','');
                    Toast.success('保存成功')}).catch(()=>{Toast.fail('保存失败')})
            }else{
                Util.showToast('该灭火器已经存在')
            }
        })

    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}><NativeInput value={this.state.name}
                                                                          onChangeText={(value) => this.setState({name: value})}
                                                                          label='灭火器' flexLabel={1} flexInput={4}/>
                <NativePicker flexLabel={1} flexPicker={5} selectedValue={this.state.extinguisherType}
                              onValueChange={(value) => {
                                  this.setState({extinguisherType: value})
                              }} data={this.state.data} label='类型'/>
                <NativeDatePicker flexLabel={1} flexPicker={4} selectedValue={this.state.dateValue} label='生产日期'
                                  onValueChange={({year, month, day}) => {
                                      this.setState({dateValue: year + '-' + (month + 1) + '-' + day})
                                  }}/>
                <LoadingButton style={{marginTop: 10}} onPress={this._saveData} title="保存"/></View>
        )
    }
}