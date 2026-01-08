import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { VaultConfig } from '../../config/vaults';

type Props = {
  vault: VaultConfig;
  onPress?: () => void;
};

// Card that displays vault info with placeholders for on-chain data
export default function VaultCard({ vault, onPress }: Props) {
  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.cardPressed]} onPress={onPress}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{vault.name}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{vault.riskLabel}</Text>
        </View>
      </View>

      <Text style={styles.apy}>{vault.apyRange}</Text>

      <View style={styles.metaRow}>
        <Text style={styles.metaLabel}>Your Balance</Text>
        <Text style={styles.metaValue}>-- {vault.tokenSymbol}</Text>
      </View>

      <View style={[styles.metaRow, styles.metaRowSpacing]}>
        <Text style={styles.metaLabel}>TVL</Text>
        <Text style={styles.metaValue}>--</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#11182f',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#162040',
    marginBottom: 12,
  },
  cardPressed: {
    opacity: 0.92,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#e2e8f0',
    fontSize: 18,
    fontWeight: '700',
  },
  badge: {
    backgroundColor: '#0f172a',
    borderColor: '#1f2a44',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    color: '#cbd5e1',
    fontSize: 12,
    fontWeight: '700',
  },
  apy: {
    color: '#facc15',
    fontWeight: '800',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaRowSpacing: {
    marginTop: 8,
  },
  metaLabel: {
    color: '#94a3b8',
    fontSize: 13,
  },
  metaValue: {
    color: '#e2e8f0',
    fontSize: 13,
    fontWeight: '600',
  },
});







