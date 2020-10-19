import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RestHomeMapa from './pages/RestHomeMap';
import RestHomeDetails from './pages/RestHomeDetails';


import SelectMapPosition from './pages/CreateRestHomes/SelectMapPosition';
import RestHomeData from './pages/CreateRestHomes/RestHomeData';
import Header from './components/Header';

const { Navigator, Screen } =  createStackNavigator();

export default function Routes(){
    return(
            <NavigationContainer>
                <Navigator screenOptions={{ headerShown: false, cardStyle: {backgroundColor: '#00C7C7'}}}>
                    <Screen 
                        name="RestHomeMap" 
                        component={RestHomeMapa}
                    />
                    <Screen 
                        name="RestHomeDetails" 
                        component={RestHomeDetails} 
                        options={{
                            headerShown: true,
                            header: () => <Header  showCancel={false} title="Sweet Home"/>
                        }}
                    />
                    <Screen 
                        name="SelectMapPosition" 
                        component={SelectMapPosition}
                        options={{
                            headerShown: true,
                            header: () => <Header title="Select on map"/>
                        }}
                    />
                    <Screen 
                        name="RestHomeData" 
                        component={RestHomeData}
                        options={{
                            headerShown: true,
                            header: () => <Header title="Enter the data"/>
                        }}
                    />
                </Navigator>
            </NavigationContainer>
    );
}