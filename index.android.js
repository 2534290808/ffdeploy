/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View, Button, ScrollView
} from 'react-native';
import App from "./App";
import SvgUriTest from "./test/SvgUriTest";
import Hydrant_Svg from "./view/images/Hydrant_Svg";
import City_Svg from "./view/images/City_Svg";
export default class ffdeploy extends Component {

    render() {
        return (<App/>);
    }
}
AppRegistry.registerComponent('ffdeploy', () => ffdeploy);
