/**
 * Created by lmy2534290808 on 2017/8/27.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {Svg, Path} from 'react-native-svg'
export default class County_Svg extends Component {
    static propTypes = {
        style:PropTypes.any
    }
   //CTRL+F批量查找  CTRL+R批量替换
    render() {
        return (<Svg style={[{height:20,width:20},this.props.style]} viewBox="0 0 1024 1024">
            <Path fill="#ffcc03" d="M863.232 183.296c-8.192 0.512-16.896 0.512-24.576 0.512-211.456 0-304.64-91.648-305.664-92.672l-20.992-22.016-21.504 22.016c-1.024 1.024-92.16 92.672-305.664 92.672-8.192 0-16.384 0-24.576-0.512l-29.696-1.024v415.744c0 109.056 38.4 267.776 370.688 389.12l10.24 3.584 10.24-3.584c332.288-121.344 370.688-280.064 370.688-389.12V182.272c0.512 0-29.184 1.024-29.184 1.024z"/>
            <Path d="M406.528 340.992c-11.776-1.024-28.16-1.024-48.128-1.024H181.248v221.696h195.584c15.872 0 28.672-0.512 38.4-1.024v21.504c-10.24-1.024-24.064-1.024-40.96-1.024H156.16c1.024-18.944 1.024-33.28 1.024-41.984V356.864c0-13.824-0.512-26.112-1.024-37.376h250.368v21.504zM308.224 428.544c18.432-21.504 31.744-43.008 40.96-64.512 8.704 5.632 18.944 11.264 31.232 16.896-8.704 5.632-16.384 13.312-22.528 22.528-6.656 9.728-15.872 23.04-28.672 40.96 27.136 22.528 49.152 44.544 66.048 66.048-9.728 6.656-16.384 13.312-20.48 20.48-12.8-18.944-33.792-40.96-63.488-66.048-11.776 13.824-24.064 26.112-36.352 37.376-12.288 11.264-27.648 23.552-46.08 37.376-7.168-7.168-15.36-13.312-24.064-17.92 15.872-7.168 30.208-15.872 43.008-25.6 12.8-10.24 28.16-25.6 45.568-47.104-19.968-18.432-44.544-36.864-74.24-55.296 8.192-6.144 13.824-13.312 16.896-20.48 27.136 18.432 51.2 36.864 72.192 55.296zM576.512 339.968l-126.976 226.304-11.776-7.168L564.736 332.8l11.776 7.168zM827.392 364.032V481.28c18.944 0 35.328-0.512 48.128-1.024V501.76c-12.8-1.024-24.576-1.024-35.84-1.024h-110.08c-6.656 7.168-13.824 15.872-22.016 25.6-8.192 10.24-19.968 20.48-34.304 31.744 29.696-1.024 72.192-3.072 128.512-7.168-10.24-11.776-18.944-20.992-26.624-27.648 4.608-3.072 10.752-8.192 17.92-15.36l31.232 31.232c11.776 11.776 22.528 23.04 32.256 33.792-7.168 5.632-13.824 11.264-18.944 16.896-4.096-5.632-10.752-12.8-20.48-21.504-30.208 2.56-64.512 5.12-101.888 8.192-37.376 3.072-60.416 6.144-68.096 9.728-2.56-8.704-6.656-17.408-13.312-26.624 10.24-4.096 21.504-10.752 33.792-20.992 11.776-9.728 22.528-22.528 31.232-37.888H645.12c-13.824 0-26.112 0.512-37.376 1.024v-21.504c11.776 1.024 28.16 1.024 48.128 1.024V368.64c0-15.36-0.512-30.208-1.024-44.544h175.104c-2.56 14.848-2.56 27.648-2.56 39.936z m-24.064 13.312v-33.792h-124.416v33.792h124.416z m0 51.2v-32.256h-124.416v32.256h124.416z m0 52.736v-33.792h-124.416V481.28h124.416z"
                  fill="#ffffff"/>
        </Svg>)
    }
}