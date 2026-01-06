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

import {
  connectMockWallet,
  disconnectMockWallet,
  resumeMockSession,
} from '../../services/mockWalletProvider';

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

const initialState: WalletState = {
  isConnected: false,
  address: null,
  chainId: null,
  isConnecting: false,
  error: null,
  isRestoring: true,
};

export function WalletProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WalletState>(initialState);

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
      const session = await connectMockWallet();
      setState({
        isConnected: true,
        address: session.address,
        chainId: session.chainId,
        isConnecting: false,
        error: null,
        isRestoring: false,
      });
      await persistSession(session.address, session.chainId);
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isConnecting: false,
        error: formatError(err),
      }));
    }
  }, [persistSession]);

  const disconnect = useCallback(async () => {
    await disconnectMockWallet();
    await clearSession();
    setState({
      ...initialState,
      isRestoring: false,
    });
  }, [clearSession]);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!raw) {
          setState((prev) => ({ ...prev, isRestoring: false }));
          return;
        }

        const parsed: { address?: string; chainId?: number } = JSON.parse(raw);
        const session = await resumeMockSession({
          address: parsed.address,
          chainId: parsed.chainId ?? null,
        });

        setState({
          isConnected: true,
          address: session.address,
          chainId: session.chainId,
          isConnecting: false,
          error: null,
          isRestoring: false,
        });
      } catch (err) {
        await clearSession();
        setState({
          ...initialState,
          isRestoring: false,
          error: formatError(err),
        });
      }
    };

    restoreSession();
  }, [clearSession]);

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
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  return 'Something went wrong while connecting your wallet.';
}
