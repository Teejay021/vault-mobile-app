import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';

type WalletState = {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  isConnecting: boolean;
  error: string | null;
  isRestoring: boolean;
};

type WalletContextValue = WalletState & {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
};

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

const STORAGE_KEY = '@tm-vault/wallet-session';

export function WalletProvider({ children }: { children: ReactNode }) {
  const { open, provider, isConnected, address } = useWalletConnectModal();
  const [state, setState] = useState<WalletState>({
    isConnected: false,
    address: null,
    chainId: null,
    isConnecting: false,
    error: null,
    isRestoring: true,
  });

  const persistSession = useCallback(async (address: string, chainId: number | null) => {
    const payload = JSON.stringify({ address, chainId });
    await AsyncStorage.setItem(STORAGE_KEY, payload);
  }, []);

  const clearSession = useCallback(async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
  }, []);

  const connect = useCallback(async () => {
    setState((prev) => ({ ...prev, isConnecting: true, error: null }));
    try {
      await open();
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: formatError(err),
      }));
    } finally {
      setState((prev) => ({
        ...prev,
        isConnecting: false,
      }));
    }
  }, [open]);

  const disconnect = useCallback(async () => {
    try {
      await provider?.disconnect();
    } finally {
      await clearSession();
      setState((prev) => ({
        ...prev,
        isConnected: false,
        address: null,
        chainId: null,
        error: null,
      }));
    }
  }, [clearSession]);

  useEffect(() => {
    setState((prev) => ({ ...prev, isRestoring: false }));
  }, []);

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      isConnected,
      address: address ?? null,
    }));

    if (__DEV__) {
      console.log('WalletConnect state', {
        isConnected,
        address,
      });
    }

    if (!isConnected) {
      clearSession().catch(() => undefined);
    }
  }, [address, clearSession, isConnected]);

  useEffect(() => {
    if (!provider || !isConnected) {
      setState((prev) => ({ ...prev, chainId: null }));
      return;
    }

    const fetchChainId = async () => {
      try {
        const raw = await provider.request({ method: 'eth_chainId' });
        const chainId = normalizeChainId(raw);
        setState((prev) => ({ ...prev, chainId }));
        if (address) {
          await persistSession(address, chainId);
        }
      } catch (err) {
        setState((prev) => ({ ...prev, error: formatError(err) }));
      }
    };

    fetchChainId();
  }, [address, isConnected, persistSession, provider]);

  const value = useMemo(
    () => ({
      ...state,
      connect,
      disconnect,
    }),
    [state, connect, disconnect],
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return ctx;
}

function formatError(err: unknown) {
  if (typeof err === 'object' && err !== null) {
    const anyErr = err as { code?: string; error?: string; message?: string };
    if (anyErr.code && anyErr.error) return `${anyErr.code}: ${anyErr.error}`;
    if (anyErr.message) return anyErr.message;
  }
  if (typeof err === 'string') return err;
  return 'Something went wrong while connecting your wallet.';
}

function normalizeChainId(value: unknown): number | null {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed.startsWith('0x')) {
      return Number.parseInt(trimmed, 16);
    }
    const asNumber = Number.parseInt(trimmed, 10);
    return Number.isNaN(asNumber) ? null : asNumber;
  }
  return null;
}
