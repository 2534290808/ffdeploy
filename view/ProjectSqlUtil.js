/**
 * Created by lmy2534290808 on 2017/8/25.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import SqliteStorageUtil from './SqliteStorageUtil';
import region from './sqlite3/region.json';
let sqlite = new SqliteStorageUtil();
export default class ProjectSqlUtil extends Component {
    initRegionDB() {//省市县数据库初始化，从json文件里得到
         sqlite.openLocalDatabase('region')
    }

    getRegion(parentId) {
        let db = sqlite.openLocalDatabase('region')
        let jsonArray = [];
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, 'select region_id,region_name from region where parent_id=?', [parentId]).then((rec) => {
                var len = rec.rows.length;
                jsonArray.push({id:-1,name:'请选择'})
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

    render() {
        return null
    }
}
