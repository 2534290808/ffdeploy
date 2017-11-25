/**
 * Created by lmy2534290808 on 2017/7/26.
 * 工具类
 */
import React from 'react';
import {PixelRatio, Dimensions, ToastAndroid} from 'react-native';
import BleManager from 'react-native-ble-manager';
const Util = {
    ratio: PixelRatio.get(),
    pixel: 1 / PixelRatio.get(),
    size: {
        width: Dimensions.get('window').width,//得到屏幕的宽度
        height: Dimensions.get('window').height//得到屏幕的高度
    },
    post(url, data){
        let fetchOptions = {
            method: 'POST',
            headers: {
                /*'Accept': 'application/json',
                 'Content-Type': 'application/json'*/
            },
            body: data
        };
        // console.warn(JSON.stringify(data));
        return new Promise((resolve, reject) => {
            fetch(url, fetchOptions).then((response) => response.json()).then(
                (responseJson) => {
                    resolve(responseJson)
                }
            ).catch((e) => {
                reject(e)
            })
        });
    },
    // 得到批量上传的所需的json,通过ajax上传到struts2中的action
    getJsonForBatchUpload(jsonArray, str) {
        var strJSON = "{";
        var len = jsonArray.length;
        var json;
        if (len > 0) {
            json = jsonArray[0];
            for (var i = 0; i < len; i++) {
                var row = jsonArray[i];
                for (var x in json) {
                    var tempStr;
                    if (typeof (row[x]) !== 'number') {
                        tempStr = '\":\"' + row[x] + '\"';
                    } else {
                        tempStr = '\":' + row[x];
                    }
                    if (strJSON !== "{") {
                        strJSON += ',\"' + str + '[' + i + '].' + x + tempStr;
                    } else {
                        strJSON += '\"' + str + '[' + i + '].' + x + tempStr;
                    }
                }
            }
            strJSON += "}";
            console.log(strJSON);
            return JSON.parse(strJSON);
        }
        return {}
    },
    key: 'BDKHFSDKJFHSDKFHWEFH-REACT-NATIVE',
    showToast(msg){
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    },
    /**
     * 将一个字节转换为十六进制的字符串
     * @param byte
     * @returns {string}
     */
    byteToHexString(byte){
        let hexStr = ((byte + 256) % 256).toString(16)
        return hexStr.length == 1 ? '0' + hexStr : hexStr;
    },
    startBleNotify(bleAddress){
        BleManager.isPeripheralConnected(bleAddress).then(isConnected => {
            if (isConnected) {
                BleManager.retrieveServices(bleAddress).then((info) => {
                    let serviceUUID, characterUUID;
                    for (var item of info.characteristics) {
                        /*let {Notify} = item.properties;
                        if (Notify) {
                            serviceUUID = item.service;
                            characterUUID = item.characteristic;
                            break;
                        }*/
                        let {characteristic}=item;
                        if(characteristic==='fee1'){
                            serviceUUID = item.service;
                            characterUUID = characteristic;
                            break;
                        }
                    }
                    BleManager.startNotification(bleAddress, serviceUUID, characterUUID).then(() => {
                        //ToastAndroid.show('打开通知成功', ToastAndroid.LONG);
                    }).catch(() => {
                        // ToastAndroid.show('打开通知失败', ToastAndroid.LONG);
                    })
                })
            }
        }).catch(e => e)
    },
    sendBleCharData(bleAddress, char){
        return new Promise((resolve, reject) => {
            BleManager.retrieveServices(bleAddress).then((info) => {
                let serviceUUID, characterUUID;
                for (var item of info.characteristics) {
                    console.log(item)
                    let {Notify, WriteWithoutResponse} = item.properties;
                    let {characteristic}=item;
                    /*if (WriteWithoutResponse && Notify) {
                        serviceUUID = item.service;
                        characterUUID = item.characteristic
                       // break;
                    }*/
                    if(characteristic=="fee2"){
                        console.log('得到fee2')
                        serviceUUID=item.service;
                        characterUUID=characteristic;
                        break;
                    }
                }
                BleManager.writeWithoutResponse(bleAddress, serviceUUID, characterUUID, [char.trim().charCodeAt(0)]).then(() => {
                    resolve();
                    console.warn('写入成功');
                    //ToastAndroid.show('写入成功',ToastAndroid.LONG)
                }).catch((e) => reject(e))
            })
        })
    },

}
export default Util;