/**
 * Created by lmy2534290808 on 2017/8/25.
 */
import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import {WheelPicker,DatePicker,TimePicker} from 'react-native-wheel-picker-android';
export  default class PickerTest extends Component {
    constructor(){
        super();
        this.state={
            data:['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        }
    }
    render() {
        let now = new Date()
        let wheelPickerData = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return (
            <View style={styles.container}>
                <WheelPicker
                    onItemSelected={(event)=>this.onItemSelected(event)}
                    isCyclic
                    isCurved
                    isCurtain
                    selectedItemTextColor='black'
                    data={this.state.data}
                    style={styles.wheelPicker}/>
                <DatePicker
                    initDate={now.toISOString()}
                    onDateSelected={(date)=>this.onDateSelected(date)}/>
                <TimePicker
                    initDate={now.toISOString()}
                    onTimeSelected={(date)=>this.onTimeSelected(date)}/>
            </View>
        );
    }

    onItemSelected(event){
        this.setState({
            data:[1,2,3,4]
        })
    }

    onDateSelected(date){
        // do something
    }

    onTimeSelected(date){
        // do something
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    wheelPicker: {
        width:200,
        height: 150
    }
});
