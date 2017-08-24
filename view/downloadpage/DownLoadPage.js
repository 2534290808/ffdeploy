/**
 * Created by lmy2534290808 on 2017/8/23.
 * 现在页
 */
import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import SimpleHeader from "../SimpleHeader";
import SimpleSearchBar from "./SimpleSearchBar";
export default class DownLoadPage extends Component{
  render(){
      return(<View><SimpleHeader title='下载'/><SimpleSearchBar rightBtnPress={()=>{}} onChangeText={()=>{}} leftIconPress={()=>{}}/></View>)
  }
}