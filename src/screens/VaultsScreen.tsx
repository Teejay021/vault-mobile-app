import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

import WalletConnectButton from '../components/wallet/WalletConnectButton';
import { useWallet } from '../state/wallet/WalletProvider';

export default function VaultsScreen() {
  const { isRestoring, isConnected, chainId, address } = useWallet();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>TM Vaults</Text>
          <Text style={styles.subtitle}>Approve and deposit coming next</Text>
        </View>
        <WalletConnectButton />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {isRestoring ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator color="#facc15" />
            <Text style={styles.loadingText}>Restoring your wallet session...</Text>
          </View>
        ) : (
          <View style={styles.placeholderCard}>
            <Text style={styles.placeholderTitle}>
              {isConnected ? 'Vaults go here next' : 'Connect to get started'}
            </Text>
            <Text style={styles.placeholderBody}>
              {isConnected
                ? `Connected as ${address ?? ''} on chain ${chainId ?? 'unknown'}.`
                : 'Tap Connect Wallet to link Privy or WalletConnect.'}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1225',
    paddingHorizontal: 20,
    paddingTop: 64,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  title: {
    color: '#e2e8f0',
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    color: '#94a3b8',
    marginTop: 4,
  },
  content: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#11182f',
    borderRadius: 16,
    padding: 16,
  },
  loadingText: {
    color: '#e2e8f0',
    marginLeft: 12,
  },
  placeholderCard: {
    backgroundColor: '#11182f',
    borderRadius: 16,
    padding: 20,
  },
  placeholderTitle: {
    color: '#e2e8f0',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  placeholderBody: {
    color: '#94a3b8',
    lineHeight: 20,
  },
});
