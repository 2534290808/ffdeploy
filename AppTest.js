/**
 * Created by lmy2534290808 on 2017/8/23.
 */
import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import {TabNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements';
class Tab1 extends Component{
    static navigationOptions={
        tabBarLabel:'黎明',
        tabBarIcon:({tintColor})=><Icon name="delete" color={tintColor}/>
    }
    render(){
        return(<View/>)
    }
}
class Tab2 extends Component{
    render(){
        return(<View/>)
    }
}
class Tab3 extends Component{
    render(){
        return(<View/>)
    }
}
const AppTest=TabNavigator({
    "tab1":{screen:Tab1},
    "tab2":{screen:Tab2},
    "tab3":{screen:Tab3}
},{tabBarPosition:'bottom',tabBarOptions:{
    activeTintColor:'#ffcc03',inactiveTintColor:'black',showIcon:true,style:{
        backgroundColor:'red',height:60
    },pressOpacity:0.7,indicatorStyle:{height:0},labelStyle:{fontSize:16,paddingBottom:0}
}})
export default AppTest;