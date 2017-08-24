/**
 * Created by lmy2534290808 on 2017/8/24.
 */
import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import SimpleHeader from "../SimpleHeader";
export default class UploadPage extends Component{
  render(){
      return(<View><SimpleHeader title='上传'/></View>)
  }
}