import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { vaults } from '../config/vaults';
import { RootStackParamList } from '../navigation/types';

type Props = {
  route: { params: RootStackParamList['VaultDetail'] };
};

export default function VaultDetailScreen({ route }: Props) {
  const vault = vaults.find((v) => v.id === route.params.vaultId);

  if (!vault) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Vault not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{vault.name}</Text>
      <Text style={styles.subtitle}>{vault.apyRange}</Text>
      <Text style={styles.body}>Risk: {vault.riskLabel}</Text>
      <Text style={styles.body}>Address: {vault.vaultAddress}</Text>
      <Text style={styles.body}>Token: {vault.tokenSymbol}</Text>
      <Text style={[styles.body, styles.placeholder]}>Deposit flow coming next.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1225',
    padding: 20,
  },
  title: {
    color: '#e2e8f0',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: '#facc15',
    fontWeight: '700',
    marginBottom: 12,
  },
  body: {
    color: '#94a3b8',
    marginBottom: 8,
  },
  placeholder: {
    marginTop: 12,
    color: '#e2e8f0',
    fontWeight: '600',
  },
});
