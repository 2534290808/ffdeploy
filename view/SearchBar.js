/**
 * Created by lmy2534290808 on 2017/8/25.
 */
import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import {SearchBar} from 'react-native-elements';
export default class SearchBar_ extends Component{
    static propTypes={
        onChangeText:PropTypes.func,
        onFocus:PropTypes.func,
    }
    _changeText(value){
        this.props.onChangeText?this.props.onChangeText(value):null
    }
    _focus(){
        this.props.onFocus?this.props.onFocus(this._ref):null
        return false;
    }
  render(){
  return(<SearchBar onFocus={this._focus.bind(this)} ref={(ref)=>this._ref=ref}
      lightTheme
      inputStyle={{backgroundColor: '#fff'}}
      round
      onChangeText={this._changeText.bind(this)}
      placeholder='输入单位名' clearIcon={{color: '#86939e', name: 'clear'}}/>)
  }
}