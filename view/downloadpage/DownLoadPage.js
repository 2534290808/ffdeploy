/**
 * Created by lmy2534290808 on 2017/8/23.
 * 现在页
 */
import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import SimpleHeader from "../SimpleHeader";
import SimpleSearchBar from "./SimpleSearchBar";
import SearchBar from "../SearchBar";
import Constants from '../Constants';
export default class DownLoadPage extends Component{
    _navigateDD(ref){
        this.props.navigation.navigate(Constants.screen.DetailDownload)
        ref.blur();
    }
  render(){
      return(<View><SimpleHeader title='下载'/><SearchBar onFocus={this._navigateDD.bind(this)}/></View>)
  }
}