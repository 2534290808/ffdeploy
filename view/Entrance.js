/**
 * Created by lmy2534290808 on 2017/7/31.
 * 打开APP的入口界面
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, Animated, Easing} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import Util from './Util';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);//使Icon组件具有动画效果
export default class Entrance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacityAmi: new Animated.Value(1),/*设置动画初始值*/
            transformAmi: new Animated.Value(1)
        }
    }

    static propTypes = {
        hide: PropTypes.func.isRequired,
    }

    componentDidMount() {
        Animated.parallel([Animated.timing(this.state.opacityAmi, {/*parallel函数使动画同时进行*/
            toValue: 0,//目标值
            duration: 800,//动画时间
            delay: 2200,//延迟时间
            easing: Easing.elastic(1)//动画函数
        }), Animated.timing(this.state.transformAmi, {
            toValue: 50,
            duration: 1200,
            delay: 2000,
            easing: Easing.elastic(1)
        })]).start()
      setTimeout(()=>{this.props.hide();},3300);
    }

    render() {
        return (<Animated.View style={[styles.entranceContainer, {opacity: this.state.opacityAmi}]}>
            <AnimatedIcon name='md-planet'
                          style={[styles.iconStyle, {transform: [{scale: this.state.transformAmi}]}]} size={60}/>
        </Animated.View>)
    }
}
const styles = StyleSheet.create({
    entranceContainer: {
        position: "absolute",
        top: 0, left: 0,
        height: Util.size.height,
        width: Util.size.width,
        backgroundColor: "#ffcc03",
        alignItems: "center",
        justifyContent: "center"
    },
    iconStyle: {
        color: "#fff",
        textAlign: "center"
    }
})