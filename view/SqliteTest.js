/**
 * Created by lmy2534290808 on 2017/6/6.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
    Navigator,
    StyleSheet,ToastAndroid
} from 'react-native';
import SQLite from './sqlite';
import SQLiteUtil from './sqliteUtil';
import SqliteStorageUtil from './SqliteStorageUtil';
var sqLite = new SQLite();
var sqliteUtil=new SQLiteUtil();
var sqliteStorage=new SqliteStorageUtil();
var db;
export default class SqliteTest extends Component{
    compennetDidUnmount(){
        sqLite.close();
    }
    componentWillMount(){
       db=sqliteUtil.openDatabase('test.db','1.0','MySqlite');
       let createTableSql='CREATE TABLE IF NOT EXISTS USER(' +
        'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
        'name varchar,'+
        'age VARCHAR,' +
        'sex VARCHAR,' +
        'phone VARCHAR,' +
        'email VARCHAR,' +
        'qq VARCHAR)';
       let data;
       sqliteStorage.executeSql(db,createTableSql,[]).then(()=>{}).catch(()=>{
       })
      // sqliteUtil.executeSql(db,createTableSql,[],()=>{ToastAndroid.show('建表成功',ToastAndroid.LONG)},()=>{});
        //开启数据库  
       /* if(!db){
            db = sqLite.open();
        }
        //建表  
        sqLite.createTable();
        //删除数据  
        sqLite.deleteData();*/
        //模拟一条数据  
        let insertSql="INSERT INTO user(name,age,sex,phone,email,qq)"+
            "values(?,?,?,?,?,?)";
        var userData = [];
        var user = {};
        user.name = "张三";
        user.age = "28";
        user.sex = "男";
        user.phone = "18900001111";
        user.email = "2343242@qq.com";
        user.qq = "111222";
        userData.push(user);
        sqliteStorage.executeSql(db,insertSql,[user.name,user.age,user.sex,user.phone,user.email,user.qq]).then(()=>{ToastAndroid.show('插入成功',ToastAndroid.LONG)})
        sqliteStorage.executeSql(db,"select * from user",[]).then((rec)=>{
            var len = rec.rows.length;
            for(let i=0; i<len; i++){
                var u = rec.rows.item(i);
                //一般在数据查出来之后，  可能要 setState操作，重新渲染页面  
                alert("姓名："+u.name+"，年龄："+u.age+"，电话："+u.phone);
            }
        })
        /*sqliteUtil.executeSql(db,insertSql,[user.name,user.age,user.sex,user.phone,user.email,user.qq],()=>{
            ToastAndroid.show('插入成功',ToastAndroid.LONG)
        },()=>{})
        sqliteUtil.executeSql(db,"select * from user",[],(rec)=>{
            var len = rec.rows.length;
            for(let i=0; i<len; i++){
                var u = rec.rows.item(i);
                //一般在数据查出来之后，  可能要 setState操作，重新渲染页面  
                alert("姓名："+u.name+"，年龄："+u.age+"，电话："+u.phone);
            }
        },()=>{})*/

        //插入数据  
       /* sqLite.insertUserData(userData);
        //查询  
        db.transaction((tx)=>{
            tx.executeSql("select * from user", [],(tx,results)=>{
                var len = results.rows.length;
                for(let i=0; i<len; i++){
                    var u = results.rows.item(i);
                    //一般在数据查出来之后，  可能要 setState操作，重新渲染页面  
                    alert("姓名："+u.name+"，年龄："+u.age+"，电话："+u.phone);
                }
            });
        },(error)=>{//打印异常信息  
            console.log(error);
        });*/
    }
    render(){
        return null;
    }
}  