/**
 * Created by lmy2534290808 on 2017/8/25.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import SimpleSearchBar from "../downloadpage/SimpleSearchBar";
import RegionModal from "./RegionModal";
import SqliteTest from "../SqliteTest";
import SqliteStorageUtil from '../SqliteStorageUtil'
import RegionTest from "../sqlite3/RegionTest";
import region from '../sqlite3/region.json';
export default class DetailDownloadPage extends Component {
    constructor() {
        super();
        this.state = {
            visible: false
        }
    }

    componentWillMount() {
    }

    _showModal() {
        this.setState({visible: true})
    }

    _hideModal() {
        this.setState({visible: false})
    }

    render() {
        return (
            <View><RegionModal onCertainPress={(item)=>{alert(JSON.stringify(item))}} visible={this.state.visible}/><SimpleSearchBar autoFocus onChangeText={() => {
            }} leftIconPress={this._showModal.bind(this)}/></View>)
    }
}