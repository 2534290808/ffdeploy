/**
 * Created by lmy2534290808 on 2017/8/25.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import ProjectSqlUtil  from '../ProjectSqlUtil';
import SimpleWheelPicker from "./SimpleWheelPicker";
import Province_Svg from "../images/Province_Svg";
import City_Svg from "../images/City_Svg";
import County_Svg from "../images/County_Svg";
import Util from '../Util';
export default class RegionPicker extends Component {
    static propTypes = {
        onCountySelected: PropTypes.func,
        onProvinceSelected:PropTypes.func,
        onCitySelected:PropTypes.func
    }

    constructor() {
        super()
        this.state = {
            cityData: [],
            countyData: [],
            cityPosition: 0,
            provinceData: [],
            countyPosition: 0,
        }
    }

    componentDidMount() {
        let ps = new ProjectSqlUtil();
        ps.getRegion(1).then((data) => {
            this.setState({provinceData: data})
        }).catch(() => {
        })
    }

    _setCity(item) {
        let ps = new ProjectSqlUtil();
        ps.getRegion(item.data.id).then((data) => {
            this.setState({cityPosition: 0, cityData: data, countyData: [], countyPosition: 1})
        }).catch(() => {
        })
    }

    _setCounty(item) {
        let ps = new ProjectSqlUtil();
        ps.getRegion(item.data.id).then((data) => {
            this.setState({countyPosition: 0, countyData: data})
        }).catch(() => {
        })
    }

    _countySelected(item) {
        this.props.onCountySelected ? this.props.onCountySelected(item) : null
    }
    _citySelected(item){
        this.props.onCitySelected?this.props.onCitySelected(item):null
    }
    _provinceSelected(item){
        this.props.onProvinceSelected?this.props.onProvinceSelected(item):null
    }
    render() {
        return (<View><View style={{flexDirection: 'row',borderBottomWidth:Util.pixel,borderBottomColor:'#ccc'}}>
            <View style={styles.svgContainer}><Province_Svg style={styles.svgStyle}/></View>
            <View style={styles.svgContainer}><City_Svg style={styles.svgStyle}/></View>
            <View style={styles.svgContainer}><County_Svg style={styles.svgStyle}/></View>
        </View>
            <View style={{flexDirection: 'row'}}>
                <SimpleWheelPicker selectedItemPosition={0} data={this.state.provinceData}
                                   onItemSelected={(item)=>{this._setCity(item);this._provinceSelected(item)}} showJsonField='name'/>
                <SimpleWheelPicker selectedItemPosition={this.state.cityPosition} data={this.state.cityData}
                                   onItemSelected={(item) => {
                                       this.setState({cityPosition: item.position})
                                       this._setCounty(item);
                                       this._citySelected(item)
                                   }} showJsonField='name'/>
                <SimpleWheelPicker selectedItemPosition={this.state.countyPosition} data={this.state.countyData}
                                   onItemSelected={(item) => {
                                       this.setState({countyPosition: item.position});
                                       this._countySelected(item)
                                   }} showJsonField='name'/>
            </View></View>)
    }
}
const styles = StyleSheet.create({
    svgContainer: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    svgStyle: {
        height: 35,
        width: 35,
        marginTop: 5,
        marginBottom: 5
    }

})