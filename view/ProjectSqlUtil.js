/**
 * Created by lmy2534290808 on 2017/8/25.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import SqliteStorageUtil from './SqliteStorageUtil';
import region from './sqlite3/region.json';
let sqlite = new SqliteStorageUtil();
let db = sqlite.openLocalDatabase('ffdeploy')
export default class ProjectSqlUtil extends Component {
    initDB() {//省市县数据库初始化，从json文件里得到
        sqlite.openLocalDatabase('ffdeploy')
    }

    getRegion(parentId) {
        if (!db) {
            db = sqlite.openLocalDatabase('ffdeploy')
        }
        let jsonArray = [];
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, 'select region_id,region_name from region where parent_id=?', [parentId]).then((rec) => {
                var len = rec.rows.length;
                jsonArray.push({id: -1, name: '请选择'})
                for (let i = 0; i < len; i++) {
                    var {REGION_ID, REGION_NAME} = rec.rows.item(i);
                    jsonArray.push({id: REGION_ID, name: REGION_NAME})
                }
                resolve(jsonArray)
            }).catch((e) => {
                reject(e)
            })
        })
    }

    getBuildingType() {
        if (!db) {
            db = sqlite.openLocalDatabase('ffdeploy')
        }
        let jsonArray = [];
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, 'select building_type_id,building_type_name from building_type', []).then((res) => {
                let rows = res.rows, len = rows.length;
                for (var i = 0; i < len; i++) {
                    jsonArray.push({value: rows.item(i).building_type_id, label: rows.item(i).building_type_name})
                }
                resolve(jsonArray);
            }).catch((e) => {
                reject(e)
            })
        })
    }

    getRiskGrade() {
        if (!db) {
            db = sqlite.openLocalDatabase('ffdeploy')
        }
        let jsonArray = [];
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, 'select risk_grade_id,risk_grade_name from risk_grade', []).then((res) => {
                let rows = res.rows, len = rows.length;
                for (var i = 0; i < len; i++) {
                    jsonArray.push({value: rows.item(i).risk_grade_id, label: rows.item(i).risk_grade_name})
                }
                resolve(jsonArray);
            }).catch((e) => {
                reject(e)
            })
        })
    }

    getExtinguisherType() {
        if (!db) {
            db = sqlite.openLocalDatabase('ffdeploy')
        }
        let jsonArray = [];
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, 'select extinguisher_type_id,extinguisher_type_name from extinguisher_type', []).then((res) => {
                let rows = res.rows, len = rows.length;
                for (var i = 0; i < len; i++) {
                    jsonArray.push({
                        value: rows.item(i).extinguisher_type_id,
                        label: rows.item(i).extinguisher_type_name
                    })
                }
                resolve(jsonArray);
            }).catch((e) => {
                reject(e)
            })
        })
    }

    openEquipmentDatabase() {
        if (!db) {
            db = sqlite.openLocalDatabase('ffdeploy');
        }
        let sql = 'CREATE TABLE IF NOT EXISTS `equipment_detail_info` (`_id` integer PRIMARY KEY AUTOINCREMENT,`qr_code` text,`name`text, `region` real, `unit` text , `building` text, `building_type` integer, `risk_grade` integer, `floor` text, `type` integer, `interval_time` integer , `insp_percentage` real ,`insp_random_num` real, `img_percentage` real, `img_random_num` real , `video_percentage` real, `video_random_num` real , `ensure_img` integer, `ensure_water_bag` integer, `ensure_spray` integer, `close_code` text, `open_code` text, `vibration_code` text)';
        if (db) {
            sqlite.executeSql(db, sql, []).then(() => {
            }).catch((e) => {
            })
        }
    }

    insertEquipment(jsonParams) {
        if (!db) {
            db = sqlite.openLocalDatabase('ffdeploy')
        }
        let sql = 'INSERT INTO `equipment_detail_info`(`qr_code`, `name`, `region`, `unit`, `building`, `building_type`, `risk_grade`, `floor`, `type`, `ensure_water_bag`, `ensure_spray`, `close_code`, `open_code`, `vibration_code`)VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);'
        let {qrCode, name, region, unit, building, buildingType, riskGrade, floor, type, ensureWaterBag, ensureSpray, closeCode, openCode, vibrationCode} = jsonParams;
        return new Promise((resolve, reject) => {
            if (db) {
                sqlite.executeSql(db, sql, [qrCode, name, region, unit, building, buildingType, riskGrade, floor, type, ensureWaterBag, ensureSpray, closeCode, openCode, vibrationCode]).then(() => {
                    resolve();
                }).catch((e) => {
                    reject(e);
                })
            } else {
                reject({error: 'db is null'});
            }
        })
    }

    getUnitName() {
        if (!db) {
            db = sqlite.openLocalDatabase('ffdeploy')
        }
        let sql = 'select distinct(unit) from equipment_detail_info';
        return new Promise((resolve, reject) => {
            if (db) {
                sqlite.executeSql(db, sql, []).then((res) => {
                    resolve(res)
                }).catch((e) => {
                    reject(e)
                })
            } else {
                reject({error: 'db is null'})
            }
        })
    }

    createExtinguisherTable() {
        if (!db) {
            db = sqlite.openLocalDatabase('ffdeploy');
        }
        let sql = 'CREATE TABLE if not exists `extinguisher_info` (`_id` integer PRIMARY KEY AUTOINCREMENT,`name` text,`equipment_qr_code` text,`brand` text,`produced_date` text,`extinguisher_type` integer,`available` integer)';
       return new Promise((resolve,reject)=>{
           sqlite.executeSql(db,sql,[]).then(()=>{resolve()}).catch((e)=>{reject(e)})
       })

    }
    insertExtinguisherInfo(json){
        if (!db) {
            db = sqlite.openLocalDatabase('ffdeploy');
        }
        let sql='insert into extinguisher_info (name,equipment_qr_code,produced_date) values (?,?,?)';
        let {name,qrCode,dateValue}=json;
        return new Promise((resolve,reject)=>{
            sqlite.executeSql(db,sql,[name,qrCode,dateValue]).then(()=>{resolve()}).catch(e=>{reject(e)})
        })
    }
    getEquipmentCount(){
        if (!db) {
            db = sqlite.openLocalDatabase('ffdeploy')
        }
        let sql = 'select count(0) num from equipment_detail_info';
        return new Promise((resolve, reject) => {
            if (db) {
                sqlite.executeSql(db, sql, []).then((res) => {
                    resolve(res)
                }).catch((e) => {
                    reject(e)
                })
            } else {
                reject({error: 'db is null'})
            }
        })
    }
    getExtinguisherCount(){
        if (!db) {
            db = sqlite.openLocalDatabase('ffdeploy')
        }
        let sql = 'select count(0) num from extinguisher_info';
        return new Promise((resolve, reject) => {
            if (db) {
                sqlite.executeSql(db, sql, []).then((res) => {
                    resolve(res)
                }).catch((e) => {
                    reject(e)
                })
            } else {
                reject({error: 'db is null'})
            }
        })
    }
    componentWillUnmount() {
        if (db) {
            db.close();
        }
    }

    render() {
        return null
    }
}
