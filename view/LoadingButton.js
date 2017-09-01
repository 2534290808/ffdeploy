/**
 * Created by lmy2534290808 on 2017/8/29.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableNativeFeedback, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import {Icon} from 'react-native-elements';
export default class LoadingButton extends Component {
    static propTypes = {
        indicatorColor: PropTypes.string,
        loading: PropTypes.bool,
        titleColor: PropTypes.string,
        title: PropTypes.string,
        style:PropTypes.any,
        onPress:PropTypes.func.isRequired
    }
    static defaultProps = {
        loading: false,
        titleColor:'#fff',
    }

    render() {
        return (<TouchableNativeFeedback disabled={this.props.loading} onPress={this.props.onPress.bind(this)}><View style={[styles.btnContainer,this.props.style]}>{this.props.loading ? <ActivityIndicator
            size='small' color={this.props.indicatorColor ? this.props.indicatorColor : null}/> : null}<Text
            style={[styles.btnLabel,{color:this.props.titleColor}]}>{this.props.title}</Text></View></TouchableNativeFeedback>)
    }
}

const styles = StyleSheet.create({
    btnContainer: {
        flexDirection: 'row',
        backgroundColor: '#ffcc03',
        paddingTop: 12,
        paddingBottom: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 5,
        elevation:3,
    },
    btnLabel: {
        fontSize: 16,
        paddingLeft: 10,
        textAlign:'center'
    }
})