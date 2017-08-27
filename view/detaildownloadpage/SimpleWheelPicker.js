/**
 * Created by lmy2534290808 on 2017/8/25.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {WheelPicker} from 'react-native-wheel-picker-android';
export default class SimpleWheelPicker extends Component {
    constructor(props) {
        super(props);
        this.state={
            position:0,
            data:[]
        }
    }

    static propTypes = {
        data: PropTypes.array,//传入组件的数据以json数组格式，
        showJsonField: PropTypes.string,//展示json的那个属性,
        onItemSelected: PropTypes.func,
        selectedItemPosition:PropTypes.number
    }
   /* componentDidMount(){
        this.setState({position:this.props.selectedItemPosition})
    }
    componentWillReceiveProps(nextProps){
        this.setState({data:nextProps.data,position:nextProps.selectedItemPosition})
    }*/
    _getWheelPickerData(originData) {
        let wheelPickerData = []
        if (originData && originData.length > 0) {
            for (var item of originData) {
                if (this.props.showJsonField) {
                    wheelPickerData.push(item[this.props.showJsonField])
                } else {
                    for (var key in item) {
                        wheelPickerData.push(item[key])
                        break;
                    }
                }

            }
        }
        return wheelPickerData;
    }

    _itemSelected(event) {
        let originData = this.props.data;
        this.props.onItemSelected ? this.props.onItemSelected({
            data: originData[event.position],
            position: event.position
        }) : null
    }

    render() {
        return (<WheelPicker
            selectedItemPosition={this.props.selectedItemPosition}
            onItemSelected={this._itemSelected.bind(this)}
            isCurved
            selectedItemTextColor='black'
            data={this._getWheelPickerData(this.props.data)}
            style={styles.wheelPicker} itemTextSize={40}/>)
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    wheelPicker: {
        flex: 1,
        height: 200
    }
});