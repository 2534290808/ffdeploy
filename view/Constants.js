/**
 * Created by lmy2534290808 on 2017/8/24.
 */
import {NavigationActions} from 'react-navigation';
const Constants = {
    inspType: {
        hydrant: 1,
        pump: 2,
        rollerDoor: 3,
        other: 4
    },
    color: {
        themeColor: '#ffcc03',
        underlayColor: '#ccc',
        borderColor: "#cbd2d9",
        grey5: '#e1e8ee'
    },
    image: {
        scanBar: require('./images/scanBar.png')
    },
    screen: {
        Main: 'Main',
        QRScan: 'QRScan',
        DetailDownload: 'DetailDownload',
        Deploy: 'Deploy',
        InspMain: 'InspMain',
        ExtinguisherDeploy: 'ExtinguisherDeploy'
    },
    storage_key: {
        baseData: 'baseData',
        detailData: 'detailData'
    },
    actions: {
        toMainAction: NavigationActions.reset({index:0,actions:[NavigationActions.navigate({routeName:'Main'})]})
    },
    url:{
       // base:'http://192.168.43.34:8080/FFInsp'
         base:'http://www.njgyjd.com/FFInsp'
    }
}
export default Constants;