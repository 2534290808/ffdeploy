/**
 * Created by lmy2534290808 on 2017/8/23.
 * 主页
 */
import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import SimpleHeader from "../SimpleHeader";
import MainContent from "./MainContent";
export default class MainPage extends Component{
  render(){
      return(<View><SimpleHeader title="主页"/><MainContent navigation={this.props.navigation}/></View>)
  }
}