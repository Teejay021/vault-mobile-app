export type VaultConfig = {
  id: string;
  name: string;
  riskLabel: 'Stable' | 'Growth' | 'Turbo';
  apyRange: string;
  vaultAddress: string;
  tokenSymbol: 'USDC';
};

export const vaults: VaultConfig[] = [
  {
    id: 'stable',
    name: 'Stable',
    riskLabel: 'Stable',
    apyRange: '6-10% APY target',
    vaultAddress: '0xstablevaultplaceholder',
    tokenSymbol: 'USDC',
  },
  {
    id: 'growth',
    name: 'Growth',
    riskLabel: 'Growth',
    apyRange: '12-18% APY target',
    vaultAddress: '0xgrowthvaultplaceholder',
    tokenSymbol: 'USDC',
  },
  {
    id: 'turbo',
    name: 'Turbo',
    riskLabel: 'Turbo',
    apyRange: '20-30% APY target',
    vaultAddress: '0xturbovaultplaceholder',
    tokenSymbol: 'USDC',
  },
];
