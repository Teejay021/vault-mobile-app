import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import VaultsScreen from './src/screens/VaultsScreen';
import { WalletProvider } from './src/state/wallet/WalletProvider';

export default function App() {
  return (
    <WalletProvider>
      <View style={{ flex: 1 }}>
        <StatusBar style="light" />
        <VaultsScreen />
      </View>
    </WalletProvider>
  );
}
