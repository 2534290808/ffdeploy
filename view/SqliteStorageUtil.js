/**
 * Created by lmy2534290808 on 2017/8/17.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, ToastAndroid} from 'react-native';
import PropTypes from 'prop-types';
import SQLiteStorage from 'react-native-sqlite-storage';
let db;
export default class SqliteStorageUtil extends Component {
    /**
     * 卸载时关闭数据库
     */
    componentWillUnmount() {
        if (db) {
            db.close();
        }
    }
    openLocalDatabase(name){//在Android/app/arc/main/assets/www下，与db文件同名
       let db=SQLiteStorage.openDatabase({name:name,createFromLocation:1},()=>{
        },()=>{})
        return db;
    }
    /**
     * 打开数据库
     * @param name
     * @param version
     * @param displayName
     * @returns {Promise}
     */
    openDatabase(name, version, displayName) {
            db = SQLiteStorage.openDatabase(name, version, displayName, -1, () => {
            }, (err) => {
            });
        return db;
    }

    /**
     * 执行sql语句,使用promise对象
     * @param database
     * @param sql
     * @param params
     * @param onSuccess
     * @param onError
     */
    executeSql(database, sql, params) {
        return new Promise((resolve, reject) => {
            database.transaction((tx) => {
                tx.executeSql(sql, params, (tx, res) => {
                    resolve(res);
                }, (err) => {
                    try {
                        return true// 如果执行过程发生错误，事务回滚
                    } finally {
                        reject(err);
                    }
                })
            })
        })
    }

    /**
     * 关闭数据库
     * @param database
     */
    closeDatabase(database) {
        if (database) {
            database.close()
        }
    }

    render() {
        return null
    }
}