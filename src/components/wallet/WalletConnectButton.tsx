import React from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { useWallet } from '../../state/wallet/WalletProvider';

export default function WalletConnectButton() {
  const {
    isConnected,
    isConnecting,
    isRestoring,
    address,
    chainId,
    error,
    connect,
    disconnect,
  } = useWallet();

  if (isConnected) {
    return (
      <View style={styles.container}>
        <Pressable
          onPress={() =>
            Alert.alert('Disconnect wallet?', undefined, [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Disconnect', style: 'destructive', onPress: disconnect },
            ])
          }
          style={({ pressed }) => [styles.chip, pressed && styles.chipPressed]}
          accessibilityRole="button"
          accessibilityLabel="Connected wallet. Tap to disconnect."
        >
          <Text style={styles.address}>{truncateAddress(address)}</Text>
          <Text style={styles.network} numberOfLines={1} ellipsizeMode="tail">
            {formatNetwork(chainId)}
          </Text>
        </Pressable>
        <Text style={styles.disconnectHint}>Tap to disconnect</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={connect}
        disabled={isConnecting || isRestoring}
        style={({ pressed }) => [
          styles.button,
          (pressed || isConnecting) && styles.buttonPressed,
          (isConnecting || isRestoring) && styles.buttonDisabled,
        ]}
      >
        {isConnecting ? (
          <ActivityIndicator color="#0f172a" />
        ) : (
          <Text style={styles.buttonText}>Connect Wallet</Text>
        )}
      </Pressable>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

function truncateAddress(value: string | null) {
  if (!value) return 'Wallet';
  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

function formatNetwork(chainId: number | null) {
  if (!chainId) return 'Unknown';
  return `Chain ${chainId}`;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    maxWidth: 200,
  },
  button: {
    backgroundColor: '#facc15',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 18,
    minWidth: 150,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#0f172a',
    fontWeight: '700',
    fontSize: 15,
  },
  chip: {
    backgroundColor: '#0f172a',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '100%',
    alignSelf: 'flex-end',
  },
  chipPressed: {
    opacity: 0.85,
  },
  address: {
    color: '#e2e8f0',
    fontWeight: '700',
    flexShrink: 1,
  },
  network: {
    color: '#94a3b8',
    fontSize: 12,
    marginLeft: 6,
    maxWidth: 150,
    flexShrink: 1,
  },
  disconnectHint: {
    marginTop: 6,
    color: '#94a3b8',
    fontSize: 11,
    textAlign: 'right',
  },
  errorText: {
    marginTop: 6,
    color: '#ef4444',
    fontSize: 12,
  },
});


