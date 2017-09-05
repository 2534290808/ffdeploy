/**
 * Created by lmy2534290808 on 2017/8/28.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, KeyboardAvoidingView, ActivityIndicator, ToastAndroid} from 'react-native';
import {InputItem} from 'antd-mobile';
import {NavigationActions} from 'react-navigation';
import LoadingButton from "../LoadingButton";
import NativePicker from "./NativePicker";
import Constants from '../Constants';
import ProjectSqlUtil from '../ProjectSqlUtil';
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
            vibrationCode:'',
            openCode: '',
            closeCode: ''
        }
        this._saveData = this._saveData.bind(this);
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
                    <InputItem onChange={(value) => this.setState({vibrationCode: value})} selectionColor="#ffcc03"
                               value={this.state.vibrationCode} style={styles.inputItemStyle}>RFID号</InputItem>
                    {inspType == 1 ?
                        <View><NativePicker selectedValue={this.state.waterBagValue} onValueChange={(value) => {
                            this.setState({waterBagValue: value})
                        }} label='存在水袋' data={this.state.waterBag}/><NativePicker selectedValue={this.state.sprayValue}
                                                                                  data={this.state.spray}
                                                                                  onValueChange={(value) => {
                                                                                      this.setState({sprayValue: value})
                                                                                  }} label='存在喷头'/></View> : null}
                </View> : inspType == 3 ?
                    <View>
                        <InputItem value={this.state.openCode} selectionColor="#ffcc03"
                                   style={styles.inputItemStyle} onChange={(value) => this.setState({openCode: value})}>开门码</InputItem>
                        <InputItem value={this.state.closeCode} selectionColor="#ffcc03"
                                   style={styles.inputItemStyle}
                                   onChange={(value) => this.setState({closeCode: value})}>关门码</InputItem></View> : null}
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
    }
})
