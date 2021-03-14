import React from 'react'
import {createDrawerNavigator} from 'react-navigation-drawer'
import MyDonationScreen from '../screens/MyDonationScreen'
import SettingScreen from '../screens/SettingScreen'
import {AppTabNavigator} from './AppTabNavigator'
import CustomSideBarMenu from './CustomSideBarMenu'
import NotificationScreen from '../screens/NotificationScreen'
import {Icon} from 'react-native-elements'
export const AppDrawerNavigator =createDrawerNavigator({
    Home:{
        screen:AppTabNavigator,
        navigationOptions:{
            drawerIcon:<Icon name="home" type="fontawesome5"/> 
        }
    },
    MyDonations:{
        screen:MyDonationScreen,
        navigationOptions:{
            drawerIcon:<Icon name="gift" type="font-awesome"/>, 
            drawerLabel:"MyDonations"
        }
    },
    Notifications:{
        screen:NotificationScreen,
        navigationOptions:{
            drawerIcon:<Icon name="bell" type="font-awesome"/>,
            drawerLabel:"notifications" 
        }
    },
Setting:{
    screen:SettingScreen,
    navigationOptions:{
        drawerIcon:<Icon name="Settings" type="fontawesome5"/> ,
        drawerLabel:"Settings"
    }
}
},
{
    contentComponent:CustomSideBarMenu
},
{
    initialRouteName:'Home'

})