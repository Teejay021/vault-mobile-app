import { Alert } from 'react-native';

type WalletSession = {
  address: string;
  chainId: number;
};

export async function connectMockWallet(): Promise<WalletSession> {
  await requestApproval();
  await delay(700);
  return {
    address: randomAddress(),
    chainId: 11155111, // default to a testnet for now
  };
}

export async function resumeMockSession(existing: {
  address?: string;
  chainId?: number | null;
}): Promise<WalletSession> {
  if (!existing.address) {
    throw new Error('No saved session found');
  }

  await delay(250);

  return {
    address: existing.address,
    chainId: existing.chainId ?? 11155111,
  };
}

export async function disconnectMockWallet() {
  await delay(200);
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function requestApproval() {
  return new Promise<void>((resolve, reject) => {
    Alert.alert(
      'Connect wallet',
      'This prototype simulates a Privy wallet approval flow.',
      [
        { text: 'Cancel', style: 'cancel', onPress: () => reject(new Error('User rejected connection')) },
        { text: 'Approve', onPress: () => resolve() },
      ],
    );
  });
}

function randomAddress() {
  const chars = 'abcdef0123456789';
  let body = '';
  for (let i = 0; i < 40; i += 1) {
    body += chars[Math.floor(Math.random() * chars.length)];
  }
  return `0x${body}`;
}
