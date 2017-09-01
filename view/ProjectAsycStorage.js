/**
 * Created by lmy2534290808 on 2017/8/31.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text,AsyncStorage} from 'react-native';
import PropTypes from 'prop-types';
import Storage from 'react-native-storage';
var storage = new Storage({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
    sync: {}
});
global.storage = storage;
export default class ProjectAsycStorage extends Component {
    render() {
        return null
    }
}