/**
 * Created by lmy2534290808 on 2017/8/31.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {Card} from 'react-native-elements'
import LoadingButton from "../LoadingButton";
import ProjectSqlUtil from '../ProjectSqlUtil';
let ps = new ProjectSqlUtil();
export default class UploadContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            unitArray: [],
            inspCount: 0,
            extinguisherCount: 0
        }
    }

    componentDidMount() {
        if (!ps) {
            ps = new ProjectSqlUtil();
        }
        ps.getEquipmentCount().then((res)=>{this.setState({inspCount:res.rows.item(0).num})}).catch(()=>{})
        ps.getExtinguisherCount().then((res)=>{this.setState({extinguisherCount:res.rows.item(0).num})}).catch(()=>{})
    }

    render() {
        return (<View>
            <Card title='数据概况'
                  titleStyle={{fontSize: 20}}><Text>部署：巡检点数：{this.state.inspCount}，灭火器数：{this.state.extinguisherCount}</Text></Card>
            <LoadingButton style={{marginTop: 10}} onPress={() => {
            }} title='上传'/>
        </View>)
    }
}
