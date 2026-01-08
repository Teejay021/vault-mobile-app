import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WalletConnectModal } from '@walletconnect/modal-react-native';

import AppNavigator from './src/navigation/AppNavigator';
import {
  supportedEip155Chains,
  walletConnectEvents,
  walletConnectMethods,
} from './src/config/chains';
import { WalletProvider } from './src/state/wallet/WalletProvider';

const walletConnectProjectId = process.env.EXPO_PUBLIC_WC_PROJECT_ID ?? '';
const walletConnectMetadata = {
  name: 'TM Vaults',
  description: 'Token Metrics Vaults Mobile',
  url: 'https://tokenmetrics.com',
  icons: ['https://tokenmetrics.com/favicon.ico'],
  redirect: {
    native: 'vaultmobile://',
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <WalletProvider>
        <View style={{ flex: 1 }}>
          <StatusBar style="light" />
          <AppNavigator />
          <WalletConnectModal
            projectId={walletConnectProjectId}
            providerMetadata={walletConnectMetadata}
            sessionParams={{
              requiredNamespaces: {
                eip155: {
                  methods: walletConnectMethods,
                  chains: supportedEip155Chains,
                  events: walletConnectEvents,
                },
              },
            }}
          />
        </View>
      </WalletProvider>
    </SafeAreaProvider>
  );
}
