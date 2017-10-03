/**
 * Created by lmy2534290808 on 2017/8/31.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView, ToastAndroid, NetInfo} from 'react-native';
import PropTypes from 'prop-types';
import {Card} from 'react-native-elements'
import LoadingButton from "../LoadingButton";
import ProjectSqlUtil from '../ProjectSqlUtil';
import Util from '../Util';
import Constants from '../Constants';
let ps = new ProjectSqlUtil();
export default class UploadContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            unitArray: [],
            inspCount: 0,
            extinguisherCount: 0,
            loading: false
        }
        this._uploadData = this._uploadData.bind(this);
        this._deleteData = this._deleteData.bind(this);
    }

    componentDidMount() {
        this._updateCard();
    }

    _uploadEquipment() {
        if (ps) {
            ps = new ProjectSqlUtil();
        }
        return new Promise((resolve, reject) => {
            ps.getEquipmentInfos().then(data => {
                if(data._parts.length>0){
                Util.post(Constants.url.base + "/addEquipments", data).then(res => {
                    if (res.success >= 1) {
                        resolve()
                    } else {
                        reject({error: 'insert data is failed'})
                    }
                }).catch(e => {
                    reject(e)
                })}else{
                    resolve();
                }
            }).catch(e => {
                reject(e);console.warn(e)
            })
        })
    }

    _uploadExtinguisher() {
        if (ps) {
            ps = new ProjectSqlUtil();
        }
        return new Promise((resolve, reject) => {
            ps.getExtinguisherInfos().then(data => {
                if(data._parts.length>0){
                Util.post(Constants.url.base + "/addExtinguishers", data).then(res => {
                    if (res.success >= 1) {
                        resolve()
                    } else {
                        resolve({error: 'insert data is failed'})
                    }
                }).catch(e => {
                    reject(e)
                })}else{
                    resolve();
                }
            }).catch(e => {
                reject(e)
            })
        })
    }

    _uploadData() {
        if(ps){
            ps=new ProjectSqlUtil();
        }
        this.setState({loading:true})
        NetInfo.isConnected.fetch().done(isConnected => {
            if (isConnected) {
                this._uploadEquipment().then(()=>{
                   ps.deleteEquipmentInfos();
                   this._uploadExtinguisher().then(()=>{
                       ps.deleteExtinguisherInfos();
                       Util.showToast('上传成功')
                       this._updateCard();
                       this.setState({loading:false})
                   }).catch(()=>{Util.showToast('上传失败');this.setState({loading:false})})
                }).catch(()=>{Util.showToast('上传失败');this.setState({loading:false})})
            }else{
                Util.showToast('网络不稳定')
            }
        })

    }
    _deleteData() {
        if (ps) {
            ps = new ProjectSqlUtil();
        }
        ps.deleteEquipmentInfos().then(() => {
            ps.deleteExtinguisherInfos().then(() => {
                this._updateCard();
            }).catch(e => {
            })
        }).catch((e) => {
            console.warn(JSON.stringify(e))
        });

    }

    _updateCard() {
        if (!ps) {
            ps = new ProjectSqlUtil();
        }
        ps.getEquipmentCount().then((res) => {
            this.setState({inspCount: res.rows.item(0).num})
        }).catch(() => {
        })
        ps.getExtinguisherCount().then((res) => {
            this.setState({extinguisherCount: res.rows.item(0).num})
        }).catch(() => {
        })
    }

    render() {
        return (<View>
            <Card title='数据概况'
                  titleStyle={{fontSize: 20}}><Text>部署：巡检点数：{this.state.inspCount}，灭火器数：{this.state.extinguisherCount}</Text></Card>
            <LoadingButton loading={this.state.loading} style={{marginTop: 10}} onPress={this._uploadData} title='上传'/>
        </View>)
    }
}
