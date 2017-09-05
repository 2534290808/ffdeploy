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
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, sql, []).then(() => {
                resolve()
            }).catch((e) => {
                reject(e)
            })
        })

    }

    /**
     * 插入灭火器信息
     * @param json
     * @returns {Promise}
     */
    insertExtinguisherInfo(json) {
        if (!db) {
            db = sqlite.openLocalDatabase('ffdeploy');
        }
        let sql = 'insert into extinguisher_info (name,equipment_qr_code,produced_date,extinguisher_type) values (?,?,?,?)';
        let {name, qrCode, dateValue, extinguisherType} = json;
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, sql, [name, qrCode, dateValue, extinguisherType]).then(() => {
                resolve()
            }).catch(e => {
                reject(e)
            })
        })
    }

    /**
     * 判断灭火器信息是否存在，根据name和qr是否相同判断
     * @param json
     */
    extinguisherInfoIsExist(json) {
        if (!db) {
            db = sqlite.openLocalDatabase('ffdeploy')
        }
        let {name, qrCode} = json,
            sql = "select count(1) num from extinguisher_info where name=? and equipment_qr_code=?";
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, sql, [name, qrCode]).then(res => {
                resolve(res)
            }).catch(e => {
                reject(e)
            })
        })
    }

    deleteExtinguisherInfos() {
        if (!db) {
            db = sqlite.openLocalDatabase('ffdeploy')
        }
        let sql = "delete from extinguisher_info";
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, sql, []).then(() => {
                resolve()
            }).catch(e => {
                reject(e)
            })
        })
    }

    getEquipmentCount() {
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

    getExtinguisherCount() {
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

    /**
     * 得到设备信息，异步返回formdata格式数据
     * @returns {Promise}
     */
    getEquipmentInfos() {
        if (!db) {
            db = sqlite.openLocalDatabase('ffdeploy')
        }
        let sql = 'SELECT `qr_code` as qrCode,`name`,`region`,`unit`,`building`,`building_type` buildingType,`risk_grade` riskGrade,`floor`,`type`,`ensure_water_bag` ensureWaterBag,`ensure_spray` ensureSpray,`close_code` closeCode,`open_code` openCode,`vibration_code` vibrationCode FROM `equipment_detail_info`';
        let formData = new FormData();
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, sql, []).then(res => {
                let rows = res.rows, len = rows.length;
                for (var i = 0; i < len; i++) {
                    let row = rows.item(i), baseName = 'equipmentDetailInfos[' + i + ']';
                    formData.append(baseName + '.name', row.name);
                    formData.append(baseName + '.qrCode', row.qrCode);
                    formData.append(baseName + '.region', row.region);
                    formData.append(baseName + '.unit', row.unit);
                    formData.append(baseName + '.building', row.building);
                    formData.append(baseName + '.buildingType', row.buildingType);
                    formData.append(baseName + '.riskGrade', row.riskGrade);
                    formData.append(baseName + '.floor', row.floor);
                    formData.append(baseName + '.type', row.type);
                    formData.append(baseName + '.ensureWaterBag', row.ensureWaterBag);
                    formData.append(baseName + '.ensureSpray', row.ensureSpray);
                    formData.append(baseName + '.closeCode', row.closeCode);
                    formData.append(baseName + '.openCode', row.openCode);
                    formData.append(baseName + '.vibrationCode', row.vibrationCode);
                    console.warn("数据库：region：" + row.region)
                }
                resolve(formData)
            }).catch(e => {
                reject(e)
            })
        })
    }

    /**
     * 得到灭火器信息，异步返回formdata格式数据
     * @returns {Promise}
     */
    getExtinguisherInfos() {
        if (!db) {
            db = sqlite.openLocalDatabase('ffdeploy')
        }
        let sql = 'SELECT `name`,`equipment_qr_code` as equipmentQRCode,`produced_date` as producedDate,`extinguisher_type` extinguisherType FROM `extinguisher_info`';
        let formData = new FormData();
        return new Promise((resolve,reject)=>{
            sqlite.executeSql(db,sql,[]).then(res=>{
               let rows=res.rows,len=rows.length;
               for(var i=0;i<len;i++){
                   let row=rows.item(i),baseName="extinguisherInfos["+i+"]";
                   formData.append(baseName+".name",row.name)
                   formData.append(baseName+".equipmentQRCode",row.equipmentQRCode)
                   formData.append(baseName+".producedDate",row.producedDate)
                   formData.append(baseName+".extinguisherType",row.extinguisherType)
               }
               resolve(formData)
            }).catch(e=>{reject(e)})

        })
    }

    deleteEquipmentInfos() {
        if (!db) {
            db = sqlite.openLocalDatabase('ffdeploy')
        }
        let sql = 'delete from equipment_detail_info';
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, sql, []).then(() => {
                resolve()
            }).catch(e => {
                reject(e)
            })
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
