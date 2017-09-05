/**
 * Created by lmy2534290808 on 2017/8/23.
 * 主页
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, AsyncStorage,TextInput} from 'react-native';
import PropTypes from 'prop-types';
import SimpleHeader from "../SimpleHeader";
import ProjectSqlUtil from '../ProjectSqlUtil'
import {InputItem} from 'antd-mobile';
import LoadingButton from "../LoadingButton";
import Constants from '../Constants';
import ComplexPicker from "../deploy/ComplexPicker";
import SimplePicker from "../deploy/SimplePicker";
import Storage from 'react-native-storage';
import NativePicker from "../deploy/NativePicker";
import NativeInput from "../deploy/NativeInput";
import SplashScreen from 'react-native-splash-screen'
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
            buildingType:[],
            riskGrade:[],
            loading: false,
            unitName: '',
            buildingName: '',
            buildingTypeValue: 1,
            riskGradeValue: 1,
            regionName: '',
            regionId: ''
        }
    }

    componentWillMount() {
        let ps = new ProjectSqlUtil();
        ps.initDB();
        ps.openEquipmentDatabase();
        ps.createExtinguisherTable().then(()=>{}).catch((e)=>{})
        ps.getBuildingType().then((value)=>{this.setState({buildingType:value})}).catch((e)=>{console.warn(e)});
        ps.getRiskGrade().then((value)=>{this.setState({riskGrade:value})})
        storage.load({key: Constants.storage_key.baseData}).then((res) => {
            let {unitName, regionName, regionId, buildingName, buildingTypeValue, riskGradeValue} = res;
            this.setState({
                unitName: unitName,
                regionName: regionName,
                buildingName: buildingName,
                buildingTypeValue: buildingTypeValue,
                riskGradeValue: riskGradeValue,
                regionId:regionId
            })
        }).catch(() => {
        })
    }
    componentDidMount(){
        setTimeout(()=>{SplashScreen.hide();},2000)

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
        let {unitName, regionName, regionId, buildingName, buildingTypeValue, riskGradeValue} = this.state;
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
        return (<View style={{backgroundColor: '#fff', flex: 1}}><SimpleHeader title="主页"/>
            <ComplexPicker label='区域选择' value={this.state.regionName} underlineColor='#ffcc03'
                           onOK={this._setRegion.bind(this)
                           }/>
            <NativeInput label='单位名' value={this.state.unitName} onChangeText={(value)=>{this.setState({unitName:value})}} selectionColor="#ffcc03" flexInput={4} flexLabel={1}/>
            <NativeInput label='楼栋名'value={this.state.buildingName} onChangeText={(value)=>{this.setState({buildingName:value})}} selectionColor="#ffcc03" flexInput={4} flexLabel={1}/>
            <NativePicker onValueChange={(value) => {this.setState({buildingTypeValue:value})
            }}  data={this.state.buildingType} label='建筑等级' selectedValue={this.state.buildingTypeValue}/>
            <NativePicker onValueChange={(value) => {this.setState({riskGradeValue:value})
            }}  data={this.state.riskGrade} label='危险等级' selectedValue={this.state.riskGradeValue}/>
            <LoadingButton onPress={() => {
                this._saveData()
            }} indicatorColor='#fff' loading={this.state.loading} style={{marginTop: 10}} title='进入'/>
        </View>)
    }
}

const styles = StyleSheet.create({
    inputItemStyle: {
        borderBottomColor: "#ffcc03", borderBottomWidth: 1, marginRight: 18
    }
})