import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PortfolioScreen from '../screens/PortfolioScreen';
import VaultDetailScreen from '../screens/VaultDetailScreen';
import VaultsScreen from '../screens/VaultsScreen';
import { RootStackParamList, RootTabParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#0b1225', borderTopColor: '#11182f' },
        tabBarActiveTintColor: '#facc15',
        tabBarInactiveTintColor: '#94a3b8',
      }}
    >
      <Tab.Screen name="Vaults" component={VaultsScreen} />
      <Tab.Screen name="Portfolio" component={PortfolioScreen} />
    </Tab.Navigator>
  );
}

// Root navigator for the app (stack over tabs)
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Root" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen
          name="VaultDetail"
          component={VaultDetailScreen}
          options={({ route }) => ({ title: route.params.vaultId })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}







