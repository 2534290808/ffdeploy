/**
 * Created by lmy2534290808 on 2017/8/27.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {Svg, Path} from 'react-native-svg'
export default class Province_Svg extends Component {
    static propTypes = {
        style:PropTypes.any
    }
   static defaultProps={

   }
   //CTRL+F批量查找  CTRL+R批量替换
    render() {
        return (<Svg style={[{height:20,width:20},this.props.style]}  viewBox="0 0 1024 1024">
            <Path  fill="#ffcc03" d="M863.232 183.296c-8.192 0.512-16.896 0.512-24.576 0.512-211.456 0-304.64-91.648-305.664-92.672l-20.992-22.016-21.504 22.016c-1.024 1.024-92.16 92.672-305.664 92.672-8.192 0-16.384 0-24.576-0.512l-29.696-1.024v415.744c0 109.056 38.4 267.776 370.688 389.12l10.24 3.584 10.24-3.584c332.288-121.344 370.688-280.064 370.688-389.12V182.272c0.512 0-29.184 1.024-29.184 1.024z"/>
            <Path d="M576 427.52c-27.136 13.312-57.344 25.6-90.624 37.888h186.88c-1.536 19.968-2.048 60.928-2.048 123.392 0 60.928 0.512 107.52 2.048 139.264h-39.936v-19.968H403.968v22.016h-39.936c1.536-40.96 2.048-115.2 2.048-222.72-25.088 8.192-48.64 14.848-69.632 19.968-4.096-10.752-11.776-22.528-24.064-35.84 31.744-4.096 67.072-11.776 105.472-24.064 38.4-11.776 71.68-24.064 99.328-35.84 0-87.552-0.512-142.336-2.048-164.864h43.52c-1.536 19.968-2.048 70.144-2.048 151.04 42.496-19.968 71.68-36.864 87.552-51.712 8.192 10.752 19.456 20.48 33.792 29.696-13.824 8.192-34.816 18.432-61.952 31.744zM392.192 373.76c-17.408 17.408-40.96 37.376-71.68 59.904-6.656-11.776-16.384-20.992-29.696-27.648 29.184-18.432 51.712-35.84 67.584-51.712 15.872-15.872 28.672-31.232 37.888-45.568 9.216 9.216 20.992 17.92 35.84 25.6L392.192 373.76z m240.64 165.376v-41.984H403.968v41.984h228.864z m0 71.68v-41.984H403.968v41.984h228.864z m0 67.584v-37.888H403.968v37.888h228.864z m93.184-290.816c-9.216 8.192-19.456 17.92-29.696 29.696-15.872-19.968-49.664-49.152-101.376-87.552 8.192-6.656 15.872-15.872 24.064-27.648 44.544 32.256 80.384 60.416 107.008 85.504z"
                  fill="#ffffff"/>
        </Svg>)
    }
}