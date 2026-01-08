export const DEFAULT_EVM_CHAIN_ID = 11155111;

export const supportedEip155Chains = [`eip155:${DEFAULT_EVM_CHAIN_ID}`];

export const walletConnectMethods = [
  'eth_sendTransaction',
  'personal_sign',
  'eth_sign',
  'eth_signTypedData',
  'eth_signTypedData_v4',
];

export const walletConnectEvents = ['chainChanged', 'accountsChanged'];
