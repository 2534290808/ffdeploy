/**
 * Created by lmy2534290808 on 2017/9/29.
 */
import React,{Component} from 'react';
import {StyleSheet,View,Text,Switch} from 'react-native';
import PropTypes from 'prop-types';
import SimpleHeader from "../SimpleHeader";
import {ListItem,List} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
export default class Setting extends Component{
    constructor(){
        super();
        this.state={
            bleEnabled:false,
            switchDisabled:false
        }
        this.openBle=this.openBle.bind(this);
    }
    openBle(value){
        this.setState({bleEnabled:value})
    }
  render(){
        let {bleEnabled,switchDisabled}=this.state
      return(<View><SimpleHeader title='设置'/>
          <List>
              <ListItem leftIcon={{name:'bluetooth'}} rightIcon={<Switch disabled={switchDisabled} value={bleEnabled} onValueChange={this.openBle}/>}/>
          </List>
      </View>)
  }
}